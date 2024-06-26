import { LightningElement, track, wire } from 'lwc';
import DataOpp from '@salesforce/apex/ExcelTemp.getAccountDataToExport';
    import SheetJS from '@salesforce/resourceUrl/SheetJS'; // The static resource for SheetJS
    import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
    
   
    export default class excelDemo extends LightningElement {

      record=[];
      @wire(DataOpp) wiredFunction({ data,error }) {
        if (data) {
            console.log('Data', data);
            this.record = data;
        } else if (error) {
            console.log(error);
        }
    }
    
    
    async connectedCallback() {
            await loadScript(this, SheetJS); // load the library
            // At this point, the library is accessible with the `XLSX` variable
            this.version = XLSX.version;
            console.log('version: '+this.version);      
        }
      exportToExcel() {
        // Sample table data for demonstration purposes
       
        
        const filename = 'ExportToExcel.xlsx';
        const workbook = XLSX.utils.book_new();
        const headers = [];
        const worksheetData = [];
        const columnHeader = ["Client_Name__c",
    "Opportunity_Name__c",
    "Opportunity_Partner__c",
    "Opportunity_Manager__c",
     "Created_On__c",
     "Business__c" ,
     "Service_Area__c",
     "Service_Line__c",
     "Sale_Stage__c",
     "Opportunity_Id__c" ];
    
          /*  worksheetData.push({
                "Name": this.record.Client_Name__c,
                "Age": this.record[1],
                "Email":this.record[2],
                "Name2": this.record[3],
                "Age2": this.record[4],
                "Email2":this.record[5],
                "Name3": this.record[6],
                "Age3": this.record[7],
                "Email3":this.record[8],
                "Name4": this.record[9]
          
               
            });
            */i=0;
             for (const field of columnHeader) {
        worksheetData.push({
            field:this.record[field],
            
            
        });
        console.log(field);
      }
    //  XLSX.writeFile(wb, "SheetJSTable.xlsx");
        const worksheet = XLSX.utils.json_to_sheet(worksheetData, { header: headers });
        XLSX.utils.book_append_sheet(workbook, worksheet, 'ExportToExcel');
    
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    
        // Create a download link and click it programmatically to initiate the download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        // Release the object URL to free up memory
        URL.revokeObjectURL(a.href);
        }
       MultiTable() {
        var htmls='';
          const headers = ["Table 1", "Table2"];
        
          /* Callback invoked when the button is clicked */
          
            htmls ='<table id="table1">  <tr><td>A2</td><td>B2</td></tr> <tr><td>A3</td><td>B3</td></tr></table><b>{headers[1]}</b><br/><table id="table2"><tr><td>A6</td><td>B6</td><td>C6</td></tr><tr><td>A7</td><td>B7</td><td>C7</td></tr></table>';
            /* first table */
            const ws = XLSX.utils.aoa_to_sheet([[headers[0]]]);
            XLSX.utils.sheet_add_dom(ws, htmls.getElementById('table1'), {origin: -1});
            //create_gap_rows(ws, 1); // one row gap after first table
        
            /* second table */
            XLSX.utils.sheet_add_aoa(ws, [[headers[1]]], {origin: -1});
            XLSX.utils.sheet_add_dom(ws,htmls.getElementById('table2'), {origin: -1});
            //create_gap_rows(ws, 2); // two rows gap after second table
        
            /* third table */
          //  XLSX.utils.sheet_add_aoa(ws, [[headers[2]]], {origin: -1});
           // XLSX.utils.sheet_add_dom(ws, document.getElementById('table3'), {origin: -1});
        
            /* create workbook and export */
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Export");
            XLSX.writeFile(wb, "SheetJSMultiTablexport.xlsx");
          
      }
    }