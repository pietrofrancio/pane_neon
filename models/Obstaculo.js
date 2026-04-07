class Obstaculo extends Obj {
    constructor(x, y, w, h) {
        super(x, y, w, h)
        // A velocidade que o obstáculo "corre" na tela (indo para a esquerda)
        this.vel = 8
    }

    mov_obs() {
        // Empurra o obstáculo para a esquerda
        this.x -= this.vel
        
        // O obstáculo já saiu totalmente da tela pela esquerda?
        if (this.x <= -100) {
            // Sim! Então vamos pegar ele e jogar de volta lá pro final da fila
            this.recomeca()
        }
    }

    recomeca() {
        // Olha para todos os obstáculos do jogo e descobre qual está mais longe lá na direita
        let maiorX = Math.max(1300, obs1.x, obs2.x, obs3.x)
        
        // Define um espaço seguro para o jogador conseguir respirar e pular entre um obstáculo e outro
        let espacoMinimo = 300

        // Coloca este obstáculo reciclado lá pro final, logo após o último, com uma distanciozinha aleatória
        this.x = maiorX + espacoMinimo + (Math.random() * 100)
        
        // Decide a altura (50% de chance para cada):
        // Se der mais que 0.5, nasce no chão (430). Se der menos, nasce no ar (250) pro jogador ter que abaixar.
        this.y = Math.random() > 0.5 ? 430 : 250
    }
}