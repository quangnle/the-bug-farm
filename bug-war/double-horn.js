class DoubleHorn {
    constructor(size, color) {        
        this.size = size;
        this.color = color;
    }

    draw(){
        // draw horn by using triangle shape
        fill(this.color);        
        triangle(0, -this.size >> 1, 0, 0, this.size, -this.size);
        triangle(0, this.size >> 1, 0, 0, this.size, this.size);
    }
}