/* =========================
   CONFIGURAÇÕES
   ========================= */
const nome = "Ana";
const assinatura = "Lucas";
const frase = "Você é meu lugar de paz. 💖";

/* =========================
   MOBILE (pra não ficar esquisito)
   ========================= */
const isMobile = window.innerWidth < 768;

/* =========================
   ATALHO
   ========================= */
const $ = (id) => document.getElementById(id);

/* =========================
   APLICA TEXTOS
   ========================= */
const elNome = $("nome");
const elAssinatura = $("assinatura");
const elFrase = $("frase");

if (elNome) elNome.textContent = nome;
if (elAssinatura) elAssinatura.textContent = assinatura;
if (elFrase) elFrase.textContent = frase;

/* =========================
   MODAL SURPRESA
   ========================= */
const modal = $("modal");
const btnSurpresa = $("btnSurpresa");
const btnFechar = $("btnFechar");

function abrirModal(){
  if (!modal) return;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  // pausa o gradiente animado quando abre o modal (deixa mais “limpo”)
  document.body.style.animationPlayState = "paused";
  soltarConfete(isMobile ? 70 : 140);
}

function fecharModal(){
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.animationPlayState = "running";
}

if (btnSurpresa) btnSurpresa.addEventListener("click", abrirModal);
if (btnFechar) btnFechar.addEventListener("click", fecharModal);

if (modal){
  modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
  });
}

/* ESC fecha modal e lightbox */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape"){
    fecharModal();
    fecharLightbox();
  }
});

/* =========================
   MÚSICA
   ========================= */
const audio = $("audio");
const btnMusica = $("btnMusica");

function atualizarBotaoMusica(tocando){
  if (!btnMusica) return;
  btnMusica.textContent = tocando ? "⏸️ Pausar música" : "🎵 Música";
  btnMusica.setAttribute("aria-pressed", String(tocando));
}

async function toggleMusica(){
  if (!audio) return alert("Áudio não encontrado.");
  try{
    if (audio.paused){
      await audio.play();
      atualizarBotaoMusica(true);
      soltarConfete(isMobile ? 14 : 36);
    } else {
      audio.pause();
      atualizarBotaoMusica(false);
    }
  } catch {
    alert("Não foi possível tocar a música. Verifique o arquivo musica.mp3");
  }
}

if (btnMusica) btnMusica.addEventListener("click", toggleMusica);
if (audio) audio.addEventListener("ended", () => atualizarBotaoMusica(false));

/* =========================
   LIGHTBOX
   ========================= */
const lightbox = $("lightbox");
const lbImg = $("lbImg");
const lbCaption = $("lbCaption");
const lbClose = $("lbClose");
const lbPrev = $("lbPrev");
const lbNext = $("lbNext");

const fotos = Array.from(document.querySelectorAll(".grid .photo img"));
let indiceAtual = 0;

function abrirLightbox(index){
  if (!lightbox || !lbImg) return;
  indiceAtual = index;

  const img = fotos[indiceAtual];
  lbImg.src = img.src;
  lbImg.alt = img.alt || "Foto";
  if (lbCaption) lbCaption.textContent = lbImg.alt;

  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
}

function fecharLightbox(){
  if (!lightbox) return;
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  if (lbImg) lbImg.src = "";
}

function anterior(){
  indiceAtual = (indiceAtual - 1 + fotos.length) % fotos.length;
  abrirLightbox(indiceAtual);
}

function proxima(){
  indiceAtual = (indiceAtual + 1) % fotos.length;
  abrirLightbox(indiceAtual);
}

fotos.forEach((img, i) => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => abrirLightbox(i));
});

if (lbClose) lbClose.addEventListener("click", fecharLightbox);
if (lbPrev) lbPrev.addEventListener("click", anterior);
if (lbNext) lbNext.addEventListener("click", proxima);

if (lightbox){
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) fecharLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (!lightbox || !lightbox.classList.contains("show")) return;
  if (e.key === "ArrowLeft") anterior();
  if (e.key === "ArrowRight") proxima();
});

/* =========================
   BOTÃO GOLFINHO (LEVES NO MOBILE)
   ========================= */
const btnGolfinho = $("btnGolfinho");

function soltarBolhas(qtd = 20){
  for (let i = 0; i < qtd; i++){
    const bolha = document.createElement("div");
    bolha.className = "bubble";
    bolha.style.left = Math.random() * 100 + "vw";

    const size = 8 + Math.random() * (isMobile ? 10 : 18);
    bolha.style.width = bolha.style.height = size + "px";

    bolha.style.animationDuration = (isMobile ? 2.4 : 3) + Math.random() * (isMobile ? 1.2 : 2) + "s";
    bolha.style.setProperty("--dx", (Math.random() * (isMobile ? 40 : 80) - (isMobile ? 20 : 40)) + "px");
    bolha.style.setProperty("--s", (0.6 + Math.random() * 1.2).toFixed(2));

    document.body.appendChild(bolha);
    setTimeout(() => bolha.remove(), 6000);
  }
}

function mostrarFeliz20(){
  // evita “spam” se clicar várias vezes
  const existente = document.querySelector(".feliz-20");
  if (existente) existente.remove();

  const wrap = document.createElement("div");
  wrap.className = "feliz-20";

  const texto = document.createElement("span");
  texto.textContent = "Feliz 20 anos, meu golfinho 🐬💖";

  wrap.appendChild(texto);
  document.body.appendChild(wrap);

  setTimeout(() => wrap.remove(), 3000);
}

if (btnGolfinho){
  btnGolfinho.addEventListener("click", () => {
    soltarBolhas(isMobile ? 10 : 24);
    soltarConfete(isMobile ? 8 : 22);
    mostrarFeliz20();
  });
}

/* =========================
   CONFETE (MAIS LEVE NO MOBILE)
   ========================= */
function soltarConfete(qtd = 120){
  for (let i = 0; i < qtd; i++){
    const confete = document.createElement("div");
    confete.className = "confetti";
    confete.style.left = Math.random() * 100 + "vw";
    confete.style.background = Math.random() > 0.5 ? "#ff5aa5" : "#ff9acb";
    confete.style.animationDuration = (isMobile ? 2.2 : 2.5) + Math.random() * (isMobile ? 1.2 : 2) + "s";

    document.body.appendChild(confete);
    setTimeout(() => confete.remove(), 5200);
  }
}

/* =========================
   INICIALIZAÇÃO
   ========================= */
atualizarBotaoMusica(false);
