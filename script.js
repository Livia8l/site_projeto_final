/* =====================================================
   CONFIGURAÇÃO — edite só aqui
   ===================================================== */
const CONFIG = {
  nome: "Wanda Delazari",                         // nome / marca que aparece no rodapé
  subtitulo: "Deputada Estadual · ES",             // subtítulo do rodapé
  instagramUrl: "https://www.instagram.com/wandadelazari.es",   // link do perfil do Instagram
  facebookUrl: "https://facebook.com/wandadelazari",     // link da página do Facebook   
  youtubeUrl: "https://www.youtube.com/@wandadelazari",      // link do canal do YouTube
  whatsappNumero: "5527999017731",                // número no formato 55DDDNÚMERO (sem espaços/símbolos)
  whatsappMensagem: "Olá! Vi seu site e gostaria de saber mais.",
  ano: new Date().getFullYear()
};

document.getElementById('logo-rodape').textContent = CONFIG.nome;
document.getElementById('logo-sub-rodape').textContent = CONFIG.subtitulo;
document.getElementById('ano-atual').textContent = CONFIG.ano;

const linkWpp = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(CONFIG.whatsappMensagem)}`;
document.getElementById('link-instagram').href = CONFIG.instagramUrl;
document.getElementById('link-facebook').href = CONFIG.facebookUrl;
document.getElementById('link-youtube').href = CONFIG.youtubeUrl;
document.getElementById('btn-wpp').href = linkWpp;

/* ---------- selos "Mulher · Família · Fé": entram com zoom, em cascata ---------- */
const selosPilares = document.querySelectorAll('.pilar-badge');
if ('IntersectionObserver' in window) {
  const observadorSelos = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observadorSelos.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.3 });
  selosPilares.forEach(el => observadorSelos.observe(el));
} else {
  selosPilares.forEach(el => el.classList.add('visivel'));
}

/* ---------- revelar conteúdo ao rolar a página ---------- */
const elementosRevelaveis = document.querySelectorAll(
  '.secao h2, .secao .linha-assinatura, .secao p, .citacao-decorativa, .foto'
);
elementosRevelaveis.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observadorRevelacao = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observadorRevelacao.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  elementosRevelaveis.forEach(el => observadorRevelacao.observe(el));
} else {
  // navegadores sem suporte: mostra tudo direto, sem animação
  elementosRevelaveis.forEach(el => el.classList.add('visivel'));
}

/* ---------- botão voltar ao topo ---------- */
const btnTopo = document.getElementById('btn-topo');
window.addEventListener('scroll', () => {
  btnTopo.classList.toggle('visivel', window.scrollY > 400);
});
btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- carrossel: setas ---------- */
const carrossel = document.getElementById('carrossel');
const passo = () => carrossel.querySelector('.carrossel-item').offsetWidth + 18;
document.getElementById('carrossel-prev').addEventListener('click', () => {
  carrossel.scrollBy({ left: -passo(), behavior: 'smooth' });
});
document.getElementById('carrossel-next').addEventListener('click', () => {
  carrossel.scrollBy({ left: passo(), behavior: 'smooth' });
});

/* ---------- slider "três frentes": avança automaticamente ---------- */
const frentesTrack = document.getElementById('frentes-track');
const frentesViewport = document.getElementById('frentes-viewport');
const frentesSlides = document.querySelectorAll('.frente-slide');
const frentesDots = document.querySelectorAll('.frente-dot');
const totalFrentes = frentesSlides.length;
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let frenteAtual = 0;
let frentesTimer = null;

function irParaFrente(indice){
  frenteAtual = (indice + totalFrentes) % totalFrentes;
  frentesTrack.style.transform = `translateX(-${frenteAtual * 100}%)`;
  frentesDots.forEach((dot, i) => dot.classList.toggle('ativo', i === frenteAtual));
}

function iniciarAutoplayFrentes(){
  clearInterval(frentesTimer);
  if (reduzirMovimento) return; // respeita quem prefere menos animação
  frentesTimer = setInterval(() => irParaFrente(frenteAtual + 1), 4500);
}

document.getElementById('frentes-prev').addEventListener('click', () => {
  irParaFrente(frenteAtual - 1);
  iniciarAutoplayFrentes();
});
document.getElementById('frentes-next').addEventListener('click', () => {
  irParaFrente(frenteAtual + 1);
  iniciarAutoplayFrentes();
});
frentesDots.forEach(dot => {
  dot.addEventListener('click', () => {
    irParaFrente(parseInt(dot.dataset.index, 10));
    iniciarAutoplayFrentes();
  });
});

// pausa a troca automática enquanto o mouse está sobre o card (facilita a leitura)
frentesViewport.addEventListener('mouseenter', () => clearInterval(frentesTimer));
frentesViewport.addEventListener('mouseleave', iniciarAutoplayFrentes);

irParaFrente(0);
iniciarAutoplayFrentes();