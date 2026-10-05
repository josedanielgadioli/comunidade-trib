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

export function Selo({ variante }: { variante: Variante }) {
  const { classe, Icone, texto } = estilos[variante];
  return (
    <span className={`${forma} ${classe}`}>
      <Icone size={16} strokeWidth={1.75} aria-hidden />
      {texto}
    </span>
  );
}

export function SeloTipo({ tipo, resposta }: { tipo: TipoComentario; resposta?: boolean }) {
  return <Selo variante={resposta ? 'resposta' : tipo} />;
}

export function SeloTribo({ tribo }: { tribo: Tribo }) {
  return (
    <span className={`${forma} border border-borda bg-branco text-tinta`}>
      <IconeTribo tribo={tribo} size={16} />
      {tribo}
    </span>
  );
}
