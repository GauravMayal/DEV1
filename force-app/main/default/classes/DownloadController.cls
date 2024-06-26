public with sharing class DownloadController {
    
    public Id OpportunityId {get; set;}  // variable to store the Opportunity ID
    
    public Opportunity2__c opportunityData {get; private set;}

    public DownloadController() {
        OpportunityId = ApexPages.currentPage().getParameters().get('id');
        opportunityData = getOpportunityData(OpportunityId);
    }

    @AuraEnabled(cacheable=true)
    public static String generateFile(String fileType, Id oppId) { // Accept oppId as a parameter
        if(fileType == 'csv') {
            return generateCSV(oppId); // Pass the oppId to generateCSV
        } else if(fileType == 'pdf') {
            return generatePDF(oppId);
        }
        return null;
    }
    
    private static String generateCSV(Id oppId) {//opp id
        // Fetch Opportunity2__c records
        Opportunity2__c opp = [SELECT Client_Name__c, Business__c, Opportunity_Name__c, Service_Area__c, 
                                          Opportunity_Partner__c, Service_Line__c, Opportunity_Manager__c, Sale_Stage__c,
                                          Created_On__c, Opportunity_Id__c 
                                          FROM Opportunity2__c LIMIT 1];//opp id
        
        // Initialize the CSV String with headers
        List<String> csvData = new List<String>();
        csvData.add('Client Name, Business, Opportunity Name, Service Area, Opportunity Partner, Service Line, Opportunity Manager, Sale Stage, Created On, Opportunity Id');
        
        // Loop through the records and create CSV rows
        
            List<String> record = new List<String>();
            record.add(opp.Client_Name__c);
            record.add(opp.Business__c);
            record.add(opp.Opportunity_Name__c);
            record.add(opp.Service_Area__c);
            record.add(opp.Opportunity_Partner__c);
            record.add(opp.Service_Line__c);
            record.add(opp.Opportunity_Manager__c);
            record.add(opp.Sale_Stage__c);
            record.add(String.valueOf(opp.Created_On__c));
            record.add(opp.Opportunity_Id__c);
    
            // Add the record to the CSV data
            csvData.add(String.join(record, ','));
        
        
        // Convert the List into a single String and return
        return String.join(csvData, '\n');
    }
    
    
    public static String generatePDF(Id oppId) {
        PageReference pdfPage = Page.PDF;
        pdfPage.getParameters().put('id', oppId);
        
        // Generate the PDF content
        Blob pdfBlob;
        try {
            pdfBlob = pdfPage.getContent();
        } catch(Exception e) {
            return null;
        }
        
        // Convert the Blob to a base64-encoded string and return
        return EncodingUtil.base64Encode(pdfBlob);
    }
    @AuraEnabled(cacheable=true)
    public static Opportunity2__c getOpportunityData(Id oppId) {
    List<Opportunity2__c> opportunityList = [SELECT Client_Name__c, Business__c, Opportunity_Name__c, Service_Area__c, 
                                             Opportunity_Partner__c, Service_Line__c, Opportunity_Manager__c, Sale_Stage__c,
                                             Created_On__c, Opportunity_Id__c 
                                             FROM Opportunity2__c WHERE Id = :oppId];
    
    if (opportunityList != null && !opportunityList.isEmpty()) {
        return opportunityList[0];
    } else {
        return null; 
    }
    }

}