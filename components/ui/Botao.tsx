'use client';

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variante = 'principal' | 'secundario' | 'texto';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold transition-colors motion-reduce:transition-none select-none';

const variantes: Record<Variante, string> = {
  // Um único botão principal por tela, largura total.
  principal:
    'h-12 w-full rounded-campo bg-rosa-acao text-branco hover:bg-rosa-acao-press active:bg-rosa-acao-press',
  secundario:
    'min-h-11 rounded-campo border-1.5 border-bordo bg-branco text-bordo hover:bg-dica-fundo active:bg-dica-fundo',
  texto:
    'min-h-11 min-w-11 rounded-campo text-bordo underline-offset-4 hover:underline focus-visible:underline',
};

// Tamanho separado da variante: classes de Tailwind conflitantes não se sobrescrevem pela ordem.
const tamanhos = {
  normal: { principal: 'px-4 text-corpo', secundario: 'px-4 text-corpo', texto: 'px-2 text-corpo' },
  compacto: { principal: 'px-4 text-corpo', secundario: 'px-3 text-aux', texto: 'px-2 text-aux' },
} as const;

const desabilitado = 'opacity-40 cursor-not-allowed pointer-events-none';

interface PropsComuns {
  variante?: Variante;
  tamanho?: 'normal' | 'compacto';
  desabilitado?: boolean;
  className?: string;
  children: ReactNode;
}

type PropsBotao = PropsComuns & Omit<ComponentProps<'button'>, 'className' | 'disabled'>;

export function Botao({ variante = 'principal', tamanho = 'normal', desabilitado: off, className = '', children, onClick, ...resto }: PropsBotao) {
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
      className={`${base} ${variantes[variante]} ${tamanhos[tamanho][variante]} ${off ? desabilitado : ''} ${className}`}
    >
      {children}
    </button>
  );
}

type PropsLink = PropsComuns & { href: string } & Omit<ComponentProps<typeof Link>, 'className' | 'href'>;

export function BotaoLink({ variante = 'principal', tamanho = 'normal', desabilitado: off, className = '', children, href, ...resto }: PropsLink) {
  return (
    <Link
      href={href}
      {...resto}
      aria-disabled={off || undefined}
      className={`${base} ${variantes[variante]} ${tamanhos[tamanho][variante]} ${off ? desabilitado : ''} ${className}`}
    >
      {children}
    </Link>
  );
}
