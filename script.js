/* =========================
   CONFIGURAÇÕES
   ========================= */
const nome = "Ana";
const assinatura = "Lucas";
const frase = "Sim, você está ficando mais velha! 😂💖";

const isMobile = window.innerWidth < 768;
const $ = (id) => document.getElementById(id);

/* =========================
   APLICA TEXTOS
   ========================= */
$("nome") && ($("nome").textContent = nome);
$("assinatura") && ($("assinatura").textContent = assinatura);
$("frase") && ($("frase").textContent = frase);

/* =========================
   CONFETE
   ========================= */
function soltarConfete(qtd = 120){
  for (let i = 0; i < qtd; i++){
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = Math.random() > 0.5 ? "#ff5aa5" : "#ff9acb";
    c.style.animationDuration = (isMobile ? 2.2 : 2.6) + Math.random() * (isMobile ? 1.2 : 2) + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5200);
  }
}

/* =========================
   BOLHAS (GOLFINHO)
   ========================= */
function soltarBolhas(qtd = 20){
  for (let i = 0; i < qtd; i++){
    const b = document.createElement("div");
    b.className = "bubble";
    b.style.left = Math.random() * 100 + "vw";

    const size = 8 + Math.random() * (isMobile ? 10 : 18);
    b.style.width = b.style.height = size + "px";

    b.style.animationDuration = (isMobile ? 2.4 : 3) + Math.random() * (isMobile ? 1.2 : 2) + "s";
    b.style.setProperty("--dx", (Math.random() * (isMobile ? 40 : 80) - (isMobile ? 20 : 40)) + "px");
    b.style.setProperty("--s", (0.6 + Math.random() * 1.2).toFixed(2));

    document.body.appendChild(b);
    setTimeout(() => b.remove(), 6000);
  }
}

/* =========================
   TEXTO "FELIZ 20 ANOS"
   ========================= */
function mostrarFeliz20(){
  document.querySelector(".feliz-20")?.remove();

  const wrap = document.createElement("div");
  wrap.className = "feliz-20";

  const span = document.createElement("span");
  span.textContent = "Feliz 20 anos, meu golfinho 🐬💖";

  wrap.appendChild(span);
  document.body.appendChild(wrap);

  setTimeout(() => wrap.remove(), 3000);
}

/* =========================
   MÚSICA + FADE DE VOLUME
   ========================= */
const audio = $("audio");
const btnMusica = $("btnMusica");

let volumeNormal = 0.85;   // volume padrão
const volumeVideo = 0.08;  // volume durante vídeo
let fadeTimer = null;

if (audio) audio.volume = volumeNormal;

function atualizarBotaoMusica(tocando){
  if (!btnMusica) return;
  btnMusica.textContent = tocando ? "⏸️ Pausar música" : "🎵 Escuta essa aqui";
  btnMusica.setAttribute("aria-pressed", String(tocando));
}

function fadeVolume(audioEl, target, ms = 800){
  if (!audioEl) return;
  if (fadeTimer) clearInterval(fadeTimer);

  const start = audioEl.volume;
  const diff = target - start;
  const steps = Math.max(1, Math.floor(ms / 20));
  let i = 0;

  fadeTimer = setInterval(() => {
    i++;
    const v = start + (diff * (i / steps));
    audioEl.volume = Math.min(1, Math.max(0, v));

    if (i >= steps){
      clearInterval(fadeTimer);
      fadeTimer = null;
      audioEl.volume = target;
    }
  }, 20);
}

async function toggleMusica(){
  if (!audio) return alert("Áudio não encontrado.");
  try{
    if (audio.paused){
      await audio.play();
      // guarda o volume como "normal" (se o usuário mexer)
      volumeNormal = audio.volume || volumeNormal;
      atualizarBotaoMusica(true);
      soltarConfete(isMobile ? 14 : 30);
    } else {
      audio.pause();
      atualizarBotaoMusica(false);
    }
  } catch {
    alert("Não foi possível tocar a música. Verifique o arquivo musica.mp3");
  }
}

btnMusica && btnMusica.addEventListener("click", toggleMusica);
audio && audio.addEventListener("ended", () => atualizarBotaoMusica(false));

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
  document.body.style.animationPlayState = "paused";
  soltarConfete(isMobile ? 70 : 140);
}

function fecharModal(){
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.animationPlayState = "running";
}

btnSurpresa && btnSurpresa.addEventListener("click", abrirModal);
btnFechar && btnFechar.addEventListener("click", fecharModal);

