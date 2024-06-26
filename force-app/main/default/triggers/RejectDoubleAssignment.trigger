trigger RejectDoubleAssignment on Student_Teacher__c(before insert) {
    List<Student_Teacher__c> related = Trigger.new;
    Set < Id > relatedStudentId = new Set < Id > ();
    Set < Id > relatedTeacherId = new Set < Id > ();
    for (Student_Teacher__c i: related) {

        relatedStudentId.add(i.Student__c);
        relatedTeacherId.add(i.Teacher__c);
    }
    Map < Id, List < String >> mm = new Map < Id, List < String >> ();
    List < Student_Teacher__c > studteach = [Select Name, Student__c, Teacher__r.Subjects__c From Student_Teacher__c where Student__c In :relatedStudentId];
    List < Id > stud0 = new List < Id > ();
    List < String > subject0 = new List < String > ();


    for (Student_Teacher__c temp0: studteach) {



        if (!mm.containsKey(temp0.Student__c)) {
            mm.put(temp0.Student__c, new List < String > ());
        }
        mm.get(temp0.Student__c).add(temp0.Teacher__r.Subjects__c);

    }
    Map<Id,String> m1=new Map<Id,String>();
    
    for (Teacher__c i:[Select Id,Subjects__c from Teacher__c where Id IN:relatedTeacherId]) {
        m1.put(i.Id,i.Subjects__c);
    }
	for (Student_Teacher__c i: related) {
       // Student__c stud = [Select Name from Student__c where Id =: i.Student__c]; //stud record from trigger.new
        String ns = null;
		
        
        if (i.Teacher__c != null) {
    
            ns =m1.get(i.Teacher__c); //ns=i.Teacher__r.Subject__c not working
        }

        if (mm.containsKey(i.Student__c) ){
            if(mm.get(i.Student__c).contains(ns)) {
          	  	 System.debug(' Teacher has already been assigned to the student ');
           		 i.addError('A teacher is already assigned to this student for the subject '+ns);
        }
        }

    }


}