import { LightningElement, wire} from 'lwc';
import StudData from '@salesforce/apex/AccountController.getAccounts';
//import SheetJS from '@salesforce/resourceUrl/SheetJS';
//import { loadScript, loadStyle } from 'lightning/platformResourceLoader';


export default class helloworld extends LightningElement {
   
    userData=[];

    @wire(StudData) wiredFunction({ data,error }) {
        if (data) {
            console.log('Data', data);
            this.userData = data;
        } else if (error) {
            console.log(error);
        }
    }
    clickHandler(){
           
            let csvFile=this.convertToCsv(this.userData);
            this.downloadCSVFile(csvFile);
            

    }
    /*chelloworld

    async connectedCallback() {
        await loadScript(this, SheetJS); // load the library
        // At this point, the library is accessible with the `XLSX` variable
        this.version = XLSX.version;
        console.log('version: '+this.version);      
    }
    //c/helloworld*/


    convertToCsv(userData){
       
        let csvHeader=Object.keys(userData[0]).toString();
        let csvBody= userData.map((currItem)=>Object.values(currItem).toString());
        let csvfile=csvHeader+"\n"+csvBody.join("\n");
        return csvfile;
        
    }
   
    downloadCSVFile(csvFile) {   
        /*c/helloworld
        const tableData = this.userData;
      
          const filename = 'ExportToExcel.xlsx';
          const workbook = XLSX.utils.book_new();
          const headers = [];
          const worksheetData = [];

          for (const record of tableData) {
            worksheetData.push({
                "Name": record[0],
                "Id": record[1]
                
               
            });


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
        //c/helloworld*/

       const downLink=document.createElement("a");
        downLink.href="data:text/csv;charset=utf-8," + encodeURI (csvFile);
        downLink.target="_blank";   
        downLink.download="table.csv";
        downLink.click();                     
    }
}
//}