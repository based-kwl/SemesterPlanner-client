describe('Test Course Study Hour Estimator [SP-29]', function() {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.login("testEmail_1","testPassword_1");
    })

    it('Confirm start date and end date for Spring Break 2023', function() {
        cy.get('.react-calendar__navigation__label__labelText').click();
        cy.get('.react-calendar__year-view__months > :nth-child(2)').click(); //choose Feb
        cy.get('.react-calendar__month-view__days > :nth-child(29)').click(); // Jan 29
        cy.get('[data-test="Start of mid-term break"]')
    })

    // it('Logout', function() {
    //     cy.logout();
    // })
})