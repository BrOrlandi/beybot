require('dotenv').config();
const ioHook = require('iohook');
const ComfyJS = require('comfy.js');

ComfyJS.Init(process.env.TWITCHUSER, process.env.OAUTH, 'BrOrlandi');

let currentShortcutsPage = 0;
const MAX_PAGES = 2;

let cervejas = 0;

// eslint-disable-next-line no-unused-vars
ComfyJS.onCommand = (user, command, message, flags, extra) => {
  if (command === 'comandos') {
    ComfyJS.Say(`
    !discord
    !warzone
    !cod
    !sons
    !sonscorrida
    !cerveja
    !cervejazerar
    !videomatik
    !youtube
    `);
    return;
  }

  if (command === 'sons') {
    ComfyJS.Say(`Se liga nos sons:
    !caixao !hmm !errou !alert !jaavisei
    !sad !sad2 !sadnaruto !cholamais
    !cevaimorre !tapegandofogo !run !wasted
    !emorreu !teamwork !xfiles !gas !thuglife
    !memefinal !sexy !nogod !aiai !awshit
    !missioncompleted !quepena !berg !moises !surprise
    !burro !aiqueburro !yeah !missaoimpossivel !cyberpunk
    !wee
    `);
    return;
  }

  if (command === 'sonscorrida') {
    ComfyJS.Say(`Sons para Corrida:
      !drift !ridin !vitoria !satanas
    `);
    return;
  }

  if (command === 'discord') {
    ComfyJS.Say('/me Cola no Discord: https://discord.gg/2bsQbbE4mC');
    return;
  }

  if (command === 'warzone' || command === 'cod') {
    ComfyJS.Say('/me Me adiciona no Warzone: BrOrlandi#9628529');
  }

  if (command === 'covid') {
    ComfyJS.Say('/me Pessoal não esqueçam de se proteger da COVID-19 nesta pandemia! Se cuidem!');
  }

  if (command === 'videomatik') {
    ComfyJS.Say('/me Videomatik é a plataforma para criação de vídeos animados de forma fácil e rápida. Acesse: https://videomatik.com.br');
  }

  if (command === 'cerveja') {
    cervejas += 1;
    if (cervejas === 1) {
      ComfyJS.Say('/me Orlandi tomou só 1 cerveja, por enquanto...');
      return;
    }

    ComfyJS.Say(`/me Orlandi já tomou ${cervejas} cervejas`);
  }

  if (command === 'cervejazerar') {
    cervejas = 0;
    ComfyJS.Say('/me Contador de Cervejas zerado!');
  }

  if (command === 'youtube') {
    ComfyJS.Say('/me Canal no YouTube: https://www.youtube.com/c/BrunoOrlandiTech');
  }

  // console.log(`Nenhum comando: ${command}`);
};

const commandsCounters = {};

const keyMap0 = {
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
  61009: '!wasted', // Page Down
  82: '!caixaostart', // 0
};

const dotKeyShortcutMap0 = {
  71: '!emorreu', // 7
  72: '!ridin', // 8
  73: '!teamwork', // 9
  75: '!xfiles', // 4
  76: '!gas', // 5
  77: '!memefinal', // 6
  79: '!thuglife', // 1
  80: '!aiai', // 2
  81: '!nogod', // 3
  83: '!satanas', // ,
  3637: '!vitoria', // /
  74: '!stop', // -
  55: '!acabou', // *
  61009: '!missioncompleted', // Page Down
  82: '!awshit', // 0
};

const keyMap1 = {
  71: '!caixao', // 7
  72: '!drift', // 8
  73: '!quepena', // 9
  75: '!alert', // 4
  76: '!jaavisei', // 5
  77: ['!sad', '!sad2', '!sadnaruto'], // 6
  79: '!moises', // 1
  80: '!cevaimorre', // 2
  81: '!burro', // 3
  83: '!surprise', // ,
  3637: '!run', // /
  74: '!stop', // -
  55: '!champions', // *
  61009: '!sexy', // Page Down
  82: '!berg', // 0
};

const dotKeyShortcutMap1 = {
  71: '!emorreu', // 7
  72: '!ridin', // 8
  73: '!teamwork', // 9
  75: '!cyberpunk', // 4
  76: '!gas', // 5
  77: '!memefinal', // 6
  79: '!thuglife', // 1
  80: '!aiai', // 2
  81: '!aiqueburro', // 3
  83: '!satanas', // ,
  3637: '!vitoria', // /
  74: '!stop', // -
  55: '!acabou', // *
  61009: '!sexy', // Page Down
  82: '!missaoimpossivel', // 0
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

const playKeyCommand = (key, commandMap) => {
  const command = commandMap[key];

  if (command) {
    sendCommand(command);
  }
};

let usingShortcut = false;

const COMBO_KEY = 78; // +

const registerShortcuts = (normalKeys, comboKeys) => {
  ioHook.unregisterAllShortcuts();
  Object.keys(comboKeys).forEach((key) => {
    ioHook.registerShortcut([COMBO_KEY, key], (keysPressed) => {
      usingShortcut = true;
      if (keysPressed[0] === '78') {
        playKeyCommand(keysPressed[1], comboKeys);
      }
      if (keysPressed[1] === '78') {
        playKeyCommand(keysPressed[0], comboKeys);
      }
    }, () => {
      usingShortcut = false;
    });
  });

  Object.keys(normalKeys).forEach((key) => {
    ioHook.registerShortcut([key], (keysPressed) => {
      if (usingShortcut) {
        return;
      }
      playKeyCommand(keysPressed[0], normalKeys);
    }, () => {
      usingShortcut = false;
    });
  });
};

const registerPageShortcuts = () => {
  if (currentShortcutsPage === 0) {
    registerShortcuts(keyMap0, dotKeyShortcutMap0);
  }
  if (currentShortcutsPage === 1) {
    registerShortcuts(keyMap1, dotKeyShortcutMap1);
  }
};

let lastTime = 0;

ioHook.on('keydown', ({ keycode }) => {
  if (keycode === COMBO_KEY) {
    const now = Date.now();
    const diff = now - lastTime;
    if (diff < 250) {
      currentShortcutsPage += 1;
      if (currentShortcutsPage === MAX_PAGES) {
        currentShortcutsPage = 0;
      }
      console.log({ currentShortcutsPage });
      registerPageShortcuts();
    }
    lastTime = now;
  }

  // console.log({ keycode });
});

registerPageShortcuts();

ioHook.start();
