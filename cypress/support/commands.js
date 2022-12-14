/**
 * Login a user
 * @param {string} email : email (key) of the user to be logged in. Choose from users in the cypress.env.json file.
 * @param {string} password : password (key) of the user to be logged in. Choose the one associated with the email selected.
 */
Cypress.Commands.add('login', (email, password) => {
    cy.visit(Cypress.env('baseUrl'));
    cy.get('[data-test="email"]').type(Cypress.env(email));
    cy.get('[data-test="password"]').type(Cypress.env(password));
    cy.get('[data-test="login"]').click();
})

/**
 * logout a user
 */
Cypress.Commands.add('logout', () => {
    cy.get('[data-test="navbar"]').click();
    cy.get('[data-test="logout"]').click();
})

Cypress.Commands.add('changeUser', (newEmail, newPassword) => {
    cy.visit(Cypress.env('baseUrl'));
    cy.logout();
    cy.login(newEmail, newPassword);
})