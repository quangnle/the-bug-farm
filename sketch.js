//const antColorBlock = document.getElementById("ant-color-block");
const antColorLabel = document.getElementById("ant-color-label");
const antGenesInfo = document.getElementById("ant-genes-info");

const mainCanvas = document.getElementById("main-canvas");
const width = 800;
const height = 830;


const antSize = 20;
const firstAnt = new Ant("#f00", 100, 100, antSize, 0);
let selectedAnt = -1;
let selectedFlower = -1;

const land = new Land(0, 0, width, width, "#77dd22");

const controlPanel = new ControlPanel(0, width, width, 30, "#ffffff");

function setup() {
    createCanvas(width, height, mainCanvas);
    land.colony.push(firstAnt);    
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
        if (selectedAnt > -1) {
            drawAntPatternCanvas();    
        }
    }

    // check if the mouse is on the control panel
    if (mouseY > width) {
        controlPanel.mousePressed(mouseButton, mouseX, mouseY);
        // update mode for land
        land.mode = controlPanel.playMode ? "play" : "plant";
    }
}