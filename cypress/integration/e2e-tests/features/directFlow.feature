Feature: Quick quote happy flow

  As a new customer
  I would like to be able to get a full quote

  Scenario: Verify that a customer can get a quick quote via Brochure
    Given the user is on the quick quote page
    And the registration form displays correctly
    When the user enters a valid vehicle registration "CY70 GLK" into the registration field
    And the user clicks the Get a Quick Quote button
    And the mileage form displays correctly including vehicle "SEAT LEON FR TSI EVO 130" and 5400 miles
    And the user clicks continue button
    Then the user is directed to the correctly displayed quick quote form
    And the user selects that they have 5 years no claims bonus
    And the user enters their date of birth "10/10/1992"
    And the user enters their postcode "CF5 4QS"
    And the user selects that their insurance renews in "December"
    And the user enters their email address
    And the user proves they are not a robot
    When the user submits the quick quote form
    Then the user is shown the expected quick quote results