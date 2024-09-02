const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  projectId: 'wxy23f',
  viewportWidth: 1200,
  viewportHeight: 1200,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://bymiles.co.uk',
    specPattern: 'cypress/integration/e2e-tests/**/*.feature',
  },
})
