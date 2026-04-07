const imagensFundo = []
const totalDeFundos = 6

for (let i = 1; i <= totalDeFundos; i++) {
    const img = new Image()
    img.src = `../img/fundo_0${i}.png`
    imagensFundo.push(img)
}

let indiceFundoAtual = 0
let fundoX = 0
let opacidadeFundo = 0
let velocidadeFundo = 12
let opacidadeFim = 0

const som01 = new Audio('../music/som_01.mp3')
const som02 = new Audio('../music/som_02.mp3')
const curar = new Audio('../music/cura.mp3')
const dano = new Audio('../music/dano.mp3')
const pulo = new Audio('../music/pulo.mp3')
const game_over = new Audio('../music/game_over.mp3')
const zombie_01 = new Audio('../music/zombie_01.mp3')
const zombie_02 = new Audio('../music/zombie_02.mp3')
const zombie_03 = new Audio('../music/zombie_03.mp3')
const you_win = new Audio('../music/you_win.mp3')

som01.loop = true
som01.volume = 0.3
som02.volume = 0.6
curar.volume = 0.5
dano.volume = 0.5
pulo.volume = 0.5
game_over.volume = 0.5
zombie_01.volume = 0.5
zombie_02.volume = 0.5
zombie_03.volume = 0.5
you_win.volume = 0.5

const imgGameOverTela = new Image()
imgGameOverTela.src = '../img/tela_final.png'

const imgVitoriaTela = new Image()
imgVitoriaTela.src = '../img/tela_vitoria.png'

const imgZumbi1 = new Image()
imgZumbi1.src = '../img/zumbi_01.png'

const imgZumbi2 = new Image()
imgZumbi2.src = '../img/zumbi_02.png'

const imgZumbi3 = new Image()
imgZumbi3.src = '../img/zumbi_03.png'

const imgJogador1 = new Image()
imgJogador1.src = '../img/menino_01.png'

const imgJogador2 = new Image()
imgJogador2.src = '../img/menino_02.png'

const imgJogador3 = new Image()
imgJogador3.src = '../img/menino_03.png'

const imgMenina1 = new Image()
imgMenina1.src = '../img/menina_01.png'

const imgMenina2 = new Image()
imgMenina2.src = '../img/menina_02.png'

const imgMenina3 = new Image()
imgMenina3.src = '../img/menina_03.png'

const imgsJogador = [imgJogador1, imgJogador2, imgJogador3]
const imgsMenina = [imgMenina1, imgMenina2, imgMenina3]
const imgsZumbi = [imgZumbi1, imgZumbi2, imgZumbi3]

const imgKit = new Image()
imgKit.src = '../img/kitMedico.png'

const imgOlho = new Image()
imgOlho.src = '../img/olho.png'

const imgMao = new Image()
imgMao.src = '../img/mao.png'

const canvas = document.getElementById('des')
const des = canvas.getContext('2d')
const telaGameOverVis = new Obj(0, 0, 1200, 700, 'transparent')

let player = new Jogador(200, 370, 80, 140)
let player2 = new Jogador(300, 370, 80, 140)
let monstro = new InimigoAnimado(0, 365, 140, 160)
let obs1 = new Obstaculo(1200, 550, 80, 80)
let obs2 = new Obstaculo(1700, 280, 80, 80)
let obs3 = new Obstaculo(1400, 400, 80, 80)

obs1.recomeca()
obs2.recomeca()
obs3.recomeca()

let txt_pontos = new Texto()
let jogar = true
let contadorFrames = 0
let faseJogo = 0
let opacidadeTransicao = 0
let estadoTransicao = 0
let tempoRestante = 150
let ganhou = false

let tempoTremor = 0
let forcaTremor = 0

const imgCoracaoCheio = new Image()
imgCoracaoCheio.src = '../img/coracao_cheio.png'

const imgCoracaoVazio = new Image()
imgCoracaoVazio.src = '../img/coracao_vazio.png'

