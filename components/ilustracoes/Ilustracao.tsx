import type { Tribo } from '@/lib/tipos';
import { CenaBoasVindas } from './CenaBoasVindas';
import { CenaCidadeIgreja } from './CenaCidadeIgreja';
import { CenaEstradaReal } from './CenaEstradaReal';
import { CenaSerra } from './CenaSerra';

const cenas = {
  Moto: CenaSerra,
  Religioso: CenaCidadeIgreja,
  Fusca: CenaEstradaReal,
  'boas-vindas': CenaBoasVindas,
} as const;

/** Ilustração de viagem em SVG. O tamanho vem do contêiner (altura definida por quem usa). */
export function Ilustracao({ cena, className }: { cena: Tribo | 'boas-vindas'; className?: string }) {
  const Cena = cenas[cena];
  return <Cena className={className} />;
}
