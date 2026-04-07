class Jogador extends Obj {
    constructor(x, y, w, h) {
        super(x, y, w, h)

        // Controle da animação (qual sprite desenhar e a velocidade de troca)
        this.frameAtual = 0
        this.tempoAnimacao = 0
        this.velocidadeAnim = 5

        // Física básica: velY é a força do pulo/queda, gravidade puxa para baixo
        this.velY = 0
        this.gravidade = 1
        this.pulando = false

        this.vida = 3
        this.pontos = 0

        this.width01 = 105
        this.height01 = 157

        // Status de hit: tempo de imunidade e controle para fazer o boneco piscar
        this.tempoInvencivel = 0
        this.frameDano = 0
    }

    mov_pulo() {
       // 1. A gravidade enfraquece o pulo aos poucos e, depois, acelera a queda
    this.velY += this.gravidade
    
    // 2. Move o personagem de fato (se velY for negativo, sobe; se positivo, desce)
    this.y += this.velY

    // 3. O personagem tocou no chão? (posição 370)
    if (this.y >= 370) {
        this.y = 370          // Trava o personagem para ele não afundar na terra
        this.velY = 0         // Zera a velocidade para ele parar de cair
        this.pulando = false  // Avisa que o pulo acabou (para poder pular de novo)
    }
    }

    atualizaAnimacao(arrayDeImagens) {
        this.tempoAnimacao++

        // Segura a troca de imagem para a animação não ficar rápida demais
        if (this.tempoAnimacao >= this.velocidadeAnim) {
            this.tempoAnimacao = 0
            this.frameAtual++

            // Se chegar no fim da lista de imagens, volta para a primeira (loop)
            if (this.frameAtual >= arrayDeImagens.length) {
                this.frameAtual = 0
            }
        }
    }

  des_img(arrayDeImagens) {
    // Verifica se o estado de invulnerabilidade (i-frames) do jogador está ativo
    if (this.tempoInvencivel > 0) {
        
        // Incrementa o contador responsável pelo loop visual de dano
        this.frameDano++
        
        // Aplica o operador módulo (%) para criar uma onda com período de 10 frames.
        // Isso divide a lógica em duas fases: frames de 0 a 4 (condição verdadeira).
        if (this.frameDano % 10 < 5) {
            
            // Early return: interrompe a execução do método antes da etapa de renderização.
            // Ao omitir o frame de desenho, gera-se o efeito visual de cintilação (flicker).
            return 
        }
    }

    // Obtém a referência do sprite atual alocado em memória, indexado pelo frame da animação
    let imgDoMomento = arrayDeImagens[this.frameAtual]
    
    // Invoca o contexto 2D da Canvas API para renderizar a imagem nas coordenadas (x, y)
    // aplicando a escala visual definida pelas dimensões width01 e height01
    des.drawImage(imgDoMomento, this.x, this.y, this.width01, this.height01)
}

    colid(objeto) {
        // Colisão AABB: cruza as 4 bordas para ver se a área dos dois objetos se sobrepõe
        return (
            this.x < objeto.x + objeto.w && // Lado esquerdo do jogador cruzou o direito do inimigo?
            this.x + this.w > objeto.x &&   // Lado direito do jogador cruzou o esquerdo do inimigo?
            this.y < objeto.y + objeto.h && // Topo do jogador cruzou a base do inimigo?
            this.y + this.h > objeto.y      // Base do jogador cruzou o topo do inimigo?
        )
    }
}