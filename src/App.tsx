import CanvasScene from './components/CanvasScene';
import ControlPanel from './components/ControlPanel';
import InfoPanel from './components/InfoPanel';
import TargetPanel from './components/TargetPanel';
import TipsFooter from './components/TipsFooter';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-space-800 via-space-900 to-black">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400/80">
            simulasi Fisika GLBB
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-100 sm:text-4xl">
            Trajectory Challenge
          </h1>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Atur sudut, kecepatan, dan gravitasi gerak parabola.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
          <div className="space-y-4">
            <ControlPanel />
            <InfoPanel />
            <TargetPanel />
          </div>
          <CanvasScene />
        </div>

        <TipsFooter />
      </div>
    </div>
  );
}

export default App;
