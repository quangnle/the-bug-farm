import p5 from "p5"
import { Signal, effect, signal } from "@preact/signals"
import Flower from "./entity/flower"
import Bug from "./entity/bug"
import Farm from "./entity/farm"
import { FARM_HEIGHT, FARM_WIDTH } from "./constants"
import api, { BASE_URL } from "./axios"
import { CoroutineCallback } from "./coroutine"

export const coroutineCallbacks = signal<Array<CoroutineCallback>>([])
const user: Signal<IUser | null> = signal(null)
const tank: Signal<ITank | null> = signal(null)
const farm: Signal<Farm> = signal(
  new Farm(0, 0, FARM_WIDTH, FARM_HEIGHT, "#77dd22")
)
const appearance: Signal<IAppearance[]> = signal([])
export const GAME_ASSET: Record<string, any> = {
  diamond: null,
  cashout: null,
}

const sketch = (s: p5) => {
  console.log("init p5")
  s.preload = () => {
    GAME_ASSET.diamond = s.loadImage("/assets/diamond.png")

    // Sound
    GAME_ASSET.cashout = new Audio()
    GAME_ASSET.cashout.src = "/sounds/cash.mp3"
    GAME_ASSET.cashout.preload = "auto"
  }
  s.setup = () => {
    const canvas = document.getElementById("main-canvas")
    canvas && s.createCanvas(960, 960, canvas)
  }
  s.draw = () => {
    s.clear()
    farm.value?.draw(s)

    coroutineCallbacks.value.forEach(
      (callback: CoroutineCallback, index: number) => {
        const iter = callback.generator.next()
        const { done } = iter
        if (done) {
          callback.onDone()

          coroutineCallbacks.value = coroutineCallbacks.value.filter(
            (_, cIndex) => cIndex !== index
          )
        }
      }
    )

    s.mousePressed = () => {
      if (!sketchInstance.isLooping()) return
      // check if the mouse is on the farm
      if (
        s.mouseY > farm.value?.x &&
        s.mouseY < farm.value?.y + farm.value?.height
      ) {
        farm.value?.mousePressed(s.mouseButton, s.mouseX, s.mouseY)
      } else if (
        s.mouseY > farm.value?.y + farm.value?.height &&
        s.mouseY < s.height
      ) {
        // check if the mouse is on the control panel
        // controlPanel.mousePressed(s.mouseButton, s.mouseX, s.mouseY)
        // update mode for farm
        // farm.mode = controlPanel.mode
      }
    }
  }
}

export const sketchInstance = new p5(sketch)

export const selectedObject: Signal<Bug | Flower | null> = signal(null)

export const GAME_STATE = {
  user,
  tank,
  farm,
  appearance,
}

effect(() => {
  const fetchTank = async () => {
    if (!tank.value?._id) return
    const { data } = await api.getTank(tank.value?._id)

    data.bugs.forEach((x: Bug & { appearance: string; genes: string[] }) => {
      const _x = Math.random() * (FARM_WIDTH - 100) + 100
      const _y = Math.random() * (FARM_HEIGHT - 100) + 100

      const bug = new Bug({
        ...x,
        x: _x,
        y: _y,
        size: 20,
        color: "#f00",
        p5: sketchInstance,
      })
      farm.value.colony.push(bug)
    })
    data.flowers.forEach((flo: Flower) => {
      const flower = new Flower({
        ...flo,
      })
      farm.value.addObject(flower)
    })

    const eventSource = new EventSource(BASE_URL + "/events-flower")
    eventSource.onmessage = ({ data }) => {
      const { flower } = JSON.parse(data).data
      if (flower._id) {
        const _flower = farm.value.objects.find((x) => x._id === flower._id)
        if (_flower) {
          _flower.hasPollen = flower.hasPollen
          _flower.numberOfPollens = flower.numberOfPollens
          _flower.spawningTime = flower.spawningTime
        }
      }
    }
  }

  fetchTank()
  console.log("game state changed", farm.value)
})
