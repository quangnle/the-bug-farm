const maxPopulation = 30;
const distanceToReachFood = 10;

class Land{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.colony = [];
        this.objects = [];
        this.obstacles = [];
        this.mode = "play";
        this.boundingBox = false;
    }

    addObject(obj){
        this.objects.push(obj);
        // update obstacles
        if (obj.boundaries) {
            this.obstacles.push(obj.boundaries);
        }
    }

    drawBoundaries(){
        // draw the boundaries
        stroke(0);
        strokeWeight(2);
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
        strokeWeight(1);
    }

    drawObjects(){
        // draw objects
        this.objects.forEach((object, index) => {
            if ((this.boundingBox && object.boundaries) || index === selectedFlower) {
                noFill();
                stroke("#f00");                
                rect(object.boundaries.left, object.boundaries.top, object.boundaries.right - object.boundaries.left, object.boundaries.bottom - object.boundaries.top);
                stroke("#000");
            }
            object.draw();
        });
    }

    drawColony(){
        const flowers = this.objects.filter(obj => obj instanceof Flower);
        const flowersWithPollens = flowers.filter(flower => flower.hasPollen);

        const colony = this.colony;
        // draw ants
        colony.forEach((ant, index) => {     
            // update the ant's position
            ant.move(flowersWithPollens, {left: this.x, right: this.x + this.width, top: this.y, bottom: this.y + this.height}, this.obstacles); 

            // draw the ant's bounding box
            if (this.boundingBox) {
                noFill();
                stroke("#f00");
                rect(ant.x - ant.size/2, ant.y - ant.size/2, ant.size, ant.size);
                stroke("#000");
            }            

            // draw the ant
            ant.draw();

            // draw a circle around the selected ant
            const cursorSize = (ant.size * 1.5) + 3 * Math.sin(frameCount/10);    
            if (selectedAnt === index) {
                noFill();
                stroke("#000");
                ellipse(ant.x, ant.y, cursorSize, cursorSize);
            }
    
            // check if the ant is on a food item, then create new Ant and remove the food item
            flowersWithPollens.forEach(flower => {
                const d = dist(ant.x, ant.y, flower.x, flower.y);            
                if (d <= distanceToReachFood && flower.hasPollen) {
                    // remove the pollen from the flower
                    flower.hasPollen = false;
                    flower.numberOfPollens --;

                    // change the ant's color and hunger
                    ant.color = flower.pistilColor;
                    ant.hunger = 500;
    
                    // check if the colony is full
                    if (colony.length >= maxPopulation || flower.numberOfPollens < 1 ) return;
    
                    // else, evolution to make a new ant
                    const newAnt = Evolution.evolute(ant, flower.pistilColor);                 
                    colony.push(newAnt);
                }
            });
        });
    }

    draw() {        
        this.drawBoundaries();
        this.drawObjects();

        this.drawColony();
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

            if (this.mode === "play") {
                // does nothing
            } 
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
            // check if mouse position is on a bug
            land.colony.forEach((ant, index) => {
                const d = dist(mouseX, mouseY, ant.x, ant.y);
                if (d < ant.size) {
                    selectedAnt = index;
                    antColorLabel.innerHTML = ant.color;
                    antGenesInfo.innerHTML = ant.genesInfoString();
                }
            });
            
            // check if mouse position is on a flower
            land.objects.forEach((obj, index) => {
                if (obj instanceof Flower){
                    const d = dist(mouseX, mouseY, obj.x, obj.y);
                    if (d < obj.pistilSize + obj.petalSize/2){
                        selectedFlower = index;
                    } 
                }
            });
        }
    }
}