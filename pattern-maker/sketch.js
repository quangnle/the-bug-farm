function setup(){
    const thecanvas = document.getElementById("canvasArea");
    createCanvas(500, 400, thecanvas);
    generateDefaultPattern();
}

function drawAnt(x, y, size, color){
    push();       
    // draw the ant
    translate(x, y);
    
    // draw the head
    fill(50);
    ellipse(0, size * - 0.4, size * 0.5, size * 0.5);

    // draw 2 dots on the head to represent eyes
    stroke(255);        
    point(-size * 0.1, -size * 0.6);
    point(size * 0.1, -size * 0.6);

    // draw the lower body
    stroke(0);
    fill(color);
    ellipse(0, 0, size, size);
    
    // draw the pattern
    stroke(0);
    //strokeWeight(1.5);
    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern.length; j++) {
            if (pattern[j][i] === 1) {
                fill(0);
                point(i - size/2, j - size/2);
                //ellipse(i - size/2, j - size/2, 5, 5);
            }
        }
    }        
    pop();
}

function draw(){
    background(255);
    // draw the pattern
    const rectSize = height / pattern[0].length;
    for (let i = 0; i < pattern.length; i++){
        for (let j = 0; j < pattern[i].length; j++){
            if (pattern[i][j] === -1){
                fill("#000");
            } else if (pattern[i][j] === 0){
                fill(255);
            } else {
                fill(0);
            }
            rect(j * rectSize, i * rectSize, rectSize, rectSize);
        }
    }

    // draw the ant
    drawAnt(height + 10, 20, pattern[0].length, "#f00");    
}

function mousePressed(){
    if (pattern &&  pattern.length>0){
        const rectSize = height / pattern[0].length;
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