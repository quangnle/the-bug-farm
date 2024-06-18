import Bug from "./bug"
import Flower from "./flower"

import { sketchInstance as p5 } from "../gameState"
import { BUG_SIZE } from "../constants"

class Route {
  colony: Bug[]
  flowers: Flower[]

  constructor(colony: Bug[], flowers: Flower[]) {
    this.colony = colony
    this.flowers = flowers
  }

  start() {
    const assignedBugs = Array(this.colony.length).fill(0)
    const groupSize = Math.ceil(this.colony.length / this.flowers.length)

    this.flowers.forEach((flower) => {
      // get all unassigned bugs
      const unassignedBugs = this.colony.filter(
        (bug, idx) => assignedBugs[idx] === 0
      )
      // calculate all distances between the flower and the unassigned bugs, sorted by distance in ascending order
      const distances = unassignedBugs
        .map((bug) => ({
          bug: bug,
          distance: p5.dist(bug.x, bug.y, flower.x, flower.y),
        }))
        .sort((a, b) => a.distance - b.distance)
      // assign the first groupSize bugs to the flower
      distances.slice(0, groupSize).forEach(({ bug }) => {
        bug.target = flower
        assignedBugs[this.colony.indexOf(bug)] = 1
      })
    })
  }

  stop() {
    this.colony.forEach((bug) => {
      bug.target = null
    })
  }

  isJammed(flower: Flower, jamedRadius: number, maxSize: number) {
    const targetings =this .colony.filter((bug) => bug.target === flower)
    // count the number of bugs targeting the flower with distance under the jammed radius
    let count = 0
    targetings.forEach((bug) => {
      if (p5.dist(bug.x, bug.y, flower.x, flower.y) < jamedRadius) {
        count++
      }
    })
    return count > maxSize
  }

  // traffic jam solver
  jamSolve() {
    // get all flowers that are jammed
    const jammedFlowers = this.flowers.filter((flower) =>
      this.isJammed(flower, BUG_SIZE * 1.5, 5)
    )
    // set the jammed bugs target to the next flower in the route
    jammedFlowers.forEach((flower) => {
      const idx = this.flowers.indexOf(flower)
      const nextFlower = this.flowers[(idx + 1) % this.flowers.length]
      this.colony
        .filter((bug) => bug.target === flower)
        .forEach((bug) => {
          bug.target = nextFlower
        })
    })
  }
}

export default Route
