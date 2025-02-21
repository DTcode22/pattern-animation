'use client';

import React, { useEffect, useRef } from 'react';

const AnimatedPattern = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let time = 0;

    const animate = () => {
      time += 0.03;
      draw(ctx, time);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const draw = (ctx, time) => {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;

      // Clear canvas
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      // Set point style
      ctx.fillStyle = 'white';

      for (let y = 0; y <= 200; y += 2) {
        for (let x = 0; x <= 200; x += 2) {
          const k = x / 8 - 12;
          const e = y / 8 - 12;
          const mag = Math.sqrt(k * k + e * e);
          const o = 2 - mag / 3;
          const d = -5 * Math.abs(Math.sin(k / 2) * Math.cos(e * 0.8));

          const px =
            (x - d * k * 4 + d * k * Math.sin(d + time)) * 0.7 +
            k * o * 2 +
            130;
          const py =
            (y -
              (d * y) / 5 +
              d * e * Math.cos(d + time + o) * Math.sin(time + d)) *
              0.7 +
            e * o +
            70;

          ctx.fillRect((px * width) / 400, (py * height) / 250, 1, 1);
        }
      }
    };

    // Set canvas size
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[800px] bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default AnimatedPattern;
