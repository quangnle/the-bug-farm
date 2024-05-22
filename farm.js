const maxPopulation = 30;
const distanceToReachFood = 10;

class Farm{
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
        // draw bugs
        colony.forEach((bug, index) => {     
            // update the bug's position
            bug.move(flowersWithPollens, {left: this.x, right: this.x + this.width, top: this.y, bottom: this.y + this.height}, this.obstacles); 

            // draw the bug's bounding box
            if (this.boundingBox) {
                noFill();
                stroke("#f00");
                rect(bug.x - bug.size/2, bug.y - bug.size/2, bug.size, bug.size);
                stroke("#000");
            }            

            // draw the bug
            bug.draw();

            // draw a circle around the selected bug
            const cursorSize = (bug.size * 1.5) + 3 * Math.sin(frameCount/10);    
            if (selectedBug === index) {
                noFill();
                stroke("#000");
                ellipse(bug.x, bug.y, cursorSize, cursorSize);
            }
    
            // check if the bug is on a food item, then create new bug and remove the food item
            flowersWithPollens.forEach(flower => {
                const d = dist(bug.x, bug.y, flower.x, flower.y);            
                if (d <= distanceToReachFood && flower.hasPollen) {
                    // remove the pollen from the flower
                    flower.hasPollen = false;

                    // change the bug's color and hunger
                    bug.color = flower.pistilColor;
                    bug.hunger = 500;
    
                    // check if the colony is full and the flower has pollen to create a new bug
                    if (colony.length >= maxPopulation || flower.numberOfPollens < 1 ) return;
    
                    // else, evolution to make a new bug
                    const newBug = Evolution.evolute(bug, flower.pistilColor);                 
                    colony.push(newBug);
                }
            });
        });
    }

    draw() {        
        this.drawBoundaries();
        this.drawObjects();

        this.drawColony();
    }

    plantAFlower(x, y){
        const petalNumber = parseInt(document.getElementById("petal-number").value);

        const pistilColor = document.getElementById("pistil-color").value;
        const pistilSize = parseInt(document.getElementById("pistil-size").value);

        const petalColor = document.getElementById("petal-color").value;                
        const petalSize = parseInt(document.getElementById("petal-size").value);

        const flower = new Flower(x, y, pistilSize, pistilColor, petalSize, petalColor, petalNumber);
        this.addObject(flower);
    }

    loadObjectInfo(obj){
        const objectRenderer = document.getElementById("object-render-canvas");
        const ctx = objectRenderer.getContext("2d");
        ctx.fillStyle = "#77dd22";
        ctx.strokeStyle = "#000";
        ctx.rect(0,0,50, 50);
        ctx.fill();
        ctx.stroke();
        
        obj.drawIcon(ctx, 25, 25);

        if (obj instanceof Flower){
            objectInfo.innerHTML = obj.infoString();
        } else if (obj instanceof Bug){
            objectInfo.innerHTML = obj.infoString();
            
        }
    }

    mousePressed(mouseButton, mouseX, mouseY) {
        // Right click to add food
        if (mouseButton === RIGHT) {
            // check if mouse position is out of the canvas
            if (mouseX < this.x + bugSize || mouseX > this.width - bugSize || mouseY < this.y + bugSize || mouseY > this.height - bugSize) return;
            
            // check if mouse position is on an obstacle
            let isOnObstacle = false;
            this.obstacles.forEach(obstacle => {
                if (mouseX > obstacle.left && mouseX < obstacle.right && mouseY > obstacle.top && mouseY < obstacle.bottom) {
                    isOnObstacle = true;
                }
            });
            if (isOnObstacle) return;

            if (this.mode === "play") {
                // temporarily does nothing
            } 
            else if (this.mode === "plant") {
                this.plantAFlower(mouseX, mouseY);
            }
        }
    
        // left click on the bug to select it
        if (mouseButton === LEFT) {
            // check if mouse position is on a bug
            this.colony.forEach((bug, index) => {
                const d = dist(mouseX, mouseY, bug.x, bug.y);
                if (d < bug.size) {
                    selectedBug = index;
                    bugColorLabel.innerHTML = bug.color;
                    bugGenesInfo.innerHTML = bug.infoString();

                    selectedObj = bug;
                }
            });
            
            // check if mouse position is on a flower
            this.objects.forEach((obj, index) => {
                if (obj instanceof Flower){
                    const d = dist(mouseX, mouseY, obj.x, obj.y);
                    if (d < obj.pistilSize + obj.petalSize/2){
                        selectedFlower = index;

                        selectedObj = obj;
                    } 
                }
            });

            if (selectedObj) {
                this.loadObjectInfo(selectedObj);
            }
        }
    }
}