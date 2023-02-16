/**
 * This tests confirms that the client-side file selection features are working.
 * It does not confirm that the server is function.
 */

describe('Test Camera Best Event Creation [SP-21]', function() {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.login("testEmail_1","testPassword_1");
    })

    it('Add Course using Upload Picture Button', function() {
        cy.get('[data-test="uplaodPhotoEventButtonCalenderPage"]').click();
        cy.get('#fileSelectButton').invoke('show').selectFile('cypress/photos/Soen_385.png');
        cy.wait(2000);
        cy.get('[data-test="uploadButton"]').click();
        cy.wait(3000);
    })

    it('Logout', function() {
        cy.logout();
    })
})