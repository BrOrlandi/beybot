module.exports = {
  apps: [{
    name: 'Bot and Shortcuts',
    script: 'server.js',
  }, {
    name: 'Rewards',
    script: 'rewards.js',
  }, {
    name: 'Heartbeat',
    script: '../StreamHeartMon/src/index.js',
  }],
};
