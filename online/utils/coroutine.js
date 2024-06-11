const startCoroutine = (callback) => {
	return new Promise((resolve, reject) => {
		const iter = {
			generator: callback(),
			onDone: () => {
				console.log('callback done')
				resolve()
			},
		}

		animCallback.push(iter)
	})}

  const sleep = async (duration) => {
    await startCoroutine(function* () {
      let tick = 0
      while (true) {
        if (tick >= duration) {
          break
        }
        tick += deltaTime
        yield null
      }
    })
  }