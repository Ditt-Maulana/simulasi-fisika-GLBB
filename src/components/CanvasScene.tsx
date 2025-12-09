import { useEffect, useMemo, useRef } from 'react';
import { deriveScale } from '../lib/physics';
import { useProjectileAnimation } from '../hooks/useProjectileAnimation';
import { useSimulationStore } from '../state/useSimulationStore';

const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 420;
const GROUND_OFFSET = 48;

const CanvasScene = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const projectile = useSimulationStore((state) => state.projectile);
  const trail = useSimulationStore((state) => state.trail);
  const prediction = useSimulationStore((state) => state.prediction);
  const target = useSimulationStore((state) => state.target);
  const theory = useSimulationStore((state) => state.theory);
  const launched = useSimulationStore((state) => state.launched);

  useProjectileAnimation();

  const scale = useMemo(
    () =>
      deriveScale(
        theory?.range ?? 55,
        theory?.hMax ?? 12,
        CANVAS_WIDTH,
        CANVAS_HEIGHT,
        GROUND_OFFSET,
      ),
    [theory],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      drawScene({
        ctx,
        projectile,
        trail,
        prediction,
        target,
        scale,
        launched,
      });
    } catch (error) {
      console.error('Error drawing scene:', error);
      // Draw minimal scene on error
      drawBackground(ctx);
      drawGround(ctx);
      drawTarget(ctx, target, scale);
    }
  }, [projectile, trail, prediction, target, scale, launched]);

  return (
    <section className="rounded-3xl border border-white/5 bg-slate-900/40 p-4 shadow-lg">
      <h2 className="px-2 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
        Area Simulasi
      </h2>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="mt-3 w-full rounded-2xl border border-white/5 bg-black/20"
      />
      <p className="px-2 pt-3 text-xs text-slate-400">
        • Garis biru = lintasan teori • Garis oranye = lintasan aktual • Blok
        hijau = target • Lingkaran oranye = proyektil
      </p>
    </section>
  );
};

type DrawArgs = {
  ctx: CanvasRenderingContext2D;
  projectile: { x: number; y: number };
  trail: { x: number; y: number }[];
  prediction: { x: number; y: number }[];
  target: { x: number; width: number; height: number };
  scale: number;
  launched: boolean;
};

const drawScene = ({
  ctx,
  projectile,
  trail,
  prediction,
  target,
  scale,
  launched,
}: DrawArgs) => {
  drawBackground(ctx);
  drawGround(ctx);
  drawPrediction(ctx, prediction, scale);
  drawTarget(ctx, target, scale);
  drawTrail(ctx, trail, scale);
  drawProjectile(ctx, projectile, scale);

  if (!launched && !trail.length) {
    drawIdleText(ctx);
  }
};

const drawBackground = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  gradient.addColorStop(0, '#0f172a');
  gradient.addColorStop(1, '#01050f');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

const groundY = () => CANVAS_HEIGHT - GROUND_OFFSET;

const worldToCanvas = (x: number, y: number, scale: number) => {
  const cx = 40 + x * scale;
  const cy = groundY() - y * scale;
  return { cx, cy };
};

const drawGround = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, groundY());
  ctx.lineTo(CANVAS_WIDTH, groundY());
  ctx.stroke();
};

const drawPrediction = (
  ctx: CanvasRenderingContext2D,
  prediction: { x: number; y: number }[],
  scale: number,
) => {
  if (!prediction.length) return;
  ctx.strokeStyle = 'rgba(59, 130, 246, 0.9)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  prediction.forEach((point, index) => {
    const { cx, cy } = worldToCanvas(point.x, point.y, scale);
    if (index === 0) ctx.moveTo(cx, cy);
    else ctx.lineTo(cx, cy);
  });
  ctx.stroke();
};

const drawTrail = (
  ctx: CanvasRenderingContext2D,
  trail: { x: number; y: number }[],
  scale: number,
) => {
  if (!trail.length) return;
  ctx.strokeStyle = '#fb923c';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  trail.forEach((point, index) => {
    const { cx, cy } = worldToCanvas(point.x, Math.max(point.y, 0), scale);
    if (index === 0) ctx.moveTo(cx, cy);
    else ctx.lineTo(cx, cy);
  });
  ctx.stroke();
};

const drawTarget = (
  ctx: CanvasRenderingContext2D,
  target: { x: number; width: number; height: number },
  scale: number,
) => {
  const base = worldToCanvas(target.x, 0, scale);
  const top = worldToCanvas(target.x, target.height, scale);
  const widthPx = target.width * scale;
  const heightPx = base.cy - top.cy;

  ctx.fillStyle = '#059669';
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.rect(base.cx, top.cy, widthPx, heightPx);
  ctx.fill();
  ctx.stroke();
};

const drawProjectile = (
  ctx: CanvasRenderingContext2D,
  projectile: { x: number; y: number },
  scale: number,
) => {
  const { cx, cy } = worldToCanvas(projectile.x, projectile.y, scale);
  ctx.fillStyle = '#f97316';
  ctx.strokeStyle = '#fdba74';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
};

const drawIdleText = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
  ctx.font = '500 16px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    'Tekan "Luncurkan" untuk memulai simulasi GLBB.',
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
  );
};

export default CanvasScene;

