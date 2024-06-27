let mode = "MOVE";
let drawMode = "DRAW";

function setup() {
    const thecanvas = document.getElementById("canvasArea");
    createCanvas(500, 400, thecanvas);
    generateDefaultPattern();
}

function drawBug(x, y, size, color) {
    push();
    // draw the bug
    translate(x, y);

    // draw the head
    fill(50);
    ellipse(0, size * -0.4, size * 0.5, size * 0.5);

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
                point(i - size / 2, j - size / 2);
            }
        }
    }
    pop();
}

function draw() {
    background(255);
    // draw the pattern
    const rectSize = height / pattern[0].length;
    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
            if (pattern[i][j] === -1) {
                fill("#f88");
                rect(j * rectSize, i * rectSize, rectSize, rectSize);

                //draw 2 cross lines
                stroke(0);
                line(
                    j * rectSize,
                    i * rectSize,
                    (j + 1) * rectSize,
                    (i + 1) * rectSize
                );
                line(
                    (j + 1) * rectSize,
                    i * rectSize,
                    j * rectSize,
                    (i + 1) * rectSize
                );
            } else if (pattern[i][j] === 0) {
                fill(255);
                rect(j * rectSize, i * rectSize, rectSize, rectSize);
            } else {
                fill(pattern[i][j]);
                rect(j * rectSize, i * rectSize, rectSize, rectSize);
            }
        }
    }

    // draw the bug
    drawBug(
        height + pattern[0].length,
        pattern[0].length,
        pattern[0].length,
        "#f00"
    );

    const i = Math.floor(mouseY / rectSize);
    const j = Math.floor(mouseX / rectSize);
    if (
        i < 0 ||
        i >= pattern.length ||
        j < 0 ||
        j >= pattern[i].length ||
        pattern[i][j] === -1
    )
        return;

    if (mode === "DRAW") {
        pattern[i][j] = selectedColor;
    } else if (mode === "ERASE") {
        pattern[i][j] = 0;
    } else if (mode === "FILL") {
        fillPattern(pattern, i, j, selectedColor);
    }
}

function fillPattern(pattern, x, y, color) {
    const oldColor = pattern[x][y];
    if (oldColor === color || pattern[x][y] === -1) return;

    const stack = [[x, y]];
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    while (stack.length > 0) {
        const [i, j] = stack.pop();
        pattern[i][j] = color;
        for (let k = 0; k < 4; k++) {
            const ni = i + dx[k];
            const nj = j + dy[k];
            if (
                ni >= 0 &&
                ni < pattern.length &&
                nj >= 0 &&
                nj < pattern[ni].length &&
                pattern[ni][nj] === oldColor
            ) {
                stack.push([ni, nj]);
            }
        }
    }
}

function mousePressed() {
    if (mouseButton === LEFT) {
        mode = drawMode;
    } else if (mouseButton === RIGHT) {
        mode = "ERASE";
    }
}

function keyPressed() {
    if (key === "f") {
        drawMode = "FILL";
    } else if (key === "d") {
        drawMode = "DRAW";
    }
}

function mouseReleased() {
    mode = "MOVE";
}
