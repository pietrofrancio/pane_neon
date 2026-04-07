// Fundo:
// Usamos um array para organizar tudo de forma escalável
const imagensFundo = []

// Define quantos fundos existem no total
const totalDeFundos = 6

// Loop que vai de 1 até o total de fundos
for (let i = 1; i <= totalDeFundos; i++) {
    const img = new Image()

    // Define o caminho da imagem a partir do índice
    img.src = `../img/fundo_0${i}.png`

    // Adiciona a imagem dentro do array
    imagensFundo.push(img)
}

// Guarda QUAL fundo está sendo usado no momento
let indiceFundoAtual = 0

// Controla a posição horizontal do fundo
let fundoX = 0

// Controla a transparência do fundo
let opacidadeFundo = 0

// Velocidade que o fundo se move
let velocidadeFundo = 12

// Opacidade da tela final
let opacidadeFim = 0
// -------------------------------------------------------------------------


// Sons:
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

// Loop e volume dos áudios
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
// --------------------------------------------------------------------------

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

const imgsJogador = [imgJogador1, imgJogador2, imgJogador3]
const imgsZumbi = [imgZumbi1, imgZumbi2, imgZumbi3]

const imgKit = new Image()
imgKit.src = '../img/kitMedico.png'

const imgOlho = new Image()
imgOlho.src = '../img/olho.png'

const imgMao = new Image()
imgMao.src = '../img/mao.png'

const canvas = document.getElementById('des')
const des = canvas.getContext('2d')

const telaGameOverVis = new Obj(0, 0, 1200, 700)

let player = new Jogador(200, 370, 80, 140)
let monstro = new InimigoAnimado(15, 365, 140, 160)
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

    if ((e.key === 'w' || e.key === ' ') && !player.pulando) {
        player.velY = -20
        pulo.currentTime = 0
        pulo.play()
        player.pulando = true
    }

    if (!jogar && e.key === ' ') {
        player = new Jogador(200, 370, 80, 140, 'blue')

        velocidadeFundo = 12
        obs1.vel = 12
        obs2.vel = 12
        obs3.vel = 12

        obs1.recomeca()
        obs2.recomeca()
        obs3.recomeca()

        monstro.x = 15
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
    if (player.colid(obs1)) {
        curar.currentTime = 0
        curar.play()

        if (player.vida < 3) {
            player.vida += 1
            monstro.x -= 50
        }

        player.pontos += 1
        obs1.recomeca()
    }

    if (player.colid(obs2) && player.tempoInvencivel <= 0) {
        obs2.recomeca()
        player.vida -= 1
        dano.currentTime = 0
        dano.play()
        player.pontos -= 1
        monstro.x += 50
        player.tempoInvencivel = 60
        player.frameDano = 0
        tempoTremor = 20
        forcaTremor = 10
    }

    if (player.colid(obs3) && player.tempoInvencivel <= 0) {
        obs3.recomeca()
        player.vida -= 1
        dano.currentTime = 0
        dano.play()
        player.pontos -= 1
        monstro.x += 50
        tempoTremor = 20
        forcaTremor = 10
        player.tempoInvencivel = 60
        player.frameDano = 0
    }

    if (player.pontos < 0) {
        player.pontos = 0
    }

    if (player.vida <= 0) {
        jogar = false
        som01.pause()
        som02.pause()
        game_over.currentTime = 0
        game_over.play()
    }
}

function desenha() {
    let fase = faseJogo // Pula de 2 em 2 para usar todos os índices do array
    let proximoIndice = (indiceFundoAtual + 1) % 2 // Operador de Resto: Funciona com os restos e repete 1 ou 0

    const imgAtual = imagensFundo[fase + indiceFundoAtual]
    const imgProxima = imagensFundo[fase + proximoIndice]

    des.drawImage(imgAtual, fundoX, 0, 1200, 700)
    des.drawImage(imgProxima, fundoX + 1200, 0, 1200, 700)

    if (jogar) {
        player.des_img(imgsJogador)
        monstro.des_img_animada(imgsZumbi)
        obs1.des_img(imgKit)
        obs2.des_img(imgOlho)
        obs3.des_img(imgMao)

        if (opacidadeTransicao > 0) {
            des.fillStyle = `rgba(0, 0, 0, ${opacidadeTransicao})`
            des.fillRect(0, 0, 1200, 700)
        }

        txt_pontos.des_text('PONTOS: ' + player.pontos, 980, 50, '#FFD700', 'bold 30px Arial')
        txt_pontos.des_text('TEMPO: ' + tempoRestante, 530, 50, 'white', 'bold 30px Arial')

        for (let i = 0; i < 3; i++) {
            if (i < player.vida) {
                des.drawImage(imgCoracaoCheio, 10 + i * 40, 10, 50, 50)
            } else {
                des.drawImage(imgCoracaoVazio, 10 + i * 40, 10, 50, 50)
            }
        }
    } else {
        if (opacidadeFim < 1) {
            opacidadeFim += 0.01
        }

        des.save()
        des.globalAlpha = opacidadeFim

        if (ganhou) {
            telaGameOverVis.des_img(imgVitoriaTela)
            txt_pontos.des_text('Aperte ESPAÇO para jogar de novo', 600, 630, 'white', 'bold 24px Arial')
        } else {
            telaGameOverVis.des_img(imgGameOverTela)
            txt_pontos.des_text('Aperte ESPAÇO para recomeçar', 600, 630, 'white', 'bold 24px Arial')
        }

        des.restore()
    }
}

