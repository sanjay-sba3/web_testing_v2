Feature: Demo App User Flow
  As a user, I want to navigate the demo application, register, log in, and manage my profile to ensure all core functionalities are working correctly.

  @dryrun @TS-26 @TC-TC1
  Scenario: E2E - Successful user registration, login, navigation, and logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then I should see the "Login" link

  @dryrun @TS-27 @TC-TC1
  Scenario: Verify error message for registration with an existing email
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with an existing email
    Then I should see the text "Email already registered"
    Then the URL should contain "/register"

  @dryrun @TS-30 @TC-TC1 @TC-TC2 @TC-TC3 @TC-TC4 @TC-TC5
  Scenario Outline: Verify registration is blocked for invalid fields
    Given I open the "http://localhost:3000/register" page
    When I fill the registration form with an invalid "<field>"
    When I click the "Create account" button
    Then the "<field>" field should be invalid

    Examples:
      | field                             |
      | First name                        |
      | Last name                         |
      | Email address                     |
      | Age (years)                       |
      | Confirm password                  |
      | I accept the terms and conditions |

  @dryrun @TS-28 @TC-TC1
  Scenario: Unauthenticated user is redirected from dashboard to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Then I should see the text "Email"

  @dryrun @TS-29 @TC-TC1
  Scenario: Unauthenticated user is redirected from otp page to login
    Given I open the "http://localhost:3000/otp" page
    Then the URL should contain "/login"
    Then I should see the text "Email"

  @dryrun @TS-40 @TC-TC1
  Scenario: Verify 'Back to Dashboard' link navigates from Profile to Dashboard
    Given I sign in as the environment user
    When I open the "http://localhost:3000/profile" page
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"