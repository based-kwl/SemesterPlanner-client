describe('Test Daily Study Recaps [SP-26]', function() {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.login("testEmail_1","testPassword_1");
    })
    /*
        it('Add Course Soen 331', function() {
            cy.addCourseEvent('Soen','331','Intro Formal Methods for Software Engineering','11:45:00','13:00:00',true,'month');
        })
        it('Add Course Soen 385', function() {
            cy.addCourseEvent('Soen','385','Applied Systems and Applications','10:15:00','11:30:00',true,'month');
        })
        it('Add 2 hours study time for Soen 331', function(){
            cy.addStudyTimeEvent('SOEN','331','Study Session #1','14:00:00','17:00:00');
            cy.wait(2000)
        })
        it('Add 3 hours study time for Soen 385', function(){
            cy.addStudyTimeEvent('SOEN','385','Study Session #2','18:00:00','20:00:00');
            cy.wait(2000)
        })
    */
    it('Confirm Study Recaps inside Progress Report matches Events and study times created', function(){
        cy.get('[data-test="navbar"]').click();
        cy.get('[data-test="Progress Report"]').click();
        cy.get('[data-testid="UpdateIcon"]').click();
        cy.get('[data-test="SOEN331"]').should('have.text','SOEN311');

        cy.wait(2000)
    })

    /*
        it('Delete Course Event Soen 331', function(){
           cy.deleteCourseEvent('Intro Formal Methods for Software Engineering');
        })
        it('Delete Course Event Soen 385', function(){
            cy.deleteCourseEvent('Applied Systems and Applications');
        })
    */
    // it('Logout', function() {
    //     cy.logout();
    // })
})