class InimigoAnimado extends Obj {
    constructor(x, y, w, h, cor) {
        super(x, y, w, h, cor)
        this.frameAtual = 0    
        this.tempoAnimacao = 0   
        this.velocidadeAnim = 8   
    }

    atualizaAnimacao(arrayDeImagens) {
        this.tempoAnimacao++ 

        if (this.tempoAnimacao >= this.velocidadeAnim) {
            this.tempoAnimacao = 0
            this.frameAtual++

    
            if (this.frameAtual >= arrayDeImagens.length) {
                this.frameAtual = 0
            }
        }
    }

    des_img_animada(arrayDeImagens) {
        let imgDoMomento = arrayDeImagens[this.frameAtual]
        
        // Desenha o inimigo na tela usando as propriedades de posição e tamanho
        des.drawImage(imgDoMomento, this.x, this.y, this.w, this.h)
    }
}