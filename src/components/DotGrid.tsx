import { useRef, useEffect, useCallback, useMemo } from 'react';

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  vx: number;
  vy: number;
}

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
  springStiffness?: number;
  damping?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const DotGrid = ({
  dotSize = 4,
  gap = 18,
  baseColor,
  activeColor,
  proximity = 100,
  shockRadius = 200,
  shockStrength = 4,
  springStiffness = 0.03,
  damping = 0.85,
  className = '',
  style,
}: DotGridProps) => {
  // Derive colors from CSS vars if not provided
  const resolvedBase = baseColor || hslToHex(30, 15, 85);    // --border-ish muted
  const resolvedActive = activeColor || hslToHex(12, 76, 61); // --primary coral

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const animatingRef = useRef(false);

  const baseRgb = useMemo(() => hexToRgb(resolvedBase), [resolvedBase]);
  const activeRgb = useMemo(() => hexToRgb(resolvedActive), [resolvedActive]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cell = dotSize + gap;
    const cols = Math.floor((width + gap) / cell);
    const rows = Math.floor((height + gap) / cell);

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
          xOffset: 0,
          yOffset: 0,
          vx: 0,
          vy: 0,
        });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  // Animation loop
  useEffect(() => {
    let rafId: number;
    const proxSq = proximity * proximity;
    const halfDot = dotSize / 2;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.style.width ? parseFloat(canvas.style.width) : canvas.width;
      const h = canvas.style.height ? parseFloat(canvas.style.height) : canvas.height;
      ctx.clearRect(0, 0, w * (window.devicePixelRatio || 1), h * (window.devicePixelRatio || 1));

      const { x: px, y: py } = pointerRef.current;
      let anyMoving = false;

      for (const dot of dotsRef.current) {
        // Spring physics: pull back to origin
        const fx = -springStiffness * dot.xOffset;
        const fy = -springStiffness * dot.yOffset;
        dot.vx = (dot.vx + fx) * damping;
        dot.vy = (dot.vy + fy) * damping;
        dot.xOffset += dot.vx;
        dot.yOffset += dot.vy;

        // Check if still animating
        if (Math.abs(dot.vx) > 0.01 || Math.abs(dot.vy) > 0.01 ||
            Math.abs(dot.xOffset) > 0.1 || Math.abs(dot.yOffset) > 0.1) {
          anyMoving = true;
        } else {
          dot.xOffset = 0;
          dot.yOffset = 0;
          dot.vx = 0;
          dot.vy = 0;
        }

        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;

        // Color based on proximity to pointer
        const ddx = dot.cx - px;
        const ddy = dot.cy - py;
        const dsq = ddx * ddx + ddy * ddy;

        let r = baseRgb.r, g = baseRgb.g, b = baseRgb.b;
        if (dsq <= proxSq) {
          const t = 1 - Math.sqrt(dsq) / proximity;
          r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
        }

        ctx.beginPath();
        ctx.arc(ox, oy, halfDot, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
      }

      animatingRef.current = anyMoving;
      // Always keep drawing for proximity color effect
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, dotSize, baseRgb, activeRgb, springStiffness, damping]);

  // Resize
  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  // Mouse move
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    };

    const onClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius) {
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff * 0.15;
          const pushY = (dot.cy - cy) * shockStrength * falloff * 0.15;
          dot.vx += pushX;
          dot.vy += pushY;
        }
      }
    };

    // Mousemove with passive throttle
    let ticking = false;
    const throttledMove = (e: MouseEvent) => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          onMove(e);
          ticking = false;
        });
      }
    };

    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
    };
  }, [shockRadius, shockStrength]);

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={style}
    >
      <div ref={wrapperRef} className="w-full h-full relative">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
};

export default DotGrid;
