import { useSimulationStore } from '../state/useSimulationStore';

const TargetPanel = () => {
  const target = useSimulationStore((state) => state.target);
  const level = useSimulationStore((state) => state.level);
  const success = useSimulationStore((state) => state.success);

  return (
    <section className="rounded-2xl border border-emerald-400/20 bg-slate-900/50 p-5 shadow-lg">
      <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
        Target & Level
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Level
          </p>
          <p className="text-2xl font-semibold text-white">{level}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Target Kena
          </p>
          <p className="text-2xl font-semibold text-white">{success}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-950/30 p-4 text-sm text-slate-200">
        <p>
          Target berada di{' '}
          <span className="font-semibold text-emerald-300">
            {target.x.toFixed(1)} m
          </span>{' '}
          dengan lebar{' '}
          <span className="font-semibold text-emerald-300">
            {target.width.toFixed(1)} m
          </span>{' '}
          dan tinggi{' '}
          <span className="font-semibold text-emerald-300">
            {target.height.toFixed(1)} m
          </span>
          .
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Sentuh blok hijau untuk naik level. Ukuran dan posisi berubah setiap
          kali berhasil.
        </p>
      </div>
    </section>
  );
};

export default TargetPanel;

