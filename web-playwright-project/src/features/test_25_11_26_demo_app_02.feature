Feature: User Authentication and Profile Management
  As a user, I want to be able to register, log in, and manage my profile to use the application's features.

  @dryrun @TS-23 @TC-TC1
  Scenario: Verify registration fails when passwords do not match
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "Password123"
    And I fill "Confirm password" with "DifferentPass456"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then the "Confirm password" field should be invalid

  @dryrun @TS-25 @TC-TC2
  Scenario: Verify registration fails with an already registered email
    Given I register a new user
    Then I should see the registration success message
    When I attempt to register the same user again
    # The requirement states this message should appear. UI discovery for a failed re-registration was not available.
    Then I should see the text "Email already registered"

  @dryrun @TS-25 @TC-TC3
  Scenario: Verify user input is sanitized on the profile page
    Given I register a new user with a script in the first name
    Then I should see the registration success message
    When I proceed to the login page
    And I log in as the new user
    Then I should be on the dashboard page
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    And the injected script should be displayed as plain text on the profile page

  @dryrun @TS-25 @TC-TC1
  Scenario: Verify full user journey from registration to logout
    Given I register a new user
    Then I should see the registration success message
    When I proceed to the login page
    And I log in as the new user
    Then I should be on the dashboard page
    When I navigate to my profile and back to the dashboard
    And I log out
    Then I should be logged out

  @dryrun @TS-21 @TC-TC1 @TC-TC2 @TC-TC3 @TC-TC4 @TC-TC5
  Scenario Outline: Verify successful user registration with various valid data
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "<firstName>"
    And I fill "Last name" with "<lastName>"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Mobile number" with "<mobile>"
    And I fill "Age (years)" with "<age>"
    And I select "<gender>" from "Gender identity"
    And I fill "Account password" with "P@ssword123"
    And I fill "Confirm password" with "P@ssword123"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

    Examples:
      | firstName            | lastName           | mobile      | age | gender            |
      | {{random.firstName}} | {{random.lastName}}  |             | 25  | Male              |
      | {{random.firstName}} | {{random.lastName}}  |             | 13  | Prefer not to say |
      | {{random.firstName}} | {{random.lastName}}  |             | 120 | Female            |
      | {{random.firstName}} | {{random.lastName}}  | +1234567890 | 30  | Other             |
