/* Config */
// const twitchTvHandle = 'OrlandiBot';
const twitchTvHandle = 'BrOrlandi';
const DEFAULT_DURATION = 10 * 1000; // 10 seconds

/* DOM */
const container = document.querySelector('.alerts');
const queue = new Queue();

// Resolve promise after duration
const wait = async (duration) => new Promise((resolve) => setTimeout(resolve, duration));

// <h1 class="text-shadows">${user + generateTitle[type]}</h1>
function gifAlert({ gif, audio, duration }) {
  queue.add(async () => {
    audio.play();
    if (gif) {
      container.innerHTML = `
        <img src="${gif}" />
      `;
      container.style.opacity = 1;
    }

    await wait(duration * 1000 || DEFAULT_DURATION);

    if (!queue.isLooping) {
      container.style.opacity = 0;
      container.innerHTML = '';
      audio.pause();
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
  },
  alert: {
    audio: new Audio('sons/alert.mp3'),
    duration: 2,
  },
  jaaviseiquevaidarmerda: {
    audio: new Audio('sons/jaaviseiquevaidarmerda.mp3'),
    gif: 'gifs/jaaviseiquevaidarmerda.gif',
    duration: 2,
  },
};

const playSoundCommand = (soundCommandConfig) => {
  new gifAlert(soundCommandConfig);
};

ComfyJS.Init(twitchTvHandle);
ComfyJS.onCommand = (user, command, message, flags, extra) => {
  console.log(`!${command} was typed in chat`);

  const soundCommandConfig = soundCommands[command];

  if (soundCommandConfig) {
    playSoundCommand(soundCommandConfig);
  }
};

// ComfyJS.onChat = (user, message, flags, self, extra) => {
//   console.log(`${user}:`, message);
// };
