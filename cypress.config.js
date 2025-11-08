const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.rokomari.com',
    defaultCommandTimeout: 12000,
    pageLoadTimeout: 90000,
    redirectionLimit: 50,  
    video: false,
    screenshotOnRunFailure: true,
    retries: 1,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    embeddedScreenshots: true,
    inlineAssets: true,
    charts: true,
    html: true,
    json: true
  }
});
