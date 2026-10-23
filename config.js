/* =====================================================================
   CONFIGURAÇÃO DA PÁGINA · edite somente este arquivo
   ===================================================================== */
window.SITE_CONFIG = {
  /* Link do checkout (Hotmart, Kiwify, Eduzz, etc.).
     TODOS os botões de compra usam este endereço.
     Enquanto estiver vazio, os botões levam à seção de oferta e a página
     mostra um aviso de configuração pendente. */
  checkoutUrl: "",            // ex.: "https://pay.suaplataforma.com/XXXXXXX"

  /* Repassar os parâmetros do anúncio (utm_*, fbclid) para o checkout.
     Ajuda a plataforma de pagamento a atribuir a venda à campanha. */
  repassarUtm: true,

  /* ID do Meta Pixel (somente números). Vazio = pixel desligado. */
  metaPixelId: "",            // ex.: "123456789012345"

  /* Texto sobre a entrega, usado em "Como funciona" e nas dúvidas.
     Ajuste conforme a sua plataforma de pagamento. */
  textoEntrega: "O acesso aos arquivos em PDF é liberado pela plataforma de pagamento depois que a compra é confirmada.",

  /* Rodapé: deixe vazio o que você ainda não tem. Itens vazios não aparecem. */
  contatoEmail: "",           // ex.: "contato@seudominio.com.br"
  contatoWhatsapp: "",        // ex.: "5511999999999" (só números, com DDI e DDD)
  politicaPrivacidadeUrl: "", // ex.: "politica-de-privacidade.html"
  termosUrl: "",              // ex.: "termos-de-uso.html"
  responsavelLegal: ""        // ex.: "Nome ou razão social · CNPJ 00.000.000/0000-00"
};
