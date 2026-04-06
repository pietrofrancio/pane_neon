// index2.js

// Cria uma lista vazia
const imagensFundo = [];

// Quantos fundos você tem no total?
const totalDeFundos = 6

// O loop vai rodar de 1 até 4
for (let i = 1; i <= totalDeFundos; i++) {
    const img = new Image();
    img.src = `../img/fundo_0${i}.png`; 
    imagensFundo.push(img);
}

let indiceFundoAtual = 0; // Começa no fundo_01
let fundoX = 0;
let opacidadeFundo = 0; // Começa em 0 (totalmente claro)
let velocidadeFundo = 12; // Ajusta-se a velocidade aqui
let opacidadeFim = 0;

// ---------------

// Sons:

const som01 = new Audio('../music/som_01.mp3'); // Ajuste o caminho e nome do arquivo
const som02 = new Audio('../music/som_02.mp3'); // Ajuste o caminho e nome do arquivo
const curar = new Audio('../music/cura.mp3')
const dano = new Audio('../music/dano.mp3')
const pulo = new Audio('../music/pulo.mp3')
const game_over = new Audio('../music/game_over.mp3')
const zombie_01 = new Audio('../music/zombie_01.mp3')
const zombie_02 = new Audio('../music/zombie_02.mp3')
const zombie_03 = new Audio('../music/zombie_03.mp3')
const you_win = new Audio('../music/you_win.mp3')

// Configurações
som01.loop = true;  // Faz a música recomeçar sozinha
som01.volume = 0.3 // Volume de 0 a 1 (0.5 é 50%)
som02.volume = 0.6
curar.volume = 0.5
dano.volume =  0.5
pulo.volume = 0.5
game_over.volume = 0.5
zombie_01.volume = 0.5
zombie_02.volume = 0.5
zombie_03.volume = 0.5
you_win.volume = 0.5




// Imagens:
const imgGameOverTela = new Image();
// MUDE AQUI para o caminho correto da sua imagem
imgGameOverTela.src = '../img/tela_final.png';

const imgVitoriaTela = new Image();
imgVitoriaTela.src = '../img/tela_vitoria.png'

const imgZumbi1 = new Image();
imgZumbi1.src = '../img/zumbi_01.png'; // <-- Crie ou renomeie suas imagens

const imgZumbi2 = new Image();
imgZumbi2.src = '../img/zumbi_02.png';

const imgZumbi3 = new Image();
imgZumbi3.src = '../img/zumbi_03.png';

const imgJogador1 = new Image();
imgJogador1.src = '../img/menino_01.png';

const imgJogador2 = new Image();
imgJogador2.src = '../img/menino_02.png';

const imgJogador3 = new Image();
imgJogador3.src = '../img/menino_03.png';

// NOVO: Carregamento de imagens da Menina
const imgMenina1 = new Image();
imgMenina1.src = '../img/menina_01.png';

const imgMenina2 = new Image();
imgMenina2.src = '../img/menina_02.png';

const imgMenina3 = new Image();
imgMenina3.src = '../img/menina_03.png';

// Guarda todas numa lista (array)
const imgsJogador = [imgJogador1, imgJogador2, imgJogador3]
const imgsMenina = [imgMenina1, imgMenina2, imgMenina3] // NOVO: Lista de imagens da menina
const imgsZumbi = [imgZumbi1, imgZumbi2, imgZumbi3]

const imgKit = new Image()
imgKit.src = '../img/kitMedico.png'

const imgOlho = new Image()
imgOlho.src = '../img/olho.png'

const imgMao = new Image();
imgMao.src = '../img/mao.png';

// const imgCaveira = new Image();
// imgCaveira.src = '../img/caveira.png'; // <-- Agora sim!

// const imgGota = new Image();
// imgGota.src = '../img/gota_sangue.png'; // <-- Agora sim!

// --------------------------------------------------

