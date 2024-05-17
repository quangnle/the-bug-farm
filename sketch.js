const antColorBlock = document.getElementById("ant-color-block");
const antColorLabel = document.getElementById("ant-color-label");
const antGenesInfo = document.getElementById("ant-genes-info");

const mainCanvas = document.getElementById("main-canvas");
const width = 600;
const height = 630;


const antSize = 9;
const firstAnt = new Ant("#000", 100, 100, antSize, 0);
let selectedAnt = -1;

const land = new Land(0, 0, width, width, "#dddd00");

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
    }

    // check if the mouse is on the control panel
    if (mouseY > width) {
        controlPanel.mousePressed(mouseButton, mouseX, mouseY);
        // update mode for land
        land.mode = controlPanel.feedMode ? "feed" : "plant";
    }
}