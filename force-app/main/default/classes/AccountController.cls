public class AccountController{
    
    @AuraEnabled(cacheable=true)
    public static List<Student__c> getAccounts()
    {
        List<Student__c> accountList = [SELECT Id,Name FROM Student__c
                                             LIMIT 20];
        return accountList;
    }
}