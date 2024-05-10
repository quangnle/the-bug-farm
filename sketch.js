const width = 800;
const height = 800;

const colony = [];
const foods = [];
const antSize = 16;
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
        if (colony.length >= maxPopulation) return;
        // check if the ant is on a food item, then create new Ant and remove the food item
        foods.forEach((food, index) => {
            const d = dist(ant.x, ant.y, food.x, food.y);
            if (d <= distanceToReachFood) {
                const newAnt = new Ant(ant.color, ant.x, ant.y, ant.size, ant.angle);
                newAnt.varationRate += varationRateInc;
                newAnt.varationRate = constrain(newAnt.varationRate, 0, 0.3);
                newAnt.color = ant.color;
                newAnt.pattern = ant.pattern;

                if (random(1) < ant.varationRate) {
                    const r = Math.floor(random(256)).toString(16).padStart(2, '0');
                    const g = Math.floor(random(256)).toString(16).padStart(2, '0');
                    const b = Math.floor(random(256)).toString(16).padStart(2, '0');
                    newAnt.color = `#${r}${g}${b}`;
                    const rp = Math.floor(random(patterns.length));
                    newAnt.pattern = patterns[rp];
                }

                colony.push(newAnt);
                foods.splice(index, 1);
                //console.log(foods.length);
            }
        });
    });
}

function mousePressed() {
    // left click to add food
    if (mouseButton === LEFT) {
        if (colony.length + foods.length >= maxPopulation) return;
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