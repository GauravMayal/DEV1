public with sharing class ExportDataController { 
    @AuraEnabled(cacheable=true)
    public static Opportunity getAccountDataToExport()
    {     
        Opportunity OppDetails= [Select Id,AccountId,Name from Opportunity LIMIT 1];
        
        
        return OppDetails;
        
    }
}