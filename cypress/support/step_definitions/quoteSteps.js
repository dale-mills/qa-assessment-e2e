import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { QuickQuotePage } from '../pages/quickQuotePage'
import { DriverDetailsPage } from '../pages/quickQuoteDriverDetailsPage'
import { ResultsDetailsPage } from '../pages/quickQuoteResultsPage'

let [ quickQuotePage, driverDetailsPage, resultsDetailsPage ] = [ new QuickQuotePage(), new DriverDetailsPage(), new ResultsDetailsPage() ]

// Given steps

Given('the user is on the quick quote page', () => {
  quickQuotePage.visitQuickQuotePage()
})

// When steps
When('the user enters a valid vehicle registration {string} into the registration field', (reg) => {
  quickQuotePage.regFormInput(reg)
})

When('the user submits the quick quote form', () => {
  driverDetailsPage.submitQuickQuoteForm()
})

// Then steps
Then('the user is directed to the correctly displayed quick quote form', () => {
  driverDetailsPage.verifyQuickQuoteForm()
})

Then('the user is shown the expected quick quote results', () => {
  resultsDetailsPage.retrieveQuickQuoteResults()
})

// And steps
And('the registration form displays correctly', () => {
  quickQuotePage.validateEnterRegForm()
})

And('the user clicks the Get a Quick Quote button', () => {
  quickQuotePage.clickGetAQuote()
})

And('the mileage form displays correctly including vehicle {string} and {int} miles', (vehicleInfo, miles) => {
  quickQuotePage.validateMileageForm(vehicleInfo, miles)
})

And('the user clicks continue button', () => {
  quickQuotePage.clickContinueButton()
})

And('the user selects that they have {int} years no claims bonus', (ncd) => {
  driverDetailsPage.selectNcdValue(ncd)
})

And('the user enters their date of birth {string}', (dob) => {
  driverDetailsPage.enterDOBValues(dob)
})

And('the user enters their postcode {string}', (postcode) => {
  driverDetailsPage.enterPostcodeValue(postcode)
})

And('the user selects that their insurance renews in {string}', (month) => {
  driverDetailsPage.selectCarInsuranceRenewalValue(month)
})

And('the user enters their email address', () => {
  driverDetailsPage.enterEmailAddress()
})

And('the user proves they are not a robot', () => {
  driverDetailsPage.verifyUserIsNotARobot()
})