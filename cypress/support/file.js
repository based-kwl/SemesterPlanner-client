/**
 * Navigate to the friend list page with the menu.
 */
Cypress.Commands.add('goToStudyRoomList', () => {
    cy.wait(100);
    cy.get('[data-test="navbar"]').click();
    cy.get('[data-test="Study Groups"]').click();
})

Cypress.Commands.add('createNewStudyRoom', (studyRoomName) => {
    cy.wait(1000);
    cy.get('.MuiButton-text > .MuiButtonBase-root').click();
    cy.get('#title').click().type(studyRoomName);
    cy.get('[data-test="Create"]').click();
    cy.wait(5000);
})

Cypress.Commands.add('goToStudyRoom', (studyRoomName) => {
    cy.goToStudyRoomList();
    cy.wait(2000);
    cy.get(`[data-test="${studyRoomName}"]`).click();
})


