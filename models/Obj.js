class Obj {
    constructor(x, y, w, h, cor) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.cor = cor
    }

    // Método que você já usa para desenhar formas simples
    des_quad() {
        des.fillStyle = this.cor
        des.fillRect(this.x, this.y, this.w, this.h)
    }
    
    des_img(img) {
        des.drawImage(img, this.x, this.y, this.sw || this.w, this.sh || this.h)
    }
}

class Jogador extends Obj {
    velY = 0
    gravidade = 1.2 // Força que puxa o jogador para baixo
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
    des_img(img) {
        des.drawImage(img, this.x, this.y, this.width01, this.height01)
    }
}
class Obstaculo extends Obj {
    vel = 8 // Velocidade com que o cenário "corre" para a esquerda

    mov_obs() {
        this.x -= this.vel // Move o objeto para a esquerda

        // Se sair da tela, volta para a direita com posição aleatória
        if (this.x <= -100) {
            this.recomeca()
        }
    }

recomeca() {
    this.x = 1300 + Math.random() * 800;
    
    if (Math.random() > 0.5) {
        this.y = 430; // Chão: Teste este valor para alinhar com os pés do Sonic
    } else {
        this.y = 250; // Alto: Para ele ter que pular ou abaixar
    }
}
}

class Texto {
    des_text(text, x, y, cor, font) {
        des.fillStyle = cor
        des.font = font
        des.fillText(text, x, y)
    }
}