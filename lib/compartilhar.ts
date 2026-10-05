export type ResultadoCompartilhar = 'compartilhado' | 'cancelado' | 'copiado' | 'erro';

/**
 * Abre a folha de compartilhamento do sistema quando o navegador permite.
 * Senão, copia o link para a área de transferência.
 */
export async function compartilharLink(titulo: string, url: string): Promise<ResultadoCompartilhar> {
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({ title: titulo, url });
      return 'compartilhado';
    } catch (e) {
      // A pessoa fechou a folha: não é erro, e não copiamos nada por cima.
      if (e instanceof DOMException && e.name === 'AbortError') return 'cancelado';
    }
  }
  return (await copiar(url)) ? 'copiado' : 'erro';
}

async function copiar(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    // Reserva para navegadores sem a API de área de transferência.
    const campo = document.createElement('textarea');
    campo.value = texto;
    campo.setAttribute('readonly', '');
    campo.style.position = 'fixed';
    campo.style.opacity = '0';
    document.body.appendChild(campo);
    campo.select();
    const ok = document.execCommand('copy');
    campo.remove();
    return ok;
  }
}
