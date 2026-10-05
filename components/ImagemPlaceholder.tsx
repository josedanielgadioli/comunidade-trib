import type { Tribo } from '@/lib/tipos';
import { IconeTribo } from '@/components/IconeTribo';

// Sem fotos reais nem de banco de imagens: só um bloco ilustrativo.
export function ImagemPlaceholder({
  tribo = 'geral',
  altura = 'h-36',
  className = '',
}: {
  tribo?: Tribo | 'geral';
  altura?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label="Imagem ilustrativa"
      className={`flex flex-col items-center justify-center gap-2 bg-placeholder ${altura} ${className}`}
    >
      <IconeTribo tribo={tribo} size={40} className="text-verde" />
      <span className="text-aux text-tinta" aria-hidden>
        imagem ilustrativa
      </span>
    </div>
  );
}