// Desenho:
const canvas = document.getElementById('des');
const des = canvas.getContext('2d');
// 2. Criamos o objeto que vai segurar a imagem no centro da tela.
// Parâmetros: Obj(x, y, largura, altura, cor_fallback)
// Usamos larg:800 alt:500 para centralizar no canvas 1200x700
const telaGameOverVis = new Obj(0, 0, 1200, 700, 'transparent');
// --------------------------------------------------


// Itens no jogo:
let player = new Jogador(200, 370, 80, 140, 'blue'); // Menino (atrás)
let player2 = new Jogador(300, 370, 80, 140, 'pink'); // NOVO: Menina (na frente - X maior)
let monstro = new InimigoAnimado(0, 365, 140, 160, 'red');
let obs1 = new Obstaculo(1200, 550, 80, 80, 'green');
let obs2 = new Obstaculo(1700, 280, 80, 80, 'green');
let obs3 = new Obstaculo(1400, 400, 80, 80, 'purple');
// let obs4 = new Obstaculo(2000, 280, 80, 80, 'orange');
// let obs5 = new Obstaculo(2600, 400, 80, 80, 'yellow');
// --------------------------------------------------

//  Não entendi muito bem:

obs1.recomeca(); 
obs2.recomeca();
obs3.recomeca();

// --------------------------------------------------

let txt_pontos = new Texto()
let jogar = true
let contadorFrames = 0;
let faseJogo = 0;           // Controla se estamos na fase 0 ou 2
let opacidadeTransicao = 0; // Controla o "preto" da tela
let estadoTransicao = 0;    // 0: inativo, 1: escurecendo, 2: clareando
let tempoRestante = 150; // Começa em 200 segundos
let ganhou = false;      // Ajuda a saber se o jogo parou por morte ou vitória
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
    // Toca a música de fundo
    if (jogar && player.pontos < 100) {
        som01.play();
    } else if (jogar && player.pontos >= 100) {
        som02.play(); 
    }
    
    // --- PULO DO JOGADOR 1 (Tecla 'w' ou 'W') ---
    if ((e.key === 'w' || e.key === 'W') && !player.pulando) {
        player.velY = -20;
        player.pulando = true;
        
        pulo.currentTime = 0;
        pulo.play(); // Toca o som de pulo
    }
    
    // --- PULO DO JOGADOR 2 (Seta para cima) ---
    if (e.key === 'ArrowUp' && !player2.pulando) {
        player2.velY = -20;
        player2.pulando = true;
        
        pulo.currentTime = 0;
        pulo.play(); // Toca o som de pulo
    }
    
    // --- BLOCO DE REINICIAR CORRIGIDO ---
    if(!jogar && e.key === ' ') {
        // 1. Volta os jogadores para as posições X e Y originais
        
        // 2. Reseta todas as velocidades ANTES de recomeçar
        velocidadeFundo = 12; 
        obs1.vel = 12;
        obs2.vel = 12; // Adicionado
        obs3.vel = 12; // Adicionado
        
        // 3. Agora chama o recomeca
        obs1.recomeca();
        obs2.recomeca();
        obs3.recomeca();
        
        player.vida = 3;  // Garante vida cheia
player2.vida = 3; // Garante vida cheia

        player.x = 200
        player2.x = 300
        monstro.x = 0;
        jogar = true;
        tempoRestante = 150; 
        ganhou = false;      
        player.pontos = 0;   // Pontuação compartilhada, usamos do player
        // player2.pontos = 0; // Pontuação compartilhada, não precisa setar individualmente.
        faseJogo = 0;
        
        // 4. Reseta as transições de tela e frames
        opacidadeFim = 0;
        estadoTransicao = 0;    // Adicionado
        opacidadeTransicao = 0; // Adicionado
        contadorFrames = 0;     // Adicionado
        
        som02.pause(); 
        som01.currentTime = 0;
        som01.play(); 
    }
});
// --------------------------------------------------



