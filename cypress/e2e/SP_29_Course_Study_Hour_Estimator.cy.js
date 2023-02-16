describe('Test Course Study Hour Estimator [SP-29]', function() {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.login("testEmail_1","testPassword_1");
    })

    it('Add Course Soen 331', function() {
        cy.addCourseEvent('Soen','331','Intro Formal Methods for Software Engineering','11:45:00','13:00:00',true,'month');
        cy.wait(2000);
    })

    it('Add Course Soen 385', function() {
        cy.addCourseEvent('Soen','385','Applied Systems and Applications','10:15:00','11:30:00',true,'month');
        cy.wait(2000);
    })

    it('Check Study Hours', function(){
        cy.get('[data-test="navbar"]').click();
        cy.get('[data-test="Progress Report"]').click();
        //added data-test in CommonResources.js, ProfressReportHome.js
        cy.get('[data-test="totalRecommendedStudyTime"]').should('have.text','Total recommended study time: 9 hrs');
        cy.wait(2000)
    })

    it('Delete Course Event Soen 331', function(){
        cy.deleteEvent('Intro Formal Methods for Software Engineering');
    })

    it('Delete Course Event Soen 385', function(){
        cy.deleteEvent('Applied Systems and Applications');
    })

    it('Logout', function() {
        cy.logout();
    })
})