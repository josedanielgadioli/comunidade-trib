import type { ReactNode } from 'react';

export function Cartao({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-cartao border border-borda bg-branco ${className}`}>{children}</div>;
}
