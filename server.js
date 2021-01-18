require('dotenv').config();
const ioHook = require('iohook');
const ComfyJS = require('comfy.js');

ComfyJS.Init(process.env.TWITCHUSER, process.env.OAUTH, 'BrOrlandi');

// eslint-disable-next-line no-unused-vars
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

const dotKeyShortcutMap = {
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
  55: '!acabou', // *
  78: '!wasted', // +
  82: '!caixaostart', // 0
};

const sendCommand = (command) => {
  if (!Array.isArray(command)) {
    console.log(command);
    ComfyJS.Say(command);
    return;
  }

  const counter = commandsCounters[command] || 0;
  commandsCounters[command] = counter + 1;

  const commandToSend = command[counter % command.length];
  console.log(commandToSend);
  ComfyJS.Say(commandToSend);
};

const playKeyCommand = (key) => {
  const command = keyMap[key];

  if (command) {
    sendCommand(command);
  }
};

const playKeyShortcutCommand = (key) => {
  const command = dotKeyShortcutMap[key];

  if (command) {
    sendCommand(command);
  }
};

let usingShortcut = false;

Object.keys(dotKeyShortcutMap).forEach((key) => {
  ioHook.registerShortcut([0, key], (keysPressed) => {
    usingShortcut = true;
    playKeyShortcutCommand(keysPressed[1]);
  }, () => {
    usingShortcut = false;
  });
});

Object.keys(keyMap).forEach((key) => {
  ioHook.registerShortcut([key], (keysPressed) => {
    if (usingShortcut) {
      return;
    }
    playKeyCommand(keysPressed[0]);
  }, () => {
    usingShortcut = false;
  });
});

ioHook.start();
