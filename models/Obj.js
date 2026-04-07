class Obj {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    des_img(img) {
        des.drawImage(img, this.x, this.y, this.sw || this.w, this.sh || this.h);
    }
}
