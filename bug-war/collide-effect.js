class CollideEffect {
    constructor(x, y, size, col) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = col;
        this.alpha = 255;
    }

    update() {
        this.alpha -= 5;
    }

    draw(){        
        noStroke();                
        fill(red(this.color), green(this.color), blue(this.color), this.alpha);
        const size = this.size * (255 - this.alpha) / 255;
        ellipse(this.x, this.y, size, size);
        stroke(0);
    }
}