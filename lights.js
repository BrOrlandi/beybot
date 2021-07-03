const Light = require('tuya-light-api')

const { lightId, lightKey } = require('./lightsConfig')

const light = new Light(lightId, lightKey)

async function turnLightOffForSeconds(seconds) {
  await light.turnOff()

  setTimeout(async () => {
    await light.turnOn()
  }, seconds * 1000)
}

async function blinkLightTimes(times) {
  let count = 0
  let isLightOn = false

  const currentState = await light.getState()

  await light.setState({
    power: false, mode: Light.WHITE_MODE, brightness: 100, temperature: 1000,
  })

  const interval = setInterval(async () => {
    if (count === times) {
      clearInterval(interval)
      if (currentState.mode === Light.COLOR_MODE) {
        await light.setState({
          power: true,
          mode: currentState.mode,
          color: currentState.color,
        })
        return
      }
      await light.setState(currentState)
    }

    if (!isLightOn) {
      await light.turnOn()
    }

    if (isLightOn) {
      await light.turnOff()
    }

    isLightOn = !isLightOn
    count += 1
  }, 300)
}

async function baladMode(seconds) {
  const currentState = await light.getState()
  await light.setScene('05646401000003e803e800000000646401007803e803e800000000646401014003e803e800000000646401003d03e803e80000000064640100ae03e803e800000000646401011303e803e800000000646401002803e803e80000000064640100f803e803e800000000')

  setTimeout(async () => {
    if (currentState.mode === Light.COLOR_MODE) {
      await light.setState({
        power: true,
        mode: currentState.mode,
        color: currentState.color,
      })
      return
    }
    await light.setState(currentState)
  }, seconds * 1000)
}

const startLightApi = async () => {
  await light.connect()
  await light.setColor('#0079b5')
}

startLightApi()

module.exports = {
  turnLightOffForSeconds,
  blinkLightTimes,
  baladMode,
}
