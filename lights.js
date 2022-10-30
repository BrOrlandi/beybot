const { Light } = require('tuya-light-api')

const { lightId, lightKey, light2Id, light2Key } = require('./lightsConfig')

const light = new Light(lightId, lightKey)
const light2 = new Light(light2Id, light2Key)

async function turnLightOffForSeconds(seconds) {
  await light.turnOff()
  await light2.turnOff()

  setTimeout(async () => {
    await light.turnOn()
    await light2.turnOn()
  }, seconds * 1000)
}

async function blinkLightTimes(times) {
  let count = 0
  let isLightOn = false

  const currentState = await light.getState()

  await light.setState({
    power: false, mode: Light.WHITE_MODE, brightness: 100, temperature: 1000,
  })
  await light2.setState({
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
        await light2.setState({
          power: true,
          mode: currentState.mode,
          color: currentState.color,
        })
        return
      }
      await light.setState(currentState)
      await light2.setState(currentState)
    }

    if (!isLightOn) {
      await light.turnOn()
      await light2.turnOn()
    }

    if (isLightOn) {
      await light.turnOff()
      await light2.turnOff()
    }

    isLightOn = !isLightOn
    count += 1
  }, 300)
}

async function blinkSub(times) {
  let count = 0
  let isLightOn = false

  const currentState = await light.getState()

  await light.setColor('#ffff00')
  await light2.setColor('#ffff00')

  setTimeout(()=>{
    const interval = setInterval(async () => {
      if (count === times) {
        clearInterval(interval)
        if (currentState.mode === Light.COLOR_MODE) {
          await light.setState({
            power: true,
            mode: currentState.mode,
            color: currentState.color,
          })
          await light2.setState({
            power: true,
            mode: currentState.mode,
            color: currentState.color,
          })
          return
        }
        await light.setState(currentState)
        await light2.setState(currentState)
      }

      if (!isLightOn) {
        await light.turnOn()
        await light2.turnOff()
      }

      if (isLightOn) {
        await light.turnOff()
        await light2.turnOn()
      }

      isLightOn = !isLightOn
      count += 1
    }, 500)
  }, 5000)
}

async function blinkColor(color, times, intervalTime) {
  let count = 0
  let isLightOn = false

  const currentState = await light.getState()

  await light.setColor(color)
  await light2.setColor(color)

  const interval = setInterval(async () => {
    if (count === times) {
      clearInterval(interval)
      if (currentState.mode === Light.COLOR_MODE) {
        await light.setState({
          power: true,
          mode: currentState.mode,
          color: currentState.color,
        })
        await light2.setState({
          power: true,
          mode: currentState.mode,
          color: currentState.color,
        })
        return
      }
      await light.setState(currentState)
      await light2.setState(currentState)
    }

    if (!isLightOn) {
      await light.turnOn()
      await light2.turnOff()
    }

    if (isLightOn) {
      await light.turnOff()
      await light2.turnOn()
    }

    isLightOn = !isLightOn
    count += 1
  }, intervalTime)
}

async function baladMode(seconds) {
  const currentState = await light.getState()
  await light.setScene('05646401000003e803e800000000646401007803e803e800000000646401014003e803e800000000646401003d03e803e80000000064640100ae03e803e800000000646401011303e803e800000000646401002803e803e80000000064640100f803e803e800000000')
  await light2.setScene('05646401000003e803e800000000646401007803e803e800000000646401014003e803e800000000646401003d03e803e80000000064640100ae03e803e800000000646401011303e803e800000000646401002803e803e80000000064640100f803e803e800000000')

  setTimeout(async () => {
    if (currentState.mode === Light.COLOR_MODE) {
      await light.setState({
        power: true,
        mode: currentState.mode,
        color: currentState.color,
      })
      await light2.setState({
        power: true,
        mode: currentState.mode,
        color: currentState.color,
      })
      return
    }
    await light.setState(currentState)
    await light2.setState(currentState)
  }, seconds * 1000)
}

const startLightApi = async () => {
  await light.connect()
  await light2.connect()
  await light.setColor('#0079b5')
  await light2.turnOn()
  await light2.setColor('#0079b5')
}

startLightApi()

module.exports = {
  turnLightOffForSeconds,
  blinkLightTimes,
  baladMode,
  blinkSub,
  blinkColor,
}
