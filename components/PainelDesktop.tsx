'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { TEXTO_RODAPE } from '@/components/RodapePrototipo';

const passos = [
  'Entre com seu primeiro nome',
  'Abra um roteiro',
  'Faça uma pergunta',
  'Responda a um comentário',
  'Abra as notificações',
];

/** Painel explicativo ao lado da moldura, só a partir de 1024 px. */
export function PainelDesktop() {
  // O QR aponta sempre para o início, para quem escanear começar pelo passo 1.
  const [endereco, setEndereco] = useState('');
  useEffect(() => setEndereco(`${window.location.origin}/`), []);

  return (
    <aside aria-label="Sobre este protótipo" className="hidden max-w-[420px] flex-col gap-6 lg:flex">
      <div className="flex flex-col gap-3">
        <p className="text-aux font-semibold text-bordo">Comunidade Trib</p>
        <h2 className="text-[32px] font-semibold leading-10 text-tinta">Protótipo da experiência do piloto</h2>
        <p className="text-corpo text-tinta-2">
          Isto é uma simulação no celular, com dados fictícios. Ela serve para a gente sentir o fluxo antes de construir.
        </p>
      </div>

      <section aria-labelledby="titulo-teste" className="flex flex-col gap-3 rounded-cartao border border-borda bg-branco p-4">
        <h3 id="titulo-teste" className="text-secao text-tinta">
          Teste em 5 minutos
        </h3>
        <ol className="list-decimal pl-5 text-corpo text-tinta marker:font-semibold marker:text-bordo">
          {passos.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
      </section>

      <div className="flex items-center gap-4">
        <div
          role="img"
          aria-label="QR code que abre o protótipo no celular"
          className="h-[136px] w-[136px] shrink-0 rounded-campo border border-borda bg-branco p-2"
        >
          {endereco && <QRCodeSVG value={endereco} size={120} fgColor="#2B1A20" bgColor="#FFFFFF" />}
        </div>
        <p className="text-aux text-tinta-2">Prefere testar no celular? Aponte a câmera aqui.</p>
      </div>

      <p className="text-[11px] leading-4 text-tinta-2">{TEXTO_RODAPE}</p>
    </aside>
  );
}