// Lógica do Jogo em Si:
function colisao() {
    // ==========================================
    // 1. KIT MÉDICO (obs1)
    // ==========================================
    // Jogador 1
    if (player.vida > 0 && player.colid(obs1)) {
        curar.currentTime = 0; 
        curar.play();
        if (player.vida < 3) {
            player.vida += 1;
            monstro.x -= 25; 
        }
        player.pontos += 1; 
        obs1.recomeca(); 
    }
    // Jogador 2
    if (player2.vida > 0 && player2.colid(obs1)) {
        curar.currentTime = 0; 
        curar.play();
        if (player2.vida < 3) {
            player2.vida += 1;
            monstro.x -= 25; 
        }
        player.pontos += 1; 
        obs1.recomeca(); 
    }

    // ==========================================
    // 2. OLHO (obs2) - Toma dano
    // ==========================================
    // Jogador 1
    if (player.vida > 0 && player.colid(obs2) && player.tempoInvencivel <= 0) {
        obs2.recomeca();
        player.vida -= 1;
        dano.currentTime = 0;
        dano.play();
        player.pontos -= 1; 
        monstro.x += 25; 
        player.tempoInvencivel = 60; 
        player.frameDano = 0;      
        tempoTremor = 20;   
        forcaTremor = 10;   
    }
    // Jogador 2
    if (player2.vida > 0 && player2.colid(obs2) && player2.tempoInvencivel <= 0) {
        obs2.recomeca();
        player2.vida -= 1;
        dano.currentTime = 0;
        dano.play();
        player.pontos -= 1; 
        monstro.x += 25; 
        player2.tempoInvencivel = 60; 
        player2.frameDano = 0;      
        tempoTremor = 20;   
        forcaTremor = 10;   
    }

    // ==========================================
    // 3. MÃO (obs3) - Toma dano
    // ==========================================
    // Jogador 1
    if (player.vida > 0 && player.colid(obs3) && player.tempoInvencivel <= 0) {
        obs3.recomeca();
        player.vida -= 1;
        dano.currentTime = 0;
        dano.play();
        player.pontos -= 1; 
        monstro.x += 25; 
        player.tempoInvencivel = 60; 
        player.frameDano = 0;        
        tempoTremor = 20;   
        forcaTremor = 10;   
    }
    // Jogador 2
    if (player2.vida > 0 && player2.colid(obs3) && player2.tempoInvencivel <= 0) {
        obs3.recomeca();
        player2.vida -= 1;
        dano.currentTime = 0;
        dano.play();
        player.pontos -= 1; 
        monstro.x += 50; 
        player2.tempoInvencivel = 60; 
        player2.frameDano = 0;        
        tempoTremor = 20;   
        forcaTremor = 10;   
    }

    // ==========================================
    // REGRAS FINAIS DO JOGO
    // ==========================================
  
    // Se a vida de AMBOS zerar, para o jogo e dá Game Over
    if (player.vida <= 0 && player2.vida <= 0) {
        jogar = false;
        som01.pause();
        som02.pause();
        game_over.currentTime = 0;
        game_over.play();
    }
}

// Não entendi muito bem:

// -----------------------


