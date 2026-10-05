import type { ReactNode } from 'react';

/** Faixa fixa na base da tela, logo acima do rodapé (telas sem barra de navegação), para o botão principal. */
export function BarraAcao({ children }: { children: ReactNode }) {
  return (
    <div
      style={{ bottom: 'calc(var(--altura-rodape) + var(--area-segura))' }}
      className="fixed inset-x-0 z-20 mx-auto max-w-coluna border-t border-borda bg-areia px-4 py-3"
    >
      {children}
    </div>
  );
}
