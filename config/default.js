// NOTE: Do not enter sensitive information in this file.
// Instead, create a config/local.js file (already gitignored) and override values there.
// See http://lorenwest.github.io/node-config/0.4.35/index.html
module.exports = {
  port: 3000,
  spark: {
    apiBaseUrl: 'https://api.spark.io',
    apiToken: 'SECRET',
    deviceId: 'SECRET'
  },
  hue: {
    enabled: true,
    username: 'SECRET',
    deviceType: 'Ocupado'
  },
  slack: {
    enabled: true,
    domain: 'SECRET',
    token: 'SECRET',
    channel: '#general',
    username: 'BañoBot'
  }
};