modal && modal.addEventListener("click", (e) => {
  if (e.target === modal) fecharModal();
});

/* =========================
   LIGHTBOX + SWIPE
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
  if (!lightbox || !lbImg || fotos.length === 0) return;
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
  if (fotos.length === 0) return;
  indiceAtual = (indiceAtual - 1 + fotos.length) % fotos.length;
  abrirLightbox(indiceAtual);
}

function proxima(){
  if (fotos.length === 0) return;
  indiceAtual = (indiceAtual + 1) % fotos.length;
  abrirLightbox(indiceAtual);
}

fotos.forEach((img, i) => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => abrirLightbox(i));
});

lbClose && lbClose.addEventListener("click", fecharLightbox);
lbPrev && lbPrev.addEventListener("click", anterior);
lbNext && lbNext.addEventListener("click", proxima);

lightbox && lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) fecharLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape"){
    fecharModal();
    fecharVideo();     // existe mais abaixo
    fecharLightbox();
  }

  if (!lightbox || !lightbox.classList.contains("show")) return;
  if (e.key === "ArrowLeft") anterior();
  if (e.key === "ArrowRight") proxima();
});

/* Swipe (celular) */
let touchStartX = 0;
let touchStartY = 0;

function isLightboxOpen(){
  return lightbox && lightbox.classList.contains("show");
}

lightbox && lightbox.addEventListener("touchstart", (e) => {
  if (!isLightboxOpen()) return;
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
}, { passive: true });

lightbox && lightbox.addEventListener("touchend", (e) => {
  if (!isLightboxOpen()) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;

  if (Math.abs(dy) > Math.abs(dx)) return;   // ignora gesto vertical
  if (Math.abs(dx) < 45) return;             // sensibilidade

  dx > 0 ? anterior() : proxima();
}, { passive: true });

/* =========================
   BOTÃO GOLFINHO
   ========================= */
const btnGolfinho = $("btnGolfinho");
btnGolfinho && btnGolfinho.addEventListener("click", () => {
  soltarBolhas(isMobile ? 10 : 24);
  soltarConfete(isMobile ? 8 : 22);
  mostrarFeliz20();
});

/* =========================
   MODAL VÍDEO + DUCKING (fade)
   ========================= */
const btnVideo = $("btnVideo");
const videoModal = $("videoModal");
const btnFecharVideo = $("btnFecharVideo");
const meuVideo = $("meuVideo");

let musicaEstavaTocandoAntesDoVideo = false;

function abrirVideo(){
  if (!videoModal) return;
  videoModal.classList.add("show");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.animationPlayState = "paused";

  // marca se a música estava tocando (pra respeitar o estado do usuário)
  musicaEstavaTocandoAntesDoVideo = !!(audio && !audio.paused);

  // tenta dar play no vídeo (no mobile pode exigir clique no play, normal)
  try{ meuVideo && meuVideo.play(); } catch {}
}

function fecharVideo(){
  if (!videoModal) return;

  videoModal.classList.remove("show");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.style.animationPlayState = "running";

  if (meuVideo){
    meuVideo.pause();
    meuVideo.currentTime = 0;
  }

  // se a música estava tocando antes, volta o volume suavemente
  if (audio && musicaEstavaTocandoAntesDoVideo){
    fadeVolume(audio, volumeNormal, 900);
  }
}

btnVideo && btnVideo.addEventListener("click", abrirVideo);
btnFecharVideo && btnFecharVideo.addEventListener("click", fecharVideo);

videoModal && videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) fecharVideo();
});

/* Quando o vídeo começar, baixa o volume da música (sem pausar) */
meuVideo && meuVideo.addEventListener("play", () => {
  if (!audio) return;
  if (!musicaEstavaTocandoAntesDoVideo) return;

  // guarda volume atual como "normal" caso o usuário tenha ajustado
  if (audio.volume > volumeVideo) volumeNormal = audio.volume;

  fadeVolume(audio, volumeVideo, 700);
});

/* Quando o vídeo terminar, sobe o volume de volta */
meuVideo && meuVideo.addEventListener("ended", () => {
  if (!audio) return;
  if (!musicaEstavaTocandoAntesDoVideo) return;

  fadeVolume(audio, volumeNormal, 900);
});

/* =========================
   INICIALIZAÇÃO
   ========================= */
atualizarBotaoMusica(audio ? !audio.paused : false);

