const bugColorLabel = document.getElementById("bug-color-label");
const bugGenesInfo = document.getElementById("bug-genes-info");

const mainCanvas = document.getElementById("main-canvas");
const width = 800;
const height = 830;


const bugSize = 20;
const firstBug = new Bug("#f00", 100, 100, bugSize, 0);
let selectedBug = -1;
let selectedFlower = -1;

const land = new Land(0, 0, width, width, "#77dd22");

const controlPanel = new ControlPanel(0, width, width, 30, "#ffffff");

function setup() {
    createCanvas(width, height, mainCanvas);
    land.colony.push(firstBug);    
}

function draw() {
    background(color(255,255,255,100));
    land.draw();
    controlPanel.draw();
}

function mousePressed() {
    // check if the mouse is on the land
    if (mouseY < width) {
        land.mousePressed(mouseButton, mouseX, mouseY);
        if (selectedBug > -1) {
            drawBugPatternCanvas();    
        }
    }

    // check if the mouse is on the control panel
    if (mouseY > width) {
        controlPanel.mousePressed(mouseButton, mouseX, mouseY);
        // update mode for land
        land.mode = controlPanel.playMode ? "play" : "plant";
    }
}