const bugColorLabel = document.getElementById("bug-color-label");
const bugGenesInfo = document.getElementById("bug-genes-info");
const objectInfo = document.getElementById("object-info");

const mainCanvas = document.getElementById("main-canvas");
const width = 800;
const height = 830;
const farmWidth = 800;
const farmHeight = 800;

const bugSize = 20;
const firstBug = new Bug("#f00", 100, 100, bugSize, 0);

let selectedBug = -1;
let selectedFlower = -1;

let selectedObj = null;

const farm = new Farm(0, 0, farmWidth, farmHeight, "#77dd22");
const controlPanel = new ControlPanel(0, farmHeight, farmWidth, 30, "#ffffff");

function setup() {
    createCanvas(width, height, mainCanvas);
    farm.colony.push(firstBug);    
}

function draw() {
    background(color(255,255,255,100));
    farm.draw();
    controlPanel.draw();
}

function mousePressed() {
    // check if the mouse is on the farm
    if (mouseY > farm.x && mouseY < farm.y + farmHeight) {
        farm.mousePressed(mouseButton, mouseX, mouseY);
        if (selectedBug > -1) {
            drawBugPatternCanvas();    
        }
    } else if (mouseY > farm.y + farm.height && mouseY < height) { // check if the mouse is on the control panel
        controlPanel.mousePressed(mouseButton, mouseX, mouseY);
        // update mode for farm
        farm.mode = controlPanel.mode;
    }
}