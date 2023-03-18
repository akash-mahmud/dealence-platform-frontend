describe('template spec', () => {
  it('passes', () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#email").type("developertest@gmail.com");

    cy.get("#standard-adornment-password").type("1234");
cy.get('login"]').click();
  })
})