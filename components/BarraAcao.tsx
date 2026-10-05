import type { ReactNode } from 'react';

/** Faixa fixa na base da tela, logo acima do rodapé, para o botão principal. */
export function BarraAcao({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-10 z-20 mx-auto max-w-coluna border-t border-borda bg-areia px-4 py-3">
      {children}
    </div>
  );
}
