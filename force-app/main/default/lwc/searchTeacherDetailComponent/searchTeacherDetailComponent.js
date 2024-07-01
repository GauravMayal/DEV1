import { LightningElement, api } from 'lwc';

const teacherSubjectCols = [
    { label: "Subject Name", fieldName: 'Subjects__c' },
    { label: 'Subject Teacher Name', fieldName: 'Teacher_Name__c' }
]

export default class searchTeacherDetailComponent extends LightningElement {
    @api renderDetails;
    @api studentName;
    @api studentLevel;
    @api subjectTeachers;

    teacherSubjectCols = teacherSubjectCols;

    connectedCallback() {
        console.log('Event dispatching');
        this.dispatchEvent(new CustomEvent("getsinglestudent"));
    }
}