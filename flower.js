class Flower {
    constructor(x, y, pistilSize, pistilColor, petalSize, petalColor, petalNumber){
        this.x = x;
        this.y = y;
        this.pistilSize = pistilSize;
        this.pistilColor = pistilColor;
        this.petalSize = petalSize;
        this.petalColor = petalColor;
        this.petalNumber = petalNumber;
        this.hasPollen = false;
        this.numberOfPollens = 10;
        this.spawnningTime = 0;
        this.angle = 0;

        // get bounding box of the flower contains both pistil and petals
        const radius = this.pistilSize + this.petalSize/2;
        this.boundaries = {            
            left: this.x - radius,
            right: this.x + radius,
            top: this.y - radius,
            bottom: this.y + radius
        };
    }

    draw(){
        // draw the petals
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        const angle = TWO_PI / this.petalNumber;
        for(let i = 0; i < this.petalNumber; i++){
            const x = cos(angle * i) * this.pistilSize;
            const y = sin(angle * i) * this.pistilSize;
            fill(this.petalColor);
            ellipse(x, y, this.petalSize, this.petalSize);
        }  

        // draw the pistil
        fill(this.pistilColor);
        ellipse(0, 0, this.pistilSize, this.pistilSize);      
        pop();
        
        // update pollen status
        if (!this.hasPollen) {
            this.spawnningTime += 1;
            this.angle = 0;
        } else {
            this.angle += 0.1;
        }

        if (this.spawnningTime > 300) {
            this.hasPollen = true;
            this.spawnningTime = 0;
            this.numberOfPollens --;
        }
    }
}