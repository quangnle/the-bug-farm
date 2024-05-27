const bugColorLabel = document.getElementById("bug-color-label");
const bugGenesInfo = document.getElementById("bug-genes-info");
const objectInfo = document.getElementById("object-info");

const mainCanvas = document.getElementById("main-canvas");
const width = 1200;
const height = 830;
const farmWidth = 1200;
const farmHeight = 800;

const bugSize = 20;

let selectedBug = -1;
let selectedFlower = -1;

let selectedObj = null;


function setup() {
    createCanvas(width, height, mainCanvas);

    setupInit()
}

function draw() {
    clear()
    farm?.draw();
    controlPanel?.draw();
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