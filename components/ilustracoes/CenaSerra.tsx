import { cor } from './cores';
import { Moldura } from './Moldura';

/** Moto — Serra do Rio do Rastro: montanhas em camadas e estrada sinuosa ao fim da tarde. */
export function CenaSerra({ className }: { className?: string }) {
  return (
    <Moldura rotulo="Ilustração de estrada sinuosa subindo a serra ao fim da tarde" className={className}>
      {(id) => (
        <>
          <defs>
            <linearGradient id={`ceu-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={cor.ceuTarde} />
              <stop offset="1" stopColor={cor.ceuTardeClaro} />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill={`url(#ceu-${id})`} />
          <circle cx="300" cy="92" r="26" fill={cor.rosa} />
          {/* Camada 1: serra distante em bruma */}
          <path d="M0 150 L50 112 L95 134 L150 86 L205 128 L250 98 L300 132 L350 96 L400 124 V240 H0 Z" fill={cor.bruma} />
          {/* Camada 2 */}
          <path d="M0 170 L60 128 L120 158 L185 112 L250 150 L320 118 L400 152 V240 H0 Z" fill={cor.morroLonge} />
          {/* Camada 3: encosta com a estrada */}
          <path d="M0 196 L70 150 L150 176 L230 132 L310 170 L400 146 V240 H0 Z" fill={cor.mato} />
          <path
            d="M120 240 C150 222 250 226 222 206 C196 188 140 196 168 180 C196 166 260 172 238 156 C224 146 214 142 232 136"
            fill="none"
            stroke={cor.areia}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M120 240 C150 222 250 226 222 206 C196 188 140 196 168 180 C196 166 260 172 238 156"
            fill="none"
            stroke={cor.terraEscura}
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          {/* Camada 4: primeiro plano */}
          <path d="M0 214 C60 200 100 222 150 240 H0 Z" fill={cor.matoFrente} />
          <path d="M290 240 C320 214 360 206 400 210 V240 Z" fill={cor.matoFrente} />
        </>
      )}
    </Moldura>
  );
}
