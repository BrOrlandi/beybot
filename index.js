/* Config */
// const twitchTvHandle = 'OrlandiBot';
const twitchTvHandle = 'BrOrlandi';
const botName = 'OrlandiBot';
const DEFAULT_DURATION = 10 * 1000; // 10 seconds

/* DOM */
const container = document.querySelector('.alerts');
const queue = new Queue();
let currentAudio;
let durationResolve;

// Resolve promise after duration
const wait = async (duration) => new Promise((resolve) => {
  durationResolve = resolve;
  setTimeout(resolve, duration);
});

const stopCommand = () => {
  container.style.opacity = 0;
  container.innerHTML = '';
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (durationResolve) {
    durationResolve();
  }
};

const showGif = async (gif, gifDelay) => {
  if (gifDelay) {
    await wait(gifDelay * 1000);
  }
  const image = new Image();
  image.src = gif;
  container.innerHTML = `
    <img src="" />
  `;
  container.innerHTML = `
    <img src="${image.src}" />
  `;
  container.style.opacity = 1;
};

// <h1 class="text-shadows">${user + generateTitle[type]}</h1>
function gifAlert({
  gif, audio, duration, gifDelay, volume,
}) {
  queue.add(async () => {
    audio.play();
    currentAudio = audio;
    // eslint-disable-next-line no-param-reassign
    audio.volume = volume ? volume / 100 : 1;
    if (gif) {
      showGif(gif, gifDelay);
    }

    await wait(duration * 1000 || DEFAULT_DURATION);

    if (!queue.isLooping) {
      container.style.opacity = 0;
      container.innerHTML = '';
      audio.pause();
      // eslint-disable-next-line no-param-reassign
      audio.currentTime = 0;
    }
  });
}

const soundCommands = {
  caixao: {
    audio: new Audio('sons/caixao.mp3'),
    gif: 'gifs/caixao.gif',
    duration: 8,
  },
  errou: {
    audio: new Audio('sons/errou.mp3'),
    gif: 'gifs/errou.gif',
    duration: 1.45,
  },
  sad: {
    audio: new Audio('sons/sad.mp3'),
    volume: 90,
  },
  sadnaruto: {
    audio: new Audio('sons/sad-naruto.mp3'),
  },
  sad2: {
    audio: new Audio('sons/sad-violin.mp3'),
  },
  alert: {
    audio: new Audio('sons/alert.mp3'),
    duration: 2,
  },
  jaavisei: {
    audio: new Audio('sons/jaavisei.mp3'),
    gif: 'gifs/jaavisei.gif',
    duration: 2,
  },
  hmm: {
    audio: new Audio('sons/hmm.mp3'),
    gif: 'gifs/hmm.gif',
    duration: 1,
  },
  cholamais: {
    audio: new Audio('sons/cholamais.mp3'),
    gif: 'gifs/cholamais.gif',
    duration: 10,
  },
  cevaimorre: {
    audio: new Audio('sons/cevaimorre.mp3'),
    duration: 1,
  },
  tapegandofogo: {
    audio: new Audio('sons/tapegandofogo.mp3'),
    gif: 'gifs/tapegandofogo.gif',
    duration: 3,
    volume: 40,
  },
  finishhim: {
    audio: new Audio('sons/finishhim.mp3'),
    gif: 'gifs/finishhim.gif',
    duration: 2,
    privateCommand: true,
  },
  run: {
    audio: new Audio('sons/run.mp3'),
    gif: 'gifs/run.gif',
    duration: 8,
    volume: 50,
  },
  champions: {
    audio: new Audio('sons/champions.mp3'),
    duration: 40,
    privateCommand: true,
  },
  wasted: {
    audio: new Audio('sons/wasted.mp3'),
    gif: 'gifs/wasted.png',
    duration: 5,
    gifDelay: 2.5,
  },
  caixaostart: {
    audio: new Audio('sons/caixaostart.mp3'),
    gif: 'gifs/caixaostart.gif',
    duration: 73,
    privateCommand: true,
  },

  acabou: {
    audio: new Audio('sons/acabou.mp3'),
    gif: 'gifs/acabou.gif',
    duration: 16,
    privateCommand: true,
  },
  emorreu: {
    audio: new Audio('sons/emorreu.mp3'),
    gif: 'gifs/emorreu.gif',
    duration: 2,
  },
  teamwork: {
    audio: new Audio('sons/teamwork.mp3'),
    gif: 'gifs/teamwork.gif',
    duration: 7,
    volume: 40,
  },

  xfiles: {
    audio: new Audio('sons/xfiles.mp3'),
    duration: 8,
  },
  gas: {
    audio: new Audio('sons/gas.mp3'),
    duration: 2,
  },
  thuglife: {
    audio: new Audio('sons/thuglife.mp3'),
    duration: 5,
    volume: 70,
  },
  drift: {
    audio: new Audio('sons/drift.mp3'),
    duration: 5,
  },
  ridin: {
    audio: new Audio('sons/ridin.mp3'),
    duration: 10,
  },
  memefinal: {
    audio: new Audio('sons/memefinal.mp3'),
    duration: 10,
  },
  sexy: {
    audio: new Audio('sons/sexy.mp3'),
    duration: 9,
  },
  nogod: {
    audio: new Audio('sons/nogod.mp3'),
    gif: 'gifs/nogod.gif',
    duration: 9,
  },
  aiai: {
    audio: new Audio('sons/aiai.mp3'),
    gif: 'gifs/aiai.gif',
    duration: 2,
  },
  awshit: {
    audio: new Audio('sons/awshit.mp3'),
    gif: 'gifs/awshit.gif',
    duration: 3,
  },
  missioncompleted: {
    audio: new Audio('sons/missioncompleted.mp3'),
    gif: 'gifs/missioncompleted.gif',
    duration: 7,
  },
  vitoria: {
    audio: new Audio('sons/vitoria.mp3'),
    gif: 'gifs/vitoria.gif',
    duration: 11,
  },
  satanas: {
    audio: new Audio('sons/satanas.mp3'),
    gif: 'gifs/satanas.gif',
    duration: 5,
  },
  quepena: {
    audio: new Audio('sons/quepena.mp3'),
    gif: 'gifs/quepena.gif',
    duration: 2,
    volume: 80,
  },
  berg: {
    audio: new Audio('sons/berg.mp3'),
    gif: 'gifs/berg.gif',
    duration: 10,
    volume: 80,
  },
  rojao: {
    audio: new Audio('sons/rojao.mp3'),
    // gif: 'gifs/rojao.gif', // TODO
    duration: 5,
    rewardCommand: true,
  },
  moises: {
    audio: new Audio('sons/moises.mp3'),
    gif: 'gifs/moises.gif',
    duration: 4,
  },
  surprise: {
    audio: new Audio('sons/surprise.mp3'),
    gif: 'gifs/surprise.gif',
    duration: 1.5,
  },

};

