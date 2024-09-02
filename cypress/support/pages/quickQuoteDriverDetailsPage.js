const DriverDetailsP0 = {
  quickQuote: () => cy.get('#quick-quote'),
  quickQuoteHeader: () => cy.get('.heading'),
  quickQuoteSubText: () => cy.get('.sub-text'),
  quickQuoteBackBtn: () => cy.get('[datacy="quick-quote-back-button"]'),
  driverDetailsForm: () => cy.get('#quick-quote-form'),
  formQuestion: () => cy.get('.form__question'),
  formHelperText: () => cy.get('.form__helper-txt'),
  ncdDropdown: () => cy.get('[datacy="react-select-ncd--list"]'),
  ncdInputValue: () => cy.get('#react-select-ncd--value-item'),
  ncdOptions: () => cy.get('[id="react-select-ncd--list"]'),
  dobWrapper: () => cy.get('[class="form__ages-wrap dob"]'),
  dobFieldWrapper: () => cy.get('.split-picker-wrapper'),
  dobFieldDay: () => cy.get('#day'),
  dobFieldMonth: () => cy.get('#month'),
  dobFieldYear: () => cy.get('#year'),
  noticeForDOB: () => cy.get('.notice-for-DOB'),
  additionalDriversLink: () => cy.get('.form__option-link'),
  postcodeField: () => cy.get('#postcode'),
  postcodeInput: () => cy.get('[datacy="postcode-input"]'),
  renewalQuestionDropdown: () => cy.get('[datacy="react-select-month--list"]'),
  renewalQuestionOptions: () => cy.get('#react-select-renewal_month--list'),
  renewalMonthValue: () => cy.get('#react-select-renewal_month--value-item'),
  emailField: () => cy.get('#email'),
  emailInput: () => cy.get('[datacy="email-input"]'),
  emailExperience: () => cy.get('[class="email-experience"]'),
  parkingContainer: () => cy.get('[class="parking_container "]'),
  parkingContainerCompleted: () => cy.get('[class="parking_container completed"]'),
  submitQuickQuoteBtn: () => cy.get('[class*="button button--primary button--quick-quote "]'),
}

class DriverDetailsPage {

