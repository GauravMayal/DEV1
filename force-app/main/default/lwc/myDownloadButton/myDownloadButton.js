import { LightningElement, track, wire, api } from 'lwc';
import generateFile from '@salesforce/apex/DownloadController.generateFile';
import getOpportunityData from '@salesforce/apex/DownloadController.getOpportunityData';


export default class MyDownloadButton extends LightningElement {

    @track contactData = {};
    @api recordId;
    columnHeader = ['Client Name', 'Business', 'Opportunity Name', 'Service Area'];

    @wire(getOpportunityData)
    wiredData({ error, data }) {
        if (data) {
            this.contactData = [data];
        } else if (error) {
            console.error('Error:', error);
        }
    }

    generateCSV() {
        this.exportContactData('csv', this.recordId);
    }

    generatePDF() {
        this.downloadFile('pdf', this.recordId);
    }

    downloadFile(fileType) {
        console.log("Calling the generateFil function for " + fileType);
    generateFile({ fileType: fileType, oppId: this.recordId })
    .then(result => {
        let blob;
        if (fileType === 'pdf') {
            // Convert the base64 string back to a Blob
            let binary = atob(result);
            let array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            blob = new Blob([new Uint8Array(array)], {type: 'application/pdf'});
        } else if (fileType === 'csv') {
            blob = new Blob([result], { type: 'application/octet-stream' });
        }
        
        let downloadElement = document.createElement('a');
        let url = URL.createObjectURL(blob);
        downloadElement.href = url;
        downloadElement.download = fileType === 'pdf' ? 'OpportunityData.pdf' : 'OpportunityData.csv';
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
    })
    .catch(error => {
        console.error('Error generating ' + fileType + ' file:', error);
    });
    }

    exportContactData() {
        console.log("Calling the generateFile function for CSV");
        generateFile({ fileType: 'csv', oppId: this.recordId })
        .then(result => {
            // Create a blob and make it downloadable
            let blob = new Blob([result], { type: 'application/octet-stream' });
            console.log("Blob created, triggering download");
            let downloadElement = document.createElement('a');
            let url = URL.createObjectURL(blob);
            downloadElement.href = url;
            downloadElement.download = 'OpportunityData.csv'; 
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
        })
        .catch(error => {
            console.error('Error generating CSV file:', error);
        });
    }
    
}