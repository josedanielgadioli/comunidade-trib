# Comunidade Trib — protótipo navegável

Protótipo para a equipe de produto sentir a experiência do piloto da Comunidade Trib. **Não é o MVP**: não tem login real nem banco de dados, e todo o conteúdo é de exemplo.

Feito com Next.js (App Router), TypeScript e Tailwind CSS. Mobile-first, numa coluna de 390 px.

## Telas

| | Rota | O que faz |
|---|---|---|
| T1 | `/` | Boas-vindas, regras e o primeiro nome da pessoa |
| T2 | `/comunidade` | Busca, abas (Destaques, Roteiros, Relatos recentes) e perguntas sem resposta |
| T3 | `/roteiro/[id]` | Roteiro, dias resumidos e conversa dos viajantes, com filtros e resposta inline |
| T4 | `/contribuir?roteiro=[id]` | Perguntar, dar uma dica ou contar como foi |
| T5 | `/notificacoes` | Três notificações de exemplo que levam aos roteiros |

## O que é simulado

- **Contribuições:** ficam só no estado do app (React Context) e somem ao recarregar a página.
- **Nome:** o primeiro nome também fica só no estado. Se a pessoa recarregar e publicar, o formulário pede o nome de novo.
- **Contador do sino e notificações:** fixos.
- **"Usar e editar", "Compartilhar" e "Salvar":** só mostram o aviso "Disponível no MVP".

## Estrutura

```
app/            telas (uma pasta por rota) e layout
components/     componentes de tela e components/ui (design system)
data/exemplo.ts conteúdo de exemplo (roteiros, comentários, notificações)
lib/dados.ts    camada de dados: listarRoteiros, buscarRoteiro, listarComentarios, publicarComentario
lib/ContextoApp.tsx  estado do app (nome + contribuições) e o hook useConsulta
middleware.ts   senha opcional do link
```

### Trocar o estado local pelo Supabase

As telas só usam o contrato `FonteDados` de [`lib/dados.ts`](lib/dados.ts), por meio de `useConsulta` e `useApp().fonte`.

1. Crie `lib/dados-supabase.ts` com uma função que devolve um `FonteDados`, com as mesmas funções, consultando o Supabase.
2. Em [`lib/ContextoApp.tsx`](lib/ContextoApp.tsx), troque `criarFonteLocal(...)` por essa função.

As telas não mudam.

## Rodar localmente (precisa de Node.js 18.18 ou mais novo)

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Deploy na Vercel

1. Entre em https://vercel.com e clique em **Add New… → Project**.
2. Em **Import Git Repository**, escolha `josedanielgadioli/comunidade-trib`. Se ele não aparecer, clique em **Adjust GitHub App Permissions** e libere o repositório.
3. A Vercel detecta Next.js sozinha. Não mude o *Build Command* nem o *Output Directory*.
4. (Opcional) Para proteger o link com senha, abra **Environment Variables** e adicione:
   - `PROTOTIPO_SENHA`: a senha que a equipe vai digitar;
   - `PROTOTIPO_USUARIO` (opcional): sem ela, qualquer usuário serve e só a senha conta.
5. Clique em **Deploy**. Em um ou dois minutos sai o endereço `https://<nome-do-projeto>.vercel.app`.

Depois disso, cada push na branch `main` publica de novo automaticamente.

Para ligar ou trocar a senha depois: **Settings → Environment Variables**, altere a variável e faça um **Redeploy**. Para desligar, apague `PROTOTIPO_SENHA` e faça um **Redeploy**. A senha nunca fica no código.

> Não conecte nenhum banco ou integração ao projeto da Vercel nesta versão: o protótipo não usa nenhum.

## Design system

Veja [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md): tokens, tabela de cores com o contraste de cada par, tipografia e componentes.
