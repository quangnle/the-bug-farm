const maxPopulation = 50;
const distanceToReachFood = 5;

class Land{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.colony = [];
        this.foods = [];
        this.objects = [];
        this.obstacles = [];
        this.mode = "feed";
    }

    addObject(obj){
        this.objects.push(obj);
        // update obstacles
        if (obj.boundaries) {
            this.obstacles.push(obj.boundaries);
        }
    }

    draw(){        
        // draw the boundaries
        stroke(0);
        strokeWeight(2);
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
        strokeWeight(1);

        const foods = this.foods;
        // draw food
        foods.forEach(food => {
            fill("#fff");
            ellipse(food.x, food.y, 4, 4);
        });

        const colony = this.colony;
        // draw ants
        colony.forEach((ant, index) => {     
            // update the ant's position
            ant.move(this.foods, {left: this.x, right: this.x + this.width, top: this.y, bottom: this.y + this.height}, this.obstacles); 

            // draw the selected ant
            ant.draw();
            // draw a circle around the selected ant
            const cursorSize = (ant.size * 2 + 5) + 4 * Math.sin(frameCount/10);
    
            if (selectedAnt === index) {
                noFill();
                stroke("#000");
                ellipse(ant.x, ant.y, cursorSize, cursorSize);
            }
    
            // check if the ant is on a food item, then create new Ant and remove the food item
            foods.forEach((food, index) => {
                const d = dist(ant.x, ant.y, food.x, food.y);            
                if (d <= distanceToReachFood) {
                    // remove the food item
                    foods.splice(index, 1);
    
                    // check if the colony is full
                    if (colony.length >= maxPopulation) return;
    
                    // else, evolution to make a new ant
                    const newAnt = Evolution.evolute(ant);                 
                    colony.push(newAnt);
                }
            });
        });

        // draw objects
        this.objects.forEach(object => {
            object.draw();
        });
    }

    mousePressed(mouseButton, mouseX, mouseY) {
        // Right click to add food
        if (mouseButton === RIGHT) {
            // check if mouse position is out of the canvas
            if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
            
            // check if mouse position is on an obstacle
            let isOnObstacle = false;
            this.obstacles.forEach(obstacle => {
                if (mouseX > obstacle.left && mouseX < obstacle.right && mouseY > obstacle.top && mouseY < obstacle.bottom) {
                    isOnObstacle = true;
                }
            });
            if (isOnObstacle) return;

            if (this.mode === "feed") this.foods.push({x: mouseX, y: mouseY});
            else if (this.mode === "plant") {
                const petalNumber = parseInt(document.getElementById("petal-number").value);

                const pistilColor = document.getElementById("pistil-color").value;
                const pistilSize = parseInt(document.getElementById("pistil-size").value);

                const petalColor = document.getElementById("petal-color").value;                
                const petalSize = parseInt(document.getElementById("petal-size").value);

                const flower = new Flower(mouseX, mouseY, pistilSize, pistilColor, petalSize, petalColor, petalNumber);
                this.addObject(flower);
            }
        }
    
        // left click on the ant to select it
        if (mouseButton === LEFT) {
            land.colony.forEach((ant, index) => {
                const d = dist(mouseX, mouseY, ant.x, ant.y);
                if (d < ant.size) {
                    selectedAnt = index;
                    //antColorBlock.style.backgroundColor = ant.color;
                    antColorLabel.innerHTML = ant.color;
                    antGenesInfo.innerHTML = ant.genesInfoString();
                }
            });
        }
    }
}