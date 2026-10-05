'use client';

import { Bell, CircleUserRound, Compass, House, Plus, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { NOTIFICACOES_NAO_LIDAS } from '@/data/exemplo';

/** A barra aparece em todas as telas menos Boas-vindas (T1) e Contribuir (T4). */
export function temBarraNavegacao(caminho: string | null): boolean {
  return !!caminho && caminho !== '/' && !caminho.startsWith('/contribuir');
}

type Item =
  | { tipo: 'link'; rotulo: string; Icone: LucideIcon; href: string; ativo: (c: string) => boolean; contador?: number }
  | { tipo: 'em-breve'; rotulo: string; Icone: LucideIcon };

const itensEsquerda: Item[] = [
  {
    tipo: 'link',
    rotulo: 'Início',
    Icone: House,
    href: '/comunidade',
    ativo: (c) => c.startsWith('/comunidade') || c.startsWith('/roteiro'),
  },
  { tipo: 'em-breve', rotulo: 'Explorar', Icone: Compass },
];

const itensDireita: Item[] = [
  {
    tipo: 'link',
    rotulo: 'Notificações',
    Icone: Bell,
    href: '/notificacoes',
    ativo: (c) => c.startsWith('/notificacoes'),
    contador: NOTIFICACOES_NAO_LIDAS,
  },
  { tipo: 'em-breve', rotulo: 'Perfil', Icone: CircleUserRound },
];

const alvo = 'relative flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 px-1 h-16';

function ItemBarra({ item, caminho }: { item: Item; caminho: string }) {
  const mostrarToast = useToast();
  const { Icone, rotulo } = item;

  if (item.tipo === 'em-breve') {
    return (
      <button
        type="button"
        aria-disabled="true"
        aria-label={`${rotulo}, em breve`}
        onClick={() => mostrarToast('Em breve')}
        className={`${alvo} text-tinta-2 opacity-60`}
      >
        <Icone size={24} strokeWidth={1.75} aria-hidden />
        <span className="flex items-center gap-1 text-[12px] leading-4" aria-hidden>
          {rotulo}
          <span className="h-1 w-1 rounded-full bg-tinta-2" />
        </span>
      </button>
    );
  }

  const ativo = item.ativo(caminho);
  const nomeAcessivel = item.contador ? `${rotulo}, ${item.contador} novas` : undefined;

  return (
    <Link
      href={item.href}
      aria-current={ativo ? 'page' : undefined}
      aria-label={nomeAcessivel}
      className={`${alvo} ${ativo ? 'font-semibold text-bordo' : 'text-tinta-2'}`}
    >
      {ativo && <span aria-hidden className="absolute left-1/2 top-0 h-[3px] w-8 -translate-x-1/2 rounded-b-full bg-rosa" />}
      <span className="relative">
        <Icone size={24} strokeWidth={1.75} aria-hidden />
        {item.contador ? (
          <span
            aria-hidden
            className="absolute -right-2.5 -top-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-rosa-acao px-1 text-selo text-branco"
          >
            {item.contador}
          </span>
        ) : null}
      </span>
      <span className="text-[12px] leading-4">{rotulo}</span>
    </Link>
  );
}

export function BarraNavegacao() {
  const caminho = usePathname();
  if (!temBarraNavegacao(caminho)) return null;

  // Dentro de um roteiro, o "+" já abre a contribuição ligada a ele.
  const roteiroAtual = caminho.match(/^\/roteiro\/([^/]+)/)?.[1];
  const hrefContribuir = roteiroAtual ? `/contribuir?roteiro=${roteiroAtual}` : '/contribuir';

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-coluna border-t border-borda bg-branco pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid h-16 grid-cols-5 items-center">
        {itensEsquerda.map((item) => (
          <li key={item.rotulo} className="flex justify-center">
            <ItemBarra item={item} caminho={caminho} />
          </li>
        ))}
        <li className="flex justify-center">
          <Link
            href={hrefContribuir}
            aria-label="Contribuir"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-rosa-acao text-branco active:bg-rosa-acao-press"
          >
            <Plus size={24} strokeWidth={1.75} aria-hidden />
          </Link>
        </li>
        {itensDireita.map((item) => (
          <li key={item.rotulo} className="flex justify-center">
            <ItemBarra item={item} caminho={caminho} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