function desenha() {
    
    // 1. Agora usamos a variável 'faseJogo' que é controlada na transição
    let fase = faseJogo; 

    let proximoIndice = (indiceFundoAtual + 1) % 2; 

    const imgAtual = imagensFundo[fase + indiceFundoAtual];
    const imgProxima = imagensFundo[fase + proximoIndice];

    des.drawImage(imgAtual, fundoX, 0, 1200, 700);
    des.drawImage(imgProxima, fundoX + 1200, 0, 1200, 700);

    if (jogar) {
        // Só desenha o Jogador 1 se a vida for maior que 0
        if (player.vida > 0) {
            player.des_img(imgsJogador);
        }
        
        // Só desenha o Jogador 2 se a vida for maior que 0
        if (player2.vida > 0) {
            player2.des_img(imgsMenina);
        }

        // --- VIDA JOGADOR 1 ---
        txt_pontos.des_text('JOGADOR 1: ', 10, 35, 'white', 'bold 18px Arial');
        for (let i = 0; i < 3; i++) {
            let img = (i < player.vida) ? imgCoracaoCheio : imgCoracaoVazio;
            des.drawImage(img, 120 + i * 35, 15, 30, 30);
        }

        // --- VIDA JOGADOR 2 ---
        txt_pontos.des_text('JOGADOR 2: ', 10, 75, 'white', 'bold 18px Arial');
        for (let i = 0; i < 3; i++) {
            let img = (i < player2.vida) ? imgCoracaoCheio : imgCoracaoVazio;
            des.drawImage(img, 120 + i * 35, 55, 30, 30);
        }

        monstro.des_img_animada(imgsZumbi); 
        obs1.des_img(imgKit);
        obs2.des_img(imgOlho);
        obs3.des_img(imgMao);

        // --- DESENHA A TRANSIÇÃO AQUI ---
        // Só aparece quando o estadoTransicao faz a opacidade ser maior que 0
        if (opacidadeTransicao > 0) {
            des.fillStyle = `rgba(0, 0, 0, ${opacidadeTransicao})`; 
            des.fillRect(0, 0, 1200, 700);
        }
        // --------------------------------

        // --- VIDA JOGADOR 1 ---
        txt_pontos.des_text('JOGADOR 1: ', 10, 35, 'white', 'bold 18px Arial');
        for (let i = 0; i < 3; i++) {
            let img = (i < player.vida) ? imgCoracaoCheio : imgCoracaoVazio;
            des.drawImage(img, 120 + i * 35, 15, 30, 30);
        }

        // --- VIDA JOGADOR 2 ---
        txt_pontos.des_text('JOGADOR 2: ', 10, 75, 'white', 'bold 18px Arial');
        for (let i = 0; i < 3; i++) {
            let img = (i < player2.vida) ? imgCoracaoCheio : imgCoracaoVazio;
            des.drawImage(img, 120 + i * 35, 55, 30, 30);
        }
        
        txt_pontos.des_text('PONTOS: ' + player.pontos, 980, 50, '#FFD700', 'bold 30px Arial');
        txt_pontos.des_text('TEMPO: ' + tempoRestante, 530, 50, 'white', 'bold 30px Arial');
        
    } else {
        // 1. Aumenta a opacidade bem devagar (0.01 é suave, se quiser mais rápido use 0.02)
        if (opacidadeFim < 1) {
            opacidadeFim += 0.01;
        }

        // 2. Salva o estado normal do pincel do Canvas
        des.save();

        // 3. Aplica a transparência atual
        des.globalAlpha = opacidadeFim;

        // --- TELAS FINAIS SEPARADAS ---
        if (ganhou) {
            // Se ganhou, desenha a tela de Vitória
            telaGameOverVis.des_img(imgVitoriaTela);
            txt_pontos.des_text('Aperte ESPAÇO para jogar de novo', 600, 630, 'white', 'bold 24px Arial', 'center');
        } else {
            // Se perdeu a vida, desenha a tela de Game Over normal
            telaGameOverVis.des_img(imgGameOverTela);
            
            txt_pontos.des_text('Aperte ESPAÇO para recomeçar', 600, 630, 'white', 'bold 24px Arial', 'center');
        }

        // 4. Restaura o pincel ao normal para não bugar o resto do jogo!
        des.restore();
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
        
    // --- PONTUAÇÃO E TEMPO POR SEGUNDO ---
        contadorFrames++; 
        if (contadorFrames >= 60) { 
            player.pontos++; // Pontuação compartilhada (usando player)
            tempoRestante--; // <-- NOVO: O tempo cai 1 por segundo
            contadorFrames = 0; 
        }

        // ==========================================
        // --- NOVO: CONDIÇÃO DE VITÓRIA ---
        // ==========================================
        if (tempoRestante <= 0) {
            jogar = false; // Para o jogo
            som01.pause();
            som02.pause();
            you_win.currentTime = 0;
            you_win.play(); // Toca apenas UMA VEZ
            ganhou = true; // Avisa o sistema que foi uma vitória!
        }

        // =======================================================
        // --- LÓGICA DA TRANSIÇÃO (Dispara nos 33 e nos 100 pontos) ---
        // =======================================================
        
        // 1. GATILHOS: Inicia o escurecimento no exato momento
        // Usa pontos compartilhados de player
        // Vai pra Fase 2 (33 pontos)
        if (player.pontos === 50 && faseJogo === 0 && estadoTransicao === 0) {
            estadoTransicao = 1; 
        }
        // Usa pontos compartilhados de player
        // Vai pra Fase 3 (100 pontos)
        if (player.pontos === 100 && faseJogo === 2 && estadoTransicao === 0) {
            estadoTransicao = 1; 
            som01.pause();
            som01.currentTime = 0; // Opcional: rebobina o som antigo
            
            som02.currentTime = 0;
            som02.play();
        }

        // 2. Controla o efeito visual de Fade e as mudanças
        if (estadoTransicao === 1) {
            opacidadeTransicao += 0.05; // Escurece bem rápido
            
            // Quando a tela ficar 100% preta:
            if (opacidadeTransicao >= 1) {
                opacidadeTransicao = 1;
                
                // MUDANÇAS DA FASE 3
                // Usa pontos compartilhados de player
                if (player.pontos >= 100) {
                    faseJogo = 4;  // <-- Índices 4 e 5 (Fundos 5 e 6)
                    obs1.vel = 20; // <-- Velocidade insanamente rápida!
                    obs2.vel = 20;
                    obs3.vel = 20;
                    velocidadeFundo = 20; // Ajusta-se a velocidade aqui
                } 
                // MUDANÇAS DA FASE 2
                // Usa pontos compartilhados de player
                else if (player.pontos >= 50) {
                    faseJogo = 2;  // <-- Índices 2 e 3 (Fundos 3 e 4)
                    obs1.vel = 14; // <-- Velocidade média
                    obs2.vel = 14;
                    obs3.vel = 14;
                    velocidadeFundo = 15; // Ajusta-se a velocidade aqui
                }
                
                estadoTransicao = 2; // Começa a clarear
            }
        } else if (estadoTransicao === 2) {
            opacidadeTransicao -= 0.05; // Clareia bem rápido
            
            if (opacidadeTransicao <= 0) {
                opacidadeTransicao = 0;
                estadoTransicao = 0; // Fim da transição!
            }
        }
        // =======================================================

        // MOVE O FUNDO
        fundoX -= velocidadeFundo;
        if (fundoX <= -1200) {
            fundoX = 0;
            indiceFundoAtual++;
            if (indiceFundoAtual > 1) { 
                indiceFundoAtual = 0; 
            }
        }

        // NOVO: Atualiza invencibilidade para AMBOS os jogadores
        if (player.tempoInvencivel > 0) {
            player.tempoInvencivel -= 1;
        }
        if (player2.tempoInvencivel > 0) {
            player2.tempoInvencivel -= 1;
        }

        // NOVO: Atualiza animação para AMBOS os jogadores
        player.atualizaAnimacao(imgsJogador);
        player2.atualizaAnimacao(imgsMenina); // Passa a lista de imagens da menina
        monstro.atualizaAnimacao(imgsZumbi); 

        // NOVO: Atualiza pulo para AMBOS os jogadores
        player.mov_pulo();
        player2.mov_pulo();

        obs1.mov_obs();
        obs2.mov_obs();
        obs3.mov_obs();
        colisao();
    }
}

function main() {

    des.clearRect(0, 0, 1200, 700)
    
    desenhaComTremor() 
    
    atualiza()
    requestAnimationFrame(main) // <-- Mude para 'main'
}

main();
