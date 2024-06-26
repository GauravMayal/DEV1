public class StudentDetailsController {
  @AuraEnabled
    public static List<Student__c>getStudentsByTeacherId(Id teacherId) {
        List<Student__c> students = [SELECT Id, Name,Student_Name__c, Level__c, Physically_Disabled__c, Student_Description__c
                                     FROM Student__c
                                     WHERE Id IN(Select Student__c from Student_Teacher__c where Teacher__c =:teacherId)];
        return students;
    }
}