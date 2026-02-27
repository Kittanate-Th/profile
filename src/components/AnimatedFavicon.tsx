"use client";

import { useEffect } from "react";

export default function AnimatedFavicon() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d")!;

    // หา <link rel="icon"> ที่มีอยู่แล้ว หรือสร้างใหม่
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    let visible = true;

    function drawFrame() {
      // Background
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, 32, 32);

      // Border 8-bit style — วาด pixel border
      ctx.fillStyle = "#6366f1";
      ctx.fillRect(0, 0, 32, 2);   // top
      ctx.fillRect(0, 30, 32, 2);  // bottom
      ctx.fillRect(0, 0, 2, 32);   // left
      ctx.fillRect(30, 0, 2, 32);  // right

      if (visible) {
        // ตัวอักษร KT — pixel font style
        ctx.fillStyle = "#22d3ee";
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("KT", 16, 17);
      } else {
        // Blink state — แสดงแค่ cursor block
        ctx.fillStyle = "#6366f1";
        ctx.fillRect(8, 22, 16, 3);
      }

      link!.href = canvas.toDataURL("image/png");
    }

    // เริ่ม animation loop — blink ทุก 530ms แบบ 8-bit cursor
    drawFrame();
    const interval = setInterval(() => {
      visible = !visible;
      drawFrame();
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return null;
}