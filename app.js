/* Natal Divertido · página de pré-venda
   Lê window.SITE_CONFIG (config.js). Não edite aqui para trocar links ou IDs. */
(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};
  var checkout = (C.checkoutUrl || "").trim();
  var temCheckout = /^https?:\/\//i.test(checkout);

  /* ---------- Meta Pixel: só carrega se houver ID ---------- */
  var pixelId = String(C.metaPixelId || "").replace(/\D/g, "");
  if (pixelId) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  }
  function evento(nome, dados) {
    try { if (window.fbq) window.fbq("trackCustom", nome, dados || {}); } catch (e) {}
  }

  /* ---------- Link de checkout centralizado ---------- */
  function urlCheckout() {
    if (!temCheckout) return "#oferta";
    if (!C.repassarUtm || !location.search) return checkout;
    try {
      var destino = new URL(checkout);
      new URLSearchParams(location.search).forEach(function (v, k) {
        if (/^(utm_|fbclid$|src$|sck$|xcod$)/i.test(k) && !destino.searchParams.has(k)) destino.searchParams.set(k, v);
      });
      return destino.toString();
    } catch (e) { return checkout; }
  }
  var botoes = document.querySelectorAll("[data-checkout]");
  botoes.forEach(function (a) {
    a.setAttribute("href", urlCheckout());
    a.addEventListener("click", function () {
      /* Apenas um clique: NÃO é compra. Purchase deve vir da plataforma de pagamento. */
      evento("CliqueComprar", { local: a.getAttribute("data-checkout") || "botao", valor: 14.90, moeda: "BRL" });
      if (!temCheckout) {
        var av = document.getElementById("aviso-config");
        if (av) { av.hidden = false; }
      }
    });
  });
  if (!temCheckout) {
    var av = document.getElementById("aviso-config");
    if (av) av.hidden = false;
    console.warn("[Natal Divertido] checkoutUrl vazio em config.js: os botões levam para #oferta.");
  }

  /* ---------- Textos configuráveis ---------- */
  document.querySelectorAll("[data-texto-entrega]").forEach(function (el) {
    if (C.textoEntrega) el.textContent = C.textoEntrega;
  });

  /* ---------- Rodapé ---------- */
  function item(id, html) { var el = document.getElementById(id); if (el && html) { el.innerHTML = html; el.hidden = false; } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  if (C.politicaPrivacidadeUrl) item("f-privacidade", '<a href="' + esc(C.politicaPrivacidadeUrl) + '">Política de privacidade</a>');
  if (C.termosUrl) item("f-termos", '<a href="' + esc(C.termosUrl) + '">Termos de uso</a>');
  if (C.contatoEmail) item("f-email", 'Contato: <a href="mailto:' + esc(C.contatoEmail) + '">' + esc(C.contatoEmail) + "</a>");
  if (C.contatoWhatsapp) {
    var w = String(C.contatoWhatsapp).replace(/\D/g, "");
    item("f-whats", 'WhatsApp: <a href="https://wa.me/' + w + '" target="_blank" rel="noopener">+' + esc(w) + "</a>");
  }
  if (C.responsavelLegal) item("f-legal", esc(C.responsavelLegal));

  /* ---------- Barra de compra fixa no celular ---------- */
  var barra = document.getElementById("barra");
  var hero = document.getElementById("topo"), oferta = document.getElementById("oferta");
  if (barra && "IntersectionObserver" in window) {
    var vis = { topo: true, oferta: false };
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { vis[e.target.id] = e.isIntersecting; });
      barra.classList.toggle("on", !vis.topo && !vis.oferta);
    }, { threshold: 0.05 });
    io.observe(hero); io.observe(oferta);
  }

  /* ---------- Galeria com ampliação ---------- */
  var dlg = document.getElementById("zoom");
  var fotos = Array.prototype.slice.call(document.querySelectorAll(".galeria button"));
  var atual = 0;
  function abrir(i) {
    atual = (i + fotos.length) % fotos.length;
    var b = fotos[atual], img = b.querySelector("img");
    dlg.querySelector("img").src = img.getAttribute("src");
    dlg.querySelector("img").alt = img.alt;
    dlg.querySelector("figcaption").textContent = b.getAttribute("data-legenda") + " · " + (atual + 1) + " de " + fotos.length;
    if (!dlg.open) { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); }
  }
  if (dlg) {
    fotos.forEach(function (b, i) { b.addEventListener("click", function () { abrir(i); }); });
    dlg.querySelector(".z-fechar").addEventListener("click", function () { dlg.close(); });
    dlg.querySelector(".z-ant").addEventListener("click", function () { abrir(atual - 1); });
    dlg.querySelector(".z-prox").addEventListener("click", function () { abrir(atual + 1); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") abrir(atual - 1);
      if (e.key === "ArrowRight") abrir(atual + 1);
    });
  }
})();
