class Jogador extends Obj {
    constructor(x, y, w, h) {
        super(x, y, w, h);

        this.frameAtual = 0;
        this.tempoAnimacao = 0;
        this.velocidadeAnim = 5;

        this.velY = 0;
        this.gravidade = 1;
        this.pulando = false;

        this.vida = 3;
        this.pontos = 0;

        this.width01 = 105;
        this.height01 = 157;

        this.tempoInvencivel = 0;
        this.frameDano = 0;
    }

    mov_pulo() {
        this.velY += this.gravidade;
        this.y += this.velY;

        if (this.y >= 370) {
            this.y = 370;
            this.velY = 0;
            this.pulando = false;
        }
    }

    atualizaAnimacao(arrayDeImagens) {
        this.tempoAnimacao++;

        if (this.tempoAnimacao >= this.velocidadeAnim) {
            this.tempoAnimacao = 0;
            this.frameAtual++;

            if (this.frameAtual >= arrayDeImagens.length) {
                this.frameAtual = 0;
            }
        }
    }

    des_img(arrayDeImagens) {
        if (this.tempoInvencivel > 0) {
            this.frameDano++;
            if (this.frameDano % 10 < 5) {
                return;
            }
        }

        let imgDoMomento = arrayDeImagens[this.frameAtual];
        des.drawImage(imgDoMomento, this.x, this.y, this.width01, this.height01);
    }

    colid(objeto) {
        return (
            this.x < objeto.x + objeto.w &&
            this.x + this.w > objeto.x &&
            this.y < objeto.y + objeto.h &&
            this.y + this.h > objeto.y
        );
    }
}
