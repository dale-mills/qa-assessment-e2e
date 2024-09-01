//click to accept all cookies
Cypress.Commands.add('acceptAllCookies', () => {
    if(cy.get('[data-cky-tag="notice"]').should('exist')) {
        cy.get('[data-cky-tag="accept-button"]')
            .should('contain', 'Allow all')
            .click()
    }
})