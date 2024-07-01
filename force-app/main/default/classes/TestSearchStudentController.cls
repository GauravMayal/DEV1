@isTest

public class TestSearchStudentController {

    static testMethod void testGetStudents() {

        // Create test Student records

        List<Student__c> testStudents = new List<Student__c>{

            new Student__c(Student_Name__c = 'John Doe', Father_Name__c = 'John Sr.', Mother_Name__c = 'Jane',Level__c = 'III',Form_Submission_Date__c=date.parse('06/08/2023'),Father_s_Occupation__c='X',Mother_s_Occupation__c='X',Contact_Email__c='abcd@gmail.com'),

            new Student__c(Student_Name__c = 'Alice Smith', Father_Name__c = 'Bob', Mother_Name__c = 'Eve',Level__c = 'III',Form_Submission_Date__c=date.parse('06/08/2023'),Father_s_Occupation__c='X',Mother_s_Occupation__c='X',Contact_Email__c='abcd@gmail.com'),

            new Student__c(Student_Name__c = 'zzzBobzzz Johnson', Father_Name__c = 'Mike', Mother_Name__c = 'Sara',Level__c = 'III',Form_Submission_Date__c=date.parse('06/08/2023'),Father_s_Occupation__c='X',Mother_s_Occupation__c='X',Contact_Email__c='abcd@gmail.com')

        };

        insert testStudents;

 

        // Call the method being tested

        List<Student__c> result = SearchStudentController.getStudents('zzzBobzzz');

 

        // Verify the results

        System.assertEquals(1, result.size(), 'Incorrect number of students returned');
			
        System.assertEquals('zzzBobzzz Johnson', result[0].Student_Name__c, 'Incorrect student name');

    }

 

    static testMethod void testGetStudentDetails() {

        // Create a test Student record

        Student__c testStudent = new Student__c(Student_Name__c = 'Test Student', Father_Name__c = 'John Sr.', Mother_Name__c = 'Jane',Level__c = 'III',Form_Submission_Date__c=date.parse('06/08/2023'),Father_s_Occupation__c='X',Mother_s_Occupation__c='X',Contact_Email__c='abcd@gmail.com');

        insert testStudent;

 

        // Call the method being tested

        Student__c result = SearchStudentController.getStudentDetails(testStudent.Id);

 

        // Verify the results

        System.assertEquals('Test Student', result.Student_Name__c, 'Incorrect student name');

        System.assertEquals('III', result.Level__c, 'Incorrect student level');

    }

 

    static testMethod void testGetTeacherOfStudent() {

        // Create a test Teacher record

        Teacher__c testTeacher = new Teacher__c(Teacher_Name__c = 'Test Teacher 551',
                                                       Teaching_Level__c='III',
                                                       Contact_Number__c=1234567890,
                                                       Subjects__c='Arts',
                                                       Joining_Date__c=date.parse('01/10/2023'));

        insert testTeacher;

 

        // Create a test Student record

        Student__c testStudent = new Student__c(Student_Name__c = 'Student 1', Level__c = 'III',
                                               Form_Submission_Date__c=date.parse('06/08/2023'),
                                               Student_Description__c='Hi',Father_Name__c='testing',Mother_Name__c='testing',
                                               Father_s_Occupation__c='X',Mother_s_Occupation__c='X',Contact_Email__c='abcd@gmail.com');

        insert testStudent;

 

        // Create a Student_Teacher__c record to associate the test Student with the test Teacher

        Student_Teacher__c testStudentTeacher = new Student_Teacher__c(

            Teacher__c = testTeacher.Id,

            Student__c = testStudent.Id

        );

        insert testStudentTeacher;

 

        // Call the method being tested

        List<Teacher__c> result = SearchStudentController.getTeacherOfStudent(testStudent.Id);

 

        // Verify the results

        System.assertEquals(1, result.size(), 'Incorrect number of teachers returned');

        System.assertEquals('Test Teacher 551', result[0].Teacher_Name__c, 'Incorrect teacher name');

        System.assertEquals('Arts', result[0].Subjects__c, 'Incorrect subjects');

    }

}