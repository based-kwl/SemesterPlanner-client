/**
 * Login a user
 * @param {string} email : email (key) of the user to be logged in. Choose from users in the cypress.env.json file.
 * @param {string} password : password (key) of the user to be logged in. Choose the one associated with the email selected.
 */
Cypress.Commands.add('login', (email, password) => {
    cy.visit(Cypress.env('baseUrl'));
    cy.get('[data-test="email"]').type(Cypress.env(email));
    cy.get('[data-test="password"]').type(Cypress.env(password));
    cy.get('[data-test="login"]').click();
})

/**
 * logout a user
 */
Cypress.Commands.add('logout', () => {
    cy.get('[data-test="navbar"]').click();
    cy.get('[data-test="logout"]').click();
})

Cypress.Commands.add('changeUser', (newEmail, newPassword) => {
    cy.visit(Cypress.env('baseUrl'));
    cy.logout();
    cy.login(newEmail, newPassword);
})

/**
 * Add Course Event
 * If reccuring event will choose to End Date as 1 month later for simplicity
 *
 * StartTime, EndTime (HH:MM:SS)
 * recurrence (Boolean)
 * recurrenceType (Enum: day,month,year)
 *
 */
Cypress.Commands.add('addCourseEvent',
    (subject, catalog, eventHeader, startTime,endTime,recurrrence,recurrrenceType) =>{
        cy.get('[data-test="addEventButtonCalendarPage"]').click();
        cy.get('[value="course"]').click();
        cy.get('#subject').type(subject);
        cy.get('#catalog').type(catalog);
        cy.get('#eventHeader').type(eventHeader);
        //if recurring event will select day,month,year icon
        //default choose end day next month
        if(recurrrence){
            cy.get('.MuiFormControlLabel-root').click(); // click recurrent
            switch(recurrrenceType) {
                case "day":
                    cy.get('.MuiFormGroup-root > :nth-child(1)').click(); // code block
                    break;
                case "week":
                    cy.get('.MuiFormGroup-root > :nth-child(2)').click(); // click every week
                    break;
                case "month":
                    cy.get('.MuiFormGroup-root > :nth-child(3)').click();
                    break;
                default:
                    break;
            }
            //click recurring end date
            cy.get('[data-test="recurrence-end-date"]').click();
            //click arrow for next month
            cy.get('.MuiPickersArrowSwitcher-root > .MuiIconButton-edgeStart').click()
            //click date in middle of month
            cy.get('.PrivatePickersSlideTransition-slideEnter-left > :nth-child(3) > :nth-child(4)').click();
            //press ok box on mini calendar
            cy.get('.MuiDialogActions-root > :nth-child(2)').click();
        }
        cy.get('#startTime').click().type(startTime);
        cy.get('#endTime').click().type(endTime);
        cy.get('[data-test="addButton"]').click();
        //check if new event is present under calendar
        cy.get('[data-test="'+eventHeader+'"]').should('exist'); //inside typography of eventDisplay
    })

/**
 * Delete Event using eventHeader
 * eventHeader: String
 */
Cypress.Commands.add('deleteEvent', (eventHeader)=>{
    cy.get('[data-test="'+eventHeader+'"]').should('have.text',eventHeader);
    cy.get('[data-test="editButton_'+eventHeader+'"]').click();
    cy.get('[data-test="deleteEventButton"]').click();
    cy.get('[data-test="'+eventHeader+'"]').should('not.exist');
})

/**
 * Add Study Time Event
 *
 * subject: String (UPPERCASE)
 * catalog,EventHeader: String
 * startTime, endTime: HH:MM:SS
 */
Cypress.Commands.add('addStudyTimeEvent',(subject,catalog,eventHeader,startTime,endTime)=>{
    cy.get('[data-test="addEventButtonCalendarPage"]').click();
    cy.get('[value="study"]').click();
    cy.get('[data-test="'+ subject + catalog +'"]').click();
    cy.get('#eventHeader').type(eventHeader);
    cy.get('#startTime').click().type(startTime);
    cy.get('#endTime').click().type(endTime);
    cy.get('[data-test="addButton"]').click();
    cy.get('[data-test="'+eventHeader+'"]').should('exist');
})