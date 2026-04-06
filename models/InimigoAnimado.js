class InimigoAnimado extends Obj {
    constructor(x, y, w, h, cor) {
        super(x, y, w, h, cor); // Chama o construtor do Obj original
        
        // Variáveis de controle da animação (Copiado da lógica do Jogador)
        this.frameAtual = 0;      // Qual imagem do array está passando
        this.tempoAnimacao = 0;   // Contador de frames
        this.velocidadeAnim = 8;  // Velocidade (maior = mais lento, zumbi costuma ser lento)
    }

    // Método para atualizar qual frame deve aparecer (Igual ao do Jogador)
    atualizaAnimacao(arrayDeImagens) {
        this.tempoAnimacao++;

        if (this.tempoAnimacao >= this.velocidadeAnim) {
            this.tempoAnimacao = 0;
            this.frameAtual++;

            if (this.frameAtual >= arrayDeImagens.length) {
                this.frameAtual = 0; // Volta pro início (loop)
            }
        }
    }

    // Método para desenhar a imagem atual (Adaptado do Jogador, usando o tamanho do Obj)
    des_img_animada(arrayDeImagens) {
        // Pega a imagem exata do array baseada no frame atual
        let imgDoMomento = arrayDeImagens[this.frameAtual];

        // Desenha usando o x, y, largura (w) e altura (h) deste objeto
        des.drawImage(imgDoMomento, this.x, this.y, this.w, this.h);
    }
}