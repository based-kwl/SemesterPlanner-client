describe('Test Course Study Hour Estimator [SP-29]', function() {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.login("testEmail_1","testPassword_1");
    })

    after(() => {
        cy.wait(2000);
    })

    it('Confirm start date for Spring Break 2023', function() {
        cy.viewport(500,1000);
        cy.get('.react-calendar__navigation__label__labelText').click();
        cy.get('.react-calendar__year-view__months > :nth-child(2)').click(); //choose Feb
        cy.get('.react-calendar__month-view__days > :nth-child(29)').click(); // Feb 27
        cy.get('[data-test="Start of mid-term break"]').should('exist'); // check event exists
    })

    it('Confirm deadline for withdrawal from program for winter session 2023', function() {
        cy.viewport(500,1000);
        cy.get('.react-calendar__navigation__label__labelText').click(); // select month and year title
        cy.get('.react-calendar__year-view__months > :nth-child(1)').click(); //choose Feb
        cy.get('.react-calendar__month-view__days > :nth-child(29)').click(); // Jan 23
        cy.get('[data-test="Deadline for withdrawal from program for winter session"]').should('exist'); // check event exists
    })

    it('Logout', function() {
        cy.logout();
    })
})