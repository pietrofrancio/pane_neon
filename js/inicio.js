const opcoesJogadores = document.querySelectorAll('.opcao_jogador');
const btnJogar = document.getElementById('btn_jogar');

const btnAbrirSobre = document.getElementById("abrir_sobre");
const popupSobre = document.getElementById("popup_sobre");
const btnFecharSobre = document.getElementById("fechar_sobre");

const btnAbrirComoJogar = document.getElementById("abrir_como_jogar");
const popupComoJogar = document.getElementById("popup_como_jogar");
const btnFecharComoJogar = document.getElementById("fechar_como_jogar");

const telaInicial = new Audio('./music/tela_inicial.mp3');
telaInicial.loop = true;
telaInicial.volume = 0.1;

function tocarMusica() {
  telaInicial.play();
}

/* POPUP SOBRE */
btnAbrirSobre.addEventListener("click", function () {
  popupSobre.classList.add("ativo");
});

btnFecharSobre.addEventListener("click", function () {
  popupSobre.classList.remove("ativo");
});

popupSobre.addEventListener("click", function (e) {
  if (e.target === popupSobre) {
    popupSobre.classList.remove("ativo");
  }
});


/* POPUP COMO JOGAR */
btnAbrirComoJogar.addEventListener("click", function () {
  popupComoJogar.classList.add("ativo");
});

btnFecharComoJogar.addEventListener("click", function () {
  popupComoJogar.classList.remove("ativo");
});

popupComoJogar.addEventListener("click", function (e) {
  if (e.target === popupComoJogar) {
    popupComoJogar.classList.remove("ativo");
  }
});


/* SELETOR DE JOGADORES */
opcoesJogadores.forEach(opcao => {
  opcao.addEventListener('click', function () {
    opcoesJogadores.forEach(op => op.classList.remove('ativo'));
    this.classList.add('ativo');

    const novaUrl = this.getAttribute('data-url');
    btnJogar.href = novaUrl;
  });
});


/* TOCAR MÚSICA NO PRIMEIRO CLIQUE */
document.body.addEventListener('click', tocarMusica, { once: true });