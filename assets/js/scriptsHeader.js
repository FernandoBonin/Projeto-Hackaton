// const header = document.querySelector('.header-apresentacao')

// let posicaoScroll = 0;
// let controleAnimacao = false;

// function mudarCorHeader(scrollPos) {
//     header.style.background = `rgba(76, 121, 66, ${scrollPos})`;
// }

// document.addEventListener('scroll', () => {

//     posicaoScroll = window.scrollY;

//     if (!controleAnimacao) {

//         window.requestAnimationFrame(() => {

//             mudarCorHeader(posicaoScroll);
//             controleAnimacao = false;
//         });

//         controleAnimacao = true;
//     }
// });

const divMenu = document.querySelector(".menu-botao");
const listaSpan = document.querySelectorAll(".menu-botao span");
const navAnimacao = document.querySelector(".header-apresentacao nav ul");
let mostrarMenu = true,
  executando = false;

divMenu.addEventListener("click", () => {
  if (mostrarMenu && !executando) {
    mostrarMenu = false;
    executando = true;
    aparecerMenu();
    return;
  }

  if (!executando && !mostrarMenu) {
    mostrarMenu = true;
    executando = true;
    sairMenu();
  }

  return;
});

function aparecerMenu() {
  listaSpan[0].style.animation = "virarX .2s ease forwards";
  listaSpan[1].style.opacity = 0;
  listaSpan[2].style.animation = "virarX2 .2s ease forwards";

  navAnimacao.style.animation = "abrirMenu .5s forwards";

  // medidas recebidas pelas animações
  setTimeout(() => {
    listaSpan[0].style.top = "20px";
    listaSpan[0].style.transform = "rotate(45deg)";
    listaSpan[2].style.top = "20px";
    listaSpan[2].style.transform = "rotate(-45deg)";

    navAnimacao.style.right = "3%";

    executando = false;
  }, 200);
}

function sairMenu() {
  listaSpan[0].style.animation = "voltarX .2s ease forwards";
  listaSpan[2].style.animation = "voltarX2 .2s ease forwards";

  navAnimacao.style.animation = "fecharMenu .5s forwards";
  // medidas recebidas pelas animações
  setTimeout(() => {
    listaSpan[0].style.top = "10px";
    listaSpan[0].style.transform = "rotate(0)";

    listaSpan[1].style.opacity = 1;
    listaSpan[2].style.top = "30px";
    listaSpan[2].style.transform = "rotate(0)";

    navAnimacao.style.right = "-100%";

    executando = false;
  }, 200);
}
