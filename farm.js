const maxPopulation = 30;
const distanceToReachFood = 10;

class Farm{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'transparent';
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
        // fill(this.color);
        // rect(this.x, this.y, this.width, this.height);
        strokeWeight(1);
    }

    drawObjects(){
        // draw objects
        this.objects.forEach((object, index) => {
            if (selectedObj === object) {            
                object.draw(true);
            } else {
                object.draw(false);
            }            
        });

        if (this.mode === "plant") {
            // draw connecting lines between the flowers
            const flowers = this.objects.filter(obj => obj instanceof Flower);
            if (flowers.length > 1) {
                for (let i = 0; i < flowers.length; i++) {
                    const flower1 = flowers[i];
                    const flower2 = flowers[(i+1) % flowers.length];
                    stroke(color(0, 0, 0, 100));
                    strokeWeight(3);
                    line(flower1.x, flower1.y, flower2.x, flower2.y);
                    strokeWeight(1);
                }
            }
        }
    }

    drawColony(){
        const flowers = this.objects.filter(obj => obj instanceof Flower);
        const flowersWithPollens = flowers.filter(flower => flower.hasPollen);

        const colony = this.colony;
        // draw bugs
        colony.forEach(bug => {     
            // update the bug's position
            if (this.mode === "show") {
                bug.step(flowersWithPollens, {left: this.x, right: this.x + this.width, top: this.y, bottom: this.y + this.height}, flowers); 
            } else {
                bug.step(flowersWithPollens, {left: this.x, right: this.x + this.width, top: this.y, bottom: this.y + this.height}, null); 
            }

            // draw the bug's bounding box
            if (this.boundingBox) {
                noFill();
                stroke("#f00");
                rect(bug.x - bug.size/2, bug.y - bug.size/2, bug.size, bug.size);
                stroke("#000");
            }            

            // draw the bug
            if (selectedObj === bug) {
                bug.draw(true);                
            } else {
                bug.draw(false);
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
                    if (colony.length >= maxPopulation || flower.numberOfPollens < 1 || this.mode == "show" ) return;
    
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
        objectInfo.innerHTML = obj.infoString();
        const objectRenderer = document.getElementById("object-render-canvas");
        const ctx = objectRenderer.getContext("2d");
        ctx.fillStyle = "#77dd22";
        ctx.strokeStyle = "#000";
        ctx.rect(0,0,50, 50);
        ctx.fill();
        ctx.stroke();
        
        obj.drawIcon(ctx, 25, 25);

        const btnSellIt = document.getElementById("btn-sell-it");    
        const btnRemoveIt = document.getElementById("btn-remove-it");
        const btnBringToMarket = document.getElementById("btn-bring-to-market");

        // check if the object is a bug or a flower and show the appropriate buttons
        if (obj instanceof Bug){    
            btnSellIt.style.visibility = "visible";
            btnBringToMarket.style.visibility = "visible";
            btnRemoveIt.style.visibility = "hidden";
            patterncvs.style.visibility = "visible";
            const patternCtx = patterncvs.getContext("2d");
            obj.drawBugPatternCanvas(patternCtx, 50, 50);
        } else if (obj instanceof Flower){
            btnSellIt.style.visibility = "hidden";
            btnBringToMarket.style.visibility = "hidden";
            btnRemoveIt.style.visibility = "visible";                
            patterncvs.style.visibility = "hidden";
        }
    }

    mousePressed(mouseButton, mouseX, mouseY) {
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
            else if (this.mode === "plant" || this.mode === "show") {
                this.plantAFlower(mouseX, mouseY);
            }
        }
    
        // left click on the bug to select it
        if (mouseButton === LEFT) {
            // check if mouse position is on a bug
            this.colony.forEach((bug, index) => {
                const d = dist(mouseX, mouseY, bug.x, bug.y);
                if (d < bug.size) selectedObj = bug;                
            });
            
            // check if mouse position is on a flower
            this.objects.forEach((obj, index) => {
                if (obj instanceof Flower){
                    const d = dist(mouseX, mouseY, obj.x, obj.y);
                    if (d < obj.pistilSize + obj.petalSize/2) selectedObj = obj;
                }
            });

            if (selectedObj) this.loadObjectInfo(selectedObj);
        }
    }
}