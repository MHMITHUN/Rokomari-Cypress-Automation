import 'cypress-mochawesome-reporter/register';
require('cypress-xpath');

Cypress.on('uncaught:exception', () => false);
