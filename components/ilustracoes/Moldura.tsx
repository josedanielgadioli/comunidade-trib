import { useId, type ReactNode } from 'react';

interface Props {
  rotulo: string;
  className?: string;
  /** Recebe um id único para os gradientes desta instância. */
  children: (id: string) => ReactNode;
}

/** SVG que preenche o espaço disponível, recortando as bordas (como uma foto). */
export function Moldura({ rotulo, className = '', children }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg
      role="img"
      aria-label={rotulo}
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children(id)}
    </svg>
  );
}
