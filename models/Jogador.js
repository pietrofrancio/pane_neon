class Jogador extends Obj {
    frameAtual = 0;      // Qual posição do array está aparecendo agora
    tempoAnimacao = 0;   // Contador de frames para a troca
    velocidadeAnim = 5;  // A cada 5 frames, muda a imagem (menor = mais rápido)
    velY = 0
    gravidade = 1 // Força que puxa o jogador para baixo
    pulando = false
    vida = 3
    pontos = 0

    width01 = 105; // Tamanho real da imgmenino_01
    height01 = 157;
    
    tempoInvencivel = 0;
    frameDano = 0;

// Dentro da classe Jogador
mov_pulo() {
    this.velY += this.gravidade;
    this.y += this.velY;

    // Ajuste este valor (estava 450)
    if (this.y >= 370) { 
        this.y = 370; // Onde o personagem encosta no chão
        this.velY = 0;
        this.pulando = false;
    }
}

atualizaAnimacao(arrayDeImagens) {
    this.tempoAnimacao++;

    // Quando o contador chegar na velocidade, troca a imagem
    if (this.tempoAnimacao >= this.velocidadeAnim) {
        this.tempoAnimacao = 0; // Zera o reloginho
        this.frameAtual++;      // Pula pra próxima imagem

        // Se chegou na última imagem, volta pra primeira (loop)
        if (this.frameAtual >= arrayDeImagens.length) {
            this.frameAtual = 0;
        }
    }
}

des_img(arrayDeImagens) {
    // Lógica de piscar ao tomar dano
    if (this.tempoInvencivel > 0) {
        this.frameDano++;
        if (this.frameDano % 10 < 5) {
            return; // Sai da função sem desenhar (faz ele sumir rápido)
        }
    }

    // Pega a imagem exata que tem que aparecer agora
    let imgDoMomento = arrayDeImagens[this.frameAtual];

    // Desenha ela
    des.drawImage(imgDoMomento, this.x, this.y, this.width01, this.height01);
}

    // Mesma lógica de colisão do seu código de referência
    colid(objeto) {
        if ((this.x < objeto.x + objeto.w) &&
            (this.x + this.w > objeto.x) &&
            (this.y < objeto.y + objeto.h) &&
            (this.y + this.h > objeto.y)) {
            return true
        }
        return false
    }
// Novas variáveis de animação
    frameSonic = 0;      // Qual imagem está aparecendo agora
    tempoAnimacao = 0;   // Contador de frames para a troca
    velocidadeAnim = 5;  // A cada 5 frames, muda a imagem (menor = mais rápido)

    // Atualize o método des_img para aceitar o ARRAY de imagens

}