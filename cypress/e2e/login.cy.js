describe('Authentification', function() {

  it('User can log in and log out', function() {

    cy.viewport(414, 896)

    cy.visit('http://localhost:3000/')

    cy.visit('http://localhost:3000/login')


    cy.get('div > div > .MuiFormControl-root > .MuiInputBase-root > #email').type('test@gmail.com')

    cy.get('div > div > .MuiFormControl-root > .MuiInputBase-root > #password').type('p12')

    cy.get('form > .MuiBox-root > div > div > .MuiButtonBase-root').click()

    cy.get('div > div > .react-calendar__month-view__days > .react-calendar__tile:nth-child(32) > abbr').click()

    cy.get('div > div > .react-calendar__month-view__days > .react-calendar__tile:nth-child(25) > abbr').click()

    cy.get('.MuiPaper-root > .MuiToolbar-root > .MuiButtonBase-root:nth-child(1) > .MuiSvgIcon-root > path').click()

    cy.get('.MuiList-root:nth-child(5) > .MuiListItem-root > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click()

    cy.visit('http://localhost:3000/login')


  })

})