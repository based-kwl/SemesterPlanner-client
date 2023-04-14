// custom methods are implemented in support/
const path = require('path')

const deleteDownloadsFolder = () => {
    const downloadsFolder = Cypress.config('downloadsFolder')
    cy.task('deleteFolder', downloadsFolder)
}
describe('Tests for the study room file functionality', function() {
    const downloadsFolder = Cypress.config('downloadsFolder');

    before(() => {
        cy.viewport(1000, 1000);
        cy.login('email1', 'password1');
        cy.goToStudyRoomList();
        cy.createNewStudyRoom("Test study room");
        cy.logout();
    })

    beforeEach(() => {
        cy.viewport(1000, 1000);
        cy.login('email1', 'password1');
        cy.goToStudyRoom("Test study room");
    })

    after(() => {
        deleteDownloadsFolder();
        cy.reload();
        cy.get('[data-test="Settings"]').click();
        cy.get('[data-test="Delete"]').click();
        cy.wait(1000);
    });

    it('Upload a file to a study room', function() {
        cy.get('[data-test="Files"]').click();
        cy.get('#fileSelectButton').selectFile('./cypress/support/files/test_file.txt', {force: true});
        cy.get('#uploadButton').click();
        cy.wait(1000);
        cy.get('[data-test="Delete-test_file.txt"]').should('exist');
    })

    it('Fetch file list in study room', function() {
        cy.get('[data-test="Files"]').click();
        cy.get('[data-test="Delete-test_file.txt"]').should('exist');
    })

    it('Download a file from a study room and check its contents', () => {
        cy.get('[data-test="Files"]').click();
        cy.get('[data-test="test_file.txt"]').click();

        const filename = path.join(downloadsFolder, 'test_file.txt')
        cy.readFile(filename, { timeout: 15000 }).then((contents) => {expect(contents).equal('This file is a test file to be used with express tests.')})
    })

    it('Deleting a file from a study room', function() {
        cy.get('[data-test="Files"]').click();
        cy.get('[data-test="Delete-test_file.txt"]').click();
        cy.wait(1000);
        cy.get('[data-test="Delete-test_file.txt"]').should('not.exist');
    })

    // it('Delete the study room', function() {
    //     cy.get('[data-test="Settings"]').click();
    //     cy.get('[data-test="Delete"]').click();
    //     cy.wait(1000);
    // })
})