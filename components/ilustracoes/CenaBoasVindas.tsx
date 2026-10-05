import { cor } from './cores';
import { Moldura } from './Moldura';

/** Boas-vindas: estrada abrindo para o horizonte, sem pessoas. */
export function CenaBoasVindas({ className }: { className?: string }) {
  return (
    <Moldura rotulo="Ilustração de estrada abrindo para o horizonte" className={className}>
      {(id) => (
        <>
          <defs>
            <linearGradient id={`ceu-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={cor.ceuDia} />
              <stop offset="1" stopColor={cor.ceuTardeClaro} />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill={`url(#ceu-${id})`} />
          {/* Sol nascendo no horizonte */}
          <circle cx="200" cy="138" r="40" fill={cor.rosa} />
          {/* Camada 1: morros longe */}
          <path d="M0 136 C60 118 120 124 170 138 H230 C280 122 340 116 400 132 V240 H0 Z" fill={cor.morroLonge} />
          {/* Camada 2: campos */}
          <path d="M0 160 C90 144 150 146 190 150 H210 C260 144 330 146 400 156 V240 H0 Z" fill={cor.morro} />
          {/* Camada 3: estrada em perspectiva */}
          <path d="M194 148 H206 L320 240 H80 Z" fill={cor.areia} />
          <path d="M200 156 V164 M200 176 V188 M200 202 V218 M200 230 V240" stroke={cor.branco} strokeWidth="3" strokeLinecap="round" />
          {/* Camada 4: margens em primeiro plano */}
          <path d="M0 180 C40 176 70 196 92 240 H0 Z" fill={cor.mato} />
          <path d="M308 240 C330 196 360 178 400 176 V240 Z" fill={cor.mato} />
          <path d="M0 214 C20 210 36 222 46 240 H0 Z" fill={cor.matoFrente} />
          <path d="M360 240 C368 222 384 212 400 212 V240 Z" fill={cor.matoFrente} />
        </>
      )}
    </Moldura>
  );
}
