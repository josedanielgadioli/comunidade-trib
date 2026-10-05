import { cor } from './cores';
import { Moldura } from './Moldura';

function Casa({ x, y, l, a }: { x: number; y: number; l: number; a: number }) {
  return (
    <g>
      <rect x={x} y={y} width={l} height={a} fill={cor.areia} />
      <path d={`M${x - 3} ${y} L${x + l / 2} ${y - 10} L${x + l + 3} ${y} Z`} fill={cor.telhado} />
      <rect x={x + l / 2 - 3} y={y + a - 9} width="6" height="9" fill={cor.madeira} />
    </g>
  );
}

/** Religioso — cidade pequena com igreja de duas torres, de manhã. */
export function CenaCidadeIgreja({ className }: { className?: string }) {
  return (
    <Moldura rotulo="Ilustração de cidade pequena com igreja de duas torres e morros ao fundo" className={className}>
      {(id) => (
        <>
          <defs>
            <linearGradient id={`ceu-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={cor.ceuDia} />
              <stop offset="1" stopColor={cor.ceuClaro} />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill={`url(#ceu-${id})`} />
          <circle cx="78" cy="62" r="20" fill={cor.rosa} />
          {/* Camada 1: morros ao fundo */}
          <path d="M0 150 C60 110 120 118 170 140 C220 104 300 100 400 138 V240 H0 Z" fill={cor.morroLonge} />
          {/* Camada 2 */}
          <path d="M0 176 C80 150 160 160 220 170 C290 150 350 152 400 164 V240 H0 Z" fill={cor.morro} />
          {/* Camada 3: casario e igreja */}
          <Casa x={70} y={170} l={30} a={22} />
          <Casa x={108} y={176} l={24} a={16} />
          <Casa x={268} y={172} l={28} a={20} />
          <Casa x={304} y={178} l={24} a={14} />
          <g>
            <rect x="160" y="140" width="80" height="52" fill={cor.branco} />
            <path d="M160 140 L200 120 L240 140 Z" fill={cor.telhado} />
            <rect x="150" y="104" width="22" height="88" fill={cor.branco} />
            <rect x="228" y="104" width="22" height="88" fill={cor.branco} />
            <path d="M148 104 L161 80 L174 104 Z" fill={cor.telhado} />
            <path d="M226 104 L239 80 L252 104 Z" fill={cor.telhado} />
            <rect x="157" y="114" width="8" height="12" rx="4" fill={cor.madeira} />
            <rect x="235" y="114" width="8" height="12" rx="4" fill={cor.madeira} />
            <path d="M190 192 V170 A10 10 0 0 1 210 170 V192 Z" fill={cor.madeira} />
            <circle cx="200" cy="152" r="6" fill={cor.ceuDia} />
          </g>
          {/* Camada 4: chão e praça */}
          <path d="M0 192 H400 V240 H0 Z" fill={cor.mato} />
          <path d="M150 240 L180 192 H220 L250 240 Z" fill={cor.areia} />
          <path d="M0 216 C70 204 110 212 140 240 H0 Z" fill={cor.matoFrente} />
          <path d="M270 240 C300 210 350 204 400 212 V240 Z" fill={cor.matoFrente} />
        </>
      )}
    </Moldura>
  );
}
