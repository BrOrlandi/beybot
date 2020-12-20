require('dotenv').config();
const ioHook = require('iohook');
const ComfyJS = require('comfy.js');

ComfyJS.Init(process.env.TWITCHUSER, process.env.OAUTH, 'BrOrlandi');

ComfyJS.onCommand = (user, command, message, flags, extra) => {
  if (command === 'sons') {
    ComfyJS.Say(`Se liga nos sons: 
    !caixao !hmm !errou !alert !jaavisei
    !sad !sad2 !sadnaruto !cholamais
    !cevaimorre !tapegandofogo !run !wasted
    `);
  }
};

const commandsCounters = {};

const keyMap = {
  71: '!caixao', // 7
  72: '!hmm', // 8
  73: '!errou', // 9
  75: '!alert', // 4
  76: '!jaavisei', // 5
  77: ['!sad', '!sad2', '!sadnaruto'], // 6
  79: '!cholamais', // 1
  80: '!cevaimorre', // 2
  81: '!tapegandofogo', // 3
  83: '!finishhim', // ,
  3637: '!run', // /
  74: '!stop', // -
  55: '!champions', // *
  78: '!wasted', // +
  82: '!caixaostart', // 0
};

const sendCommand = (command, keycode) => {
  if (!Array.isArray(command)) {
    console.log(command);
    ComfyJS.Say(command);
    return;
  }

  const counter = commandsCounters[keycode] || 0;
  commandsCounters[keycode] = counter + 1;

  const commandToSend = command[counter % command.length];
  console.log(commandToSend);
  ComfyJS.Say(commandToSend);
};

ioHook.on('keydown', (event) => {
  const { keycode } = event;
  const command = keyMap[keycode];

  if (command) {
    sendCommand(command, keycode);
  }
  // console.log(keycode);
});

ioHook.start();
