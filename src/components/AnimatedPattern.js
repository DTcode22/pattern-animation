'use client';

import React, { useEffect, useRef } from 'react';
import { usePattern } from '../app/context/PatternContext';

const patterns = {
  vortex: (ctx, time, width, height) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'white';

    for (let y = 0; y <= 200; y += 2) {
      for (let x = 0; x <= 200; x += 2) {
        const k = x / 8 - 12;
        const e = y / 8 - 12;
        const mag = Math.sqrt(k * k + e * e);
        const o = 2 - mag / 3;
        const d = -5 * Math.abs(Math.sin(k / 2) * Math.cos(e * 0.8));

        const px =
          (x - d * k * 4 + d * k * Math.sin(d + time)) * 0.7 + k * o * 2 + 130;
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
  },

  mathPattern: (ctx, time, width, height) => {
    ctx.fillStyle = 'rgb(6, 6, 6)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';

    const mag = (k, e) => Math.sqrt(k * k + e * e);

    for (let i = 0; i < 20000; i++) {
      const x = i % 100;
      const y = i / 250;

      const k = x / 4 - 12.5;
      const e = y / 9 + 9;
      const o = mag(k, e) / 9;

      const c = (o * e) / 30 - time / 8;
      const q =
        x +
        99 +
        Math.tan(1 / k) +
        o *
          k *
          (Math.cos(e * 9) / 2 + Math.cos(y / 9) / 0.7) *
          Math.sin(o * 4 - time * 2);

      const px = q * 0.7 * Math.sin(c) + 200;
      const py = 200 + y * Math.cos(c * 4 - o) - (q / 2) * Math.cos(c);

      const scaledX = (px * width) / 400;
      const scaledY = (py * height) / 400;

      if (!isNaN(scaledX) && !isNaN(scaledY)) {
        ctx.fillRect(scaledX, scaledY, 1, 1);
      }
    }
  },

  auroraWaves: (ctx, time, width, height) => {
    // Clear background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // Scale factor to adjust for different canvas sizes
    const scale = Math.min(width, height) / 800;

    // Draw aurora waves
    for (let x = -120; x <= 120; x += 3) {
      for (let y = -120; y <= 120; y += 3) {
        const distanceFromCenter = Math.sqrt(x * x + y * y) / 120;
        const wavePhase = distanceFromCenter * 2 + time;

        // Create multiple overlapping wave patterns
        const wave1 = Math.sin(x / 20 + time * 1.5 + y / 30) * 100;
        const wave2 = Math.cos(y / 25 + time * 2 + x / 40) * 80;
        const wave3 = Math.sin((x + y) / 40 + time) * 60;
        const combinedWave = wave1 + wave2 + wave3;

        const px = centerX + x * 6 * scale + combinedWave * 0.5 * scale;
        const py = centerY + y * 6 * scale + combinedWave * 0.3 * scale;

        // Calculate opacity based on position and time
        const alpha = Math.floor(30 * (0.5 + 0.5 * Math.sin(wavePhase)));
        const clampedAlpha = Math.max(15, Math.min(30, alpha)) / 255;

        // Draw point with varying opacity
        ctx.fillStyle = `rgba(190, 190, 190, ${clampedAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.25 * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },

  matrix: (ctx, time, width, height) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#0F0';

    const fontSize = 14;
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < width / fontSize; i++) {
      const x = i * fontSize;
      const y = (time * 100 + i * fontSize) % height;
      const char = String.fromCharCode(33 + Math.floor(Math.random() * 93));
      ctx.fillText(char, x, y);
    }
  },
};

const AnimatedPattern = () => {
  const { selectedPattern } = usePattern();
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let time = 0;

    const animate = () => {
      time += 0.03;
      patterns[selectedPattern](ctx, time, canvas.width, canvas.height);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [selectedPattern]);

  return (
    <div className="w-full h-full min-h-[800px] bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default AnimatedPattern;
