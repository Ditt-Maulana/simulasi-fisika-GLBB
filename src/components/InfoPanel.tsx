import { useSimulationStore } from '../state/useSimulationStore';
import { calculateSpeedMagnitude } from '../lib/physics';

const InfoPanel = () => {
  const theory = useSimulationStore((state) => state.theory);
  const resultText = useSimulationStore((state) => state.resultText);
  const velocity = useSimulationStore((state) => state.velocity);
  const launched = useSimulationStore((state) => state.launched);
  const time = useSimulationStore((state) => state.time);

  // Hitung kecepatan saat ini jika simulasi sedang berjalan
  const currentSpeed = launched && velocity ? calculateSpeedMagnitude(velocity) : null;

  return (
    <section className="rounded-2xl border border-white/5 bg-slate-900/50 p-5 shadow-lg">
      <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
        Hasil Teori
      </h2>
      <p className="mt-2 text-sm text-slate-200">{resultText}</p>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
          <dt className="text-xs uppercase tracking-widest text-slate-500">
            Waktu Terbang
          </dt>
          <dd className="text-lg font-semibold text-white">
            {theory ? `${theory.totalTime.toFixed(2)} s` : '—'}
          </dd>
        </div>

        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
          <dt className="text-xs uppercase tracking-widest text-slate-500">
            Jarak Maksimum
          </dt>
          <dd className="text-lg font-semibold text-white">
            {theory ? `${theory.range.toFixed(2)} m` : '—'}
          </dd>
        </div>

        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
          <dt className="text-xs uppercase tracking-widest text-slate-500">
            Tinggi Maksimum
          </dt>
          <dd className="text-lg font-semibold text-white">
            {theory ? `${theory.hMax.toFixed(2)} m` : '—'}
          </dd>
        </div>

        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
          <dt className="text-xs uppercase tracking-widest text-slate-500">
            Kecepatan Awal (v₀)
          </dt>
          <dd className="text-lg font-semibold text-white">
            {theory ? (
              <span>
                <span className="text-xs text-slate-400">vₓ:</span> {theory.vx.toFixed(1)}
                <span className="text-xs text-slate-400 ml-2">vᵧ:</span> {theory.vy.toFixed(1)} m/s
              </span>
            ) : '—'}
          </dd>
        </div>

        {launched && currentSpeed !== null && (
          <>
            <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
              <dt className="text-xs uppercase tracking-widest text-slate-500">
                Kecepatan Saat Ini
              </dt>
              <dd className="text-lg font-semibold text-white">
                <span>
                  <span className="text-xs text-slate-400">vₓ:</span> {velocity.x.toFixed(1)}
                  <span className="text-xs text-slate-400 ml-2">vᵧ:</span> {velocity.y.toFixed(1)} m/s
                </span>
              </dd>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
              <dt className="text-xs uppercase tracking-widest text-slate-500">
                Magnitudo Kecepatan
              </dt>
              <dd className="text-lg font-semibold text-white">
                |v⃗| = {currentSpeed.toFixed(2)} m/s
              </dd>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3">
              <dt className="text-xs uppercase tracking-widest text-slate-500">
                Waktu (t)
              </dt>
              <dd className="text-lg font-semibold text-white">
                {time.toFixed(2)} s
              </dd>
            </div>
          </>
        )}
      </dl>

      {theory && (
        <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-950/20 p-3 text-xs text-blue-300">
          <p className="font-semibold mb-1">Rumus yang Digunakan:</p>
          <ul className="space-y-1 text-blue-200/80">
            <li>• Parabola: R = (v₀² sin(2θ)) / g</li>
            <li>• Kinematika: x = v₀ₓt, y = v₀ᵧt - ½gt²</li>
            <li>• Hukum Newton: F = ma → a = g</li>
            <li>• Vektor: v⃗ = vₓî + vᵧĵ</li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default InfoPanel;

