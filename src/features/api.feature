Feature: Restful Booker API Testing

  @api
  Scenario: Generate Authentication Token
    Given I create an authentication token
    Then the token should be generated successfully

  @api
  Scenario: Create Booking
    Given I create a new booking
    Then booking should be created successfully

  @api
  Scenario: Get Booking
    Given I fetch booking details
    Then booking details should be returned

  @api
  Scenario: Update Booking
    Given I update the booking
    Then booking should be updated successfully

  @api
  Scenario: Delete Booking
    Given I delete the booking
    Then booking should be deleted successfully