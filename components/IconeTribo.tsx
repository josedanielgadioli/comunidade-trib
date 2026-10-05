import { Church, Mountain, Route } from 'lucide-react';
import type { Tribo } from '@/lib/tipos';

const icones = { Moto: Mountain, Religioso: Church, Fusca: Route } as const;

export function IconeTribo({ tribo, size = 24, className }: { tribo: Tribo | 'geral'; size?: number; className?: string }) {
  const Icone = tribo === 'geral' ? Route : icones[tribo];
  return <Icone size={size} strokeWidth={1.75} aria-hidden className={className} />;
}
