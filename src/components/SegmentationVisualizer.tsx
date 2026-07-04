import { useEffect, useRef, useState, MouseEvent, TouchEvent } from 'react';

interface SegmentationVisualizerProps {
  isCardHovered: boolean;
}

export default function SegmentationVisualizer({ isCardHovered }: SegmentationVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [localMouse, setLocalMouse] = useState({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const [segmentCount, setSegmentCount] = useState(3);
  const [mIoU, setMIoU] = useState(89.2);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setLocalMouse((prev) => ({
      ...prev,
      targetX: Math.max(0.1, Math.min(0.9, x)),
      targetY: Math.max(0.1, Math.min(0.9, y)),
    }));
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return;
    const x = (touch.clientX - rect.left) / rect.width;
    const y = (touch.clientY - rect.top) / rect.height;

    setLocalMouse((prev) => ({
      ...prev,
      targetX: Math.max(0.1, Math.min(0.9, x)),
      targetY: Math.max(0.1, Math.min(0.9, y)),
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCardHovered) {
        setSegmentCount(Math.floor(3 + Math.random() * 3));
        setMIoU(Number((88.5 + Math.random() * 2.1).toFixed(1)));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isCardHovered]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Dynamic Separation Factor (separates vertically when hovered)
    let currentSeparation = 0.28;
    let targetSeparation = isCardHovered ? 0.44 : 0.26;

    let currentX = 0.5;
    let currentY = 0.5;

    // Projection mathematics for 3D stacks
    const project = (px: number, py: number, pz: number, rx: number, ry: number, w: number, h: number) => {
      // Rotate around Y (horizontal mouse)
      let x1 = px * Math.cos(ry) - pz * Math.sin(ry);
      let z1 = px * Math.sin(ry) + pz * Math.cos(ry);

      // Rotate around X (vertical mouse)
      let y2 = py * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = py * Math.sin(rx) + z1 * Math.cos(rx);

      const fov = 1.9;
      const dist = 2.1;
      const scaleFactor = fov / (fov + z2 + dist);

      // Map to screen coordinates
      const screenX = w / 2 + x1 * scaleFactor * w * 0.45;
      const screenY = h / 2 + y2 * scaleFactor * h * 0.54;

      return { x: screenX, y: screenY, scale: scaleFactor };
    };

    // Helper to draw a plane mesh/outline
    const drawPlaneBorder = (pz: number, rx: number, ry: number, color: string, fillStyle?: string) => {
      const corners = [
        { x: -0.65, y: -0.5 },
        { x: 0.65, y: -0.5 },
        { x: 0.65, y: 0.5 },
        { x: -0.65, y: 0.5 }
      ];

      ctx.beginPath();
      corners.forEach((c, idx) => {
        const pt = project(c.x, c.y, pz, rx, ry, width, height);
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();

      if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // Vector Scene Polygons (representing cityscape shapes)
    const roadPoints = [
      { x: -0.15, y: 0.5 },
      { x: 0.15, y: 0.5 },
      { x: 0.05, y: -0.2 },
      { x: -0.05, y: -0.2 }
    ];

    const carPoints = [
      { x: -0.28, y: 0.2, w: 0.18, h: 0.12 },
      { x: 0.22, y: 0.15, w: 0.14, h: 0.10 }
    ];

    const pedestrianPoints = [
      { x: -0.10, y: 0.05 },
      { x: 0.12, y: -0.05 }
    ];

    const buildingPoints = [
      { x: -0.55, y: -0.4, w: 0.2, h: 0.4 },
      { x: 0.40, y: -0.4, w: 0.18, h: 0.35 }
    ];

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.015;

      // Smoothly interpolate vertical separation factor
      targetSeparation = isCardHovered ? 0.42 : 0.26;
      currentSeparation += (targetSeparation - currentSeparation) * 0.1;

      // Smooth mouse mapping
      currentX += (localMouse.targetX - currentX) * 0.08;
      currentY += (localMouse.targetY - currentY) * 0.08;

      // Compute dynamic 3D angle rotators
      const rx = (currentY - 0.5) * 0.38 + 0.35; // Default X tilt
      const ry = (currentX - 0.5) * 0.55 - 0.1;   // Default Y tilt

      // Scanner line animation back & forth (local coords: -0.55 to 0.55)
      const scanXLocal = Math.sin(time * 1.5) * 0.5;

      // Define 3 stacked layers in 3D: Top (Segmented Mask), Middle (Feature Map), Bottom (Input Image)
      const pzTop = -currentSeparation;
      const pzMiddle = 0;
      const pzBottom = currentSeparation;

      // ================= LAYER 3: BOTTOM LAYER (Input Image Wireframe) =================
      drawPlaneBorder(pzBottom, rx, ry, 'rgba(6, 182, 212, 0.2)', 'rgba(15, 23, 42, 0.4)');
      
      // Wireframe details - Grid gridlines
      ctx.beginPath();
      for (let xG = -0.55; xG <= 0.55; xG += 0.2) {
        const p1 = project(xG, -0.4, pzBottom, rx, ry, width, height);
        const p2 = project(xG, 0.4, pzBottom, rx, ry, width, height);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
      ctx.stroke();

      // Draw road wireframe
      ctx.beginPath();
      roadPoints.forEach((p, idx) => {
        const pt = project(p.x, p.y, pzBottom, rx, ry, width, height);
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.stroke();

      // Draw buildings wireframe
      buildingPoints.forEach(b => {
        ctx.beginPath();
        const corners = [
          { x: b.x, y: b.y },
          { x: b.x + b.w, y: b.y },
          { x: b.x + b.w, y: b.y + b.h },
          { x: b.x, y: b.y + b.h }
        ];
        corners.forEach((c, idx) => {
          const pt = project(c.x, c.y, pzBottom, rx, ry, width, height);
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
        ctx.stroke();
      });

      // Draw cars wireframe
      carPoints.forEach(c => {
        ctx.beginPath();
        const corners = [
          { x: c.x, y: c.y },
          { x: c.x + c.w, y: c.y },
          { x: c.x + c.w, y: c.y + c.h },
          { x: c.x, y: c.y + c.h }
        ];
        corners.forEach((co, idx) => {
          const pt = project(co.x, co.y, pzBottom, rx, ry, width, height);
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.35)';
        ctx.stroke();
      });

      // Bottom Layer Label
      const bottomLabelPt = project(-0.62, 0.42, pzBottom, rx, ry, width, height);
      ctx.font = '6px var(--font-mono)';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
      ctx.fillText("L0: INPUT_MESH_RASTER", bottomLabelPt.x, bottomLabelPt.y);

      // ================= LAYER 2: MIDDLE LAYER (ConvNet Feature Maps) =================
      drawPlaneBorder(pzMiddle, rx, ry, 'rgba(59, 130, 246, 0.1)', 'rgba(15, 23, 42, 0.25)');
      
      // Render neural grid nodes (6x5 matrix)
      const nodes: {x: number, y: number}[] = [];
      const rows = 5;
      const cols = 6;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({
            x: -0.5 + (c / (cols - 1)) * 1.0,
            y: -0.35 + (r / (rows - 1)) * 0.7
          });
        }
      }

      // Draw synapses/links connecting grid
      ctx.beginPath();
      for (let idx = 0; idx < nodes.length; idx++) {
        const node = nodes[idx];
        const nextCol = idx + 1;
        const nextRow = idx + cols;
        const ptSource = project(node.x, node.y, pzMiddle, rx, ry, width, height);

        if (nextCol < nodes.length && (idx + 1) % cols !== 0) {
          const ptTarget = project(nodes[nextCol].x, nodes[nextCol].y, pzMiddle, rx, ry, width, height);
          ctx.moveTo(ptSource.x, ptSource.y);
          ctx.lineTo(ptTarget.x, ptTarget.y);
        }
        if (nextRow < nodes.length) {
          const ptTarget = project(nodes[nextRow].x, nodes[nextRow].y, pzMiddle, rx, ry, width, height);
          ctx.moveTo(ptSource.x, ptSource.y);
          ctx.lineTo(ptTarget.x, ptTarget.y);
        }
      }
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
      ctx.stroke();

      // Render glowing nodes in middle layer
      nodes.forEach((n, index) => {
        const pt = project(n.x, n.y, pzMiddle, rx, ry, width, height);
        
        // Dynamic pulsating activations
        const pulse = Math.sin(time * 3 + index * 0.4) * 0.5 + 0.5;
        const isNearScanner = Math.abs(n.x - scanXLocal) < 0.15;
        
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isNearScanner ? 2.5 : 1.5, 0, Math.PI * 2);
        
        if (isNearScanner) {
          ctx.fillStyle = `rgba(6, 182, 212, ${0.4 + pulse * 0.6})`;
        } else {
          ctx.fillStyle = `rgba(59, 130, 246, ${0.1 + pulse * 0.25})`;
        }
        ctx.fill();
      });

      // Middle Layer Label
      const middleLabelPt = project(-0.62, 0.42, pzMiddle, rx, ry, width, height);
      ctx.fillText("L1: CONVOLUTIONAL_FEATURE_SPACE", middleLabelPt.x, middleLabelPt.y);

      // ================= LAYER 1: TOP LAYER (Semantic Segmented Mask) =================
      // Filled polygons represent class segments
      drawPlaneBorder(pzTop, rx, ry, 'rgba(6, 182, 212, 0.45)', 'rgba(3, 7, 18, 0.7)');

      // Draw segmented Road in deep blue
      ctx.beginPath();
      roadPoints.forEach((p, idx) => {
        const pt = project(p.x, p.y, pzTop, rx, ry, width, height);
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(30, 58, 138, 0.5)'; // Deep blue
      ctx.fill();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw buildings in slate blocks
      buildingPoints.forEach(b => {
        ctx.beginPath();
        const corners = [
          { x: b.x, y: b.y },
          { x: b.x + b.w, y: b.y },
          { x: b.x + b.w, y: b.y + b.h },
          { x: b.x, y: b.y + b.h }
        ];
        corners.forEach((c, idx) => {
          const pt = project(c.x, c.y, pzTop, rx, ry, width, height);
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();
        ctx.fillStyle = 'rgba(51, 65, 85, 0.4)'; // Slate segment
        ctx.fill();
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
        ctx.stroke();
      });

      // Draw segmented Cars in glowing bright cyan
      carPoints.forEach(c => {
        ctx.beginPath();
        const corners = [
          { x: c.x, y: c.y },
          { x: c.x + c.w, y: c.y },
          { x: c.x + c.w, y: c.y + c.h },
          { x: c.x, y: c.y + c.h }
        ];
        corners.forEach((co, idx) => {
          const pt = project(co.x, co.y, pzTop, rx, ry, width, height);
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, co.y);
        });
        ctx.closePath();
        ctx.fillStyle = 'rgba(6, 182, 212, 0.4)'; // Cyan segment
        ctx.fill();
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw Pedestrians in bright glowing pink/magenta circles
      pedestrianPoints.forEach((p, index) => {
        const pt = project(p.x, p.y, pzTop, rx, ry, width, height);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(236, 72, 153, 0.7)'; // Pink segment
        ctx.fill();
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Top Layer Label
      const topLabelPt = project(-0.62, 0.42, pzTop, rx, ry, width, height);
      ctx.font = '6px var(--font-mono)';
      ctx.fillStyle = '#22d3ee';
      ctx.fillText("L2: PIXELWISE_SEMANTIC_MASK", topLabelPt.x, topLabelPt.y);

      // ================= VERTICAL SCANNING LASER PLANE =================
      // Draws a glowing wall moving across the entire stack
      const scanColor = 'rgba(34, 211, 238, 0.3)';
      const laserColor = '#22d3ee';

      const scanTopStart = project(scanXLocal, -0.5, pzTop, rx, ry, width, height);
      const scanTopEnd = project(scanXLocal, 0.5, pzTop, rx, ry, width, height);
      const scanBottomStart = project(scanXLocal, -0.5, pzBottom, rx, ry, width, height);
      const scanBottomEnd = project(scanXLocal, 0.5, pzBottom, rx, ry, width, height);

      // Draw translucent scanning vertical slice/curtain
      ctx.beginPath();
      ctx.moveTo(scanTopStart.x, scanTopStart.y);
      ctx.lineTo(scanTopEnd.x, scanTopEnd.y);
      ctx.lineTo(scanBottomEnd.x, scanBottomEnd.y);
      ctx.lineTo(scanBottomStart.x, scanBottomStart.y);
      ctx.closePath();
      ctx.fillStyle = scanColor;
      ctx.fill();

      // Top laser line highlight
      ctx.beginPath();
      ctx.moveTo(scanTopStart.x, scanTopStart.y);
      ctx.lineTo(scanTopEnd.x, scanTopEnd.y);
      ctx.strokeStyle = laserColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Bottom laser line highlight
      ctx.beginPath();
      ctx.moveTo(scanBottomStart.x, scanBottomStart.y);
      ctx.lineTo(scanBottomEnd.x, scanBottomEnd.y);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw tracking connector thread highlighting active segmentation lookup
      const intersectTop = project(scanXLocal, 0.1, pzTop, rx, ry, width, height);
      const intersectMiddle = project(scanXLocal, 0.1, pzMiddle, rx, ry, width, height);
      const intersectBottom = project(scanXLocal, 0.1, pzBottom, rx, ry, width, height);

      ctx.beginPath();
      ctx.moveTo(intersectBottom.x, intersectBottom.y);
      ctx.lineTo(intersectMiddle.x, intersectMiddle.y);
      ctx.lineTo(intersectTop.x, intersectTop.y);
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([2, 2]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(intersectTop.x, intersectTop.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Draw coordinate/classification tag floating near scanline
      if (isCardHovered) {
        ctx.font = '5px var(--font-mono)';
        ctx.fillStyle = '#22d3ee';
        ctx.fillText(`SCANNER_X: ${scanXLocal.toFixed(2)}`, scanTopStart.x + 4, scanTopStart.y + 10);
        ctx.fillText(`CLASS: ROAD_WAY_OK`, scanTopStart.x + 4, scanTopStart.y + 16);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = containerRef.current?.clientWidth || 300;
      height = containerRef.current?.clientHeight || 200;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    let resizeAnimationFrameId: number;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeAnimationFrameId);
      resizeAnimationFrameId = requestAnimationFrame(() => {
        handleResize();
      });
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(resizeAnimationFrameId);
      resizeObserver.disconnect();
    };
  }, [localMouse, isCardHovered]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-52 md:h-56 rounded-xl border border-slate-900 bg-slate-950/80 overflow-hidden flex items-center justify-center cursor-crosshair group/visualizer select-none touch-none"
    >
      {/* Visual Tech grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:14px_14px]" />

      {/* Floating HUD Badges */}
      <div className="absolute top-3 left-3 flex gap-2 z-20">
        <div className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-[8px] font-mono font-medium tracking-widest text-slate-400">
          U_NET_mIoU: <span className="text-cyan-400 font-bold">{mIoU}%</span>
        </div>
        <div className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-[8px] font-mono font-medium tracking-widest text-slate-400">
          CLASSES: <span className="text-cyan-400 font-bold">{segmentCount}</span>
        </div>
      </div>

      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[8px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
          PYTORCH_EVAL_MODE
        </span>
      </div>

      <canvas ref={canvasRef} className="w-full h-full block relative z-10" />

      {/* Futuristic decorative layout in background */}
      <div className="absolute w-44 h-44 rounded-full border border-cyan-500/5 inset-0 m-auto flex items-center justify-center animate-[spin_60s_linear_infinite] pointer-events-none z-0">
        <div className="w-40 h-40 rounded-full border border-dashed border-cyan-500/5" />
      </div>
    </div>
  );
}