document.addEventListener('keydown', (e) => {
    if (jogar && player.pontos < 100) {
        som01.play()
    } else if (jogar && player.pontos >= 100) {
        som02.play()
    }

    if (jogar && player.vida > 0 && (e.key === 'w' || e.key === 'W') && !player.pulando) {
        player.velY = -20
        player.pulando = true
        pulo.currentTime = 0
        pulo.play()
    }

    if (jogar && player2.vida > 0 && e.key === 'ArrowUp' && !player2.pulando) {
        player2.velY = -20
        player2.pulando = true
        pulo.currentTime = 0
        pulo.play()
    }

    if (!jogar && e.key === ' ') {
        velocidadeFundo = 12
        obs1.vel = 12
        obs2.vel = 12
        obs3.vel = 12

        obs1.recomeca()
        obs2.recomeca()
        obs3.recomeca()

        player.vida = 3
        player2.vida = 3
        player.x = 200
        player2.x = 300
        monstro.x = 0
        jogar = true
        tempoRestante = 150
        ganhou = false
        player.pontos = 0
        faseJogo = 0
        opacidadeFim = 0
        estadoTransicao = 0
        opacidadeTransicao = 0
        contadorFrames = 0

        som02.pause()
        som01.currentTime = 0
        som01.play()
    }
})

function colisao() {
    if (player.vida > 0 && player.colid(obs1)) {
        curar.currentTime = 0
        curar.play()
        if (player.vida < 3) {
            player.vida += 1
            monstro.x -= 25
        }
        player.pontos += 1
        obs1.recomeca()
    }

    if (player2.vida > 0 && player2.colid(obs1)) {
        curar.currentTime = 0
        curar.play()
        if (player2.vida < 3) {
            player2.vida += 1
            monstro.x -= 25
        }
        player.pontos += 1
        obs1.recomeca()
    }

    if (player.vida > 0 && player.colid(obs2) && player.tempoInvencivel <= 0) {
        obs2.recomeca()
        player.vida -= 1
        dano.currentTime = 0
        dano.play()
        player.pontos -= 1
        monstro.x += 25
        player.tempoInvencivel = 60
        player.frameDano = 0
        tempoTremor = 20
        forcaTremor = 10
    }

    if (player2.vida > 0 && player2.colid(obs2) && player2.tempoInvencivel <= 0) {
        obs2.recomeca()
        player2.vida -= 1
        dano.currentTime = 0
        dano.play()
        player.pontos -= 1
        monstro.x += 25
        player2.tempoInvencivel = 60
        player2.frameDano = 0
        tempoTremor = 20
        forcaTremor = 10
    }

    if (player.vida > 0 && player.colid(obs3) && player.tempoInvencivel <= 0) {
        obs3.recomeca()
        player.vida -= 1
        dano.currentTime = 0
        dano.play()
        player.pontos -= 1
        monstro.x += 25
        player.tempoInvencivel = 60
        player.frameDano = 0
        tempoTremor = 20
        forcaTremor = 10
    }

    if (player2.vida > 0 && player2.colid(obs3) && player2.tempoInvencivel <= 0) {
        obs3.recomeca()
        player2.vida -= 1
        dano.currentTime = 0
        dano.play()
        player.pontos -= 1
        monstro.x += 25
        player2.tempoInvencivel = 60
        player2.frameDano = 0
        tempoTremor = 20
        forcaTremor = 10
    }

    if (player.vida <= 0 && player2.vida <= 0) {
        jogar = false
        som01.pause()
        som02.pause()
        game_over.currentTime = 0
        game_over.play()
    }
}

