import { useEffect, useRef, useState, MouseEvent, TouchEvent } from 'react';

interface AzureCognitiveVisualizerProps {
  isCardHovered: boolean;
}

export default function AzureCognitiveVisualizer({ isCardHovered }: AzureCognitiveVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [localMouse, setLocalMouse] = useState({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const [detectedText, setDetectedText] = useState("AZURE_VISION_SERVICES_READY");
  const [confidence, setConfidence] = useState(98.6);

  const texts = [
    "AZURE_VISION_SERVICES_READY",
    "OCR_TEXT_RECOGNITION_ACTIVE",
    "AUTOMATED_ML_MODEL_LOADED",
    "CLASSIFY_VISUAL_CONTENT",
    "EXTRACTING_TEXT_OCR_99.1%",
    "AZURE_COGNITIVE_PIPELINE_OK"
  ];

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
        setDetectedText(texts[Math.floor(Math.random() * texts.length)]);
        setConfidence(Number((97.5 + Math.random() * 2.3).toFixed(1)));
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

    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // Laser & Scanning lines variables
    let scanY = 0;
    let scanDir = 1;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; color: string }> = [];

    let currentX = localMouse.targetX;
    let currentY = localMouse.targetY;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for local mouse targeting
      currentX += (localMouse.targetX - currentX) * 0.15;
      currentY += (localMouse.targetY - currentY) * 0.15;

      const mx = currentX * width;
      const my = currentY * height;

      // Draw futuristic visual grid helper
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw scan target box
      const boxW = width * 0.6;
      const boxH = height * 0.5;
      const boxX = (width - boxW) / 2;
      const boxY = (height - boxH) / 2;

      ctx.strokeStyle = isCardHovered ? 'rgba(6, 182, 212, 0.4)' : 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Top Left Corner
      ctx.moveTo(boxX, boxY + 15);
      ctx.lineTo(boxX, boxY);
      ctx.lineTo(boxX + 15, boxY);
      // Top Right Corner
      ctx.moveTo(boxX + boxW - 15, boxY);
      ctx.lineTo(boxX + boxW, boxY);
      ctx.lineTo(boxX + boxW, boxY + 15);
      // Bottom Right Corner
      ctx.moveTo(boxX + boxW, boxY + boxH - 15);
      ctx.lineTo(boxX + boxW, boxY + boxH);
      ctx.lineTo(boxX + boxW - 15, boxY + boxH);
      // Bottom Left Corner
      ctx.moveTo(boxX + 15, boxY + boxH);
      ctx.lineTo(boxX, boxY + boxH);
      ctx.lineTo(boxX, boxY + boxH - 15);
      ctx.stroke();

      // Background inside target box
      ctx.fillStyle = isCardHovered ? 'rgba(6, 182, 212, 0.01)' : 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(boxX, boxY, boxW, boxH);

      // OCR Detected text boxes simulation
      const boxes = [
        { x: boxX + 20, y: boxY + 20, w: 100, h: 20, label: "TITLE", conf: "99%" },
        { x: boxX + 40, y: boxY + 50, w: 140, h: 22, label: "AUTO_ML", conf: "98%" },
        { x: boxX + boxW - 120, y: boxY + boxH - 35, w: 90, h: 18, label: "METRIC", conf: "97%" }
      ];

      boxes.forEach((b) => {
        // Draw OCR border
        ctx.strokeStyle = isCardHovered ? 'rgba(6, 182, 212, 0.2)' : 'rgba(148, 163, 184, 0.05)';
        ctx.fillStyle = isCardHovered ? 'rgba(6, 182, 212, 0.03)' : 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeRect(b.x, b.y, b.w, b.h);

        // Highlight with mouse closeness
        const dist = Math.hypot(mx - (b.x + b.w/2), my - (b.y + b.h/2));
        if (isCardHovered && dist < 80) {
          ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.strokeStyle = '#06b6d4';
          ctx.strokeRect(b.x, b.y, b.w, b.h);
        }
      });

      // Interactive laser reticle lines
      if (isCardHovered) {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        // Vertical pointer projection
        ctx.beginPath();
        ctx.moveTo(mx, 0);
        ctx.lineTo(mx, height);
        ctx.stroke();
        // Horizontal pointer projection
        ctx.beginPath();
        ctx.moveTo(0, my);
        ctx.lineTo(width, my);
        ctx.stroke();
        ctx.setLineDash([]);

        // Interactive pointer ring
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(mx, my, 12, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Scanner laser line moving up & down
      scanY += 1.2 * scanDir;
      if (scanY > boxH || scanY < 0) {
        scanDir *= -1;
      }

      const activeLaserY = boxY + scanY;
      ctx.strokeStyle = isCardHovered ? 'rgba(6, 182, 212, 0.8)' : 'rgba(148, 163, 184, 0.1)';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = isCardHovered ? 8 : 0;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(boxX, activeLaserY);
      ctx.lineTo(boxX + boxW, activeLaserY);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // Emit laser scan particles
      if (isCardHovered && Math.random() < 0.4) {
        particles.push({
          x: boxX + Math.random() * boxW,
          y: activeLaserY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 0.8,
          life: 1,
          color: 'rgba(6, 182, 212, 0.8)'
        });
      }

      // Draw and update particles
      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        if (p.life <= 0) return false;

        ctx.fillStyle = p.color.replace('0.8', `${p.life * 0.8}`);
        ctx.fillRect(p.x, p.y, 2, 2);
        return true;
      });

      // Visual Calibration text in top corner
      ctx.font = '9px monospace';
      ctx.fillStyle = isCardHovered ? 'rgba(6, 182, 212, 0.6)' : 'rgba(148, 163, 184, 0.3)';
      ctx.fillText(`AZ_SERVICES_HEALTH: OK`, boxX + 6, boxY - 8);
      ctx.fillText(`LASER_Y: ${Math.round(scanY)}px`, boxX + boxW - 85, boxY - 8);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
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
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      
      {/* Absolute overlay for live metric display */}
      <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center bg-slate-950/90 border border-slate-900/50 px-3 py-2 rounded-lg backdrop-blur-sm pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[9px] text-slate-400 font-medium tracking-wider">
            {detectedText}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono text-[9px] text-slate-500">CONFIDENCE:</span>
          <span className="font-mono text-[10px] text-cyan-400 font-bold">
            {confidence}%
          </span>
        </div>
      </div>
    </div>
  );
}
