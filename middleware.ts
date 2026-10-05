import { NextResponse, type NextRequest } from 'next/server';

/**
 * Proteção opcional do link do protótipo (autenticação básica do navegador).
 * Só liga quando a variável de ambiente PROTOTIPO_SENHA existe.
 * PROTOTIPO_USUARIO é opcional: sem ela, qualquer usuário serve e só a senha conta.
 */
export function middleware(req: NextRequest) {
  const senha = process.env.PROTOTIPO_SENHA;
  if (!senha) return NextResponse.next();

  const usuarioEsperado = process.env.PROTOTIPO_USUARIO;
  const cabecalho = req.headers.get('authorization');

  if (cabecalho?.startsWith('Basic ')) {
    try {
      const decodificado = atob(cabecalho.slice(6));
      const separador = decodificado.indexOf(':');
      const usuario = decodificado.slice(0, separador);
      const senhaInformada = decodificado.slice(separador + 1);
      if (separador >= 0 && senhaInformada === senha && (!usuarioEsperado || usuario === usuarioEsperado)) {
        return NextResponse.next();
      }
    } catch {
      // Cabeçalho malformado: cai no pedido de senha abaixo.
    }
  }

  return new NextResponse('Protótipo protegido por senha.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Prototipo Comunidade Trib", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
