import { useEffect, useRef } from 'react';
import { useSimulationStore } from '../state/useSimulationStore';

export const useProjectileAnimation = () => {
  const launched = useSimulationStore((state) => state.launched);
  const stepSimulationRef = useRef(useSimulationStore.getState().stepSimulation);
  const frameRef = useRef<number | null>(null);

  // Update ref when store changes
  useEffect(() => {
    stepSimulationRef.current = useSimulationStore.getState().stepSimulation;
  });

  useEffect(() => {
    if (!launched) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    let previousTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - previousTime) / 1000;
      previousTime = time;
      stepSimulationRef.current(delta);
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame((time) => {
      previousTime = time;
      loop(time);
    });

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [launched]);
};

