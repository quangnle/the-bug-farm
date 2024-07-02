import { MAX_POLLENS, SPAWN_DURATION } from "../constants"
import { sketchInstance as p5 } from "../gameState"

class Flower {
  _id: string
  x: number
  y: number
  pistilSize: number
  pistilColor: string
  petalSize: number
  petalWidth: number
  petalHeight: number
  petalColor: string
  petalNumber: number
  hasPollen: boolean
  numberOfPollens: number
  spawningTime: number
  angle: number
  boundaries: IBoundary

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
  }: {
    _id: string
    x: number
    y: number
    pistilSize: number
    pistilColor: string
    petalSize: number
    petalWidth: number
    petalHeight: number
    petalColor: string
    petalNumber: number
    numberOfPollens: number
    hasPollen: boolean
    spawningTime: number
  }) {
    this._id = _id
    this.x = x
    this.y = y
    this.pistilSize = pistilSize
    this.pistilColor = pistilColor
    this.petalSize = petalSize
    this.petalWidth = petalWidth || petalSize
    this.petalHeight = petalHeight || petalSize
    this.petalColor = petalColor
    this.petalNumber = petalNumber
    this.hasPollen = hasPollen
    this.numberOfPollens = numberOfPollens
    this.spawningTime = spawningTime
    this.angle = 0

    // get bounding box of the flower contains both pistil and petals
    const radius = this.pistilSize + this.petalSize / 2
    this.boundaries = {
      left: this.x - radius,
      right: this.x + radius,
      top: this.y - radius,
      bottom: this.y + radius,
    }
  }

  draw(isSelected: boolean) {
    // draw the leaves
    if (this.numberOfPollens > 0) {
      p5.fill("#009900")
      const leafSize = this.pistilSize * 1.5
      const leafAngle = p5.PI / 4
      for (let i = 0; i < 8; i++) {
        p5.push()
        p5.translate(this.x, this.y)
        p5.rotate(leafAngle * i)
        p5.rect(0, 0, leafSize, leafSize)
        p5.pop()
      }
    }

    // draw the petals
    p5.push()
    p5.translate(this.x, this.y)
    p5.rotate(this.angle)
    const angle = p5.TWO_PI / this.petalNumber
    for (let i = 0; i < this.petalNumber; i++) {
      const x = p5.cos(angle * i) * this.pistilSize
      const y = p5.sin(angle * i) * this.pistilSize
      p5.push()
      p5.translate(x, y)
      p5.rotate(angle * i)
      p5.fill(this.petalColor)
      p5.ellipse(0, 0, this.petalHeight, this.petalWidth)
      p5.pop()
    }

    // draw the pistil
    p5.fill(this.pistilColor)
    p5.ellipse(0, 0, this.pistilSize, this.pistilSize)
    p5.pop()

    // update pollen status
    if (this.numberOfPollens > 0) {
      if (!this.hasPollen) {
        this.spawningTime -= p5.deltaTime
        this.angle = 0
      } else {
        this.angle += 0.1
      }
    }

    if (this.spawningTime < 0) {
      this.hasPollen = true
    }

    if (isSelected) {
      // draw the bounding box
      p5.noFill()
      p5.stroke("#000")
      const size = this.pistilSize * 6 + p5.sin(p5.frameCount * 0.1) * 5
      p5.ellipse(this.x, this.y, size, size)
    }
  }

  infoString() {
    return `Time to spawn: ${Math.max(
      SPAWN_DURATION - this.spawningTime,
      0
    )} / ${SPAWN_DURATION}\nNumber of pollens left: ${Math.max(
      this.numberOfPollens,
      0
    )} / ${MAX_POLLENS}`
  }

  drawIcon(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const pistilSize = this.pistilSize / 2
    const petalSize = this.petalSize / 2

    if (this.numberOfPollens > 0) {
      const leafSize = this.pistilSize * 1.5
      const leafAngle = Math.PI / 4

      for (let i = 0; i < 8; i++) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(leafAngle * i)
        ctx.fillStyle = "#009900"
        ctx.fillRect(0, 0, leafSize, leafSize)
        ctx.restore()
      }
    }

    ctx.fillStyle = this.petalColor
    const angle = (Math.PI * 2) / this.petalNumber
    for (let i = 0; i < this.petalNumber; i++) {
      ctx.beginPath()
      ctx.arc(
        2 * pistilSize * Math.cos(angle * i),
        2 * pistilSize * Math.sin(angle * i),
        petalSize,
        0,
        Math.PI * 2
      )
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
    }

    ctx.fillStyle = this.pistilColor
    ctx.beginPath()
    ctx.arc(0, 0, pistilSize, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

    ctx.restore()
  }
}

export default Flower
