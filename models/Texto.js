class Texto {
    des_text(text, x, y, cor, font) {
        // Define o tamanho e o estilo da fonte
        des.font = font
        
        // Configura a Sombra
        des.shadowColor = "rgba(0, 0, 0, 0.7)"
        // Intensidade do borrão da sombra
        des.shadowBlur = 4
        // Desloca a sombra 3 pixels para a direita e 3 para baixo 
        des.shadowOffsetX = 3
        des.shadowOffsetY = 3

        // Define a cor do "enchimento" das letras e desenha o texto principal
        des.fillStyle = cor
        des.fillText(text, x, y)

        // Importante para não aplicar sombra em tudo que vier depois do texto
        des.shadowColor = "transparent"
        
        // Configura o Contorno
        des.lineWidth = 1
        des.strokeStyle = "black"
        // Desenha apenas a "linha de fora" das letras, por cima de tudo
        des.strokeText(text, x, y)
    }
}