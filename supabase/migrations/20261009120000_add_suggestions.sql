-- Sugestões de tema enviadas pelas pessoas quando a busca não encontra nada ("Não achou o que
-- procura?"). Guarda só o texto: sem nome, e-mail ou identificação de quem enviou.
-- Só o servidor (chave de serviço) lê e escreve; o navegador não tem acesso direto.
-- Retenção: o aviso diário do site (/api/public/keepalive) apaga o que tem mais de 180 dias.
create table if not exists public.suggestions (
  id uuid not null default gen_random_uuid() primary key,
  created_at timestamptz not null default now(),
  busca text not null default '',
  mensagem text not null
);

create index if not exists suggestions_created_at_idx on public.suggestions (created_at desc);

alter table public.suggestions enable row level security;
-- Sem políticas de propósito: nenhum acesso pelo navegador.
grant all on public.suggestions to service_role;
