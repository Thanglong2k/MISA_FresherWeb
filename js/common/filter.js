$(document).ready(function () {
    new Filter();
});
class Filter {
    constructor() {
        
    }
    filter() {
        $
        var departmentId = $("#dropdown-department").getValue(),
            departmentName = $("#dropdown-department").getText(),
            position = $("#dropdown-position").getValue(),
            trs = $("table tbody tr");
        $.each(trs, function (index, tr) {
            if (departmentId != "") {
                if ($(this).children().attr("[fieldName=DepartmentName]") != departmentName) {
                    $(this).hide();
                }
            }

        })
    } 

}
   