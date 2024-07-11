class SingleHorn {
    constructor(size, color) {        
        this.size = size;
        this.color = color;
    }

    draw(){
        // draw horn by using triangle shape
        fill(this.color);        
        triangle(this.size >> 2, -this.size >> 2, this.size >> 2, this.size >> 2, this.size, 0);
    }
}