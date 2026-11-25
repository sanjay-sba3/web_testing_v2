Feature: Demo App User Journey

  @dryrun @TS-26 @TC-TC1
  Scenario: E2E - Successful user registration, login, navigation, and logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/otp"
    When I enter the correct OTP
    Then the URL should contain "/dashboard"
    And I should see the text "Welcome back, Test"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    And I should see the text "Test User"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the "Login" link

  @dryrun @TS-27 @TC-TC1
  Scenario: Verify error message for registration with an existing email
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the email "test@test.com"
    # The requirement states this message, but UI discovery did not capture it. If this fails, it's a finding.
    Then I should see the text "Email already registered"

  @dryrun @TS-28 @TC-TC1
  Scenario: Verify unauthenticated user is redirected from /dashboard to /login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the text "Email"

  @dryrun @TS-29 @TC-TC1
  Scenario: Verify direct access to /otp page without OTP token redirects to login
    Given I open the "http://localhost:3000/otp" page
    Then the URL should contain "/login"
    And I should see the text "Email"

  @dryrun @TS-30 @TC-TC1
  Scenario: Verify registration is blocked when First Name is empty
    Given I open the "http://localhost:3000/register" page
    When I submit the registration form with the first name empty
    Then the "First name" field should be invalid

  @dryrun @TS-30 @TC-TC2
  Scenario: Verify registration is blocked when Last Name is empty
    Given I open the "http://localhost:3000/register" page
    When I submit the registration form with the last name empty
    Then the "Last name" field should be invalid

  @dryrun @TS-30 @TC-TC3
  Scenario: Verify registration is blocked when passwords do not match
    Given I open the "http://localhost:3000/register" page
    When I submit the registration form with mismatched passwords
    Then the "Confirm password" field should be invalid

  @dryrun @TS-30 @TC-TC4
  Scenario: Verify registration is blocked when Age is below the minimum
    Given I open the "http://localhost:3000/register" page
    When I submit the registration form with an age of "12"
    Then the "Age (years)" field should be invalid

  @dryrun @TS-30 @TC-TC5
  Scenario: Verify registration is blocked when terms are not accepted
    Given I open the "http://localhost:3000/register" page
    When I submit the registration form without accepting the terms
    Then the "I accept the terms and conditions" field should be invalid
