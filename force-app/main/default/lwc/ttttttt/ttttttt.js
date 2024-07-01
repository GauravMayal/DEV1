import { track,LightningElement } from 'lwc';
export default class Ttttttt extends LightningElement {
@track marginFillColor = "#000000";
@track dereeValue = 'rotate(180)';
@track dereeiValue = 'rotate(0)';
marginIconHandler(event){
        console.log('marginIconHandler',event);
        this.marginFillColor == 'Green' ? this.marginFillColor = 'Black' : this.marginFillColor = 'Green';
        this.dereeValue == 'rotate(0)' ? this.dereeValue = 'rotate(180)' : this.dereeValue = 'rotate(0)'; 
        this.dereeiValue == 'rotate(0)' ? this.dereeiValue = 'rotate(180)' : this.dereeiValue = 'rotate(0)';
       
        
    }
}