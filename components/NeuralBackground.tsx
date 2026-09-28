"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

interface Glow {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
}

/** Lightweight neural canvas — kept cheap so scroll feels smooth on every device. */
export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const isMobile =
      window.innerWidth <= 768 ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    if (!isMobile) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
    }

    const area = window.innerWidth * window.innerHeight;
    const nodeCount = Math.min(
      isMobile ? 18 : 36,
      Math.floor(area / (isMobile ? 42000 : 28000))
    );
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.2 + 0.4,
        baseRadius: Math.random() * 1.2 + 0.4,
      });
    }

    const glows: Glow[] = isMobile
      ? [
          {
            x: window.innerWidth * 0.3,
            y: window.innerHeight * 0.28,
            vx: 0.08,
            vy: 0.05,
            color: "rgba(235,87,87,0.06)",
            radius: 180,
          },
          {
            x: window.innerWidth * 0.72,
            y: window.innerHeight * 0.62,
            vx: -0.06,
            vy: 0.07,
            color: "rgba(47,128,236,0.06)",
            radius: 200,
          },
        ]
      : [
          {
            x: window.innerWidth * 0.25,
            y: window.innerHeight * 0.25,
            vx: 0.1,
            vy: 0.07,
            color: "rgba(235,87,87,0.07)",
            radius: 240,
          },
          {
            x: window.innerWidth * 0.75,
            y: window.innerHeight * 0.3,
            vx: -0.08,
            vy: 0.1,
            color: "rgba(47,128,236,0.07)",
            radius: 260,
          },
          {
            x: window.innerWidth * 0.5,
            y: window.innerHeight * 0.72,
            vx: 0.06,
            vy: -0.08,
            color: "rgba(33,150,82,0.06)",
            radius: 280,
          },
        ];

    let scrolling = false;
    let scrollIdleTimer = 0;
    const onScroll = () => {
      scrolling = true;
      window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => {
        scrolling = false;
      }, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const lenis = (window as any).lenis;
    if (lenis?.on) lenis.on("scroll", onScroll);

    let hidden = document.hidden;
    const onVisibility = () => {
      hidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    let frame = 0;
    let raf = 0;
    const connectDist = isMobile ? 90 : 110;
    const connectDistSq = connectDist * connectDist;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (hidden) return;

      frame++;
      if (scrolling && frame % 2 === 1) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      if (!scrolling || frame % 4 === 0) {
        for (const glow of glows) {
          glow.x += glow.vx;
          glow.y += glow.vy;
          if (glow.x - glow.radius < 0 || glow.x + glow.radius > w) glow.vx *= -1;
          if (glow.y - glow.radius < 0 || glow.y + glow.radius > h) glow.vy *= -1;

          const g = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, glow.radius);
          g.addColorStop(0, glow.color);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(glow.x, glow.y, glow.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0) node.x = w;
        if (node.x > w) node.x = 0;
        if (node.y < 0) node.y = h;
        if (node.y > h) node.y = 0;

        if (!isMobile && !scrolling) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 0.1) {
            const force = (160 - dist) / 160;
            node.x += (dx / dist) * force * 0.35;
            node.y += (dy / dist) * force * 0.35;
            node.radius = node.baseRadius * (1 + force);
          } else {
            node.radius = node.baseRadius;
          }
        } else {
          node.radius = node.baseRadius;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.14)";
        ctx.fill();

        const linkBudget = scrolling ? 4 : isMobile ? 6 : 10;
        let links = 0;
        for (let j = i + 1; j < nodes.length && links < linkBudget; j++) {
          const other = nodes[j];
          const ndx = node.x - other.x;
          const ndy = node.y - other.y;
          const ndistSq = ndx * ndx + ndy * ndy;
          if (ndistSq < connectDistSq) {
            const ndist = Math.sqrt(ndistSq);
            const alpha = ((connectDist - ndist) / connectDist) * 0.07;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            links++;
          }
        }
      }
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(scrollIdleTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (!isMobile) {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseleave", onLeave);
      }
      document.removeEventListener("visibilitychange", onVisibility);
      if (lenis?.off) lenis.off("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden
    />
  );
}
