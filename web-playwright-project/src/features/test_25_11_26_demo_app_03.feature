Feature: Demo App Authentication and Registration

  @dryrun @TS-29 @TC-TC1
  Scenario: Verify direct access to /otp page without OTP token redirects to login
    Given I open the "http://localhost:3000/otp" page
    Then the URL should contain "/login"
    And I should see the text "Email"

  @dryrun @TS-28 @TC-TC1
  Scenario: Verify unauthenticated user is redirected from /dashboard to /login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the text "Email"

  @dryrun @TS-27 @TC-TC1
  Scenario: Verify error message for registration with an existing email
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "Test"
    And I fill "Last name" with "User"
    And I fill "Email address" with "test@test.com"
    And I fill "Age (years)" with "25"
    And I select "Prefer not to say" from "Gender identity"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then I should see the text "Email already registered"

  @dryrun @TS-26 @TC-TC1
  Scenario: E2E - Successful user registration, login, navigation, and logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/otp"
    When I enter the OTP
    Then the URL should contain "/dashboard"
    And I should see the text "Welcome back, Test"
    When I view my profile
    Then the URL should contain "/profile"
    And I should see the text "Test User"
    When I go back to the dashboard
    Then the URL should contain "/dashboard"
    When I log out
    Then the URL should contain "/login"
    And I should see the "Login" link

  @dryrun @TS-30 @TC-TC1
  Scenario: Verify registration is blocked when First Name is empty
    Given I open the "http://localhost:3000/register" page
    When I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then the "First name" field should be invalid

  @dryrun @TS-30 @TC-TC2
  Scenario: Verify registration is blocked when Last Name is empty
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then the "Last name" field should be invalid

  @dryrun @TS-30 @TC-TC3
  Scenario: Verify registration is blocked when passwords do not match
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password456"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then the "Confirm password" field should be invalid

  @dryrun @TS-30 @TC-TC4
  Scenario: Verify registration is blocked when Age is outside the valid range
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "12"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then the "Age (years)" field should be invalid

  @dryrun @TS-30 @TC-TC5
  Scenario: Verify registration is blocked when terms are not accepted
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "password123"
    And I fill "Confirm password" with "password123"
    And I click the "Create account" button
    Then the "I accept the terms and conditions" field should be invalid
