import 'cypress-mochawesome-reporter/register';
require('cypress-xpath');

// Global suppression of non-critical site exceptions
Cypress.on('uncaught:exception', () => false);
