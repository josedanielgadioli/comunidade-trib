import { BadgeCheck, BookOpen, CircleHelp, CornerDownRight, Lightbulb, Tag, type LucideIcon } from 'lucide-react';
import type { TipoComentario, Tribo } from '@/lib/tipos';
import { IconeTribo } from '@/components/IconeTribo';

type Variante = 'curadoria' | 'exemplo' | 'pergunta' | 'dica' | 'relato' | 'resposta';

// Cada selo tem ícone + texto: a cor nunca é a única pista.
const estilos: Record<Variante, { classe: string; Icone: LucideIcon; texto: string }> = {
  curadoria: { classe: 'bg-curadoria-fundo text-curadoria-texto', Icone: BadgeCheck, texto: 'Curadoria Trib' },
  exemplo: { classe: 'bg-exemplo-fundo text-exemplo-texto', Icone: Tag, texto: 'Exemplo' },
  pergunta: { classe: 'bg-pergunta-fundo text-pergunta-texto', Icone: CircleHelp, texto: 'Pergunta' },
  dica: { classe: 'bg-dica-fundo text-dica-texto', Icone: Lightbulb, texto: 'Dica' },
  relato: { classe: 'bg-rosa-claro text-tinta', Icone: BookOpen, texto: 'Relato' },
  resposta: { classe: 'bg-dica-fundo text-dica-texto', Icone: CornerDownRight, texto: 'Resposta' },
};

const forma = 'inline-flex items-center gap-1 rounded-full px-2 py-1 text-selo';

// Sobre uma ilustração: fundo branco a 92%, mesma cor de texto e ícone.
const textoSobreImagem: Partial<Record<Variante, string>> = {
  curadoria: 'text-curadoria-texto',
  exemplo: 'text-exemplo-texto',
};

export function Selo({ variante, sobreImagem }: { variante: Variante; sobreImagem?: boolean }) {
  const { classe, Icone, texto } = estilos[variante];
  const cores = sobreImagem ? `bg-branco/[0.92] ${textoSobreImagem[variante] ?? 'text-tinta'}` : classe;
  return (
    <span className={`${forma} ${cores}`}>
      <Icone size={16} strokeWidth={1.75} aria-hidden />
      {texto}
    </span>
  );
}

export function SeloTipo({ tipo, resposta }: { tipo: TipoComentario; resposta?: boolean }) {
  return <Selo variante={resposta ? 'resposta' : tipo} />;
}

export function SeloTribo({ tribo, sobreImagem }: { tribo: Tribo; sobreImagem?: boolean }) {
  return (
    <span className={`${forma} text-tinta ${sobreImagem ? 'bg-branco/[0.92]' : 'border border-borda bg-branco'}`}>
      <IconeTribo tribo={tribo} size={16} />
      {tribo}
    </span>
  );
}
