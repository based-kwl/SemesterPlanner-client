describe('Modifing Events', function() {

    beforeEach(() => {
        cy.viewport("iphone-x")
        cy.visit('http://localhost:3000/')
        cy.login('email4','password4')
    })

    it('Student can modify event', function() {
        cy.pressUpdateButtonCalendar('test')
        cy.editCalendarHeader("test")
        cy.editCalendarDescription('new description')
        cy.editEventLink('333')
        cy.get(':nth-child(6) > :nth-child(1) > .MuiButtonBase-root').click()
    })

    it('Modify event back to 490', function() {
        cy.pressUpdateButtonCalendar('test')
        cy.editCalendarHeader('test')
        cy.editCalendarDescription('Soen 490')
        cy.editEventLink('490')
        cy.get(':nth-child(6) > :nth-child(1) > .MuiButtonBase-root').click()
    })




})