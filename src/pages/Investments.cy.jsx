import React from 'react'
import Investments from './Investments'

describe('<Investments />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Investments />)
  })
})