describe('Test Camera Based Event Creation [SP-21]', function() {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.login("testEmail_1", "testPassword_1");
    })

    it('Add Course using Upload Picture Button', function () {
        cy.get('[data-test="uploadPhotoEventButtonCalenderPage"]').click();
        cy.get('#fileSelectButton').invoke('show').selectFile('cypress/photos/testEventPhoto.png');
        cy.wait(3000);
        cy.get('[data-test="uploadButton"]').click();
        cy.wait(2000);
    })

    it('Logout', function () {
        cy.logout();
    })
})
