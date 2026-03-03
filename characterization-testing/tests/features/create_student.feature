Feature: Create a new student
  As an administrator 
  I want to add a student to the system
  So that the student can be enrolled and tracked within the platform

  Scenario: Successfully create a student
    Given I want to create a student with name "John Doe" and email "john@test.com"
    When I send a request to create a student
    Then the new student record should be created successfully

  Scenario: Missing required fields
    Given I want to create a student with no name and email "john@test.com"
    When I send a request to create a student
    Then the new student record should not be created
