Feature: User Authentication tests

Background:
    Given User navigates to the application

@smoke @reg
Scenario: Login should be successful with valid credentials
    When User logs in as the "validUser"
    Then Login should be successful

@smoke @reg
Scenario Outline: Login should fail for "<userType>"
    When User logs in as the "<userType>"
    Then Login should fail with error "<errorMessage>"

    Examples:
        | userType      | errorMessage                                                               |
        | invalidUser   | Epic sadface: Username and password do not match any user in this service |
        | lockedOutUser | Epic sadface: Sorry, this user has been locked out.                       |
