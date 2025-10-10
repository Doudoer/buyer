import { useState } from 'react';

// Hook para forzar un re-render en componentes funcionales
export function useForceRerender() {
  const [, setTick] = useState(0);
  return () => setTick(tick => tick + 1);
}
