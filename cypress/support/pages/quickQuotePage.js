const URL = '/'

const QuickQuotePO = {
  formBox: () => cy.get('[class*="formbox formbox--quick-quote-vehicle"]'),
  formBoxHeader: () => cy.get('[class="formbox__heading"]'),
  formBoxInput: () => cy.get('[datacy="reg-to-qq-input"]'),
  formBoxSubmit: () => cy.get('[datacy="qq-btn-hero"]'),
  mileageFormBox: () => cy.get('[class="formbox--quick-quote-mileage"]'),
  mileageFormBoxVehicleInfo: () => cy.get('[class="formbox__vehicle-info"]'),
  mileageFormBoxVehicleImage: () => cy.get('[class="car-icon hatchback-three-door"]'),
  mileageFormBoxEstMileage: () => cy.get('[class="formbox__estimated-mileage-wrapper"]'),
  mileageFormBoxQuoteMiles: () => cy.get('[datacy="quick-quote-miles"]'),
  mileageFormBoxContinue: () => cy.get('[datacy="quick-quote-mileage-continue"]'),
  mileageFormBoxChange: () => cy.get('[datacy="quick-quote-change-mileage"]'),
}

class QuickQuotePage {

  visitQuickQuotePage() {
    cy.viewport(1200, 1600)
    cy.visit(URL)
    cy.acceptAllCookies()
  }
  //validates all fields and contents within car reg form
  validateEnterRegForm() {
    QuickQuotePO.formBoxHeader()
      .should('contain', 'See if you could save in seconds.')
      .and('be.visible')
    QuickQuotePO.formBoxInput()
      .invoke('attr', 'placeholder')
      .should('equal', 'Enter your reg')
    QuickQuotePO.formBoxSubmit()
      .invoke('text')
      .should('equal', 'get a quick quote')
    QuickQuotePO.formBoxSubmit()
      .should('be.enabled')
  }
  //types car reg into input field
  regFormInput(reg) {
    QuickQuotePO.formBoxInput()
      .first()
      .type(reg)
      //verify field has full value
      .invoke('val')
      .should('equal', reg)
  }
  //submits get a quote form
  clickGetAQuote() {
    cy.intercept('GET', '/api/v1/quick-quote/*')
      .as('quickQuote')
    QuickQuotePO.formBoxSubmit()
      .click()
    cy.wait('@quickQuote')
  }
  //validates mileage form fields and conrent
  validateMileageForm(vehicleInfo, miles) {
    //store vehicle info & miles for later use
    //retrieved in quickQuoteResultsPage.js for results validation
    Cypress.env('vehicleInfo', vehicleInfo)
    Cypress.env('miles', miles)

    QuickQuotePO.mileageFormBoxVehicleInfo()
      .should('contain', vehicleInfo)
    QuickQuotePO.mileageFormBoxVehicleImage()
      .should('be.visible')
    QuickQuotePO.mileageFormBoxEstMileage()
      .within(() => {
        cy.get('h4')
          .should('contain', 'Last year we think your car travelled')
        cy.get('h5')
          .should('contain', 'Will you drive the same this year?')
      })
    QuickQuotePO.mileageFormBoxQuoteMiles()
      .invoke('text')
      .then((val) => {
        const trimmed = val.replace(/,/g, '') //removed ',' from estimated mileage for accurate validation
        expect(trimmed).to.equal(`${miles} miles`) //validates full estimated mileage string without comma
      })      
    QuickQuotePO.mileageFormBoxChange()
      .invoke('text')
      .should('equal', 'No, change estimate')
    QuickQuotePO.mileageFormBoxContinue()
      .invoke('text')
      .should('equal', 'Yes, continue')
  }
  //continues to next page
  clickContinueButton() {
    QuickQuotePO.mileageFormBoxContinue()
      .click()
  }
}

export default { QuickQuotePage }