/**
 * Navigate to the friend list page with the menu.
 */
Cypress.Commands.add('goToFriendList', () => {
    cy.get('[data-test="navbar"]').click();
    cy.get('[data-test="Friends List"]').click();
})

/**
 * Search for a user.
 * @param {string} email : search input
 */
Cypress.Commands.add('searchUser', function(email) {
    cy.get('[data-testId="PersonSearchIcon"]').click();
    cy.get('#search').type(email);
    cy.get('[data-test="searchFromInput"]').click()
})

/**
 * Add a user to friend list
 * @param {string} email : email of the user to be added
 * @param {boolean} isValid : if the input value should get a response for server or not.
 */
Cypress.Commands.add('addUser', function(email, isValid) {
    cy.searchUser(email);
    if (isValid) {
        cy.get('[data-test="addFriend"]').click()
    } else {
        cy.get('[data-test="addFriend"]').should('not.exist')
    }

})