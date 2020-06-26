import { createContext, useContext } from 'react';

export default function createCtx<A extends {} | null>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}
