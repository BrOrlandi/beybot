const { Control } = require('magic-home')

const light = new Control('192.168.15.13')

const turnOnLed = async () => {
    await light.setPower(true)
}

const turnOffLed = async () => {
    await light.setPower(false)
}

async function turnLedOffForSeconds(seconds) {
    await turnOffLed()

    setTimeout(async () => {
        await turnOnLed()
    }, seconds * 1000)
}

module.exports = {
    turnOnLed,
    turnOffLed,
    turnLedOffForSeconds,
}
