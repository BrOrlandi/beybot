require('dotenv').config()
const ComfyJS = require('comfy.js')
const { turnLightOffForSeconds, blinkLightTimes, baladMode, blinkSub, blinkColor } = require('./lights')

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
      baladMode(33)
    }, 100)
  }
}

const onSub = () => {
  console.log('ON SUB CALLED');
  blinkSub(14)
}

ComfyJS.onSub(onSub)
ComfyJS.onResub(onSub)
ComfyJS.onSubGift(onSub)
ComfyJS.onSubMysteryGift(onSub)
ComfyJS.onGiftSubContinue(onSub)

ComfyJS.onRaid(()=> {
  console.log('ON RAID CALLED');
  blinkColor('#00ff00',14, 400);
})

ComfyJS.onHosted(()=> {
  console.log('ON HOST CALLED');
  blinkColor('#00ff00',14, 400);
})

ComfyJS.onCheer(()=> {
  console.log('ON CHEER CALLED');
  blinkColor('#ff00ff',8, 500);
})