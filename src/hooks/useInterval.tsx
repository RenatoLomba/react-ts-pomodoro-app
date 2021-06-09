import React from 'react';

export function useInterval<T extends CallableFunction>(
  callback: T,
  delay: number | null,
): void {
  const savedCallback = React.useRef<T>();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick(): void {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
