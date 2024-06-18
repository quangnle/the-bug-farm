import { PATTERN_DEFAULT } from "../constants";
import { GAME_STATE } from "../gameState"

import p5 from "p5"
import Route from "./route"

class Bug {
  _id: string // Add missing property
  color: string // Add missing property
  x: number // Add missing property
  y: number // Add missing property
  size: number // Add missing property
  angle: number // Add missing property
  dx: number // Add missing property
  dy: number // Add missing property
  hunger: number // Add missing property
  mutationRate: number // Add missing property
  appearance: IAppearance // Add missing property
  genes: any[] // Add missing property
  foodSenseDistance: number // Add missing property
  target: any // Add missing property
  p5: p5
  name: string

  constructor({
    _id,
    color,
    x,
    y,
    name,
    size,
    angle,
    appearance : defaultAppearance,
    genes : defaultGenes = [],
    p5,
  }: {
    _id: string
    color: string
    x: number
    y: number
    name: string
    size: number
    angle: number
    appearance: string
    genes: string[],
    p5: p5
  }) {
    this._id = _id
    this.color = color
    this.x = x
    this.y = y
    this.size = size
    this.angle = angle
    this.dx = Math.cos(this.angle)
    this.dy = Math.sin(this.angle)
    this.hunger = 500
    this.mutationRate = 0.1
    this.p5 = p5

    const _appearance =
      GAME_STATE.appearance.value.find(
        (x: any) => x._id === defaultAppearance
      ) || PATTERN_DEFAULT
    this.appearance = _appearance
    this.genes = []
    this.foodSenseDistance = 150
    this.target = null

    // add the default pattern
    if (defaultGenes.length === 0) {
      this.genes.push(PATTERN_DEFAULT) // Add missing variable or replace with a default value
    } else {
      defaultGenes.forEach((x: string) => {
        const _find = GAME_STATE.appearance.value.find(
          (app: any) => app._id === x
        )
        this.genes.push(
          _find || {
            name: "default",
            pattern: PATTERN_DEFAULT, // Add missing variable or replace with a default value
            score: 90,
          }
        )
      })
    }
  }

  getBoundingBox(): IBoundary {
    return {
      left: this.x - this.size / 2,
      right: this.x + this.size / 2,
      top: this.y - this.size / 2,
      bottom: this.y + this.size / 2,
    }
  }

  randomDirection(boundaries: IBoundary) {
    // split the region into 4 parts by the bug's position
    const topleft = {
      x1: boundaries.left,
      y1: boundaries.top,
      x2: this.x,
      y2: this.y,
    }
    const topright = {
      x1: this.x,
      y1: boundaries.top,
      x2: boundaries.right,
      y2: this.y,
    }
    const bottomleft = {
      x1: boundaries.left,
      y1: this.y,
      x2: this.x,
      y2: boundaries.bottom,
    }
    const bottomright = {
      x1: this.x,
      y1: this.y,
      x2: boundaries.right,
      y2: boundaries.bottom,
    }

    // calculate the surface of each region
    const surfaces = [topleft, topright, bottomleft, bottomright]
      .map((region) => {
        const dx = region.x2 - region.x1
        const dy = region.y2 - region.y1
        region.s = dx * dy
        return region
      })
      .sort((a, b) => a.s - b.s)

    // sum of surfaces
    const sumSurfaces =
      (boundaries.right - boundaries.left) *
      (boundaries.bottom - boundaries.top)
    // select a region based on the surface proportion
    const r = Math.random() * sumSurfaces
    let s = 0
    let selectedRegion = null
    surfaces.forEach((region) => {
      s += region.s
      if (s >= r && selectedRegion === null) {
        selectedRegion = region
      }
    })

    // choose a random point in the selected region
    const x = this.p5.random(selectedRegion.x1, selectedRegion.x2)
    const y = this.p5.random(selectedRegion.y1, selectedRegion.y2)

    const d = this.p5.min(this.p5.dist(this.x, this.y, x, y), this.size * 10)
    const angle = this.p5.atan2(y - this.y, x - this.x)
    return { x: this.x + this.p5.cos(angle) * d, y: this.y + this.p5.sin(angle) * d }
  }

  findAvailableFood(foods: IPoint[]) {
    return foods.find(
      (food) => this.p5.dist(this.x, this.y, food.x, food.y) < this.foodSenseDistance
    )
  }

  findATarget(boundaries: IBoundary, routes: Route | null) {
    if (routes) {
      let routeIdx = routes.flowers.findIndex(
        (route) => route.x === this.target.x && route.y === this.target.y
      )
      if (routeIdx < 0) return routes.flowers[0]
      else {
        return routes.flowers[(routeIdx + 1) % routes.flowers.length]
      }
    } else {
      return this.randomDirection(boundaries)
    }
  }

