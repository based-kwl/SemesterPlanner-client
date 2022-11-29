describe('Modifing Events', function() {
    const header = "test";
    const description = "new descrption";
    const eventLink ="333";

    beforeEach(() => {
        cy.viewport("iphone-x")
        cy.visit('http://localhost:3000/')
        cy.login('email4','password4')
    })

    it('Student can modify event', function() {
        cy.pressUpdateButtonCalendar('test')
        cy.editCalendarHeader(header)
        cy.editCalendarDescription(description)
        cy.editEventLink(eventLink)
        cy.get(':nth-child(6) > :nth-child(1) > .MuiButtonBase-root').click()

    })



})