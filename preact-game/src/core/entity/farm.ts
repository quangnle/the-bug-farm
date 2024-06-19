import Bug from "./bug"
import Flower from "./flower"
import Route from "./route"

import p5 from "p5"
import { GAME_STATE, selectedObject, sketchInstance } from "../gameState"
import api from "../axios"
import { BUG_SIZE, MAX_POPULATION } from "../constants"
import { plantFlower } from "@/components/flower-plant"

const distanceToReachFood = 10

class Farm {
  x: number
  y: number
  width: number
  height: number
  color: string
  colony: Bug[]
  objects: Flower[]
  obstacles: IBoundary[]
  mode: string
  route: Route | null
  boundingBox: boolean

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.colony = []
    this.objects = []
    this.obstacles = []
    this.mode = "play"
    this.route = null
    this.boundingBox = false
  }

  addObject(obj: Flower) {
    this.objects.push(obj)
    // update obstacles
    if (obj.boundaries) {
      this.obstacles.push(obj.boundaries)
    }
  }

  drawBoundaries(p5: p5) {
    // draw the boundaries
    p5.stroke(0)
    p5.strokeWeight(2)
    // fill(this.color);
    // rect(this.x, this.y, this.width, this.height);
    p5.strokeWeight(1)
  }

  drawObjects(p5: p5) {
    // draw objects
    this.objects.forEach((object) => {
      if (selectedObject.value === object) {
        object.draw(true)
      } else {
        object.draw(false)
      }
    })

    if (this.mode === "plant") {
      // draw connecting lines between the flowers
      const flowers = this.objects.filter((obj) => obj instanceof Flower)
      if (flowers.length > 1) {
        for (let i = 0; i < flowers.length; i++) {
          const flower1 = flowers[i]
          const flower2 = flowers[(i + 1) % flowers.length]
          p5.stroke(p5.color(0, 0, 0, 100))
          p5.strokeWeight(3)
          p5.line(flower1.x, flower1.y, flower2.x, flower2.y)
          p5.strokeWeight(1)
        }
      }
    }
  }

  drawColony(p5: p5) {
    const flowers = this.objects.filter((obj) => obj instanceof Flower)
    const flowersWithPollens = flowers.filter((flower) => flower.hasPollen)

    const colony = this.colony
    const idleBugIndices: number[] = []
    // fill the idleBugIndices array zeros
    for (let i = 0; i < colony.length; i++) {
      idleBugIndices.push(0)
    }

    // draw bugs
    colony.forEach((bug, idx) => {
      // update the bug's position
      bug.findDirection(
        flowersWithPollens,
        {
          left: this.x,
          right: this.x + this.width,
          top: this.y,
          bottom: this.y + this.height,
        },
        this.route
      )

      // check if the bug is jammed
      if (this.route) {
        // solve jamed bugs
        this.route.jamSolve()
      }

      // check if the bug is colliding with other bugs
      // then set all the bugs that collide with this bug to 1 in the idleBugIndices array
      colony.forEach((otherBug, index) => {
        if (bug !== otherBug) {
          const d = p5.dist(bug.x, bug.y, otherBug.x, otherBug.y)
          if (d < bug.size) {
            idleBugIndices[index] = 1
            otherBug.hunger = 300
            bug.pushedBy(otherBug)
          }
        }
      })

      // update the bug's position
      if (idleBugIndices[idx] === 0) bug.update()

      // draw the bug's bounding box
      if (this.boundingBox) {
        p5.noFill()
        p5.stroke("#f00")
        p5.rect(bug.x - bug.size / 2, bug.y - bug.size / 2, bug.size, bug.size)
        p5.stroke("#000")
      }

      // draw the bug
      if (selectedObject.value === bug) {
        bug.draw(true)
      } else {
        bug.draw(false)
      }

      // check if the bug is on a food item, then create new bug and remove the food item
      flowersWithPollens.forEach((flower) => {
        const d = p5.dist(bug.x, bug.y, flower.x, flower.y)
        if (d <= distanceToReachFood && flower.hasPollen) {
          // remove the pollen from the flower
          flower.hasPollen = false

          // change the bug's color and hunger
          bug.color = flower.pistilColor
          bug.hunger = 500

          // check if the colony is full and the flower has pollen to create a new bug
          if (
            colony.length >= (GAME_STATE.tank.value?.size || MAX_POPULATION) ||
            flower.numberOfPollens < 1 ||
            this.mode == "show"
          )
            return

          // else, evolution to make a new bug
          // const newBug = Evolution.evolute(bug, flower.pistilColor)
          if (bug._id && flower._id) {
            flower.hasPollen = false
            api.bugEatFlower(bug._id, flower._id).then(({ data }) => {
              if (data._id) {
                const newBug = new Bug({
                  ...data,
                  color: flower.pistilColor,
                  x: bug.x,
                  y: bug.y,
                  p5: bug.p5
                })
                colony.push(newBug)
                // handleUpdateInformation()
              }
            })
          }
        }
      })
    })
  }

  draw(p: p5) {
    this.drawBoundaries(p)
    this.drawObjects(p)
    this.drawColony(p)
  }

  plantAFlower(x: number, y: number) {
    const _flower = {...plantFlower.value}

    api
      .plantFlower({
        tank: GAME_STATE.tank.value?._id,
        x,
        y,
        ..._flower
      })
      .then((res) => {
        if (res.data._id) {
          const flower = new Flower({
            _id: res.data._id,
            x,
            y,
            ...res.data,
            hasPollen: false,
          })
          this.addObject(flower)
        }
      })
  }

  // loadObjectInfo(obj: Flower | Bug) {
  //   objectInfo.innerHTML = obj.infoString()
  //   const objectRenderer = document.getElementById("object-render-canvas")
  //   const ctx = objectRenderer.getContext("2d")
  //   ctx.fillStyle = "#77dd22"
  //   ctx.strokeStyle = "#000"
  //   ctx.rect(0, 0, 50, 50)
  //   ctx.fill()
  //   ctx.stroke()

  //   obj.drawIcon(ctx, 25, 25)

  //   const btnSellIt = document.getElementById("btn-sell-it")
  //   const btnRemoveIt = document.getElementById("btn-remove-it")
  //   const btnBringToMarket = document.getElementById("btn-bring-to-market")

  //   // check if the object is a bug or a flower and show the appropriate buttons
  //   if (obj instanceof Bug) {
  //     btnSellIt.style.display = "flex"
  //     btnBringToMarket.style.display = "flex"
  //     btnRemoveIt.style.display = "none"
  //     patterncvs.style.visibility = "visible"
  //     const patternCtx = patterncvs.getContext("2d")
  //     obj.drawBugPatternCanvas(patternCtx, 50, 50)
  //   } else if (obj instanceof Flower) {
  //     btnSellIt.style.display = "none"
  //     btnBringToMarket.style.display = "none"
  //     btnRemoveIt.style.display = "flex"
  //     patterncvs.style.visibility = "hidden"
  //   }
  // }

  mousePressed(mouseButton: 'left' | 'right', mouseX: number, mouseY: number, onBugClick?: (value: Bug) => void) {
    if (mouseButton === 'right') {
      // check if mouse position is out of the canvas
      if (
        mouseX < this.x + BUG_SIZE ||
        mouseX > this.width - BUG_SIZE ||
        mouseY < this.y + BUG_SIZE ||
        mouseY > this.height - BUG_SIZE
      )
        return

      // check if mouse position is on an obstacle
      let isOnObstacle = false
      this.obstacles.forEach((obstacle) => {
        if (
          mouseX > obstacle.left &&
          mouseX < obstacle.right &&
          mouseY > obstacle.top &&
          mouseY < obstacle.bottom
        ) {
          isOnObstacle = true
        }
      })
      if (isOnObstacle) return

      if (this.mode === "play") {
        // temporarily does nothing
      } else if (this.mode === "plant" || this.mode === "show") {
        this.plantAFlower(mouseX, mouseY)
      }
    }

    // left click on the bug to select it
    if (mouseButton === 'left') {
      // check if mouse position is on a bug
      this.colony.forEach((bug) => {
        const d = sketchInstance.dist(mouseX, mouseY, bug.x, bug.y)
        if (d < bug.size) {
          selectedObject.value = bug
          onBugClick && onBugClick(bug)
        }
      })

      // check if mouse position is on a flower
      this.objects.forEach((obj, index) => {
        if (obj instanceof Flower) {
          const d = sketchInstance.dist(mouseX, mouseY, obj.x, obj.y)
          if (d < obj.pistilSize + obj.petalSize / 2) selectedObject.value = obj
        }
      })
    }
  }
}

export default Farm