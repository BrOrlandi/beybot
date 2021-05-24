const { v3 } = require('node-hue-api');

const { LightState } = v3.lightStates;

const lightOff = new LightState().on(false);

const coldLowLight = new LightState()
  .on(true)
  .ct(230)
  .brightness(35);

const coldFullLight = new LightState()
  .on(true)
  .ct(230)
  .brightness(100);

const warmFullLight = new LightState()
  .on(true)
  .ct(500)
  .brightness(100);

const DEFAULT_LIGHT_STATE = coldLowLight;
// const DEFAULT_LIGHT_STATE = coldFullLight;

const USER = process.env.HUE_USER;
const KEY = process.env.HUE_KEY;
const HOST = process.env.HUE_BRIDGE_IP;

const LIGHT_ID = 3; // Luz do escritório

let hueApi;

async function setLightDefaultState() {
  await hueApi.lights.setLightState(LIGHT_ID, DEFAULT_LIGHT_STATE);
}

async function setLightOff() {
  await hueApi.lights.setLightState(LIGHT_ID, lightOff);
}

async function setLightWarmFull() {
  await hueApi.lights.setLightState(LIGHT_ID, warmFullLight);
}

async function setupApi() {
  hueApi = await v3.api.createLocal(HOST).connect(USER, KEY);
  await setLightDefaultState();
}

setupApi();

async function turnLightOffForSeconds(seconds) {
  await setLightOff();

  setTimeout(async () => {
    await setLightDefaultState();
  }, seconds * 1000);
}

async function blinkLightTimes(times) {
  let count = 0;
  let isLightOn = false;

  await hueApi.lights.setLightState(LIGHT_ID, lightOff);

  const interval = setInterval(async () => {
    if (!isLightOn) {
      await setLightWarmFull();
    }

    if (isLightOn) {
      await setLightOff();
    }

    count += 1;
    isLightOn = !isLightOn;
    if (count === times) {
      clearInterval(interval);

      await setLightDefaultState();
    }
  }, 1000);
}

module.exports = {
  turnLightOffForSeconds,
  blinkLightTimes,
};
