const antColorBlock = document.getElementById("ant-color-block");
const antColorLabel = document.getElementById("ant-color-label");
const antGenesInfo = document.getElementById("ant-genes-info");

const mainCanvas = document.getElementById("main-canvas");
const width = 600;
const height = 600;

const land = new Land(0, 0, width, width, "#dd0");

const antSize = 9;
const firstAnt = new Ant("#000", 100, 100, antSize, 0);
let selectedAnt = -1;

function setup() {
    createCanvas(width, height, mainCanvas);
    land.colony.push(firstAnt);    
}

function draw() {
    background(color(255,255,255,100));
    land.draw();
}

function mousePressed() {
    land.mousePressed(mouseButton, mouseX, mouseY);
}