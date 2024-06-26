public with sharing class ExcelTemp {
    
    @AuraEnabled(cacheable=true)
    public static Opportunity2__c getAccountDataToExport(){
        Opportunity2__c Data = [Select Client_Name__c,
        Opportunity_Name__c,
        Opportunity_Partner__c,
        Opportunity_Manager__c,
         Created_On__c,
         Business__c ,
         Service_Area__c,
         Service_Line__c,
         Sale_Stage__c,
         Opportunity_Id__c from Opportunity2__c LIMIT 1];
        return Data;
    }
}