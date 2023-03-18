// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'





import { mount } from "cypress/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';
import {theme} from '../../src/App'
import { ProvideAuth } from '../../src/hooks/use-auth';
Cypress.Commands.add("mount", (component, options = {}) => {
  const { routerProps = { initialEntries: ["/"] }, ...mountOptions } = options;

  const wrapped = <ThemeProvider theme={theme}>
    <ProvideAuth> <MemoryRouter {...routerProps}>{component}</MemoryRouter>      </ProvideAuth>
  </ThemeProvider>;

  return mount(wrapped, mountOptions);
});
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/login')
    cy.get('[data-test=username]').type(username)
    cy.get('[data-test=password]').type(password)
    cy.get('#login').click()
    cy.url().should('contain', '/login-successful')
  })
})
// Example use:
// cy.mount(<MyComponent />)