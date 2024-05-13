const antColorBlock = document.getElementById("ant-color-block");
const antColorLabel = document.getElementById("ant-color-label");
const antGenesInfo = document.getElementById("ant-genes-info");

const mainCanvas = document.getElementById("main-canvas");
const width = 600;
const height = 600;

const colony = [];
const foods = [];
const antSize = 9;
const firstAnt = new Ant("#000", 100, 100, antSize, 0);
const maxPopulation = 50;
const distanceToReachFood = 5;

let selectedAnt = -1;

function setup() {
    createCanvas(width, height, mainCanvas);
    background(color(255,255,255,100));
    colony.push(firstAnt);
}

function draw() {
    background(color(140, 140, 0, 80));
    // draw the boundaries
    stroke("#000");
    strokeWeight(2);
    noFill();
    rect(0, 0, width, height);
    // reset stroke-weight
    strokeWeight(1);

    // draw food
    foods.forEach(food => {
        fill("#fff");
        ellipse(food.x, food.y, 4, 4);
    });

    colony.forEach((ant, index) => {       

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
}

function mousePressed() {
    // Right click to add food
    if (mouseButton === RIGHT) {
        // check if mouse position is out of the canvas
        if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;

        foods.push({x: mouseX, y: mouseY});
    }

    // left click on the ant to select it
    if (mouseButton === LEFT) {
        colony.forEach((ant, index) => {
            const d = dist(mouseX, mouseY, ant.x, ant.y);
            if (d < ant.size) {
                selectedAnt = index;
                antColorBlock.style.backgroundColor = ant.color;
                antColorLabel.innerHTML = ant.color;
                antGenesInfo.innerHTML = ant.genesInfoString();
            }
        });
    }
}