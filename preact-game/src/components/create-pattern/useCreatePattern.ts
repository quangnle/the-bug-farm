import { signal } from "@preact/signals";
import p5 from "p5";


export const CANVAS_SIZE = 600;
export const CANVAS_WIDTH = 630;

let mode = "MOVE"

export const SIZE = signal(20)
export const PATTERN = signal<Array<Array<number | string>>>(
  new Array(SIZE.value).fill(0).map(() => new Array(SIZE.value).fill(0))
)
export const SELECTED_COLOR = signal<string>("#ffffff");

const drawBug = (p5: p5, x: number, y: number, size: number, color: string) => {
  p5.push();
  // draw the bug
  p5.translate(x, y);

  // draw the head
  p5.fill(50);
  p5.ellipse(0, size * -0.4, size * 0.5, size * 0.5);

  // draw 2 dots on the head to represent eyes
  p5.stroke(255);
  p5.point(-size * 0.1, -size * 0.6);
  p5.point(size * 0.1, -size * 0.6);

  // draw the lower body
  p5.stroke(0);
  p5.fill(color);
  p5.ellipse(0, 0, size, size);

  // draw the pattern
  p5.stroke(0);
  //strokeWeight(1.5);
  for (let i = 0; i < PATTERN.value.length; i++) {
    for (let j = 0; j < PATTERN.value.length; j++) {
      if (PATTERN.value[j][i] !== 0 && PATTERN.value[j][i] !== -1) {
        p5.stroke(PATTERN.value[j][i] as string);
        p5.strokeWeight(1.5);
        p5.point(i - size / 2, j - size / 2);
      }
    }
  }
  p5.pop();
};

const generateDefaultPattern = (p5: p5) => {
  // get value of the pattern size
  // generate 2d array with the size
  PATTERN.value = new Array(SIZE.value);
  for (let i = 0; i < SIZE.value; i++) {
    PATTERN.value[i] = new Array(SIZE.value).fill(0);
  }

  const cx = PATTERN.value[0].length >> 1;
  const cy = PATTERN.value.length >> 1;
  const r = PATTERN.value.length >> 1;
  for (let i = 0; i < PATTERN.value.length; i++) {
    for (let j = 0; j < PATTERN.value[i].length; j++) {
      let d = Math.floor(p5.dist(j, i, cx, cy));
      if (d >= r) {
        PATTERN.value[i][j] = -1;
      }
    }
  }
};

export const setup = (p5: p5, canvas: HTMLCanvasElement | null) => {
  console.log("init create pattern p5");
  canvas && p5.createCanvas(CANVAS_WIDTH, CANVAS_SIZE, canvas);
  generateDefaultPattern(p5);
};

export const draw = (p5: p5) => {
  // draw the pattern
  const rectSize = CANVAS_SIZE / PATTERN.value[0].length;
  for (let i = 0; i < PATTERN.value.length; i++) {
    for (let j = 0; j < PATTERN.value[i].length; j++) {
      if (PATTERN.value[i][j] === -1) {
        p5.fill("#f88");
        p5.rect(j * rectSize, i * rectSize, rectSize, rectSize);

        //draw 2 cross lines
        p5.stroke(0);
        p5.line(
          j * rectSize,
          i * rectSize,
          (j + 1) * rectSize,
          (i + 1) * rectSize
        );
        p5.line(
          (j + 1) * rectSize,
          i * rectSize,
          j * rectSize,
          (i + 1) * rectSize
        );
      } else if (PATTERN.value[i][j] === 0) {
        p5.fill(255);
        p5.rect(j * rectSize, i * rectSize, rectSize, rectSize);
      } else {
        p5.fill(PATTERN.value[i][j] as string);
        p5.rect(j * rectSize, i * rectSize, rectSize, rectSize);
      }
    }
  }

  // draw the bug
  drawBug(
    p5,
    CANVAS_SIZE + PATTERN.value[0].length,
    PATTERN.value[0].length,
    PATTERN.value[0].length,
    "#f00"
  );

  const i = Math.floor(p5.mouseY / rectSize);
    const j = Math.floor(p5.mouseX / rectSize);
    if (i < 0 || i >= PATTERN.value.length || j < 0 || j >= PATTERN.value[i].length || PATTERN.value[i][j] === -1) return;

    if (mode === "DRAW"){        
        PATTERN.value[i][j] = SELECTED_COLOR.value;
    } else if (mode === "ERASE"){
        PATTERN.value[i][j] = 0;
    }
};

export const mousePressed = (p5: p5) => {
  if(p5.mouseButton === p5.LEFT){
      mode = "DRAW";
  } else if (p5.mouseButton === p5.RIGHT){
      mode = "ERASE";
  }
}

export const mouseReleased = () => {
  mode = "MOVE";
}