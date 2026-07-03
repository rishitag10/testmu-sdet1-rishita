Feature: OrangeHRM Login

  As an OrangeHRM user
  I want to login securely
  So that I can access the dashboard

  Background:
    Given I launch the OrangeHRM application

  @smoke @positive
  Scenario: Successful Login
    When I login with username "Admin" and password "admin123"
    Then I should be redirected to the dashboard

  @negative
  Scenario: Invalid Password
    When I login with username "Admin" and password "wrongPassword"
    Then I should see the login error message

  @negative
  Scenario: Invalid Username
    When I login with username "WrongUser" and password "admin123"
    Then I should see the login error message

  @negative
  Scenario: Empty Credentials
    When I login with username "" and password ""
    Then I should see validation messages