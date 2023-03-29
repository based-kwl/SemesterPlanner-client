describe('Authentication', function() {

  it('User can log in and log out', function() {
    cy.login('email1', 'password1');
    cy.url().should('contain', '/calendar');
    cy.logout();
    cy.url().should('eq', `${Cypress.env('baseUrl')}login`);
  })
})