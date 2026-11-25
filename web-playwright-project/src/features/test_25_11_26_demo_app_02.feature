Feature: User Registration and Authentication Flow

  @dryrun @TS-23 @TC-TC1
  Scenario: Verify registration fails when 'Account password' and 'Confirm password' do not match
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with "{{random.email}}"
    And I fill "Mobile number" with "+1234567890"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "Password123"
    And I fill "Confirm password" with "DifferentPass456"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then the "Confirm password" field should be invalid

  @dryrun @TS-22 @TC-TC1
  Scenario: Register with already registered email
    Given I open the "http://localhost:3000/register" page
    When I fill "First name" with "{{random.firstName}}"
    And I fill "Last name" with "{{random.lastName}}"
    And I fill "Email address" with "test@test.com"
    And I fill "Age (years)" with "25"
    And I select "Male" from "Gender identity"
    And I fill "Account password" with "ValidPass123"
    And I fill "Confirm password" with "ValidPass123"
    And I check "I accept the terms and conditions"
    And I click the "Create account" button
    Then I should see the text "Email already registered"

  @dryrun @TS-24 @TC-TC1
  Scenario: End-to-End Successful User Flow: Registration, Login, Navigation, Logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user with details:
      | First name          | {{random.firstName}} |
      | Last name           | {{random.lastName}}  |
      | Email address       | {{random.email}}     |
      | Mobile number       | +1234567890          |
      | Age (years)         | 25                   |
      | Gender identity     | Female               |
      | Account password    | Password123!         |
      | Confirm password    | Password123!         |
      | Accept terms        | true                 |
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in with the registered user
    Then the URL should contain "/otp"
    When I fill OTP with "123456"
    And I click the "Submit" button
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    And I should see the text "Test"
    And I should see the text "User"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then I should see the "Login" link

  @dryrun @TS-21 @TC-TC1
  Scenario: Successful New User Registration, Login, Navigation, and Logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user with details:
      | First name          | {{random.firstName}} |
      | Last name           | {{random.lastName}}  |
      | Email address       | {{random.email}}     |
      | Mobile number       | {{random.mobileNumber}}|
      | Age (years)         | 25                   |
      | Gender identity     | Male                 |
      | Account password    | P@ssword123          |
      | Confirm password    | P@ssword123          |
      | Accept terms        | true                 |
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in with the registered user
    Then the URL should contain "/otp"
    When I fill OTP with the value of env "APP_OTP"
    And I click the "Submit" button
    Then the URL should contain "/dashboard"
    And I should see the text "Hi,"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    And I should see the text "Test User"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the "Login" link

  @dryrun @TS-21 @TC-TC2
  Scenario: New User Registration with Minimum Valid Age
    Given I open the "http://localhost:3000/register" page
    When I register a new user with details:
      | First name          | {{random.firstName}} |
      | Last name           | {{random.lastName}}  |
      | Email address       | {{random.email}}     |
      | Age (years)         | 13                   |
      | Gender identity     | Prefer not to say    |
      | Account password    | P@ssword123          |
      | Confirm password    | P@ssword123          |
      | Accept terms        | true                 |
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in with the registered user
    Then the URL should contain "/otp"
    When I fill OTP with the value of env "APP_OTP"
    And I click the "Submit" button
    Then the URL should contain "/dashboard"
    And I should see the text "Hi,"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the "Login" link

  @dryrun @TS-21 @TC-TC3
  Scenario: New User Registration with Maximum Valid Age
    Given I open the "http://localhost:3000/register" page
    When I register a new user with details:
      | First name          | {{random.firstName}} |
      | Last name           | {{random.lastName}}  |
      | Email address       | {{random.email}}     |
      | Age (years)         | 120                  |
      | Gender identity     | Female               |
      | Account password    | P@ssword123          |
      | Confirm password    | P@ssword123          |
      | Accept terms        | true                 |
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in with the registered user
    Then the URL should contain "/otp"
    When I fill OTP with the value of env "APP_OTP"
    And I click the "Submit" button
    Then the URL should contain "/dashboard"
    And I should see the text "Hi,"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the "Login" link

  @dryrun @TS-21 @TC-TC4
  Scenario: New User Registration with Mobile Number
    Given I open the "http://localhost:3000/register" page
    When I register a new user with details:
      | First name          | {{random.firstName}} |
      | Last name           | {{random.lastName}}  |
      | Email address       | {{random.email}}     |
      | Mobile number       | {{random.mobileNumber}}|
      | Age (years)         | 30                   |
      | Gender identity     | Other                |
      | Account password    | P@ssword123          |
      | Confirm password    | P@ssword123          |
      | Accept terms        | true                 |
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in with the registered user
    Then the URL should contain "/otp"
    When I fill OTP with the value of env "APP_OTP"
    And I click the "Submit" button
    Then the URL should contain "/dashboard"
    And I should see the text "Hi,"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the "Login" link

  @dryrun @TS-21 @TC-TC5
  Scenario: New User Registration with 'Other' Gender Identity
    Given I open the "http://localhost:3000/register" page
    When I register a new user with details:
      | First name          | {{random.firstName}} |
      | Last name           | {{random.lastName}}  |
      | Email address       | {{random.email}}     |
      | Age (years)         | 40                   |
      | Gender identity     | Other                |
      | Account password    | P@ssword123          |
      | Confirm password    | P@ssword123          |
      | Accept terms        | true                 |
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in with the registered user
    Then the URL should contain "/otp"
    When I fill OTP with the value of env "APP_OTP"
    And I click the "Submit" button
    Then the URL should contain "/dashboard"
    And I should see the text "Hi,"
    When I click the "Logout" button
    Then the URL should contain "/login"
    And I should see the "Login" link

  @dryrun @TS-25 @TC-TC1
  Scenario: Successful User Registration, Login, Profile Navigation, and Logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user with details:
      | First name          | John                 |
      | Last name           | Doe                  |
      | Email address       | {{random.email}}     |
      | Mobile number       | 1234567890           |
      | Age (years)         | 30                   |
      | Gender identity     | Male                 |
      | Account password    | Password123!         |
      | Confirm password    | Password123!         |
      | Accept terms        | true                 |
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in with the registered user
    Then the URL should contain "/otp"
    When I fill OTP with the value of env "APP_OTP"
    And I click the "Submit" button
    Then the URL should contain "/dashboard"
    And I should see the text "Welcome back,"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    And I should see the text "Test User"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then I should see the "Login" link

  @dryrun @TS-25 @TC-TC2
  Scenario: Attempt Registration with Existing Email
    Given I open the "http://localhost:3000/register" page
    When I register a new user with details:
      | First name          | Jane                 |
      | Last name           | Doe                  |
      | Email address       | {{random.email}}     |
      | Mobile number       | 0987654321           |
      | Age (years)         | 25                   |
      | Gender identity     | Female               |
      | Account password    | SecurePass1!         |
      | Confirm password    | SecurePass1!         |
      | Accept terms        | true                 |
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the previously registered email
    Then I should see the text "Email already registered"

  # needs-review: The profile page displays "Test" for First name, not the injected script "{{security.comment}}".
  @dryrun @needs-review @TS-25 @TC-TC3
  Scenario: Register with Script in First Name and Verify Display
    Given I open the "http://localhost:3000/register" page
    When I register a new user with details:
      | First name          | {{security.comment}} |
      | Last name           | XSS                  |
      | Email address       | {{random.email}}     |
      | Mobile number       | 1122334455           |
      | Age (years)         | 40                   |
      | Gender identity     | Other                |
      | Account password    | XssPass123!          |
      | Confirm password    | XssPass123!          |
      | Accept terms        | true                 |
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in with the registered user
    Then the URL should contain "/otp"
    When I fill OTP with the value of env "APP_OTP"
    And I click the "Submit" button
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    And I should see the text of the registered first name