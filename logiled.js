// const logitechKeyboard = require('logiled');
// const logiled = logitechKeyboard.sdk;

// logiled.init();
// logiled.setLighting({
//   redPercentage: 0,
//   greenPercentage: 0,
//   bluePercentage: 0,
// });
// logiled.restoreLighting();
// console.log(logiled);

const changeNumpadLight = (rgb) => {
  const keymap = [
    71, // 7
    72, // 8
    73, // 9
    75, // 4
    76, // 5
    77, // 6
    79, // 1
    80, // 2
    81, // 3
    83, // ,
    309, // /
    74, // -
    55, // *
    337, // Page Down
    82, // 0
  ];
    // logiled.saveCurrentLighting();
  for (let i = 0; i < keymap.length; i += 1) {
    console.log(logiled.KeyName[`${keymap[i]}`]);
    // logiled.setLightingForKeyWithKeyName({
    //   keyName: logiled.KeyName[`${keymap[i]}`],
    //   redPercentage: 0,
    //   greenPercentage: 0,
    //   bluePercentage: 100,
    // });
  }
  // logiled.restoreLighting();
};

// changeNumpadLight();
