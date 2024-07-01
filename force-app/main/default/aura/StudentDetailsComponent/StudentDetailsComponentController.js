({
	 doInit: function(component, event, helper) {
        var teacherId = component.get("v.recordId");
        var action = component.get("c.getStudentsByTeacherId");
        action.setParams({
            teacherId: teacherId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.students", response.getReturnValue());
            } else {
                console.error("Error fetching students: " + state);
            }
        });
        $A.enqueueAction(action);
    }
})