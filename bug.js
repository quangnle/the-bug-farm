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

    randomDirection(boundaries){
        // split the region into 4 parts by the bug's position
        const topleft = {x1: boundaries.left, y1: boundaries.top, x2: this.x, y2: this.y};
        const topright = {x1: this.x, y1: boundaries.top, x2: boundaries.right, y2: this.y};
        const bottomleft = {x1: boundaries.left, y1: this.y, x2: this.x, y2: boundaries.bottom};
        const bottomright = {x1: this.x, y1: this.y, x2: boundaries.right, y2: boundaries.bottom};

        // calculate the surface of each region
        const surfaces = [topleft, topright, bottomleft, bottomright].map(region => { 
            const dx = region.x2 - region.x1;
            const dy = region.y2 - region.y1;
            region.s = dx*dy;
            return region;
        }).sort((a, b) => a.s - b.s);

        // sum of surfaces
        const sumSurfaces = (boundaries.right - boundaries.left) * (boundaries.bottom - boundaries.top);
        // select a region based on the surface proportion
        const r = random(1) * sumSurfaces;
        let s = 0;
        let selectedRegion = null;
        surfaces.forEach(region => {
            s += region.s;
            if (s >= r && selectedRegion === null) {
                selectedRegion = region;
            }
        });

        // choose a random point in the selected region
        const x = random(selectedRegion.x1, selectedRegion.x2);
        const y = random(selectedRegion.y1, selectedRegion.y2);
        // calculate the angle between the bug's position and the selected point
        return atan2(y - this.y, x - this.x);
    }    

    move(foods, boundaries, obstacles){

        // decrease the hungry counter
        this.hunger --;
        let aroundFoods = null;
        if(this.hunger <= 0){
            // make the bug move towards the nearest food
            let minDist = 150;
            aroundFoods = foods.filter(food => dist(this.x, this.y, food.x, food.y) < minDist);            
        }

        if (aroundFoods && aroundFoods.length > 0){
            const food = aroundFoods[0];
            const angle = atan2(food.y - this.y, food.x - this.x);
            this.angle = angle;
            this.dx = cos(angle);
            this.dy = sin(angle);
        } else {
            // move randomly
            if (random(1) < 0.01 || this.x < boundaries.left || this.x > boundaries.right || this.y < boundaries.top || this.y > boundaries.bottom) {
                this.angle = this.randomDirection(boundaries);
                this.dx = cos(this.angle);
                this.dy = sin(this.angle);
            }
        }

        // update position
        this.x += this.dx;
        this.y += this.dy;
        this.x = constrain(this.x, boundaries.left, boundaries.right);
        this.y = constrain(this.y, boundaries.top, boundaries.bottom);   
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

    infoString(){
        let info = `Hunger rate: ${this.hunger} \nAppearance: ${this.appearance.name} \n\nList of genes: \n--------------\n`;
        // total score
        const totalScore = this.genes.reduce((acc, g) => acc + g.score, 0);
        this.genes.forEach(g => {
            info += `${g.name} : $(${Math.round(g.score/totalScore*100)}%) \n`;
        });
        return info;
    }

    drawIcon(ctx, x, y) {        
        const size = this.size / 2;

        ctx.save();
        ctx.translate(x, y);
        // draw the head
        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.ellipse(0, 2*size * -0.4, size * 0.5, size * 0.5, 0, 0, Math.PI*2);
        ctx.fill();

        // draw 2 dots on the head to represent eyes
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(-size * 0.2, -2*size * 0.6, 1, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(size * 0.2, -2*size * 0.6, 1, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();

        // draw the lower body
        ctx.strokeStyle = "#000";
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
        
        // draw the pattern
        ctx.strokeStyle = "#000";
        //ctx.strokeWeight = 1.5;
        for (let i = 0; i < this.appearance.pattern.length; i++) {
            for (let j = 0; j < this.appearance.pattern.length; j++) {
                if (this.appearance.pattern[j][i] !== -1 && this.appearance.pattern[j][i] !== 0) {
                    ctx.strokeStyle = this.appearance.pattern[j][i];
                    ctx.beginPath();
                    ctx.moveTo(i - size, j - size);
                    ctx.lineTo(i - size + 1, j - size + 1);
                    ctx.stroke();
                }
            }
        }        
        ctx.restore();
    }
}