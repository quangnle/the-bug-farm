const width = 800;
const height = 800;

const colony = [];
const foods = [];
const antSize = 9;
const firstAnt = new Ant("#000", 100, 100, antSize, 0);
const maxPopulation = 50;
const varationRateInc = 0.1;
const distanceToReachFood = 5;

function setup() {
    createCanvas(width, height);
    background(color(255,255,255,100));
    colony.push(firstAnt);
}

function draw() {
    background(color(80, 80, 0, 80));

    // draw food
    foods.forEach(food => {
        fill("#fff");
        ellipse(food.x, food.y, 4, 4);
    });

    colony.forEach(ant => {
        ant.draw();
        
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
    // left click to add food
    if (mouseButton === LEFT) {
        // check if mouse position is out of the canvas
        if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;

        foods.push({x: mouseX, y: mouseY});
    }

    // right click on the ant to remove it
    if (mouseButton === RIGHT) {
        colony.forEach((ant, index) => {
            const d = dist(mouseX, mouseY, ant.x, ant.y);
            if (d < ant.size && colony.length > 1) {
                colony.splice(index, 1);
            }
        });
    }
}