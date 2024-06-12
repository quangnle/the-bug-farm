import p5 from "p5"
import { Signal, signal } from "@preact/signals"

export const GAME_STATE: Signal<{
  user: IUser | null
  tank: ITank | null
}> = signal({
  user: null,
  tank: null,
  farm: null,
})

const sketch = (s: p5) => {
  console.log('init p5')
  s.setup = () => {
    s.createCanvas(960, 960, document.getElementById('main-canvas'))
  }
  s.draw = () => {
    s.background(0)
    s.circle(10, 10, 10)
  }
}

export const sketchInstance = new p5(sketch)