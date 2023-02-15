describe('Test Course Study Hour Estimator [SP-29]', function() {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.get('[data-test="email"]').type('test1@gmail.com');
        cy.get('[data-test="password"]').type('test1');
        cy.get('[data-test="login"]').click();
    })

    it('Add Course Soen 331', function() {
        cy.get('[data-test="addEventButtonCalendarPage"]').click();
        cy.get('[value="course"]').click();
        cy.get('#subject').type('Soen');
        cy.get('#catalog').type('331');
        cy.get('#eventHeader').type('Intro Formal Methods for Software Engineering');
        cy.get('.MuiFormControlLabel-root').click(); // click recurrent
        cy.get('.MuiFormGroup-root > :nth-child(2)').click(); // click every week
        cy.get('[data-test="recurrence-end-date"]').click();
        cy.get('.MuiDialogActions-root > :nth-child(2)').click();
        cy.get('#startTime').click().type("11:45:00");
        cy.get('#endTime').click().type("13:00:00");
        cy.get('[data-test="addButton"]').click();
        cy.get('[data-test="Intro Formal Methods for Software Engineering"]').should('exist'); //inside typography of eventDisplay
        cy.wait(2000);
    })

    it('Add Course Soen 385', function() {
        cy.get('[data-test="addEventButtonCalendarPage"]').click();
        cy.get('[value="course"]').click();
        cy.get('#subject').type('Soen');
        cy.get('#catalog').type('385');
        cy.get('#eventHeader').type('Applied Systems and Applications');
        cy.get('.MuiFormControlLabel-root').click();
        cy.get('.MuiFormGroup-root > :nth-child(2)').click();
        cy.get('[data-test="recurrence-end-date"]').click();
        cy.get('.MuiDialogActions-root > :nth-child(2)').click();
        cy.get('#startTime').click().type("10:15:00");
        cy.get('#endTime').click().type("11:30:00");
        cy.get('[data-test="addButton"]').click();
        cy.get('[data-test="Applied Systems and Applications"]').should('exist');
        cy.wait(2000)
    })



    it('Check Study Hours', function(){
        cy.get('[data-test="navbar"]').click();
        cy.get('[data-test="Progress Report"]').click();
        //added data-test in CommonResources.js, ProfressReportHome.js
        cy.get('[data-test="totalRecommendedStudyTime"]').should('have.text','Total recommended study time: 9 hrs');
        cy.wait(2000)
    })

    it('Delete Course Event Soen 331', function(){
        cy.get('[data-test="Intro Formal Methods for Software Engineering"]').should('have.text','Intro Formal Methods for Software Engineering');
        cy.get('[data-test="editButton_Intro Formal Methods for Software Engineering"]').click();
        cy.get('[data-test="deleteEventButton"]').click();
        cy.get('[data-test="Intro Formal Methods for Software Engineering"]').should('not.exist');
        cy.wait(2000)
    })

    it('Delete Course Event Soen 331', function(){
        cy.get('[data-test="Applied Systems and Applications"]').should('have.text','Applied Systems and Applications');
        cy.get('[data-test="editButton_Applied Systems and Applications"]').click();
        cy.get('[data-test="deleteEventButton"]').click();
        cy.get('[data-test="Applied Systems and Applications"]').should('not.exist');
        cy.wait(2000)
    })


})