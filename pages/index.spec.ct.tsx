import { mount } from '@cypress/react'
import Home from './index'

it('renders the Home page', () => {
  mount(<Home />)
  cy.get('svg').should('have.length', 1)
})

export{}