/* =========================
   CONFIGURAÇÕES
   ========================= */
const nome = "Ana";
const assinatura = "Lucas";
const frase = "Você é meu lugar de paz. 💖";

const isMobile = window.innerWidth < 768;

/* =========================
   ATALHO
   ========================= */
const $ = (id) => document.getElementById(id);

/* =========================
   APLICA TEXTOS
   ========================= */
$("nome") && ($("nome").textContent = nome);
$("assinatura") && ($("assinatura").textContent = assinatura);
$("frase") && ($("frase").textContent = frase);

/* =========================
   MODAL SURPRESA
   ========================= */
const modal = $("modal");
const btnSurpresa = $("btnSurpresa");
const btnFechar = $("btnFechar");

function abrirModal(){
  if (!modal) return;
  modal.classList.add("show");
  document.body.style.animationPlayState = "paused";
  soltarConfete(isMobile ? 60 : 120);
}

function fecharModal(){
  if (!modal) return;
  modal.classList.remove("show");
  document.body.style.animationPlayState = "running";
}

btnSurpresa && btnSurpresa.addEventListener("click", abrirModal);
btnFechar && btnFechar.addEventListener("click", fecharModal);

modal && modal.addEventListener("click", e => {
  if (e.target === modal) fecharModal();
});

/* =========================
   MÚSICA
   ========================= */
const audio = $("audio");
const btnMusica = $("btnMusica");

function atualizarBotaoMusica(tocando){
  if (!btnMusica) return;
  btnMusica.textContent = tocando ? "⏸️ Pausar música" : "🎵 Música";
}

async function toggleMusica(){
  if (!audio) return;
  if (audio.paused){
    try{
      await audio.play();
      atualizarBotaoMusica(true);
      soltarConfete(isMobile ? 14 : 30);
    }catch{
      alert("Erro ao tocar a música.");
    }
  } else {
    audio.pause();
    atualizarBotaoMusica(false);
  }
}

btnMusica && btnMusica.addEventListener("click", toggleMusica);

/* =========================
   LIGHTBOX
   ========================= */
const lightbox = $("lightbox");
const lbImg = $("lbImg");
const lbCaption = $("lbCaption");
const lbClose = $("lbClose");
const lbPrev = $("lbPrev");
const lbNext = $("lbNext");

const fotos = [...document.querySelectorAll(".grid img")];
let indice = 0;

function abrirLightbox(i){
  indice = i;
  if (!lightbox || !lbImg) return;

  lbImg.src = fotos[indice].src;
  lbCaption && (lbCaption.textContent = fotos[indice].alt || "");

  lightbox.classList.add("show");
}

function fecharLightbox(){
  lightbox && lightbox.classList.remove("show");
}

function proxima(){
  indice = (indice + 1) % fotos.length;
  abrirLightbox(indice);
}

function anterior(){
  indice = (indice - 1 + fotos.length) % fotos.length;
  abrirLightbox(indice);
}

fotos.forEach((img,i)=>{
  img.addEventListener("click", ()=>abrirLightbox(i));
});

lbClose && lbClose.addEventListener("click", fecharLightbox);
lbNext && lbNext.addEventListener("click", proxima);
lbPrev && lbPrev.addEventListener("click", anterior);

lightbox && lightbox.addEventListener("click", e=>{
  if (e.target === lightbox) fecharLightbox();
});

document.addEventListener("keydown", e=>{
  if (!lightbox || !lightbox.classList.contains("show")) return;
  if (e.key === "ArrowRight") proxima();
  if (e.key === "ArrowLeft") anterior();
  if (e.key === "Escape") fecharLightbox();
});

/* =========================
   SWIPE NO CELULAR
   ========================= */
let xStart = 0, yStart = 0;

lightbox && lightbox.addEventListener("touchstart", e=>{
  const t = e.touches[0];
  xStart = t.clientX;
  yStart = t.clientY;
},{passive:true});

lightbox && lightbox.addEventListener("touchend", e=>{
  const t = e.changedTouches[0];
  const dx = t.clientX - xStart;
  const dy = t.clientY - yStart;

  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 45){
    dx > 0 ? anterior() : proxima();
  }
},{passive:true});

/* =========================
   GOLFINHO
   ========================= */
const btnGolfinho = $("btnGolfinho");

function soltarBolhas(qtd){
  for(let i=0;i<qtd;i++){
    const b = document.createElement("div");
    b.className = "bubble";
    b.style.left = Math.random()*100+"vw";
    b.style.width = b.style.height = (8+Math.random()*14)+"px";
    b.style.setProperty("--dx",(Math.random()*60-30)+"px");
    document.body.appendChild(b);
    setTimeout(()=>b.remove(),5000);
  }
}

function mostrarFeliz20(){
  document.querySelector(".feliz-20")?.remove();

  const wrap = document.createElement("div");
  wrap.className = "feliz-20";

  const span = document.createElement("span");
  span.textContent = "Feliz 20 anos, meu golfinho 🐬💖";

  wrap.appendChild(span);
  document.body.appendChild(wrap);

  setTimeout(()=>wrap.remove(),3000);
}

btnGolfinho && btnGolfinho.addEventListener("click", ()=>{
  soltarBolhas(isMobile ? 10 : 22);
  soltarConfete(isMobile ? 8 : 20);
  mostrarFeliz20();
});

/* =========================
   CONFETE
   ========================= */
function soltarConfete(qtd){
  for(let i=0;i<qtd;i++){
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random()*100+"vw";
    c.style.background = Math.random()>0.5 ? "#ff5aa5" : "#ff9acb";
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),5000);
  }
}

/* =========================
   INIT
   ========================= */
atualizarBotaoMusica(false);
