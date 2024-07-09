import p5 from "p5";
import { MAX_POLLENS, SPAWN_DURATION } from "../constants";

class Flower {
  _id: string;
  x: number;
  y: number;
  pistilSize: number;
  pistilColor: string;
  petalSize: number;
  petalWidth: number;
  petalHeight: number;
  petalColor: string;
  petalNumber: number;
  hasPollen: boolean;
  numberOfPollens: number;
  spawningTime: number;
  angle: number;
  p5: p5;
  boundaries: IBoundary;

  constructor({
    _id,
    x,
    y,
    pistilSize,
    pistilColor,
    petalSize,
    petalWidth,
    petalHeight,
    petalColor,
    petalNumber,
    numberOfPollens,
    hasPollen,
    spawningTime,
    p5,
  }: {
    _id: string;
    x: number;
    y: number;
    pistilSize: number;
    pistilColor: string;
    petalSize: number;
    petalWidth: number;
    petalHeight: number;
    petalColor: string;
    petalNumber: number;
    numberOfPollens: number;
    hasPollen: boolean;
    spawningTime: number;
    p5: p5;
  }) {
    this._id = _id;
    this.x = x;
    this.y = y;
    this.pistilSize = pistilSize;
    this.pistilColor = pistilColor;
    this.petalSize = petalSize;
    this.petalWidth = petalWidth || petalSize;
    this.petalHeight = petalHeight || petalSize;
    this.petalColor = petalColor;
    this.petalNumber = petalNumber;
    this.p5 = p5;
    this.hasPollen = hasPollen;
    this.numberOfPollens = numberOfPollens;
    this.spawningTime = spawningTime;
    this.angle = 0;

    // get bounding box of the flower contains both pistil and petals
    const radius = this.pistilSize + this.petalSize / 2;
    this.boundaries = {
      left: this.x - radius,
      right: this.x + radius,
      top: this.y - radius,
      bottom: this.y + radius,
    };
  }

  draw(isSelected: boolean) {
    // draw the leaves
    if (this.numberOfPollens > 0) {
      this.p5.fill("#009900");
      const leafSize = this.pistilSize * 1.5;
      const leafAngle = this.p5.PI / 4;
      for (let i = 0; i < 8; i++) {
        this.p5.push();
        this.p5.translate(this.x, this.y);
        this.p5.rotate(leafAngle * i);
        this.p5.rect(0, 0, leafSize, leafSize);
        this.p5.pop();
      }
    }

    // draw the petals
    this.p5.push();
    this.p5.translate(this.x, this.y);
    this.p5.rotate(this.angle);
    const angle = this.p5.TWO_PI / this.petalNumber;
    for (let i = 0; i < this.petalNumber; i++) {
      const x = this.p5.cos(angle * i) * this.pistilSize;
      const y = this.p5.sin(angle * i) * this.pistilSize;
      this.p5.push();
      this.p5.translate(x, y);
      this.p5.rotate(angle * i);
      this.p5.fill(this.petalColor);
      this.p5.ellipse(0, 0, this.petalHeight, this.petalWidth);
      this.p5.pop();
    }

    // draw the pistil
    this.p5.fill(this.pistilColor);
    this.p5.ellipse(0, 0, this.pistilSize, this.pistilSize);
    this.p5.pop();

    // update pollen status
    if (this.numberOfPollens > 0) {
      if (!this.hasPollen) {
        this.spawningTime -= this.p5.deltaTime;
        this.angle = 0;
      } else {
        this.angle += 0.1;
      }
    }

    if (this.spawningTime < 0) {
      this.hasPollen = true;
    }

    if (isSelected) {
      // draw the bounding box
      this.p5.noFill();
      this.p5.stroke("#000");
      const size =
        this.pistilSize * 6 + this.p5.sin(this.p5.frameCount * 0.1) * 5;
      this.p5.ellipse(this.x, this.y, size, size);
    }
  }

  infoString() {
    return `Time to spawn: ${Math.max(
      SPAWN_DURATION - this.spawningTime,
      0
    )} / ${SPAWN_DURATION}\nNumber of pollens left: ${Math.max(
      this.numberOfPollens,
      0
    )} / ${MAX_POLLENS}`;
  }

  drawIcon(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const pistilSize = this.pistilSize / 2;
    const petalSize = this.petalSize / 2;

    if (this.numberOfPollens > 0) {
      const leafSize = this.pistilSize * 1.5;
      const leafAngle = this.p5.PI / 4;

      for (let i = 0; i < 8; i++) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(leafAngle * i);
        ctx.fillStyle = "#009900";
        ctx.fillRect(0, 0, leafSize, leafSize);
        ctx.restore();
      }
    }

    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = this.petalColor;
    //draw the petals
    const angle = (Math.PI * 2) / this.petalNumber;
    for (let i = 0; i < this.petalNumber; i++) {
      const x = Math.cos(angle * i) * this.pistilSize;
      const y = Math.sin(angle * i) * this.pistilSize;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle * i);
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        this.petalHeight / 2,
        this.petalWidth / 2,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    ctx.fillStyle = this.pistilColor;
    ctx.beginPath();
    ctx.arc(0, 0, pistilSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
}

export default Flower;
