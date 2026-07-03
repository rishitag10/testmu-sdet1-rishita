Feature: Dashboard Page Accessibility and Navigation

  Scenario: Verify key elements are visible on the Dashboard page
    Given a user is successfully logged in
    And the user is on the Dashboard page
    Then the dashboard header containing "Dashboard" should be visible
    And the left navigation menu should be visible
    And the user profile dropdown element should be visible

  Scenario: Verify Logout functionality from the Dashboard page
    Given a user is successfully logged in
    And the user is on the Dashboard page
    When the user clicks on the user profile dropdown
    And the user clicks on the "Logout" option
    Then the user should be redirected to the Login page
    And the login form should be visible