const playSoundCommand = (soundCommandConfig, allowedUser, user) => {
  const { privateCommand, rewardCommand } = soundCommandConfig;

  if (privateCommand && !allowedUser) {
    return;
  }

  if (rewardCommand && user !== twitchTvHandle && user !== botName) {
    return;
  }

  gifAlert(soundCommandConfig, allowedUser);
};

const isAllowedUser = ({ broadcaster, mod }) => mod || broadcaster;

ComfyJS.Init(twitchTvHandle);
// eslint-disable-next-line no-unused-vars
ComfyJS.onCommand = (user, command, message, flags, extra) => {
  console.log(`!${command} was typed in chat`);
  const soundCommandConfig = soundCommands[command];

  if (command === 'caixao' && isAllowedUser(flags)) {
    stopCommand();
  }

  if (soundCommandConfig) {
    playSoundCommand(soundCommandConfig, isAllowedUser(flags), user);
    return;
  }

  if (command === 'stop' && isAllowedUser(flags)) {
    stopCommand();
  }
};

window.command = (command) => {
  console.log(`!${command} was called in window`);
  const soundCommandConfig = soundCommands[command];

  if (soundCommandConfig) {
    playSoundCommand(soundCommandConfig, true);
    return;
  }

  if (command === 'stop') {
    stopCommand();
  }
};

const blipChatAudio = new Audio('sons/blip.mp3');

let lastMessageDate = 0;
const MINIMUM_BLIP_TIME = 60000;

const playBlipChat = () => {
  const now = Date.now();
  const diffTime = now - lastMessageDate;
  lastMessageDate = now;

  if (diffTime > MINIMUM_BLIP_TIME) {
    blipChatAudio.play();
  }
};

// eslint-disable-next-line no-unused-vars
ComfyJS.onChat = (user, message, flags, self, extra) => {
  console.log(`${user}:`, message);
  if (
    user !== twitchTvHandle
    && user !== botName
    && user !== 'StreamElements'
    && user !== 'StreamLabs'
  ) {
    playBlipChat();
  }
};
