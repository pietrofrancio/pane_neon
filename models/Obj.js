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