const resultsDetailsPagePO = {
    quickQuoteResults: () => cy.get('#quick-quote'),
    resultsHeader: () => cy.get('#event-tracking-qq-renewal-month-12'),
    successfulQuoteText: () => cy.get('#quick-quote-user-got-successful-quote'),
    quoteInfo: () => cy.get('.quote-info'),
    mileageSection: () => cy.get('.sc-lllmON'),
    mileageSectionTitle: () => cy.get('.title'),
    mileageSectionInput: () => cy.get('.input-section'),
    estimatedQuoteSection: () => cy.get('.text-wrapper'),
    estimatedQuoteSectionTitle: () => cy.get('.sc-bBABsx'),
    estimatedQuoteSectionPrice: () => cy.get('.figure'),
    estimatedQuoteSectionIcon: () => cy.get('.info_icon'),
    estimatedQuoteSectionCaption: () => cy.get('.caption-large'),
    overlayWrapper: () => cy.get('.overlay-wrapper'),
    completeQuoteWrapper: () => cy.get('.complete-quote-wrapper'),
    completeQuoteHeader: () => cy.get('.complete-quote-header'),
    completeQuoteChecklistItem: () => cy.get('.checklist-text > .complete-quote-list-item'),
    trustpilotIcon: () => cy.get('.trustpilot-qq-fallback'),
    getThisQuoteBtn: () => cy.get('[data-cy="button-primary"]'),
    emailReminderBtn: () => cy.get('[data-cy="base-button"]'),
    backBtn: () => cy.get('.back-modern'),
    assumptionsText: () => cy.get('#assumptions-text > p')
}

class ResultsDetailsPage {
    retrieveQuickQuoteResults() {
        //retrieve vehicle and miles info
        const vehicleInfo = Cypress.env('vehicleInfo')
        const miles = Cypress.env('miles')
        resultsDetailsPagePO.quickQuoteResults()
            .within(() => {
                resultsDetailsPagePO.resultsHeader()
                    .invoke('text')
                    .should('contains', `A quick quote for your ${vehicleInfo}`)
                resultsDetailsPagePO.successfulQuoteText()
                    .invoke('text')
                    .should('equal', `Success! Here's a quick estimate of your price. We've made a few guesses, so it may go up or down after you complete the rest of your details.`)
                resultsDetailsPagePO.quoteInfo()
                    .within(() => {
                        resultsDetailsPagePO.mileageSection()
                            .within(() => {
                                resultsDetailsPagePO.mileageSectionTitle()
                                    .invoke('text')
                                    .should('equal', `THIS YEAR I THINK I’ll drive`)
                                resultsDetailsPagePO.mileageSectionInput()
                                    .find('.input')
                                    .invoke('val')
                                    .should('equal', miles.toString())
                                    .then(() => {
                                        resultsDetailsPagePO.mileageSectionInput()
                                            .find('.miles-text')
                                            .invoke('text')
                                            .should('equal', 'miles')
                                    })
                            })
                        resultsDetailsPagePO.estimatedQuoteSection()
                            .within(() => {
                                resultsDetailsPagePO.estimatedQuoteSectionTitle()
                                    .invoke('text')
                                    .should('equal', 'Your estimated quote')
                                resultsDetailsPagePO.estimatedQuoteSectionPrice()
                                    .invoke('text')
                                    .then((value) => {
                                        expect(value).to.match(/^£\d+\.\d{2}$/)
                                    })
                            })
                        //skipped as modal not opening properly consistently
                        // resultsDetailsPagePO.estimatedQuoteSectionIcon()
                        //     .click()
                        resultsDetailsPagePO.estimatedQuoteSectionCaption()
                            .invoke('text')
                            .then((value) => {
                                expect(value).to.match(/^Based on \d+(\.\d+)? pence\/mile/)  
                            })
                        resultsDetailsPagePO.completeQuoteWrapper()
                            .within(() => {
                                resultsDetailsPagePO.completeQuoteHeader()
                                    .invoke('text')
                                    .should('equal', 'Like what you see?')
                                resultsDetailsPagePO.completeQuoteChecklistItem()
                                    .eq(0)
                                    .invoke('text')
                                    .should('equal', 'Comprehensive cover')
                                resultsDetailsPagePO.completeQuoteChecklistItem()
                                    .eq(1)
                                    .invoke('text')
                                    .should('equal', 'No Claims discount protected as standard')
                                resultsDetailsPagePO.trustpilotIcon()
                                    .parent('a')
                                    .should('have.attr', 'href', 'https://uk.trustpilot.com/review/bymiles.co.uk')
                                resultsDetailsPagePO.getThisQuoteBtn()
                                    .should('be.enabled')
                                    .then(() => {
                                        resultsDetailsPagePO.getThisQuoteBtn()
                                            .invoke('text')
                                            .should('equal', 'Get this quote')
                                    })
                                resultsDetailsPagePO.emailReminderBtn()
                                    .should('be.enabled')
                                    .then(() => {
                                        resultsDetailsPagePO.emailReminderBtn()
                                            .invoke('text')
                                            .should('equal', 'Email me a renewal reminder')
                                    })
                                resultsDetailsPagePO.backBtn()
                                    .should('be.visible')
                                    .then(() => {
                                        resultsDetailsPagePO.backBtn()
                                            .invoke('text')
                                            .should('equal', 'Back')
                                    })
                            })
                    })
                resultsDetailsPagePO.assumptionsText()
                    .eq(0)
                    .invoke('text')
                    .should('equal', `This is an indicative quote and may change once you've provided us with the rest of your details. We've also made a number of assumptions to work out this quote.`)
                resultsDetailsPagePO.assumptionsText()
                    .eq(1)
                    .invoke('text')
                    .should('equal', `We've assumed that you:Will be starting your policy in two weeks timeHave had a full UK driving licence for two or more yearsPark your car at home overnightAre the registered owner and keeper of your carHaven't made any crazy modifications to your carHave never been declined insuranceHaven't had any claims or driving convictions`)
            })
    }
}

export default { ResultsDetailsPage }