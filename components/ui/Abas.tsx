'use client';

import { useRef, type KeyboardEvent } from 'react';

interface Opcao<T extends string> {
  valor: T;
  rotulo: string;
}

interface Props<T extends string> {
  id: string;
  rotulo: string;
  opcoes: Opcao<T>[];
  valor: T;
  aoMudar: (valor: T) => void;
}

/** Abas com setas do teclado. O painel deve usar id `${id}-painel`. */
export function Abas<T extends string>({ id, rotulo, opcoes, valor, aoMudar }: Props<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function teclado(e: KeyboardEvent, indice: number) {
    let proximo = -1;
    if (e.key === 'ArrowRight') proximo = (indice + 1) % opcoes.length;
    if (e.key === 'ArrowLeft') proximo = (indice - 1 + opcoes.length) % opcoes.length;
    if (e.key === 'Home') proximo = 0;
    if (e.key === 'End') proximo = opcoes.length - 1;
    if (proximo < 0) return;
    e.preventDefault();
    aoMudar(opcoes[proximo].valor);
    refs.current[proximo]?.focus();
  }

  return (
    <div role="tablist" aria-label={rotulo} className="flex gap-1 overflow-x-auto">
      {opcoes.map((o, i) => {
        const selecionada = o.valor === valor;
        return (
          <button
            key={o.valor}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${id}-aba-${o.valor}`}
            type="button"
            role="tab"
            aria-selected={selecionada}
            aria-controls={`${id}-painel`}
            tabIndex={selecionada ? 0 : -1}
            onClick={() => aoMudar(o.valor)}
            onKeyDown={(e) => teclado(e, i)}
            className="flex min-h-11 shrink-0 items-center rounded-full"
          >
            <span
              className={`inline-flex h-10 items-center whitespace-nowrap rounded-full px-4 text-aux text-tinta ${
                selecionada ? 'bg-rosa-claro font-semibold' : ''
              }`}
            >
              {o.rotulo}
            </span>
          </button>
        );
      })}
    </div>
  );
}
