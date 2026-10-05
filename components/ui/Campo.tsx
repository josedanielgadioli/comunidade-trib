'use client';

import { CircleAlert } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

const caixa =
  'w-full min-h-12 rounded-campo border bg-branco px-4 py-3 text-corpo text-tinta placeholder:text-tinta-2 ' +
  'focus:outline-none focus-visible:outline-none focus:border-bordo focus:shadow-[inset_0_0_0_1px_#AA0948]';

const caixaErro = 'border-rosa-acao-press shadow-[inset_0_0_0_1px_#AA0948]';

interface PropsMoldura {
  id: string;
  rotulo: string;
  erro?: string;
  ajuda?: string;
  children: ReactNode;
}

/** Rótulo sempre visível acima e mensagem de erro em texto, com ícone. */
export function MolduraCampo({ id, rotulo, erro, ajuda, children }: PropsMoldura) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-corpo font-semibold text-tinta">
        {rotulo}
      </label>
      {ajuda && (
        <p id={`${id}-ajuda`} className="text-aux text-tinta-2">
          {ajuda}
        </p>
      )}
      {children}
      {erro && (
        <p id={`${id}-erro`} className="flex items-start gap-1 text-aux font-medium text-bordo">
          <CircleAlert size={20} strokeWidth={1.75} aria-hidden className="shrink-0" />
          <span>{erro}</span>
        </p>
      )}
    </div>
  );
}

function descritoPor(id: string, erro?: string, ajuda?: string) {
  const ids = [ajuda ? `${id}-ajuda` : '', erro ? `${id}-erro` : ''].filter(Boolean).join(' ');
  return ids || undefined;
}

type PropsTexto = Omit<ComponentProps<'input'>, 'id'> & { id: string; rotulo: string; erro?: string; ajuda?: string };

export function CampoTexto({ id, rotulo, erro, ajuda, className = '', ...resto }: PropsTexto) {
  return (
    <MolduraCampo id={id} rotulo={rotulo} erro={erro} ajuda={ajuda}>
      <input
        id={id}
        {...resto}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descritoPor(id, erro, ajuda)}
        className={`${caixa} ${erro ? caixaErro : 'border-borda'} ${className}`}
      />
    </MolduraCampo>
  );
}

type PropsArea = Omit<ComponentProps<'textarea'>, 'id'> & { id: string; rotulo: string; erro?: string; ajuda?: string };

export function CampoAreaTexto({ id, rotulo, erro, ajuda, className = '', ...resto }: PropsArea) {
  return (
    <MolduraCampo id={id} rotulo={rotulo} erro={erro} ajuda={ajuda}>
      <textarea
        id={id}
        rows={4}
        {...resto}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descritoPor(id, erro, ajuda)}
        className={`${caixa} resize-y ${erro ? caixaErro : 'border-borda'} ${className}`}
      />
    </MolduraCampo>
  );
}

type PropsSelecao = Omit<ComponentProps<'select'>, 'id'> & { id: string; rotulo: string; erro?: string; ajuda?: string };

export function CampoSelecao({ id, rotulo, erro, ajuda, className = '', children, ...resto }: PropsSelecao) {
  return (
    <MolduraCampo id={id} rotulo={rotulo} erro={erro} ajuda={ajuda}>
      <select
        id={id}
        {...resto}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descritoPor(id, erro, ajuda)}
        className={`${caixa} appearance-auto ${erro ? caixaErro : 'border-borda'} ${className}`}
      >
        {children}
      </select>
    </MolduraCampo>
  );
}
