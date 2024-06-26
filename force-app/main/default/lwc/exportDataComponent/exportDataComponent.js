import { LightningElement, track, wire } from 'lwc';
import getAccountDataToExport from '@salesforce/apex/ExportDataController.getAccountDataToExport';

export default class ExportDataComponent extends LightningElement {

    @track OpportunityData 

    columnHeader = ['Client Name',
    'Service Area',
     'Opportunity Name',
     'Opportunity Partner',
     'Opportunity Manager',
      'Created On',
      'Business' ,
      
      'Service',
      'Sale Stage',
      'Opportunity Id' ]//opportunity partner,manager

    @wire(getAccountDataToExport)
    wiredData({ error, data }) {
        if (data) {
            console.log('Data', data);
            this.OpportunityData = data;
        } else if (error) {
            console.error('Error:', error);
        }
    }

    exportContactData(){
        // Prepare a html table
        let doc = '<table>';
        // Add styles for the table
        doc += '<style>';
        doc += 'table, th, td {';
        doc += '    border: 1px solid black;';
        doc += '    border-collapse: collapse;';
        doc += '}';          
        doc += '</style>';
        // Add all the Table Headers
        doc += '<tr>';
        this.columnHeader.forEach(element => { 
                     
            doc += '<th>'+ element +'</th>'           
        });
        doc += '</tr>';
        //record=this.OpportunityData;
        
        // Add the data rows
        
            doc += '<tr>';
            doc += '<th>'+'1'+'</th>';
            doc += '<th>'+'1'+'</th>'; 
            doc += '<th>'+'1'+'</th>';
            doc += '<th>'+'1'+'</th>';
            doc += '<th>'+'1'+'</th>';
            doc += '</tr>';
            doc += '<tr>'
            doc += '<th>'+'1'+'</th>';

            doc += '<th>'+'1'+'</th>';
            doc += '<th>'+'1'+'</th>';    
            doc += '<th>'+'1'+'</th>';
            doc += '<th>'+'1'+'</th>';
            doc += '</tr>';
            
        
        doc += '</table>';
        var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        // use .csv as extension on below line if you want to export data as csv
        downloadElement.download = 'Contact Data.xls';
        document.body.appendChild(downloadElement);
        downloadElement.click();
    }
}