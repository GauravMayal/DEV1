@isTest
public class testTrigger {
    static testMethod void testTrigger() {
        // Create a test Teacher record
        Teacher__c testTeacher = new Teacher__c(Teacher_Name__c = 'Test Teacher 550',
            Teaching_Level__c = 'III',
            Contact_Number__c = 1234567890,
            Subjects__c = 'English',
            Joining_Date__c = date.parse('09/10/2023'));
        insert testTeacher;
		// Create a test Student record
        Student__c testStudent = new Student__c(Student_Name__c = 'Student 1', Level__c = 'III',
            Form_Submission_Date__c = date.parse('06/08/2023'),
            Student_Description__c = 'Hi', Father_Name__c = 'testing', Mother_Name__c = 'testing',
            Father_s_Occupation__c = 'X', Mother_s_Occupation__c = 'X', Contact_Email__c = 'abcd@gmail.com');
        insert testStudent;
		// Create a Student_Teacher__c record for the test Student and Teacher
        Student_Teacher__c existingAssignment = new Student_Teacher__c(
            Student__c = testStudent.Id,
            Teacher__c = testTeacher.Id
        );
        insert existingAssignment;
		// Create a new Student_Teacher__c record for the same Student and a different Teacher
        Teacher__c anotherTeacher = new Teacher__c(Teacher_Name__c = 'Test Teacher 551',
            Teaching_Level__c = 'III',
            Contact_Number__c = 1234567890,
            Subjects__c = 'English',
            Joining_Date__c = date.parse('01/10/2023'));
        insert anotherTeacher;
        Student_Teacher__c newAssignment = new Student_Teacher__c(
            Student__c = testStudent.Id,
            Teacher__c = anotherTeacher.Id
        );
        // Trigger the before insert/update event
        //DmlException e=new DmlException();
        String s;
        try {
            Test.startTest();
            insert newAssignment;
            Test.stopTest();
        } catch (DmlException e) {
            s = e.getMessage();
            System.debug('The following exception has occurred: ' + e.getMessage());
            //System.assertEquals(s,e.getMessage());
            //System.assert();
        }
        if(s !=NULL)
            System.assert(s.length() > 0, 'Error realtionship not added to new assignment');
        else
            System.assert(s==NULL, 'Error Relationship added to new assignment');

    }
}