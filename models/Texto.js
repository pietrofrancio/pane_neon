class Texto {
    des_text(text, x, y, cor, font) {
        des.font = font;
        des.shadowColor = "rgba(0, 0, 0, 0.7)";
        des.shadowBlur = 4;
        des.shadowOffsetX = 3;
        des.shadowOffsetY = 3;

        des.fillStyle = cor;
        des.fillText(text, x, y);

        des.shadowColor = "transparent";
        des.lineWidth = 1;
        des.strokeStyle = "black";
        des.strokeText(text, x, y);
    }
}
