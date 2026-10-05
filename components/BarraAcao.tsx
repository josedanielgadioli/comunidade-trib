'use client';

import { useEffect, useState, type ReactNode } from 'react';

/**
 * Faixa fixa na base da tela, logo acima do rodapé (telas sem barra de navegação), para o botão principal.
 * Quando o teclado do celular abre, a faixa sobe junto, para o campo e o botão continuarem visíveis.
 */
export function BarraAcao({ children }: { children: ReactNode }) {
  const teclado = useAlturaTeclado();
  return (
    <div
      style={{ bottom: `calc(var(--altura-rodape) + var(--area-segura) + ${teclado}px)` }}
      className="fixed inset-x-0 z-20 mx-auto max-w-coluna border-t border-borda bg-areia px-4 py-3"
    >
      {children}
    </div>
  );
}

/** Quanto o teclado virtual cobre da base da tela (0 quando fechado ou sem suporte). */
function useAlturaTeclado() {
  const [altura, setAltura] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const medir = () => {
      // Com zoom de pinça a área visível também encolhe; nesse caso não é teclado.
      if (vv.scale > 1.01) return setAltura(0);
      setAltura(Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)));
    };
    vv.addEventListener('resize', medir);
    vv.addEventListener('scroll', medir);
    return () => {
      vv.removeEventListener('resize', medir);
      vv.removeEventListener('scroll', medir);
    };
  }, []);

  return altura;
}
