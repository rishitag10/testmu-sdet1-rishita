Feature: OrangeHRM Dashboard

  Background:
    Given I am logged into OrangeHRM

  @dashboard
  Scenario: Verify Dashboard Header
    Then I should see the dashboard header

  @dashboard
  Scenario: Verify Left Navigation Menu
    Then I should see the left navigation menu

  @dashboard
  Scenario: Verify User Profile Menu
    Then I should see the user profile icon

  @dashboard
  Scenario: Logout Successfully
    When I logout
    Then I should be redirected to login page