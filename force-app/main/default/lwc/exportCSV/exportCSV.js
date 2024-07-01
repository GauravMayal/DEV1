import { LightningElement,api,wire } from 'lwc';
import DataOpp from '@salesforce/apex/ExportDataController.getAccountDataToExport';

export default class exportCSV extends LightningElement {
    userData=[];
    @wire(DataOpp) wiredFunction({ data,error }) {
        if (data) {
            console.log('Data', data);
            this.userData = data;
        } else if (error) {
            console.log(error);
        }
    }
  //  connectedCallback() {
  //      this.clickHandler();
   // }
   connectedCallback(){
    this.clickHandler();
   }
       
       

    
    
    /*columnHeader = ['Client Name',
     'Opportunity Name',
     'Opportunity Partner',
     'Opportunity Manager',
      'Created On',
      'Business' ,
      'Service Area',
      'Service',
      'Sale Stage',
      'Opportunity Id' ];*/
     // coloumnHeader=['Id','AccountId','Name'];
      
    clickHandler(){
            
            let csvFile=this.convertToCsv(this.userData);
            this.downloadCSVFile(csvFile);
            

    }
    
    convertToCsv(userData){
       
        //let csvHeader=this.columnHeader.toString();
        //let csvBody= userData.toString();        
        //let csvfile=csvHeader+"\n"+csvBody.join("\n");
        const fields = ['Name', 'Id', 'AccountId'];

    // Create the header row with field names
    const header = fields.join(',');

    // Create the data row with opportunity values
    const data = fields.map(field => userData[field]).join(',');

    // Combine the header and data rows
    const csv = `${header}\n${data}`;

    return csv;
        //let csvfile=userData;

       // return csvfile;
        
    }
    downloadCSVFile(csvFile) { 
        
       const downLink=document.createElement("a");
       downLink.href="data:text/csv;charset=utf-8," + encodeURI (csvFile);
       downLink.target="_blank";   
       downLink.download="details.csv";
       downLink.click();                     
   }
}