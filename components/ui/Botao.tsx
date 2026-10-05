'use client';

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variante = 'principal' | 'secundario' | 'texto';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold transition-colors motion-reduce:transition-none select-none';

const variantes: Record<Variante, string> = {
  // Um único botão principal por tela, largura total.
  principal:
    'h-12 w-full rounded-campo bg-rosa-acao px-4 text-corpo text-branco hover:bg-rosa-acao-press active:bg-rosa-acao-press',
  secundario:
    'min-h-11 rounded-campo border-1.5 border-bordo bg-branco px-4 text-corpo text-bordo hover:bg-dica-fundo active:bg-dica-fundo',
  texto:
    'min-h-11 min-w-11 rounded-campo px-2 text-corpo text-bordo underline-offset-4 hover:underline focus-visible:underline',
};

const desabilitado = 'opacity-40 cursor-not-allowed pointer-events-none';

interface PropsComuns {
  variante?: Variante;
  desabilitado?: boolean;
  className?: string;
  children: ReactNode;
}

type PropsBotao = PropsComuns & Omit<ComponentProps<'button'>, 'className' | 'disabled'>;

export function Botao({ variante = 'principal', desabilitado: off, className = '', children, onClick, ...resto }: PropsBotao) {
  return (
    <button
      type="button"
      {...resto}
      aria-disabled={off || undefined}
      onClick={(e) => {
        if (off) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      className={`${base} ${variantes[variante]} ${off ? desabilitado : ''} ${className}`}
    >
      {children}
    </button>
  );
}

type PropsLink = PropsComuns & { href: string } & Omit<ComponentProps<typeof Link>, 'className' | 'href'>;

export function BotaoLink({ variante = 'principal', desabilitado: off, className = '', children, href, ...resto }: PropsLink) {
  return (
    <Link
      href={href}
      {...resto}
      aria-disabled={off || undefined}
      className={`${base} ${variantes[variante]} ${off ? desabilitado : ''} ${className}`}
    >
      {children}
    </Link>
  );
}
