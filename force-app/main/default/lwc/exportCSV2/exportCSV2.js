import { LightningElement,api,wire } from 'lwc';
import DataOpp from '@salesforce/apex/ExcelTemp.getAccountDataToExport';


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
   @api invoke(){
    //this.clickHandler();
    this.exportToExcel();
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
    exportToExcel(){
        var htmls = "";
                    var uri = 'data:application/vnd.ms-excel;base64,';
                    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{table}</body></html>'; 
                    var base64 = function(s) {
                        return window.btoa(unescape(encodeURIComponent(s)))
                    };
        
                    var format = function(s, c) {
                        return s.replace(/{(\w+)}/g, function(m, p) {
                            return c[p];
                        })
                    };
                    
                   

                    htmls ='</head><body> <table> <tbody> <tr> <th colspan="4" style="padding-top: 12px; padding-bottom: 12px;text-align: left;background-color: #04AA6D;color: white;">Opportunity Details</th> </tr> <tr > <td style=" border: 1px solid #ddd;padding: 8px;">Client Name:</td> <td style=" border: 1px solid #ddd;padding: 8px;">'+this.userData.Client_Name__c + '</td> <td style=" border: 1px solid #ddd;padding: 8px;">Business</td> <td style=" border: 1px solid #ddd;padding: 8px;">'+this.userData.Business__c+'</td> </tr> <tr> <td style=" border: 1px solid #ddd;padding: 8px;">Opportunity Name:</td> <td style=" border: 1px solid #ddd;padding: 8px;">'+ this.userData.Opportunity_Name__c+'</td> <td style=" border: 1px solid #ddd;padding: 8px;">Service Area:</td> <td style=" border: 1px solid #ddd;padding: 8px;">'+this.userData.Service_Area__c+'</td> </tr><tr > <td style=" border: 1px solid #ddd;padding: 8px;"> Opportunity Partner:</td> <td style=" border: 1px solid #ddd;padding: 8px;">'+this.userData.Opportunity_Partner__c + '</td> <td style=" border: 1px solid #ddd;padding: 8px;">Service Line:</td> <td style=" border: 1px solid #ddd;padding: 8px;">'+this.userData.Service_Line__c+'</td> </tr><tr > <td style=" border: 1px solid #ddd;padding: 8px;"> Opportunity Manager:</td> <td style=" border: 1px solid #ddd;padding: 8px;">'+this.userData.Opportunity_Manager__c + '</td> <td style=" border: 1px solid #ddd;padding: 8px;">Sale Stage:</td> <td style=" border: 1px solid #ddd;padding: 8px;">'+this.userData.Sale_Stage__c+'</td> </tr><tr > <td style=" border: 1px solid #ddd;padding: 8px;"> Created On:</td> <td style=" text-align:left; border: 1px solid #ddd;padding: 8px;">'+this.userData.Created_On__c + '</td> <td style=" border: 1px solid #ddd;padding: 8px;"> Opportunity Id:</td> <td style=" border: 1px solid #ddd;padding: 8px;">'+this.userData.Opportunity_Id__c+'</td> </tr> </table> <br/><br/> <table> <tbody> <tr> <th colspan="4" style="padding-top: 12px; padding-bottom: 12px;text-align: left;background-color: #04AA6D;color: white;"> Project Anticipated Dates</th> </tr> <tr> <td style=" border: 1px solid #ddd;padding: 8px;"> Anticipated Start Date: </td> <td style="text-align:left; border: 1px solid #ddd;padding: 8px;">8/24/2023</td> <td style=" border: 1px solid #ddd;padding: 8px;"> Anticipated End Date: </td> <td style=" text-align:left;border: 1px solid #ddd;padding: 8px;">'+'2/29/2024'+'</td> </tr></table> ';
                    
                    var ctx = {
                        worksheet : 'Worksheet',
                        table : htmls
                    }
      
        
                    var link = document.createElement("a");
                    link.download = "export.xls";
                    link.href = uri + base64(format(template, ctx));
            
                    link.click();
        }
    downloadCSVFile(csvFile) { 
        
       const downLink=document.createElement("a");
       downLink.href="data:text/csv;charset=utf-8," + encodeURI (csvFile);
       downLink.target="_blank";   
       downLink.download="details.csv";
       downLink.click();                     
   }
}