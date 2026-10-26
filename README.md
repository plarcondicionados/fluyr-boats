# Fluyr Boats — site institucional

Site de uma página da **Fluyr Boats by Voa Menina**, estaleiro de flutuantes e pontoons em Ribeirão Preto/SP.
Feito com Vite + React + TypeScript + Tailwind + Framer Motion + Lenis. Não tem servidor nem banco de dados: o contato acontece pelo WhatsApp.

## Comandos

```bash
npm install          # instala as dependências (uma vez)
npm run dev          # abre o site em http://localhost:5173
npm run organizar    # abre o organizador de fotos em http://localhost:5180
npm run videos       # converte os vídeos usados no site (precisa do ffmpeg)
npm run build        # gera a versão de produção em dist/
```

## Organizar as fotos e vídeos

1. Rode `npm run dev` e `npm run organizar` (em dois terminais).
2. No organizador, arraste cada foto/vídeo para a seção em que deve aparecer — **Destaque**, **Fluyr X 850**, **Fluyr 950**, **Convés & acessórios**, **Estaleiro**, **Galeria** ou **Não usar** — e deixe na ordem desejada.
3. Clique em **Salvar organização**. O arquivo `src/data/organizacao-fotos.json` é atualizado, o site recarrega sozinho e os vídeos novos são convertidos em segundo plano.

O **primeiro vídeo do Destaque** vira o fundo da abertura do site (um trecho de 18 s, gerado por `npm run videos`).

## Onde editar cada conteúdo

| O quê | Arquivo |
| --- | --- |
| Telefone, Instagram, endereço, textos gerais, glossário, etapas do processo | `src/data/site.ts` |
| Modelos (nome, comprimento, ficha técnica, destaques) | `src/data/modelos.ts` |
| Legenda de cada foto/vídeo | `src/data/legendas.ts` |
| Quais fotos aparecem e em que ordem | organizador (`npm run organizar`) → `src/data/organizacao-fotos.json` |
| Cores e fontes | `tailwind.config.js` |

## Estrutura

```
fotos-originais/      fotos e vídeos originais do WhatsApp (renomeados) + logo
organizador/          página para organizar as fotos (index.html + servidor.py + miniaturas)
public/videos/        vídeos já convertidos para a web + capas (.jpg)
scripts/              preparar-videos.py, optimize-images.mjs
src/assets/fotos/     as 35 fotos em WebP (1600 px)
src/assets/marca/     logo (versão original e versão clara para fundo escuro)
src/components/       layout (Header, Footer), sections (uma por seção), ui (peças reutilizáveis)
src/data/             todo o texto e a organização das fotos
```

## Contato pelo WhatsApp

O formulário não envia nada para servidor. Ao tocar em **Enviar pelo WhatsApp**, o site monta a mensagem e abre
`wa.me/5516997153724` com o texto pronto; o cliente só confirma o envio. Exemplo do que chega:

```
*Pedido — site Fluyr Boats*

*Nome:* Joana Ribeiro
*Telefone:* (16) 98888-7777
*Modelo de interesse:* Fluyr 950 (pontoon, 9,5 m, até 30 pessoas)
*Uso principal:* Lazer com a família e amigos
*Onde vai navegar:* Represa de Furnas
*Cidade/UF:* Ribeirão Preto/SP

*Detalhes:*
Umas 15 pessoas, quero churrasqueira e som.
```

Todos os botões de WhatsApp do site (cabeçalho, botão flutuante, modelos, contato, rodapé) usam o número de `src/data/site.ts`.
Os botões de modelo já abrem a conversa citando o barco ("Vi a Fluyr X 850 no site…").

## Origem das imagens

- **Todas as fotos e vídeos são reais**, enviados pela empresa — nenhuma imagem foi gerada por IA e nenhum fundo foi alterado.
- A **logo** veio do PDF `Fluyr_Boats_Logo_Alta_Qualidade.pdf`. O xadrez cinza desenhado atrás dela foi removido, e foi criada uma
  versão clara (azul → creme, latão mantido) para ficar legível sobre o fundo azul-marinho do site.

## Publicar no Render

O `render.yaml` já configura o site estático. No Render: **New + → Blueprint → escolher o repositório → Apply**.
O `.gitignore` deixa de fora o `.zip` e os vídeos brutos de `fotos-originais/` (pesados demais para o GitHub);
os vídeos já convertidos em `public/videos/` vão junto.

## Pendências (dados para confirmar com a Fluyr Boats)

1. **Motorização** de cada modelo — hoje aparece "Sob consulta" na ficha técnica (capacidade já confirmada: 23 e 30 pessoas).
2. **Boca (largura)** e outros dados técnicos, se quiserem completar a ficha.
3. **Textos do "Diário de bordo"**: confirmar que a Fluyr Boats "nasceu da Voa Menina" e que o cliente pode visitar o estaleiro durante a construção.
4. **Horário de atendimento** do estaleiro (não informado, por isso não aparece no site).
5. **Legendas** em `src/data/legendas.ts`: foram escritas a partir do que se vê em cada foto/vídeo — vale revisar.
6. **Depoimentos de clientes**: não foram incluídos porque não há depoimentos reais. Se quiserem, mandem textos com nome e autorização.
7. Os detalhes da ficha técnica (toldo, iluminação, convés, destaques) foram descritos a partir das fotos — confirmar.