function desenhaComTremor() {
    if (tempoTremor > 0){ 
        des.save() // Tira um "print" do estado atual do pincel


        // Math.random() - 0.5 gera um número entre -0.5 e 0.5
        // Multiplicar por 2 e pela força faz a tela pular para direções variadas
        let dx = (Math.random() - 0.5) * 2 * forcaTremor
        let dy = (Math.random() - 0.5) * 2 * forcaTremor

        des.translate(dx, dy) // "Empurra" o cenário inteiro para essa posição sorteada
        desenha()             // Desenha tudo nessa posição torta
        des.restore()         // Volta o pincel para a posição normal (0,0) para o próximo frame

        tempoTremor-- // Diminui o tempo para o tremor não ser infinito
    } else {
        desenha() // Se não houver tremor, desenha o jogo normalmente parado
    }
}

function atualiza() {
    if (jogar) {
        contadorFrames++ // Soma 1 a cada vez que o jogo redesenha 

        if (contadorFrames >= 60) { // Se passou 1 segundo (60 frames)
            player.pontos++        // Dá 1 ponto automático por sobrevivência
            tempoRestante--        // Diminui 1 segundo do cronômetro
            contadorFrames = 0     // Reseta o contador para começar o próximo segundo
        }

   
        if (tempoRestante <= 0) {
            jogar = false         // Para o movimento do jogo
            som01.pause()
            som02.pause()
            you_win.currentTime = 0
            you_win.play()        
            ganhou = true     
        }

 
        // Se chegar a 50 pontos e estiver na fase 0, começa a transição
        if (player.pontos === 50 && faseJogo === 0 && estadoTransicao === 0) {
            estadoTransicao = 1
        }

        // Se chegar a 100 pontos e estiver na fase 2, troca a música e inicia transição
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
                    obs1.vel = 18; obs2.vel = 18; obs3.vel = 18; 
                    velocidadeFundo = 18
                } else if (player.pontos >= 50) {
                    faseJogo = 2 
                    obs1.vel = 14; obs2.vel = 14; obs3.vel = 14
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

       
        fundoX -= velocidadeFundo // Move o X para a esquerda

        if (fundoX <= -1200) { // Se a imagem sumiu toda pela esquerda...
            fundoX = 0         // Teletransporta ela de volta para o início
            indiceFundoAtual++ // Alterna qual quadro do fundo está sendo exibido

            if (indiceFundoAtual > 1) {
                indiceFundoAtual = 0 // Garante que fique só entre quadro 0 e 1
            }
        }

        if (player.tempoInvencivel > 0) {
            player.tempoInvencivel -= 1 // Diminui o tempo de "piscar" após o dano
        }


        player.atualizaAnimacao(imgsJogador)
        monstro.atualizaAnimacao(imgsZumbi)

        player.mov_pulo()
        obs1.mov_obs()
        obs2.mov_obs()
        obs3.mov_obs()
        colisao() 
    }
}

function main() {
    // Apaga o desenho do frame anterior para não deixar rastros
    des.clearRect(0, 0, 1200, 700)
    desenhaComTremor()
    atualiza()

    // O requestAnimationFrame avisa ao navegador 
    // "Assim que você estiver pronto para pintar a tela de novo, chame a função main"
    // Isso cria um ciclo infinito que roda geralmente a 60 FPS (quadros por segundo)
    requestAnimationFrame(main)
}

// Chama a função main pela primeira vez para o jogo começar a rodar. 
main()