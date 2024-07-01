public class demo123 {
public static Opportunity demo(){     
        Opportunity OppDetails= [Select Id,AccountId,Name from Opportunity LIMIT 1];
       
    	
        return OppDetails;
    }
}