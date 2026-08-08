"use client";

import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

interface MarketPoint {
  x: number;
  y: number;
}

export default function MarketVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.3 + 0.05,
      size: Math.random() * 1.5 + 0.5,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      initParticles(canvas.offsetWidth, canvas.offsetHeight);
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // Generate smooth market data using noise-like function
    const generateVolatileLine = (t: number, w: number, h: number): MarketPoint[] => {
      const points: MarketPoint[] = [];
      const segments = 120;
      const centerY = h * 0.5;
      const amplitude = h * 0.18;

      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * w;
        const phase = (i / segments) * Math.PI * 6;
        // Complex volatility: multiple frequency overlaid
        const noise =
          Math.sin(phase + t * 0.4) * 0.4 +
          Math.sin(phase * 2.3 + t * 0.6) * 0.25 +
          Math.sin(phase * 0.7 + t * 0.3) * 0.35 +
          Math.sin(phase * 4.1 + t * 0.8) * 0.1;
        const trend = (i / segments) * amplitude * 0.3; // slight upward drift
        points.push({ x, y: centerY - noise * amplitude - trend });
      }
      return points;
    };

    const generateHedgedLine = (volatilePoints: MarketPoint[], w: number, h: number, t: number): MarketPoint[] => {
      return volatilePoints.map((pt, i) => {
        const progress = i / volatilePoints.length;
        // Hedged line converges toward a smoother path over time and distance
        const smoothing = Math.min(progress * 2, 1); // 0 → 1 as we go right
        const centerY = h * 0.5;
        const trend = (i / volatilePoints.length) * h * 0.18 * 0.6; // stronger upward trend
        const targetY = centerY - trend - h * 0.04;
        const mouseDrift =
          (mouseRef.current.x / w - 0.5) * h * 0.04 * progress;
        return {
          x: pt.x,
          y: pt.y * (1 - smoothing) + (targetY + mouseDrift) * smoothing + Math.sin(t * 0.5 + i * 0.1) * 4 * (1 - smoothing * 0.8),
        };
      });
    };

    const drawGrid = (W: number, H: number) => {
      ctx.strokeStyle = "rgba(20, 20, 25, 0.05)";
      ctx.lineWidth = 0.5;

      const cellW = W / 10;
      const cellH = H / 6;

      for (let x = 0; x <= W; x += cellW) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y <= H; y += cellH) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
    };

    const drawLine = (points: MarketPoint[], color: string, width: number, glowColor: string) => {
      if (points.length < 2) return;

      // Glow pass
      ctx.save();
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 12;
      ctx.strokeStyle = color;
      ctx.lineWidth = width * 0.5;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 2; i++) {
        const cpx = (points[i].x + points[i + 1].x) / 2;
        const cpy = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cpx, cpy);
      }
      ctx.stroke();
      ctx.restore();

      // Main line
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 2; i++) {
        const cpx = (points[i].x + points[i + 1].x) / 2;
        const cpy = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cpx, cpy);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const drawParticles = (W: number, H: number) => {
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(166, 121, 15, ${p.alpha * 0.7})`;
        ctx.fill();
      });
    };

    const drawLabels = (W: number, H: number) => {
      ctx.font = "400 10px 'Inter', monospace";
      ctx.letterSpacing = "1px";

      // Top right percentage labels (subtle)
      const labels = ["+5%", "+10%", "+15%", "+20%"];
      labels.forEach((label, i) => {
        const y = H * 0.25 - i * H * 0.08;
        ctx.fillStyle = "rgba(118, 123, 136, 0.6)";
        ctx.textAlign = "right";
        ctx.fillText(label, W - 12, y);

        // Dashed line
        ctx.strokeStyle = "rgba(20, 20, 25, 0.1)";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W - 60, y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Legend
      ctx.textAlign = "left";
      ctx.font = "400 9px 'Inter', monospace";
      ctx.letterSpacing = "2px";

      ctx.fillStyle = "rgba(100, 116, 139, 0.6)";
      ctx.fillText("MARKET", 16, H - 32);

      ctx.fillStyle = "rgba(166, 121, 15, 0.9)";
      ctx.fillText("HEDGED", 16, H - 16);
    };

    const render = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      timeRef.current += 0.008;
      const t = timeRef.current;

      ctx.clearRect(0, 0, W, H);

      // Background grid
      drawGrid(W, H);

      // Generate lines
      const volatilePts = generateVolatileLine(t, W, H);
      const hedgedPts = generateHedgedLine(volatilePts, W, H, t);

      // Volatile market line (muted gray-blue)
      drawLine(volatilePts, "rgba(100, 116, 139, 0.5)", 1, "rgba(100,116,139,0.3)");

      // Hedged line (gold)
      drawLine(hedgedPts, "rgba(166, 121, 15, 0.85)", 1.5, "rgba(166, 121, 15, 0.3)");

      // Particles
      drawParticles(W, H);

      // Labels
      drawLabels(W, H);

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-70"
      aria-hidden="true"
    />
  );
}