function desenha() {
    let fase = faseJogo
    let proximoIndice = (indiceFundoAtual + 1) % 2

    const imgAtual = imagensFundo[fase + indiceFundoAtual]
    const imgProxima = imagensFundo[fase + proximoIndice]

    des.drawImage(imgAtual, fundoX, 0, 1200, 700)
    des.drawImage(imgProxima, fundoX + 1200, 0, 1200, 700)

    if (jogar) {
        if (player.vida > 0) {
            player.des_img(imgsJogador)
        }

        if (player2.vida > 0) {
            player2.des_img(imgsMenina)
        }

        txt_pontos.des_text('JOGADOR 1: ', 10, 35, 'white', 'bold 18px Arial')
        for (let i = 0; i < 3; i++) {
            let img = i < player.vida ? imgCoracaoCheio : imgCoracaoVazio
            des.drawImage(img, 120 + i * 35, 15, 30, 30)
        }

        txt_pontos.des_text('JOGADOR 2: ', 10, 75, 'white', 'bold 18px Arial')
        for (let i = 0; i < 3; i++) {
            let img = i < player2.vida ? imgCoracaoCheio : imgCoracaoVazio
            des.drawImage(img, 120 + i * 35, 55, 30, 30)
        }

        monstro.des_img_animada(imgsZumbi)
        obs1.des_img(imgKit)
        obs2.des_img(imgOlho)
        obs3.des_img(imgMao)

        if (opacidadeTransicao > 0) {
            des.fillStyle = `rgba(0, 0, 0, ${opacidadeTransicao})`
            des.fillRect(0, 0, 1200, 700)
        }

        txt_pontos.des_text('JOGADOR 1: ', 10, 35, 'white', 'bold 18px Arial')
        for (let i = 0; i < 3; i++) {
            let img = i < player.vida ? imgCoracaoCheio : imgCoracaoVazio
            des.drawImage(img, 120 + i * 35, 15, 30, 30)
        }

        txt_pontos.des_text('JOGADOR 2: ', 10, 75, 'white', 'bold 18px Arial')
        for (let i = 0; i < 3; i++) {
            let img = i < player2.vida ? imgCoracaoCheio : imgCoracaoVazio
            des.drawImage(img, 120 + i * 35, 55, 30, 30)
        }

        txt_pontos.des_text('PONTOS: ' + player.pontos, 980, 50, '#FFD700', 'bold 30px Arial')
        txt_pontos.des_text('TEMPO: ' + tempoRestante, 530, 50, 'white', 'bold 30px Arial')
    } else {
        if (opacidadeFim < 1) {
            opacidadeFim += 0.01
        }

        des.save()
        des.globalAlpha = opacidadeFim

        if (ganhou) {
            telaGameOverVis.des_img(imgVitoriaTela)
            txt_pontos.des_text('Aperte ESPAÇO para jogar de novo', 600, 630, 'white', 'bold 24px Arial', 'center')
        } else {
            telaGameOverVis.des_img(imgGameOverTela)
            txt_pontos.des_text('Aperte ESPAÇO para recomeçar', 600, 630, 'white', 'bold 24px Arial', 'center')
        }

        des.restore()
    }
}

function desenhaComTremor() {
    if (tempoTremor > 0) {
        des.save()

        let dx = (Math.random() - 0.5) * 2 * forcaTremor
        let dy = (Math.random() - 0.5) * 2 * forcaTremor

        des.translate(dx, dy)
        desenha()
        des.restore()
        tempoTremor--
    } else {
        desenha()
    }
}

function atualiza() {
    if (jogar) {
        contadorFrames++
        if (contadorFrames >= 60) {
            player.pontos++
            tempoRestante--
            contadorFrames = 0
        }

        if (tempoRestante <= 0) {
            jogar = false
            som01.pause()
            som02.pause()
            you_win.currentTime = 0
            you_win.play()
            ganhou = true
        }

        if (player.pontos === 50 && faseJogo === 0 && estadoTransicao === 0) {
            estadoTransicao = 1
        }

        if (player.pontos === 100 && faseJogo === 2 && estadoTransicao === 0) {
            estadoTransicao = 1
            som01.pause()
            som01.currentTime = 0
            som02.currentTime = 0
            som02.play()
        }

        if (estadoTransicao === 1) {
            opacidadeTransicao += 0.05

            if (opacidadeTransicao >= 1) {
                opacidadeTransicao = 1

                if (player.pontos >= 100) {
                    faseJogo = 4
                    obs1.vel = 18
                    obs2.vel = 18
                    obs3.vel = 18
                    velocidadeFundo = 20
                } else if (player.pontos >= 50) {
                    faseJogo = 2
                    obs1.vel = 14
                    obs2.vel = 14
                    obs3.vel = 14
                    velocidadeFundo = 15
                }

                estadoTransicao = 2
            }
        } else if (estadoTransicao === 2) {
            opacidadeTransicao -= 0.05

            if (opacidadeTransicao <= 0) {
                opacidadeTransicao = 0
                estadoTransicao = 0
            }
        }

        fundoX -= velocidadeFundo
        if (fundoX <= -1200) {
            fundoX = 0
            indiceFundoAtual++
            if (indiceFundoAtual > 1) {
                indiceFundoAtual = 0
            }
        }

        if (player.tempoInvencivel > 0) {
            player.tempoInvencivel -= 1
        }

        if (player2.tempoInvencivel > 0) {
            player2.tempoInvencivel -= 1
        }

        player.atualizaAnimacao(imgsJogador)
        player2.atualizaAnimacao(imgsMenina)
        monstro.atualizaAnimacao(imgsZumbi)

        player.mov_pulo()
        player2.mov_pulo()

        obs1.mov_obs()
        obs2.mov_obs()
        obs3.mov_obs()
        colisao()
    }
}

function main() {
    des.clearRect(0, 0, 1200, 700)
    desenhaComTremor()
    atualiza()
    requestAnimationFrame(main)
}

main()