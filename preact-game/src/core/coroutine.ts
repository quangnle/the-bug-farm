import { coroutineCallbacks, sketchInstance } from '@/core/gameState'

export type CoroutineCallback = {
  generator: Generator
  onDone: () => void
}

export const startCoroutine = (callback: () => void): Promise<void> => {
  return new Promise<void>((resolve) => {
    const iter: CoroutineCallback = {
      generator: callback() as unknown as Generator<unknown>,
      onDone: () => {
        resolve()
      }
    }

    coroutineCallbacks.value.push(iter)
  })
}

export const sleep = async (duration: number) => {
  await startCoroutine(function* (): Generator<unknown> {
    let tick = 0
    while (true) {
      if (tick >= duration) {
        break
      }
      tick += sketchInstance.deltaTime
      yield null
    }
  })
}
