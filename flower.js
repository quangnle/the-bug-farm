class Flower {
    constructor(x, y, pistilSize, pistilColor, petalSize, petalColor, petalNumber){
        this.x = x;
        this.y = y;
        this.pistilSize = pistilSize;
        this.pistilColor = pistilColor;
        this.petalSize = petalSize;
        this.petalColor = petalColor;
        this.petalNumber = petalNumber;
        // get boundaries for the flower
        this.boundaries = {
            left: this.x - this.pistilSize / 2 - this.petalSize, 
            right: this.x + this.pistilSize / 2 + this.petalSize, 
            top: this.y - this.pistilSize / 2 - this.petalSize, 
            bottom: this.y + this.pistilSize / 2 + this.petalSize
        };
    }

    draw(){
        // draw the petals
        const angle = TWO_PI / this.petalNumber;
        for(let i = 0; i < this.petalNumber; i++){
            const x = this.x + cos(angle * i) * this.pistilSize / 2;
            const y = this.y + sin(angle * i) * this.pistilSize / 2;
            fill(this.petalColor);
            ellipse(x, y, this.petalSize, this.petalSize);
        }  
        // draw the pistil
        fill(this.pistilColor);
        ellipse(this.x, this.y, this.pistilSize, this.pistilSize);      
    }
}