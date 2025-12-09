import type { ChangeEvent } from 'react';
import { useSimulationStore } from '../state/useSimulationStore';

const LABEL_STYLE =
  'text-xs font-semibold uppercase tracking-wider text-slate-400';
const INPUT_STYLE =
  'w-full rounded-xl border border-slate-700/60 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/30';
const BUTTON_BASE =
  'rounded-full px-4 py-2 text-sm font-semibold transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900';

const ControlPanel = () => {
  const angle = useSimulationStore((state) => state.angle);
  const speed = useSimulationStore((state) => state.speed);
  const gravity = useSimulationStore((state) => state.gravity);
  const setAngle = useSimulationStore((state) => state.setAngle);
  const setSpeed = useSimulationStore((state) => state.setSpeed);
  const setGravity = useSimulationStore((state) => state.setGravity);
  const launch = useSimulationStore((state) => state.launch);
  const reset = useSimulationStore((state) => state.reset);

  const handleNumberChange =
    (cb: (value: number) => void) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (!Number.isNaN(value)) cb(value);
    };

  return (
    <section className="rounded-2xl border border-white/5 bg-slate-900/50 p-5 shadow-lg">
      <div className="mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
          Kontrol Simulasi
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Gunakan nilai realistis untuk sudut, kecepatan awal, dan gravitasi.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="angle" className={LABEL_STYLE}>
            Sudut awal (°)
          </label>
          <input
            id="angle"
            type="number"
            min={5}
            max={85}
            step={1}
            className={INPUT_STYLE}
            value={angle}
            onChange={handleNumberChange(setAngle)}
          />
        </div>

        <div>
          <label htmlFor="speed" className={LABEL_STYLE}>
            Kecepatan awal (m/s)
          </label>
          <input
            id="speed"
            type="number"
            min={5}
            max={90}
            step={1}
            className={INPUT_STYLE}
            value={speed}
            onChange={handleNumberChange(setSpeed)}
          />
        </div>

        <div>
          <label htmlFor="gravity" className={LABEL_STYLE}>
            Gravitasi (m/s²)
          </label>
          <input
            id="gravity"
            type="number"
            min={1}
            max={25}
            step={0.1}
            className={INPUT_STYLE}
            value={gravity}
            onChange={handleNumberChange(setGravity)}
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          className={`${BUTTON_BASE} bg-gradient-to-r from-emerald-400 to-lime-400 text-emerald-950`}
          onClick={launch}
        >
          Luncurkan
        </button>
        <button
          type="button"
          className={`${BUTTON_BASE} border border-slate-700/80 bg-slate-900 text-slate-100`}
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Asumsi: proyektil berawal di tanah (y = 0). Hambatan udara diabaikan,
        jadi lintasan mengikuti GLBB murni.
      </p>
    </section>
  );
};

export default ControlPanel;

