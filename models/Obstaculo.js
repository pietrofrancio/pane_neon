class Obstaculo extends Obj {
    vel = 8; 

    mov_obs() {
        this.x -= this.vel; 
        if (this.x <= -100) {
            this.recomeca();
        }
    }

recomeca() {
        // 1. Descobre qual obstáculo está mais à direita no jogo agora
        let maiorX = Math.max(1300, obs1.x, obs2.x, obs3.x);

        // 2. Espaço mínimo NO LIMITE para dar tempo de desviar
        let espacoMinimo = 300; 
        
        // 3. Posiciona este objeto na "fila", com um espalhamento curtinho (100)
        this.x = maiorX + espacoMinimo + (Math.random() * 100);

        // Sorteia a altura (chão ou alto)
        if (Math.random() > 0.5) {
            this.y = 430; // Chão
        } else {
            this.y = 250; // Alto
        }
    }
}