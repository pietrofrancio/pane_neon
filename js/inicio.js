// MÚSICA
const musica = new Audio('./music/tela_inicial.mp3')
musica.loop = true
musica.volume = 0.1

document.body.addEventListener('click', () => {
  musica.play()
}, { once: true })



// ESCOLHER JOGADOR
const opcoes = document.querySelectorAll('.opcao_jogador')
const btnJogar = document.getElementById('btn_jogar')

opcoes.forEach(opcao => {
  opcao.addEventListener('click', () => {

    // tira o ativo de todos
    opcoes.forEach(o => o.classList.remove('ativo'))

    // ativa o clicado
    opcao.classList.add('ativo')

    // muda o link do botão jogar
    btnJogar.href = opcao.dataset.url
  })
})

// POPUP SOBRE
const abrirSobre = document.getElementById('abrir_sobre')
const popupSobre = document.getElementById('popup_sobre')
const fecharSobre = document.getElementById('fechar_sobre')

abrirSobre.addEventListener('click', () => {
  popupSobre.classList.add('ativo')
})

fecharSobre.addEventListener('click', () => {
  popupSobre.classList.remove('ativo')
})

popupSobre.addEventListener('click', (e) => {
  if (e.target === popupSobre) {
    popupSobre.classList.remove('ativo')
  }
})

// 📦 POPUP COMO JOGAR
const abrirComo = document.getElementById('abrir_como_jogar')
const popupComo = document.getElementById('popup_como_jogar')
const fecharComo = document.getElementById('fechar_como_jogar')

abrirComo.addEventListener('click', () => {
  popupComo.classList.add('ativo')
})

fecharComo.addEventListener('click', () => {
  popupComo.classList.remove('ativo')
})

popupComo.addEventListener('click', (e) => {
  if (e.target === popupComo) {
    popupComo.classList.remove('ativo')
  }
})