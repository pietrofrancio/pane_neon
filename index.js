
// Troca de Fundos
const caminhos = ['../img/fundo_01.png', '../img/fundo_02.png', '../img/fundo_03.png'];
const imagensFundo = caminhos.map(src => {
    const img = new Image();
    img.src = src;
    return img;
});
let indiceFundoAtual = 0; // Começa no fundo_01
let fundoX = 0;
let velocidadeFundo = 15; // Ajusta-se a velocidade aqui

// ---------------

// Imagens:
const imgZumbi = new Image();
imgZumbi.src = '../img/zumbi.png'; 

const imgJogador = new Image();
imgJogador.src = '../img/menino_01.png';

const imgKit = new Image()
imgKit.src = '../img/kitMedico.png'

const imgOlho = new Image()
imgOlho.src = '../img/olho.png'
// --------------------------------------------------

// Desenho:
const canvas = document.getElementById('des');
const des = canvas.getContext('2d');
// --------------------------------------------------


// Itens no jogo:
let player = new Jogador(200, 370, 80, 140, 'blue');
let monstro = new Obj(0, 310, 275, 325, 'red');
let obs1 = new Obstaculo(1200, 550, 80, 80, 'green');
let obs2 = new Obstaculo(1700, 280, 80, 80, 'green');
// --------------------------------------------------

//  Não entendi muito bem:

obs1.recomeca(); 
obs2.recomeca();
// --------------------------------------------------

let txt_pontos = new Texto()
let jogar = true
// --------------------------------------------------


// Tremor da Tela:
let tempoTremor = 0; // Quanto tempo a tela ainda vai tremer 
let forcaTremor = 0; // Quão forte será o tremor 
// --------------------------------------------------

// Vida
const imgCoracaoCheio = new Image()
imgCoracaoCheio.src = '../img/coracao_cheio.png'

const imgCoracaoVazio = new Image()
imgCoracaoVazio.src = '../img/coracao_vazio.png'
// --------------------------------------------------


// Controles:
document.addEventListener('keydown', (e) => {
    if ((e.key === 'w' || e.key === ' ') && !player.pulando) {
        player.velY = -20;
        player.pulando = true;
    }
    
    if(!jogar && e.key === ' ') {
        player = new Jogador(200, 450, 80, 140, 'blue'); 
        obs1.recomeca();
        obs2.recomeca();
        monstro.x = -100;
        jogar = true;
    }
});
// --------------------------------------------------



// Lógica do Jogo em Si:
function colisao() {
    // Verifica se bateu no kit médico
    if (player.colid(obs1)) {
        if (player.vida < 3) {
            player.vida += 1
            monstro.x -= 50 // O zumbi se afasta quando o Sonic recupera vida
        }
        obs1.recomeca() 
    }

    // Verifica se bateu no olho (obs2)
    if (player.colid(obs2) && player.tempoInvencivel <= 0) {
        obs2.recomeca()
        player.vida -= 1
        monstro.x += 50 

        tempoTremor = 20;   // Vai tremer por 20 frames
        forcaTremor = 10;   // Força do tremor (10 pixels)
        
        player.tempoInvencivel = 60; // Vai piscar por 60 frames
        player.frameDano = 0;        // Zera o contador do piscar
    }

    // Se a vida zerar, para o jogo
    if (player.vida <= 0) {
        jogar = false
    }
}


// Não entendi muito bem:
function pontuacao() {
    // Ganha pontos conforme os obstáculos passam por ele
    if (obs1.x < player.x && !obs1.marcou) {
        player.pontos += 1
        obs1.marcou = true // Impede ganhar mil pontos em um segundo
    }
    if (obs1.x > player.x) obs1.marcou = false // Reseta para a próxima volta
}
// -----------------------


function desenha() {
    // Define qual é a próxima imagem
    let proximoIndice = (indiceFundoAtual + 1) % imagensFundo.length;

    const imgAtual = imagensFundo[indiceFundoAtual];
    const imgProxima = imagensFundo[proximoIndice];

    // Desenha a imagem atual e a próxima logo em seguida
    des.drawImage(imgAtual, fundoX, 0, 1200, 700);
    des.drawImage(imgProxima, fundoX + 1200, 0, 1200, 700);

    if (jogar) {
       player.des_img(imgJogador)
       monstro.des_img(imgZumbi);
        obs1.des_img(imgKit);
        obs2.des_img(imgOlho);

        // Não entendi
        txt_pontos.des_text('Pontos: ' + player.pontos, 1050, 40, 'black', '20px Arial');
        
        // Também não entendi
        for (let i = 0; i < 3; i++) {
            if (i < player.vida) {
                des.drawImage(imgCoracaoCheio, 10 + i * 40, 10, 50, 50);
            } else {
                des.drawImage(imgCoracaoVazio, 10 + i * 40, 10, 50, 50);
            }
        }
    } else {
        txt_pontos.des_text('GAME OVER', 450, 250, 'red', '60px Arial');
        txt_pontos.des_text('Aperte ESPAÇO para recomeçar', 370, 330, 'black', '24px Arial');
    }
}

// --- FUNÇÃO PARA GERENCIAR O TREMOR ---
function desenhaComTremor() {
    // Se o cronômetro de tremor for maior que zero...
    if (tempoTremor > 0) {
        des.save(); // 1. Salva o estado atual do canvas (posição original)

        // 2. Calcula um deslocamento aleatório baseado na força
        let dx = (Math.random() - 0.5) * 2 * forcaTremor;
        let dy = (Math.random() - 0.5) * 2 * forcaTremor;

        // 3. Move o canvas temporariamente
        des.translate(dx, dy);

        // 4. Desenha tudo na posição tremida
        desenha();

        des.restore(); // 5. Restaura o canvas para a posição original

        tempoTremor--; // Diminui o cronômetro
    } else {
        // Se não estiver tremendo, desenha normal
        desenha();
    }
}

function atualiza() {
    if (jogar) {
        // Move o fundo
        fundoX -= velocidadeFundo;

        // Quando a imagem atual sai totalmente da tela
        if (fundoX <= -1200) {
            fundoX = 0; // Reseta a posição X
            indiceFundoAtual++; // Pula para a próxima imagem
            
            // Se acabar o array, volta para a primeira imagem
            if (indiceFundoAtual >= imagensFundo.length) {
                indiceFundoAtual = 0; 
            }
        }

        // --- CÓDIGO NOVO AQUI ---
        // Se o jogador estiver invencível, diminui o tempo a cada frame
        if (player.tempoInvencivel > 0) {
            player.tempoInvencivel -= 1;
        }
        // ------------------------

        // Restante da lógica
        player.mov_pulo();
        obs1.mov_obs();
        obs2.mov_obs();
        colisao();
        pontuacao();
    }
}

function main() {
    des.clearRect(0, 0, 1200, 700)
    
    desenhaComTremor() 
    
    atualiza()
    requestAnimationFrame(main)
}

main();