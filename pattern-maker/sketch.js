function setup(){
    const thecanvas = document.getElementById("canvasArea");
    createCanvas(500, 400, thecanvas);
    generateDefaultPattern();
}

function drawBug(x, y, size, color){
    push();       
    // draw the bug
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
            if (pattern[j][i] !== 0 && pattern[j][i] !== -1) {
                stroke(pattern[j][i]);
                point(i - size/2, j - size/2);
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
                fill("#f88");
                rect(j * rectSize, i * rectSize, rectSize, rectSize);

                //draw 2 cross lines
                stroke(0);
                line(j * rectSize, i * rectSize, (j + 1) * rectSize, (i + 1) * rectSize);
                line((j + 1) * rectSize, i * rectSize, j * rectSize, (i + 1) * rectSize);
                
            } else if (pattern[i][j] === 0){
                fill(255);
                rect(j * rectSize, i * rectSize, rectSize, rectSize);
            } else {
                fill(pattern[i][j]);
                rect(j * rectSize, i * rectSize, rectSize, rectSize);
            }
        }
    }

    // draw the bug
    drawBug(height + pattern[0].length, pattern[0].length, pattern[0].length, "#f00");    
}

function mouseDragged(){
    if (mouseButton === LEFT){
        const rectSize = height / pattern[0].length;
        const i = Math.floor(mouseY / rectSize);
        const j = Math.floor(mouseX / rectSize);
        //boundary check
        if (i < 0 || i >= pattern.length || j < 0 || j >= pattern[i].length || pattern[i][j] === -1) return;

        pattern[i][j] = selectedColor;
    } else if (mouseButton === RIGHT){
        const rectSize = height / pattern[0].length;
        const i = Math.floor(mouseY / rectSize);
        const j = Math.floor(mouseX / rectSize);
        //boundary check
        if (i < 0 || i >= pattern.length || j < 0 || j >= pattern[i].length || pattern[i][j] === -1) return;

        pattern[i][j] = 0;
    }
}