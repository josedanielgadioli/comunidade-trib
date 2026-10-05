'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Ilustracao } from '@/components/ilustracoes/Ilustracao';
import type { Tribo } from '@/lib/tipos';

interface Props {
  src: string;
  alt: string;
  /** Ilustração SVG de reserva, caso a imagem não carregue. */
  reserva: Tribo | 'boas-vindas';
  sizes: string;
  /** Degradê escuro suave no topo, para selos e botões sobre a foto. */
  degrade?: boolean;
  /** Enquadramento (object-position), ex.: 'left', 'center', 'right'. */
  enquadramento?: string;
  prioridade?: boolean;
}

/** Foto que preenche o contêiner (object-fit: cover). O contêiner define o tamanho. */
export function Foto({ src, alt, reserva, sizes, degrade, enquadramento = 'center', prioridade }: Props) {
  const [falhou, setFalhou] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {falhou ? (
        <Ilustracao cena={reserva} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={prioridade}
          onError={() => setFalhou(true)}
          className="object-cover"
          style={{ objectPosition: enquadramento }}
        />
      )}
      {degrade && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[rgba(0,0,0,0.25)] to-transparent" />
      )}
    </div>
  );
}

/** Tamanhos para imagens da largura da coluna de 390 px. */
export const SIZES_COLUNA = '(max-width: 390px) 100vw, 390px';
