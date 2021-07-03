require('dotenv').config()
const ComfyJS = require('comfy.js')
const { turnLightOffForSeconds, blinkLightTimes, baladMode } = require('./lights')

ComfyJS.Init(process.env.TWITCHUSER, process.env.OAUTH_REWARD, 'BrOrlandi')

ComfyJS.onReward = (user, reward, cost) => {
  console.log(`${user} redeemed ${reward} for ${cost}`)

  if (reward === 'Rojão MUITO ALTO') {
    ComfyJS.Say('!rojao')
  }

  if (reward === 'Yeaaahh') {
    ComfyJS.Say('!yeah')
  }

  if (reward === 'IT\'S JOHN CENA!') {
    ComfyJS.Say('!johncena')
  }

  if (reward === 'Rugido do Rex') {
    ComfyJS.Say('!rex')
  }

  if (reward === 'Apagar a Luz') {
    ComfyJS.Say('!apagaluz')
    setTimeout(() => {
      turnLightOffForSeconds(15)
    }, 1500)
  }

  if (reward === 'Piscar a Luz') {
    ComfyJS.Say('!piscaluz')
    setTimeout(() => {
      blinkLightTimes(6)
    }, 100)
  }

  if (reward === 'Modo Balada') {
    ComfyJS.Say('!modobalada')
    setTimeout(() => {
      baladMode(30)
    }, 100)
  }
}
