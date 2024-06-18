const bugColorLabel = document.getElementById("bug-color-label");
const bugGenesInfo = document.getElementById("bug-genes-info");
const objectInfo = document.getElementById("object-info");

const mainCanvas = document.getElementById("main-canvas");
const width = 960;
const height = 960;
const farmWidth = 960;
const farmHeight = 960;

const bugSize = 20;

let selectedBug = -1;
let selectedFlower = -1;

let selectedObj = null;

const animCallback = []

// assets
let diamond

function preload () {
    // Load Sound
    // cashSound = loadSound('./assets/sounds/cash.mp3')
    diamond = loadImage('./assets/images/diamond.png')
}


function setup() {
    createCanvas(width, height, mainCanvas);
    setupInit()
}

function draw() {
    clear()
    farm?.draw();
    controlPanel?.draw();

    animCallback.forEach((callback, index) => {
		const { done } = callback.generator.next()
		if (done) {
			console.log('done', done)
			callback.onDone()

			console.log(animCallback)
			animCallback.splice(index, 1)
			console.log(animCallback)
		}
	})
}

function mousePressed() {
    // check if the mouse is on the farm
    if (mouseY > farm?.x && mouseY < farm?.y + farmHeight) {
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