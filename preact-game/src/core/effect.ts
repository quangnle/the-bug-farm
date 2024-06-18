import { startCoroutine } from "./coroutine"
import { GAME_ASSET, sketchInstance } from "./gameState"

export const sellBugEffect = async (x: number, y: number, duration = 1000) => {
  // Sound
  console.log(GAME_ASSET.cashout)
  GAME_ASSET.cashout.play()

  // Animation
  let offsetY = 0

  await startCoroutine(function* () {
    let tick = 0
    while (true) {
      if (tick >= duration) {
        // GAME_ASSET.cashout.pause()
        break
      }
      sketchInstance.translate(x, y - Math.pow(offsetY, 1.1))
      sketchInstance.tint(255, 255 - tick / duration * 255)
      sketchInstance.image(GAME_ASSET.diamond, -25, -25, 50, 50)

      tick += sketchInstance.deltaTime
      offsetY += 1
      yield null
    }
  })
}