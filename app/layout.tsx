import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { ProvedorApp } from '@/lib/ContextoApp';
import { ProvedorToast } from '@/components/ui/Toast';
import { BarraNavegacao } from '@/components/BarraNavegacao';
import { RodapePrototipo } from '@/components/RodapePrototipo';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--fonte-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Comunidade Trib — protótipo',
  description: 'Protótipo navegável para testes da Comunidade Trib.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#EDE5DF',
  // Permite usar env(safe-area-inset-bottom) no iPhone.
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="bg-areia font-sans text-corpo text-tinta antialiased">
        <ProvedorApp>
          <ProvedorToast>
            {/* Coluna única de 390 px, também no computador. */}
            <div className="mx-auto min-h-screen max-w-coluna bg-areia min-[391px]:border-x min-[391px]:border-borda">
              {children}
            </div>
            <RodapePrototipo />
            <BarraNavegacao />
          </ProvedorToast>
        </ProvedorApp>
      </body>
    </html>
  );
}
