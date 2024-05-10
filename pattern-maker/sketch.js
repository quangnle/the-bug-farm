function setup(){
    const thecanvas = document.getElementById("canvasArea");
    createCanvas(400, 400, thecanvas);
    generateDefaultPattern();
}

function draw(){
    background(255);
    const rectSize = width / pattern[0].length;
    for (let i = 0; i < pattern.length; i++){
        for (let j = 0; j < pattern[i].length; j++){
            if (pattern[i][j] === -1){
                fill("#f00");
            } else if (pattern[i][j] === 0){
                fill(255);
            } else {
                fill(0);
            }
            rect(j * rectSize, i * rectSize, rectSize, rectSize);
        }
    }
}

function mousePressed(){
    if (pattern &&  pattern.length>0){
        const rectSize = width / pattern[0].length;
        const i = Math.floor(mouseY / rectSize);
        const j = Math.floor(mouseX / rectSize);
        //boundary check
        if (i < 0 || i >= pattern.length || j < 0 || j >= pattern[i].length){
            return;
        }
    
        if (pattern[i][j] === 0){
            pattern[i][j] = 1;
        } else if (pattern[i][j] === 1){
            pattern[i][j] = 0;
        }
    }
}