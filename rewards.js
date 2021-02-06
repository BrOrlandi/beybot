require('dotenv').config();
const ComfyJS = require('comfy.js');

ComfyJS.Init(process.env.TWITCHUSER, process.env.OAUTH_REWARD, 'BrOrlandi');

ComfyJS.onReward = (user, reward, cost) => {
  console.log(`${user} redeemed ${reward} for ${cost}`);

  if (reward === 'Rojão MUITO ALTO') {
    ComfyJS.Say('!rojao');
  }
};
