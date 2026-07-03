Feature: User Authentication on Login Page

Scenario: Successful Login with Valid Credentials
  Given I am on the login page
  And I have a registered account with username "validuser" and password "SecurePass123!"
  When I enter "validuser" into the username field
  And I enter "SecurePass123!" into the password field
  And I click the "Login" button
  Then I should be redirected to the dashboard page
  And I should see a welcome message "Welcome, validuser!"

Scenario: Failed Login with Invalid Password
  Given I am on the login page
  And I have a registered account with username "testuser" and password "CorrectPassword123"
  When I enter "testuser" into the username field
  And I enter "WrongPassword123" into the password field
  And I click the "Login" button
  Then I should see an error message "Invalid username or password."
  And I should remain on the login page

Scenario: Failed Login with Empty Username
  Given I am on the login page
  When I leave the username field empty
  And I enter "SecurePass123!" into the password field
  And I click the "Login" button
  Then I should see an error message "Please enter your username."
  And I should remain on the login page

Scenario: Failed Login with Empty Password
  Given I am on the login page
  When I enter "testuser" into the username field
  And I leave the password field empty
  And I click the "Login" button
  Then I should see an error message "Please enter your password."
  And I should remain on the login page

Scenario: Failed Login with SQL Injection Attempt in Username
  Given I am on the login page
  When I enter "' OR '1'='1 --" into the username field
  And I enter "anypassword" into the password field
  And I click the "Login" button
  Then I should see an error message "Invalid username or password."
  And I should remain on the login page
  And no sensitive database information should be exposed

Scenario: Failed Login with Excessive-Length Input in Username
  Given I am on the login page
  When I enter a username with 256 characters into the username field
  And I enter "SecurePass123!" into the password field
  And I click the "Login" button
  Then I should see an error message "Invalid username or password."
  And I should remain on the login page
  And the system should handle the input without crashing or unexpected behavior