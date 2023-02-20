/**
 * Navigate to the friend list page with the menu.
 */
Cypress.Commands.add('goToFriendList', () => {
    cy.get('[data-test="navbar"]').shadow().click();
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
    cy.wait(50)
    if (isValid) {
        cy.get('[data-test="addFriend"]').click()
    } else {
        cy.get('[data-test="addFriend"]').should('not.exist')
    }

})

/**
 * Cancel a friend request
 * @param {string} email : email of the user to be cancelled
 */
Cypress.Commands.add('cancelRequest', function(email){
    cy.get('[data-test="friendRequestsLink"]').click();
    cy.get(`[data-test="cancel-request-${email}"]`).click();
    cy.wait(150);
    cy.get(`[data-test="cancel-request-${email}"]`).should('not.exist');
})