  findDirection(foods: IPoint[], boundaries: IBoundary, routes: Route | null) {
    const food = this.findAvailableFood(foods)
    if (this.hunger <= 0 && food && !routes) {
      this.target = food
    }

    if (this.target == null) this.target = this.findATarget(boundaries, routes)
    else {
      const d = this.p5.dist(this.x, this.y, this.target.x, this.target.y)
      if (d < 5) {
        this.target = this.findATarget(boundaries, routes)
      }
    }
  }

  pushedBy(otherBug: Bug) {
    // calculate the angle between the two bugs
    const angle = this.p5.atan2(this.y - otherBug.y, this.x - otherBug.x)
    // set this bug's position away from the other bug 1 time the size of the bug
    this.x += this.p5.cos(angle)
    this.y += this.p5.sin(angle)
  }

  update() {
    // decrease the hungry counter
    this.hunger--
    // make the bug move towards the target
    const angle = this.p5.atan2(this.target?.y - this.y, this.target?.x - this.x)
    this.angle = angle + this.p5.sin(this.p5.frameCount * 0.1) * 0.15
    this.dx = this.p5.cos(angle)
    this.dy = this.p5.sin(angle)
    this.x += this.dx
    this.y += this.dy
  }

  draw(isSelected: boolean) {
    this.p5.push()
    // draw the bug
    this.p5.translate(this.x, this.y)
    this.p5.rotate(this.angle + this.p5.PI / 2)

    // draw the head
    this.p5.fill(50)
    this.p5.ellipse(0, this.size * -0.4, this.size * 0.5, this.size * 0.5)

    // draw 2 dots on the head to represent eyes
    this.p5.stroke(255)
    this.p5.point(-this.size * 0.1, -this.size * 0.6)
    this.p5.point(this.size * 0.1, -this.size * 0.6)

    // draw the lower body
    this.p5.stroke(0)
    this.p5.fill(this.color)
    this.p5.ellipse(0, 0, this.size, this.size)

    // draw the pattern
    this.p5.stroke(0)
    //strokeWeight(1.5);
    for (let i = 0; i < this.appearance.pattern.length; i++) {
      for (let j = 0; j < this.appearance.pattern.length; j++) {
        if (
          this.appearance.pattern[j][i] !== -1 &&
          this.appearance.pattern[j][i] !== 0
        ) {
          this.p5.stroke(this.appearance.pattern[j][i])
          this.p5.point(i - this.size / 2, j - this.size / 2)
        }
      }
    }
    this.p5.pop()

    if (isSelected) {
      // draw the bounding box
      this.p5.noFill()
      this.p5.stroke("#000")
      const size = this.size * 1.5 + this.p5.sin(this.p5.frameCount * 0.1) * 5
      this.p5.ellipse(this.x, this.y, size, size)
    }
  }

  infoString() {
    // total score
    const totalScore = this.genes.reduce((acc, g) => acc + g.score, 0)

    let info = `
            <p>Hunger rate: ${500 - this.hunger}</p>
            <p>Appearance: ${this.appearance.name}</p>
            <p>List of genes:</p>
            <ul>
                ${this.genes
                  .map(
                    (g) =>
                      `<li>${g.name} : $(${Math.round(
                        (g.score / totalScore) * 100
                      )}%)</li>`
                  )
                  .join("\n")}
            </ul>
        `
    return info
  }

  drawIcon(ctx, x, y) {
    const size = this.size / 2

    ctx.save()
    ctx.translate(x, y)
    // draw the head
    ctx.fillStyle = "#333"
    ctx.beginPath()
    ctx.ellipse(0, 2 * size * -0.4, size * 0.5, size * 0.5, 0, 0, Math.PI * 2)
    ctx.fill()

    // draw 2 dots on the head to represent eyes
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(-size * 0.2, -2 * size * 0.6, 1, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(size * 0.2, -2 * size * 0.6, 1, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // draw the lower body
    ctx.strokeStyle = "#000"
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.ellipse(0, 0, size, size, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // draw the pattern
    ctx.strokeStyle = "#000"
    //ctx.strokeWeight = 1.5;
    for (let i = 0; i < this.appearance.pattern.length; i++) {
      for (let j = 0; j < this.appearance.pattern.length; j++) {
        if (
          this.appearance.pattern[j][i] !== -1 &&
          this.appearance.pattern[j][i] !== 0
        ) {
          ctx.strokeStyle = this.appearance.pattern[j][i]
          ctx.beginPath()
          ctx.moveTo(i - size, j - size)
          ctx.lineTo(i - size + 1, j - size + 1)
          ctx.stroke()
        }
      }
    }
    ctx.restore()
  }

  // draw the pattern of the selected bug on the bug-color-canvas
  drawBugPatternCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height)
    let pattern = this.appearance.pattern
    let size = 50 / pattern.length
    for (let i = 0; i < pattern.length; i++) {
      for (let j = 0; j < pattern[i].length; j++) {
        if (pattern[i][j] === 0) {
          ctx.fillStyle = this.color
        } else {
          ctx.fillStyle = "black"
        }
        ctx.fillRect(j * size, i * size, size, size)
      }
    }
  }
}

export default Bug