let race;
function setup(){  
    createCanvas(900, 600);  
    
    const bug1 = new Bug("#00ff00", 100, 100, 25, 0);
    const bug2 = new Bug("#ff0000", 100, 100, 25, 0);
    const bug3 = new Bug("#0000ff", 100, 100, 25, 0);

    bug1.genes.push(patterns.find(p => p.name === "heart"));
    
    bug2.genes.push(patterns.find(p => p.name === "heart"));
    bug2.appearance = patterns.find(p => p.name === "heart");

    bug3.genes.push(patterns.find(p => p.name === "plus"));
    bug3.genes.push(patterns.find(p => p.name === "star"));
    bug3.genes.push(patterns.find(p => p.name === "l_cross"));
    bug3.appearance = patterns.find(p => p.name === "plus");

    race = new RaceRoad(100, 100, 700);
    race.addBug(bug1);
    race.addBug(bug2);
    race.addBug(bug3);    
}

function draw() {
    background(255);
    race.draw();
}