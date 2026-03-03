"use client";

import { useEffect, useRef } from "react";

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Handle Window Resize
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    // Handle Scroll for Parallax
    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);

    // Generate Nodes (Stars)
    const numNodes = 120; // Number of stars
    const nodes: any[] = [];
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5, // Size of the star
        vx: (Math.random() - 0.5) * 0.15, // Horizontal drift speed
        vy: (Math.random() - 0.5) * 0.15, // Vertical drift speed
        parallax: Math.random() * 0.6 + 0.1, // Parallax multiplier (Depth illusion)
      });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(96, 165, 250, 0.8)"; 

      for (let i = 0; i < numNodes; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;
        let renderY = (node.y - scrollY * node.parallax) % height;
        if (renderY < 0) renderY += height; 
        
        node.renderY = renderY;
      }

      for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].renderY - nodes[j].renderY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) { 
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].renderY);
            ctx.lineTo(nodes[j].x, nodes[j].renderY);
            const opacity = 0.25 * (1 - dist / 130);
            ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < numNodes; i++) {
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].renderY, nodes[i].r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // Fixed to background, behind everything (-z-10), ignores mouse clicks (pointer-events-none)
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-40 mix-blend-screen"
    />
  );
}