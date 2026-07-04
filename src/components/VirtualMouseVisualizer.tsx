import { useEffect, useRef, useState, MouseEvent, TouchEvent } from 'react';
import { Sparkles } from 'lucide-react';

interface VirtualMouseVisualizerProps {
  isCardHovered: boolean;
}

export default function VirtualMouseVisualizer({ isCardHovered }: VirtualMouseVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [localMouse, setLocalMouse] = useState({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const [gestureState, setGestureState] = useState('HOVER_MODE');
  const [confidence, setConfidence] = useState(98.4);

  // Mouse move handler relative to this visualizer container
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

  // Touch move handler relative to this visualizer container for mobile compatibility
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
    if (!isCardHovered) {
      // Slower animation when not hovered
      setGestureState('STANDBY_IDLE');
    } else {
      setGestureState(Math.random() > 0.5 ? 'CURSOR_MOVE' : 'INDEX_PINCH_CLICK');
    }
  }, [isCardHovered]);

  // Periodic variation for realism
  useEffect(() => {
    const interval = setInterval(() => {
      if (isCardHovered) {
        setGestureState(prev => {
          const states = ['CURSOR_MOVE', 'INDEX_PINCH_CLICK', 'SCROLL_ACTIVE', 'DRAG_LOCKED'];
          const currentIndex = states.indexOf(prev);
          const nextIndex = (currentIndex + 1) % states.length;
          return states[nextIndex];
        });
        setConfidence(Number((97.5 + Math.random() * 2.2).toFixed(1)));
      } else {
        setGestureState('STANDBY_IDLE');
      }
    }, 3000);
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

    // Track smooth mouse position
    let currentX = 0.5;
    let currentY = 0.5;

    // Define skeletal joints in 3D relative coordinates (x: -1 to 1, y: -1 to 1, z: -1 to 1)
    // 21 hand landmarks: Wrist (0), Thumb (1-4), Index (5-8), Middle (9-12), Ring (13-16), Pinky (17-20)
    interface Joint {
      x: number;
      y: number;
      z: number;
    }

    const getHandJoints = (mX: number, mY: number, time: number, state: string): Joint[] => {
      // Center position shifted based on mouse
      const cx = (mX - 0.5) * 0.8;
      const cy = (mY - 0.5) * 0.6 + 0.1;
      const cz = 0;

      // Base hand skeleton model (neutral pose)
      const joints: Joint[] = [
        { x: 0, y: 0.6, z: 0 }, // 0: Wrist

        // Thumb
        { x: -0.22, y: 0.45, z: -0.05 }, // 1
        { x: -0.38, y: 0.30, z: -0.10 }, // 2
        { x: -0.45, y: 0.18, z: -0.15 }, // 3
        { x: -0.50, y: 0.08, z: -0.20 }, // 4: Thumb Tip

        // Index Finger
        { x: -0.15, y: 0.15, z: -0.05 }, // 5
        { x: -0.18, y: -0.10, z: -0.10 }, // 6
        { x: -0.20, y: -0.30, z: -0.15 }, // 7
        { x: -0.22, y: -0.48, z: -0.20 }, // 8: Index Tip

        // Middle Finger
        { x: 0.0, y: 0.10, z: 0.0 }, // 9
        { x: 0.0, y: -0.18, z: -0.05 }, // 10
        { x: 0.0, y: -0.40, z: -0.10 }, // 11
        { x: 0.0, y: -0.60, z: -0.15 }, // 12: Middle Tip

        // Ring Finger
        { x: 0.15, y: 0.15, z: -0.05 }, // 13
        { x: 0.18, y: -0.12, z: -0.08 }, // 14
        { x: 0.20, y: -0.32, z: -0.12 }, // 15
        { x: 0.22, y: -0.50, z: -0.16 }, // 16: Ring Tip

        // Pinky
        { x: 0.28, y: 0.25, z: -0.08 }, // 17
        { x: 0.35, y: 0.05, z: -0.12 }, // 18
        { x: 0.38, y: -0.12, z: -0.16 }, // 19
        { x: 0.40, y: -0.28, z: -0.20 }  // 20: Pinky Tip
      ];

      // Dynamically animate joints based on state and time
      const indexPinchFactor = state === 'INDEX_PINCH_CLICK' || state === 'DRAG_LOCKED'
        ? Math.sin(time * 6) * 0.5 + 0.5 // Pulsating click animation
        : 0;

      const scrollFactor = state === 'SCROLL_ACTIVE' ? Math.sin(time * 10) * 0.15 : 0;
      const idleWave = Math.sin(time * 1.5) * 0.05;

      // Apply modifications to pose
      // 1. Wrist breathing
      joints[0].y += Math.sin(time) * 0.02;

      // 2. Thumb bends inwards to touch index when pinching
      joints[4].x += indexPinchFactor * 0.22;
      joints[4].y += indexPinchFactor * 0.15;
      joints[4].z += indexPinchFactor * 0.1;

      // 3. Index finger bends to touch thumb when pinching
      joints[8].x -= indexPinchFactor * 0.15;
      joints[8].y += indexPinchFactor * 0.40; // Curl down
      joints[8].z += indexPinchFactor * 0.20;

      // 4. Middle, Ring, Pinky curl down heavily if click/drag is active
      if (state === 'INDEX_PINCH_CLICK' || state === 'DRAG_LOCKED') {
        const curl = 0.35;
        for (let i of [11, 12, 15, 16, 19, 20]) {
          joints[i].y += curl;
          joints[i].z += curl * 0.5;
        }
      }

      // 5. Scroll active motion (fingers flexing up/down)
      if (state === 'SCROLL_ACTIVE') {
        joints[8].y += scrollFactor;
        joints[12].y += scrollFactor * 0.8;
      }

      // 6. Idle sway
      for (let i = 1; i < joints.length; i++) {
        joints[i].x += idleWave;
        joints[i].y += Math.sin(time * 2 + i * 0.3) * 0.015;
      }

      // Translate hand to screen center and add coordinate shift
      return joints.map(j => ({
        x: j.x + cx,
        y: j.y + cy,
        z: j.z + cz
      }));
    };

    // Projection & rotation math
    const project = (j: Joint, rx: number, ry: number, w: number, h: number) => {
      // Rotate around Y axis
      let x1 = j.x * Math.cos(ry) - j.z * Math.sin(ry);
      let z1 = j.x * Math.sin(ry) + j.z * Math.cos(ry);

      // Rotate around X axis
      let y2 = j.y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = j.y * Math.sin(rx) + z1 * Math.cos(rx);

      // Camera focal length/perspective factor
      const fov = 1.8;
      const dist = 2.0;
      const scaleFactor = fov / (fov + z2 + dist);

      // Scale to viewport bounds
      const screenX = w / 2 + x1 * scaleFactor * w * 0.45;
      const screenY = h / 2 + y2 * scaleFactor * h * 0.5;

      return { x: screenX, y: screenY, size: scaleFactor * 6 };
    };

    // Connections between joint indices (skeletal bones)
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
      [0, 5], [5, 6], [6, 7], [7, 8], // Index
      [5, 9], [9, 10], [10, 11], [11, 12], // Middle
      [9, 13], [13, 14], [14, 15], [15, 16], // Ring
      [13, 17], [17, 18], [18, 19], [19, 20], // Pinky
      [0, 17] // Palm bottom
    ];

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += isCardHovered ? 0.03 : 0.012;

      // Smooth mouse tracking interpolation
      currentX += (localMouse.targetX - currentX) * 0.1;
      currentY += (localMouse.targetY - currentY) * 0.1;

      // Calculate dynamic grid rotation angles based on mouse offset
      const rx = (currentY - 0.5) * 0.5; // Rotate X
      const ry = (currentX - 0.5) * 0.6; // Rotate Y

      // 1. Draw elegant, glowing 3D perspective bounding box
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.07)';
      ctx.lineWidth = 1;
      
      // Horizontal grid planes (top & bottom boundaries)
      for (let zVal = -0.5; zVal <= 0.5; zVal += 0.5) {
        ctx.beginPath();
        for (let xVal = -0.7; xVal <= 0.7; xVal += 0.35) {
          const ptStart = project({ x: xVal, y: -0.6, z: zVal }, rx, ry, width, height);
          const ptEnd = project({ x: xVal, y: 0.6, z: zVal }, rx, ry, width, height);
          ctx.moveTo(ptStart.x, ptStart.y);
          ctx.lineTo(ptEnd.x, ptEnd.y);
        }
        for (let yVal = -0.6; yVal <= 0.6; yVal += 0.3) {
          const ptStart = project({ x: -0.7, y: yVal, z: zVal }, rx, ry, width, height);
          const ptEnd = project({ x: 0.7, y: yVal, z: zVal }, rx, ry, width, height);
          ctx.moveTo(ptStart.x, ptStart.y);
          ctx.lineTo(ptEnd.x, ptEnd.y);
        }
        ctx.stroke();
      }

      // Connecting depth lines for the grid
      ctx.beginPath();
      for (let xVal of [-0.7, 0.7]) {
        for (let yVal of [-0.6, 0.6]) {
          const ptStart = project({ x: xVal, y: yVal, z: -0.5 }, rx, ry, width, height);
          const ptEnd = project({ x: xVal, y: yVal, z: 0.5 }, rx, ry, width, height);
          ctx.moveTo(ptStart.x, ptStart.y);
          ctx.lineTo(ptEnd.x, ptEnd.y);
        }
      }
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.stroke();

      // 2. Draw glowing target scanner tracking mouse
      const trackingX = currentX * width;
      const trackingY = currentY * height;
      
      ctx.beginPath();
      ctx.arc(trackingX, trackingY, isCardHovered ? 12 : 6, 0, Math.PI * 2);
      ctx.strokeStyle = isCardHovered ? 'rgba(6, 182, 212, 0.5)' : 'rgba(6, 182, 212, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(trackingX, trackingY, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#22d3ee';
      ctx.fill();

      // 3. Get joint models in 3D
      const rawJoints = getHandJoints(currentX, currentY, time, gestureState);
      const projectedJoints = rawJoints.map(j => project(j, rx, ry, width, height));

      // 4. Draw bone connections (Skeleton structure)
      connections.forEach(([i, j]) => {
        const pt1 = projectedJoints[i];
        const pt2 = projectedJoints[j];

        // Draw shadow line
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.lineWidth = 5;
        ctx.stroke();

        // Neon core connection line
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        
        // Highlight active fingertips or click bonds
        const isClickBond = (i === 4 || j === 4 || i === 8 || j === 8) && (gestureState === 'INDEX_PINCH_CLICK' || gestureState === 'DRAG_LOCKED');
        ctx.strokeStyle = isClickBond 
          ? 'rgba(34, 211, 238, 0.95)' 
          : 'rgba(59, 130, 246, 0.55)';
        ctx.lineWidth = isClickBond ? 2.5 : 1.8;
        ctx.stroke();
      });

      // 5. Draw joints (Nodes)
      projectedJoints.forEach((pt, idx) => {
        // Larger nodes for critical tracking keys: Wrist (0), Thumb Tip (4), Index Tip (8)
        const isControlNode = idx === 0 || idx === 4 || idx === 8 || idx === 12;
        const nodeSize = isControlNode ? pt.size * 1.5 : pt.size;

        // Black outer casing for high-contrast
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, nodeSize + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#030712';
        ctx.fill();

        // Neon glow circle
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, nodeSize, 0, Math.PI * 2);
        
        if (idx === 8 && (gestureState === 'INDEX_PINCH_CLICK' || gestureState === 'DRAG_LOCKED')) {
          ctx.fillStyle = '#22d3ee'; // Cyan bright pinch
        } else if (idx === 4 && (gestureState === 'INDEX_PINCH_CLICK' || gestureState === 'DRAG_LOCKED')) {
          ctx.fillStyle = '#22d3ee';
        } else {
          ctx.fillStyle = isControlNode ? '#22d3ee' : '#3b82f6';
        }
        ctx.fill();

        // White hot center for key landmarks
        if (isControlNode) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, nodeSize * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      });

      // 6. Draw glowing beam connectors mapping Tip to target
      if (isCardHovered) {
        const indexTip = projectedJoints[8];
        ctx.beginPath();
        ctx.setLineDash([3, 4]);
        ctx.moveTo(indexTip.x, indexTip.y);
        ctx.lineTo(trackingX, trackingY);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.45)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 7. Tech HUD HUD Text overlay inside canvas
      ctx.font = '7px var(--font-mono)';
      ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
      ctx.fillText(`X_RES: 1920 | Y_RES: 1080`, 12, height - 16);
      ctx.fillText(`COORD_VEC: [${currentX.toFixed(3)}, ${currentY.toFixed(3)}, ${Math.sin(time).toFixed(2)}]`, 12, height - 8);

      ctx.fillText(`SYS_LATENCY: 1.8ms`, width - 90, height - 16);
      ctx.fillText(`STABLE_FPS: 60`, width - 90, height - 8);

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
  }, [localMouse, gestureState, isCardHovered]);

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
          MODE: <span className="text-cyan-400 font-bold">{gestureState}</span>
        </div>
        <div className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-[8px] font-mono font-medium tracking-widest text-slate-400">
          CONF: <span className="text-cyan-400 font-bold">{confidence}%</span>
        </div>
      </div>

      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[8px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
          MEDIAPIPE_ACTIVE
        </span>
      </div>

      <canvas ref={canvasRef} className="w-full h-full block relative z-10" />

      {/* Futuristic decorative circular graphic in background */}
      <div className="absolute w-44 h-44 rounded-full border border-cyan-500/5 inset-0 m-auto flex items-center justify-center animate-[spin_40s_linear_infinite] pointer-events-none z-0">
        <div className="w-40 h-40 rounded-full border border-dashed border-cyan-500/5" />
        <div className="w-36 h-36 rounded-full border border-cyan-500/3" />
      </div>
    </div>
  );
}
