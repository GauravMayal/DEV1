public with sharing class SearchStudentController {

    @AuraEnabled
    public static List<Student__c> getStudents(String queryString) {

        String studSearched =queryString +'%';
        
        List<Student__c> students_Name_matching = new List<Student__c>();
        students_Name_matching=[Select Student_Name__c,Father_Name__c,Mother_Name__c from Student__c where Student_Name__c LIKE :studSearched];
        return students_Name_matching;
    }
    

    @AuraEnabled
    public static Student__c getStudentDetails(Id studentId){
        Student__c studentDetailSearched=[Select Id,Student_Name__c,Level__c from Student__c where Id= :studentId];
        return studentDetailSearched;
    }

    @AuraEnabled
    public static List<Teacher__c> getTeacherOfStudent(Id studentId){
    
        List<Student_Teacher__c> relatedTeacher=[Select Teacher__c from Student_Teacher__c where Student__c= :studentId];
        List<Id> relatedTeacherId=new List<Id>();
        for(Student_Teacher__c i:relatedTeacher){
            relatedTeacherId.add(i.Teacher__c);
        }

        List<Teacher__c> relatedTeacherDetails=[Select Teacher_Name__c,Subjects__c from Teacher__c where Id In :relatedTeacherId ];
        return relatedTeacherDetails;
}



}