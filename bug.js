class Bug{
    constructor(color, x, y, size, angle){
        this.color = color;
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = angle;
        this.dx = Math.cos(this.angle);
        this.dy = Math.sin(this.angle);
        this.hunger = 500;
        this.mutationRate = 0.1;
        this.appearance = {name: "default", pattern: pattern_default, "score": 90};
        this.genes  = [];
        // add the default pattern
        this.genes.push({name: "default", pattern: pattern_default, "score": 90});        
    }

    getBoundingBox(){
        return {left: this.x - this.size/2, right: this.x + this.size/2, top: this.y - this.size/2, bottom: this.y + this.size/2};
    }

    move(foods, boundaries, obstacles){
        // check colliding with the walls and try to avoid it
        const boundingBox = this.getBoundingBox();
        if(boundingBox.left < boundaries.left || boundingBox.right > boundaries.right || boundingBox.top < boundaries.top || boundingBox.bottom > boundaries.bottom){
            this.angle += PI;
            this.dx = cos(this.angle);
            this.dy = sin(this.angle);        
        }

        // decrease the hungry counter
        this.hunger --;
        if(this.hunger <= 0){
            // make the bug move towards the nearest food
            let minDist = 150;
            const aroundFoods = foods.filter(food => dist(this.x, this.y, food.x, food.y) < minDist);            
            // if there is food, move towards to a random one
            if(aroundFoods.length > 0){
                const food = aroundFoods[0];
                const angle = atan2(food.y - this.y, food.x - this.x);
                this.angle = angle;
                this.dx = cos(angle);
                this.dy = sin(angle);
            } else {
                // if there's no food, make a random choice to change direction
                if(random(1) < 0.05){       
                    const angle = random(PI/2) - PI/4;
                    this.angle += angle;
                    this.dx = cos(this.angle);
                    this.dy = sin(this.angle);
                }
            }
        } else {
            // if there's no food, make a random choice to change direction
            if(random(1) < 0.05){       
                const angle = random(PI/2) - PI/4;
                this.angle += angle;
                this.dx = cos(this.angle);
                this.dy = sin(this.angle);
            }
        }

        // // check hit the obstacle by boundingbox check
        // const boundingBox = this.getBoundingBox();
        // obstacles.forEach((obstacle) => {
        //     if(boundingBox.right > obstacle.left && boundingBox.left < obstacle.right && boundingBox.bottom > obstacle.top && boundingBox.top < obstacle.bottom){
        //         this.angle += PI;
        //         this.dx = cos(this.angle);
        //         this.dy = sin(this.angle);
        //     }            
        // });

        // update position
        this.x += this.dx;
        this.y += this.dy;   
    }

    draw(){
        push();       
        // draw the bug
        translate(this.x, this.y);
        rotate(this.angle + PI/2);
        
        // draw the head
        fill(50);
        ellipse(0, this.size * - 0.4, this.size * 0.5, this.size * 0.5);

        // draw 2 dots on the head to represent eyes
        stroke(255);        
        point(-this.size * 0.1, -this.size * 0.6);
        point(this.size * 0.1, -this.size * 0.6);

        // draw the lower body
        stroke(0);
        fill(this.color);
        ellipse(0, 0, this.size, this.size);
        
        // draw the pattern
        stroke(0);
        //strokeWeight(1.5);
        for (let i = 0; i < this.appearance.pattern.length; i++) {
            for (let j = 0; j < this.appearance.pattern.length; j++) {
                if (this.appearance.pattern[j][i] !== -1 && this.appearance.pattern[j][i] !== 0) {
                    stroke(this.appearance.pattern[j][i]);
                    point(i - this.size/2, j - this.size/2);
                }
            }
        }        
        pop();
    }

    genesInfoString(){
        let stGenes = `Appearance: ${this.appearance.name} \n\nList of genes: \n--------------\n`;
        // total score
        const totalScore = this.genes.reduce((acc, g) => acc + g.score, 0);
        this.genes.forEach(g => {
            stGenes += `${g.name} : $(${Math.round(g.score/totalScore*100)}%) \n`;
        });
        return stGenes;
    }
}