Feature: Assign an assignment to a student
  As a teacher 
  I want to assignment a student to an assignment
  So that the student can achieve learning objectives

  Scenario: Assign a student to an assignment
    Given there is an existing student enrolled to a class
    And an assignment exists for a class
    When i assign the student the assignment
    Then the student should be assigned to the assignment

  Scenario: Fail to assign a student to an assignment when student does not exist
    Given a student does not exist
    And an assignment exists for a class
    When i assign the student the assignment
    Then i should get a student not found error

  Scenario: Fail to assign a student to an assignment when assignment does not exist
    Given there is an existing student enrolled to a class
    And an assignment does not exist
    When i assign the student the assignment
    Then i should get an assignment not found error

  Scenario: Fail to assign a student to an assignment when student is not enrolled
    Given there is an existing student that is not enrolled to a class
    And an assignment exists for a class
    When i assign the student the assignment
    Then i should get a student not enrolled error

  Scenario: Fail to assign a student to an assignment when already assigned
    Given there is an existing student enrolled to a class
    And an assignment exists for a class
    And the student is already assigned to the assignment
    When i assign the student the assignment
    Then i should get an already assigned error
