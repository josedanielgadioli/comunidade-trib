import { cor } from './cores';
import { Moldura } from './Moldura';

/** Fusca — Estrada Real: estrada de terra entre morros, casario colonial e um Fusca em silhueta. */
export function CenaEstradaReal({ className }: { className?: string }) {
  return (
    <Moldura rotulo="Ilustração de estrada de terra entre morros verdes com um Fusca e casario ao longe" className={className}>
      {(id) => (
        <>
          <defs>
            <linearGradient id={`ceu-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={cor.ceuDia} />
              <stop offset="1" stopColor={cor.ceuTardeClaro} />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill={`url(#ceu-${id})`} />
          <circle cx="320" cy="70" r="22" fill={cor.rosa} />
          {/* Camada 1: morros distantes */}
          <path d="M0 136 C50 104 110 108 160 128 C210 100 290 96 400 124 V240 H0 Z" fill={cor.morroLonge} />
          {/* Casario colonial ao longe */}
          <g>
            {[248, 262, 276, 290].map((x, i) => (
              <g key={x}>
                <rect x={x} y={120 + (i % 2) * 3} width="12" height="9" fill={cor.branco} />
                <path d={`M${x - 1} ${120 + (i % 2) * 3} L${x + 6} ${114 + (i % 2) * 3} L${x + 13} ${120 + (i % 2) * 3} Z`} fill={cor.telhado} />
              </g>
            ))}
            <rect x="304" y="110" width="8" height="18" fill={cor.branco} />
            <path d="M303 110 L308 102 L313 110 Z" fill={cor.telhado} />
          </g>
          {/* Camada 2 */}
          <path d="M0 160 C70 132 140 140 200 152 C270 134 340 136 400 148 V240 H0 Z" fill={cor.morro} />
          {/* Camada 3 */}
          <path d="M0 184 C80 164 150 170 200 176 C260 166 330 166 400 178 V240 H0 Z" fill={cor.mato} />
          {/* Estrada de terra */}
          <path d="M196 158 C204 158 210 160 214 164 L330 240 H70 L186 164 C188 160 192 158 196 158 Z" fill={cor.terra} />
          <path d="M200 166 L200 176 M200 190 L200 204 M200 220 L200 236" stroke={cor.terraEscura} strokeWidth="2" strokeLinecap="round" />
          {/* Fusca em silhueta */}
          <g fill={cor.tinta}>
            <path d="M226 214 C226 196 240 186 256 186 C272 186 284 196 288 206 L296 208 C300 209 302 212 302 216 L302 220 H222 L222 218 C222 216 224 214 226 214 Z" />
            <circle cx="240" cy="221" r="7" />
            <circle cx="288" cy="221" r="7" />
          </g>
          <path d="M240 192 C246 190 252 190 258 190 L258 202 H234 Z" fill={cor.ceuDia} opacity="0.85" />
          <path d="M262 190 C268 190 274 193 278 202 H262 Z" fill={cor.ceuDia} opacity="0.85" />
          {/* Camada 4: primeiro plano */}
          <path d="M0 210 C40 200 70 214 90 240 H0 Z" fill={cor.matoFrente} />
          <path d="M320 240 C340 214 370 206 400 208 V240 Z" fill={cor.matoFrente} />
        </>
      )}
    </Moldura>
  );
}
