/**
 * press update event button from calendar
 * @param {string} eventHeader : event to be selected based on header
 */
Cypress.Commands.add('pressUpdateButtonCalendar', (eventHeader) => {
    cy.get('[data-test="updateButton-'+eventHeader+'"]').scrollIntoView().should('be.visible').click()
})

/**
 * Edit Calendar Header
 * @param {string} newText : New text to be added to field
 */
Cypress.Commands.add('editCalendarHeader', (newText) => {
    cy.get('#eventHeader').type("1").clear()
    cy.get('#eventHeader').type(newText)
})

/**
 * Edit Calendar Description
 * @param {string} newDescription : New text to be added to field
 */
Cypress.Commands.add('editCalendarDescription', (newText) => {
    cy.get('#description').type("1").clear()
    cy.get('#description').type(newText)
})

/**
 * Edit EventLink
 * @param {string} newEventLink: New text to be added to field
 */
Cypress.Commands.add('editEventLink', (newText) => {
    cy.get('#eventLink').type("1").clear()
    cy.get('#eventLink').type(newText)
})


/**
 * wait in seconds
 * @param {double} seconds : event to be selected based on header
 */
Cypress.Commands.add('waitSeconds', (seconds) => {
    cy.wait(seconds*1000)
})

