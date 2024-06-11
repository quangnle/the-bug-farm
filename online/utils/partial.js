const sellBugEffect = async (x, y, duration = 1000) => {
  // Sound
  cashSound.play()

  // Animation
  let offsetY = 0

  await startCoroutine(function* () {
    let tick = 0
    while (true) {
      if (tick >= duration) {
        cashSound.pause()
        break
      }
      translate(x, y - Math.pow(offsetY, 1.1))
      tint(255, 255 - tick / duration * 255)
      image(diamond, -25, -25, 50, 50)

      tick += deltaTime
      offsetY += 1
      yield null
    }
  })
}