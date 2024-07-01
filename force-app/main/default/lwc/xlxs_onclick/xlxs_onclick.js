import { LightningElement, track, wire } from 'lwc';
import { loadScript } from "lightning/platformResourceLoader";
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import workbook from "@salesforce/resourceUrl/writeexcelfile";

export default class TypeExporter extends LightningElement {

    isLibraryLoaded = false;
    columnHeader = ['ID', 'Name', 'Email', 'Shipping City','Shipping State'];
    records=[];
    @wire(getAccounts)
    wiredData({ error, data }) {
        if (data) {
            this.records=data;
        } else if (error) {
            console.error('Error:', error);
        }
    }
    renderedCallback() {
        if (this.isLibraryLoaded) return;
        this.isLibraryLoaded = true;
        loadScript(this, workbook )
            .then(async (data) => {
                console.log("success------>>>", data);
            })
            .catch(error => {
                console.log("failure-------->>>>", error);
            });
    }
    // calling the download function from xlsxMain.js
    async exportToXLSX() {
        let _self = this;
        var columns = [
            {
              column: 'Id',
              type: String,
              value: d => d.Id
            },
            {
              column: 'Account Name',
              type: String,
              value: d => d.Name
            },
          /*  {
              column: 'Email',
              type: String,
              color:'#880808',
              value: d => d.Email__c
            },
            {
              column: 'Shipping City',
              type: String,
              value: d => d.ShippingCity
            },
            {
              column: 'Shipping State',
              type: String,
              value: d => d.ShippingState
            }*/
        ]; 
        await writeXlsxFile(_self.records, {
            schema: columns,
            fileName: 'file.xlsx',
            headerStyle: {
                backgroundColor: '#1E2F97',
                fontWeight: 'bold',
                align: 'center',
                color:'#FFFFFF'
            }
        })
    }
}