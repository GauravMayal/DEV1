public class ToCsv {
        
    public static String generateCSV() {//opp id
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

}