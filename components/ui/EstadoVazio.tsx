import { MessageCircle } from 'lucide-react';

export function EstadoVazio({
  texto = 'Ainda não tem nada por aqui. Que tal começar a conversa?',
}: {
  texto?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-cartao border border-dashed border-borda bg-branco px-4 py-8 text-center">
      <MessageCircle size={24} strokeWidth={1.75} aria-hidden className="text-verde" />
      <p className="text-corpo text-tinta-2">{texto}</p>
    </div>
  );
}
