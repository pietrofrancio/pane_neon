class Obstaculo extends Obj {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.vel = 8;
    }

    mov_obs() {
        this.x -= this.vel;
        if (this.x <= -100) {
            this.recomeca();
        }
    }

    recomeca() {
        let maiorX = Math.max(1300, obs1.x, obs2.x, obs3.x);
        let espacoMinimo = 300;

        this.x = maiorX + espacoMinimo + (Math.random() * 100);
        this.y = Math.random() > 0.5 ? 430 : 250;
    }
}