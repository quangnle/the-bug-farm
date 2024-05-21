class ControlPanel {
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;        
        this.width = width;
        this.height = height;
        this.color = color;
        
        this.mode = "play";

        const pistilSize = 5;
        const pistilColor = "#ff0000";
        const petalSize = 5;
        const petalColor = "#ffff00";
        const petalNumber = 5;
        this.flowerIcon = new Flower(10, 15, pistilSize, pistilColor, petalSize, petalColor, petalNumber);
    }

    drawPlayModeButton(){        
        fill("#fff");
        rect(10, 5, 90, 20);
        fill("#000");
        text("Play Mode", 30, 20);
        fill("#fff");
        ellipse(20, 15, 4, 4);
        ellipse(15, 20, 4, 4);
        ellipse(25, 20, 4, 4);
    }

    drawPlantModeButton(){
        fill("#fff");
        rect(0, 5, 90, 20);
        fill("#000");
        text("Plant Mode", 20, 20);
        fill("#fff");

        // draw a flower        
        this.flowerIcon.draw();
    }

    draw(){
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);

        push();
        translate(this.x, this.y);
        // draw play mode button
        this.drawPlayModeButton();
        pop();

        push();
        translate(this.x + 110, this.y);
        // draw feed mode button
        this.drawPlantModeButton();
        pop();
        
        // draw a border around the selected mode
        if(this.mode === "play"){
            push();
            translate(this.x, this.y);
            noFill();
            stroke("#00f");
            rect(5, 2, 100, 26);
            pop();
            this.flowerIcon.hasPollen = false;
        } else if (this.mode === "plant") {
            push();
            translate(this.x + 110, this.y);
            noFill();
            stroke("#00f");
            rect(-5, 2, 100, 26);
            pop();
            this.flowerIcon.hasPollen = true;
        }
    }

    mousePressed(button, x, y){
        if (button === LEFT) {
            if (x > this.x && x < this.x + 90 && y > this.y && y < this.y + 30) {
                this.mode = "play";
            } else if (x > this.x + 110 && x < this.x + 200 && y > this.y && y < this.y + 30) {
                this.mode = "plant";
            }
        }
    }
}