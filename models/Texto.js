class Texto {
    des_text(text, x, y, cor, font) {
        des.font = font;
        
        // 1. Adiciona uma sombra para destacar do fundo
        des.shadowColor = "rgba(0, 0, 0, 0.7)"; // Preto meio transparente
        des.shadowBlur = 4;                     // Quão borrada é a sombra
        des.shadowOffsetX = 3;                  // Move a sombra pra direita
        des.shadowOffsetY = 3;                  // Move a sombra pra baixo

        // 2. Faz o preenchimento colorido da letra
        des.fillStyle = cor;
        des.fillText(text, x, y);

        // 3AC. Reseta a sombra para não bugar o contorno abaixo
        des.shadowColor = "transparent";

        // 4. Adiciona um contorno grosso em volta da letra
        des.lineWidth = 1;
        des.strokeStyle = 'black';
        des.strokeText(text, x, y);
    }
}
