const width = 600;
const height = 600;
const bugSize = 20;
const nTroops = 10;

let battleGround = null; 

function setup(){
    createCanvas(width, height);
   
    battleGround = new BattleGround(0, 0, width, height, nTroops);
    
    // team 1 setup
    for (let i = 0; i < nTroops; i++) {
        const bug = new Bug(color(255, 0, 0), 0, 0, bugSize);
        const horn = new DoubleHorn(bugSize >> 1, color(255, 255, 0));
        bug.addHorn(horn);
        battleGround.addBug(bug, 1);
    }
    
    // team 2 setup
    for (let i = 0; i < nTroops; i++) {
        const bug = new Bug(color(0, 255, 0), 0, 0, bugSize);
        const horn = new SingleHorn(bugSize >> 1, color(255, 255, 0));
        bug.addHorn(horn);
        battleGround.addBug(bug, 2);
    }

    battleGround.initTargets();
}

function draw(){
    background("#020"); 
    battleGround.draw();
}