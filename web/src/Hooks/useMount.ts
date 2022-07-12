import { useEffect } from 'react';

export const useMount: typeof useEffect = (fn) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(fn, []);
};
