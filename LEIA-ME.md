# Natal Divertido · página de pré-venda

Página estática (HTML + CSS + JS, sem dependências). Funciona em qualquer hospedagem comum:
Hostinger, Netlify, Vercel, GitHub Pages, cPanel etc. Envie **todos os arquivos desta pasta** mantendo a pasta `img/`.

```
index.html   → a página
styles.css   → visual
app.js       → botões, pixel, galeria (não precisa editar)
config.js    → ÚNICO arquivo que você precisa editar
img/         → imagens geradas a partir das páginas reais do PDF (WebP, ~1,6 MB no total, carregadas sob demanda)
```

## 1. O que falta preencher (em `config.js`)

| Campo | O que colocar | Se ficar vazio |
|---|---|---|
| `checkoutUrl` | Link do checkout da sua plataforma | Botões levam à seção de oferta e aparece uma faixa amarela de "configuração pendente" |
| `metaPixelId` | ID do Meta Pixel (só números) | Pixel não carrega |
| `textoEntrega` | Como o comprador recebe os arquivos na sua plataforma | Usa o texto genérico atual |
| `politicaPrivacidadeUrl` | Link da sua política de privacidade | Link não aparece no rodapé |
| `termosUrl` | Link dos termos de uso / compra | Link não aparece |
| `contatoEmail`, `contatoWhatsapp` | Seus contatos | Não aparecem |
| `responsavelLegal` | Nome/razão social e CNPJ, se tiver | Não aparece |

Todos os 5 botões de compra (topo, meio, oferta, dúvidas e barra fixa do celular) usam o mesmo `checkoutUrl`.
Com `repassarUtm: true`, os parâmetros do anúncio (`utm_*`, `fbclid`, `src`, `sck`, `xcod`) são repassados ao checkout.

**Atenção:** ao usar o Meta Pixel, a página precisa de uma política de privacidade (LGPD e regras de anúncios da Meta).
Ela não foi criada aqui porque depende dos seus dados como responsável.

Também troque, no `<head>` do `index.html`, `og:image` por um endereço completo depois de publicar
(ex.: `https://seudominio.com.br/img/og-imagem.jpg`). O Facebook só lê a imagem de compartilhamento com endereço completo.

## 2. Meta Pixel: o que a página faz e o que não faz

- **PageView:** disparado ao carregar a página (se houver `metaPixelId`).
- **CliqueComprar** (evento personalizado): disparado no clique de qualquer botão de compra, com o parâmetro `local`
  (topo, jogos, oferta, duvidas, barra-fixa). Serve só para medir cliques. **Não é compra.**
- **Purchase: a página NÃO dispara.** O pagamento acontece fora desta página, então ela não tem como saber se a compra foi aprovada.

Para registrar compras, configure na sua plataforma de pagamento:
1. Cadastre o mesmo ID do Pixel na área de "Pixel / rastreamento" do produto (Hotmart, Kiwify, Eduzz etc. têm esse campo).
   A plataforma dispara `InitiateCheckout` e `Purchase` (só quando o pagamento é aprovado).
2. Se a plataforma oferecer, ative a **API de Conversões** (envio pelo servidor), que é mais confiável que o pixel do navegador.
3. No Gerenciador de Eventos da Meta, use o **Testar eventos** para conferir PageView aqui e Purchase na plataforma.
4. Nos anúncios, otimize para **Compra**, usando o evento vindo da plataforma.

## 3. Conferências feitas

- Imagens: todas vêm das páginas reais do PDF colorido, da versão P&B e do Gabarito. As fotos do criativo (cartas com Papai Noel e rena, bingo com outro layout) **não** foram usadas, porque mostram peças diferentes das que o comprador recebe.
- Números exibidos (9 jogos, 130 peças, 31 páginas por versão, 4 páginas de gabarito, 24 cartas, 6 cartelas, 16 cartões, 8 pistas, 20+20 cartas, 16 peças, 12 cartões, 2 atividades, 8 cartões + certificado) conferidos com o material.
- Preço R$ 14,90 em todos os pontos da página.
- Sem contador regressivo, depoimentos, avaliações, garantia ou promessa de entrega instantânea.