  verifyQuickQuoteForm() {
    //verify quick quote headers and back button
    DriverDetailsP0.quickQuote()
      .within(() => {
        DriverDetailsP0.quickQuoteHeader()
          .invoke('text')
          .should('equal', 'One down,four to go.')
        DriverDetailsP0.quickQuoteSubText()
          .invoke('text')
          .should('equal', `Are we nearly there yet? We are. Complete this page and we'll get you an idea of your price.`)
        DriverDetailsP0.quickQuoteBackBtn()
          .invoke('text')
          .should('equal', 'GO BACK')
          .then(() => {
            DriverDetailsP0.quickQuoteBackBtn()
              .children('img')
                .should('exist')
          })
        //verify driver details form fields and content
        DriverDetailsP0.driverDetailsForm()
          .within(() => {
            DriverDetailsP0.formQuestion()
              .eq(0)
              .invoke('text')
              .should('equal', 'How many years of No Claims Discount do you have?')
            DriverDetailsP0.formHelperText()
              .eq(0)
              .invoke('text')
              .should('equal', 'This must be on a personal car in the UK in the last 24 months.')
            DriverDetailsP0.ncdDropdown()
              .should('exist')
            DriverDetailsP0.dobWrapper()
              .within(() => {
                DriverDetailsP0.formQuestion()
                  .invoke('text')
                  .should('equal', `What's your date of birth?`)
                DriverDetailsP0.dobFieldWrapper()
                  .should('exist')
                DriverDetailsP0.additionalDriversLink()
                  .invoke('text')
                  .should('equal', 'Add the ages of additional drivers')
              })
            DriverDetailsP0.formQuestion()
              .eq(2)
              .invoke('text')
              .should('equal', `What's your postcode?`)
            DriverDetailsP0.postcodeField()
              .within(() => {
                DriverDetailsP0.postcodeInput()
                  .invoke('attr', 'placeholder')
                  .should('equal', 'Postcode')
              })
              DriverDetailsP0.formQuestion()
                .eq(3)
                .invoke('text')
                .should('equal', 'When does your car insurance renew?')
              DriverDetailsP0.renewalQuestionDropdown()
              .should('exist')
            DriverDetailsP0.emailExperience()
              .within(() => {
                DriverDetailsP0.formQuestion()
                  .invoke('text')
                  .should('equal', 'Want an email reminder?')
                cy.get('p')
                  .eq(1)
                  .invoke('text')
                  .should('equal', 'Enter your email address and we’ll remind you when your car insurance is up for renewal. We won’t email you about anything else.')
                DriverDetailsP0.emailField()
                  .within(() => {
                    DriverDetailsP0.emailInput()
                      .invoke('attr', 'placeholder')
                      .should('equal', 'Email address')
                  })
              })
            DriverDetailsP0.formQuestion()
              .eq(5)
              .invoke('text')
              .should('equal', `Show us you're a good driver and prove you're not a robot.`)
            DriverDetailsP0.formHelperText()
              .eq(1)
              .invoke('text')
              .should('equal', 'Please park the car below.')
            DriverDetailsP0.parkingContainer()
              .should('exist')
            DriverDetailsP0.submitQuickQuoteBtn()
              .invoke('text')
              .should('equal', 'Get a Quick Quote')
              .then(() => {
                DriverDetailsP0.submitQuickQuoteBtn()
                  .should('be.disabled')
              })
          })
        //verify quick quote footer
        DriverDetailsP0.noticeForDOB()
          .invoke('text')
          .should('equal', 'Find out about how we process your data in our privacy notice.')
          .then(() => {
            DriverDetailsP0.noticeForDOB()
              .children('a')
              .should('have.attr', 'href', '/privacy-notice')
          })
      })
  }
  //selects ncd length from dropdown then verifies correct value has been selected
  selectNcdValue(ncd) {
    DriverDetailsP0.ncdDropdown()
      .click()
    DriverDetailsP0.ncdOptions()
      .contains(ncd)
      .click()
    DriverDetailsP0.ncdInputValue()
      .invoke('text')
      .should('equal', ncd.toString())
  }
  //enter dob into field then verifies correct value has been added  
  enterDOBValues(dob) {
    //splits date string by '/' delimiter (expected format DD/MM/YYYY)
    const [dobDay, dobMonth, dobYear] = dob.split('/')

    DriverDetailsP0.dobFieldDay()
      .type(dobDay)
      DriverDetailsP0.dobFieldMonth()
      .type(dobMonth)
      DriverDetailsP0.dobFieldYear()
      .type(dobYear)
    //verify fields contain correct data
    DriverDetailsP0.dobFieldDay()
      .should('have.value', dobDay)
    DriverDetailsP0.dobFieldMonth()
      .should('have.value', dobMonth)
    DriverDetailsP0.dobFieldYear()
      .should('have.value', dobYear)
  }
  //enter postcode into field then verifies correct value has been added  
  enterPostcodeValue(postcode) {
    DriverDetailsP0.postcodeInput()
      .type(postcode)
    DriverDetailsP0.postcodeInput()
      .invoke('val')
      .should('equal', postcode)
  }
  //selects renewal month from dropdown then verifies correct month has been selected  
  selectCarInsuranceRenewalValue(month) {
    DriverDetailsP0.renewalQuestionDropdown()
      .click()
    DriverDetailsP0.renewalQuestionOptions()
      .contains(month)
      .click()
    //verify field contains correct data
    DriverDetailsP0.renewalMonthValue()
      .invoke('text')
      .should('equal', month)
  }
  //enter email address then verifies correct email has been added  
  enterEmailAddress() {
    //generate random email address
    const randomEmail = `qa-assessment-${Date.now()}@1secmail.com`
    DriverDetailsP0.emailField()
      .type(randomEmail)
    DriverDetailsP0.emailInput()
      .invoke('val')
      .should('equal', randomEmail)
  }
  //passes not a robot checks, then verifies box changes to complete. 'dblClick' method chosen as Event Listener was on text box
  verifyUserIsNotARobot() {
    DriverDetailsP0.parkingContainer()
      .within(() => {
        cy.get('[class="text"]')
          .dblclick()
      })
    DriverDetailsP0.parkingContainerCompleted()
      .should('be.visible')
  }
  //submits quick quote form and waits until the subsequent api calls have finished
  submitQuickQuoteForm() {
    cy.intercept('POST', '/api/v1/quick-quote')
      .as('submitQuickQuote')
    DriverDetailsP0.submitQuickQuoteBtn()
      .should('be.enabled')
      .click()
    cy.wait('@submitQuickQuote')
  }
}

export default { DriverDetailsPage }