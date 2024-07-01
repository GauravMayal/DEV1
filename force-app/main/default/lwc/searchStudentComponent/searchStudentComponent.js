import { LightningElement,track,api } from 'lwc';
import getStudents from '@salesforce/apex/SearchStudentController.getStudents';
import listStudentDetails from '@salesforce/apex/SearchStudentController.getStudentDetails';
import listSubjectTeacher from '@salesforce/apex/SearchStudentController.getTeacherOfStudent';

const columns = [
    { label: 'Student Name', fieldName: 'Student_Name__c' },
    { label: "Father's Name", fieldName: 'Father_Name__c' },
    { label: "Mother's Name", fieldName: 'Mother_Name__c' }
];





export default class searchStudentComponent extends LightningElement {
    columns = columns;
    
    
    selectedStudentCheck = false;
    isOneStudent = false;
    isMoreStudent = false;
    isNoStudent = false;
    renderDetails = false;

    students;
    studentsLength;
    error;
    selectedStudent;
   

    @track studentName;
    @track studentLevel;
    @track subjectTeachers;
    @track evtName;



    queryterm;  
    
    


    handleKeyUp(event) {
        const isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            console.log('Enter pressed');
            this.queryterm = event.target.value;
            this.isOneStudent = false;
            this.isMoreStudent = false;
            this.isNoStudent = false;
            this.renderDetails = false;
            this.selectedStudentCheck = false;
           getStudents({ queryString: this.queryterm })
                .then(result => {
                    console.log('result from search');
                    console.log(result);
                    this.students = result;
                    this.studentsLength = Object.keys(this.students).length;
                    if (this.studentsLength === 1) {
                        this.isOneStudent = true;
                        this.selectedStudent = result[0].Id;
                    } else if (this.studentsLength === 0) {
                        this.isNoStudent = true;
                    } else {
                        this.isMoreStudent = true;
                    }
                })
                .catch(error => {
                    this.error = error;
                });
        }
    }
    handleSelection(event) {
        if (event.detail.selectedRows.length > 0) {
            this.selectedStudent = event.detail.selectedRows[0].Id;
            this.selectedStudentCheck = true;
        }
    }

    getDetailsOfStudent() {
        console.log("getDetailsOfStudents is clicked");
        if (this.isOneStudent) {
            
            this.selectedStudentCheck = true;
        }
        if (this.selectedStudentCheck === true) {
            listStudentDetails({ studentId: this.selectedStudent })
                .then(result => {
                    this.studentName = result.Student_Name__c;
                    this.studentLevel = result.Level__c;
                })

            listSubjectTeacher({ studentId: this.selectedStudent })
                .then(result => {
                    this.subjectTeachers = result;
                    console.log(this.subjectTeachers);
                })
            this.renderDetails = true;
            
        } else {
            
            alert('Please select a student to view details');
        }
  
    }
    
}