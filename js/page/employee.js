$(document).ready(function () {
    new EmployeeJS();
});
/** *******************************************
 * Class quản lý sự kiện cho trang Employee
 * Created by : TTLONG (2/7/2021)
 * */
class EmployeeJS extends BaseJS{
    constructor() {
        super();
        /*this.loadData();*/

        /*this.open();
        this.close();*/
    }
    setDataUrl() {
        this.getDataUrl = "http://cukcuk.manhnv.net/v1/Employees";
    }
    

    
    /**
     * Load dữ liệu
     * Created by : TTLONG (1/7/2021)
     * */
    /*loadData() {
    //lấy dữ liệu về
    $.ajax({
        url: "http://api.manhnv.net/api/employees",
        method: "GET"
    }).done(function (res) {//chạy ko có lỗi, res là data khi sử dụng postman nó trả về res
        var data = res;


        $.each(data, function (index, item) {
            var dateOfBirth = item.DateOfBirth;
            var salary = item.Salary;
            dateOfBirth = formatDate();
            salary = formatMoney(15000000);
            var tr = $(`<tr>
                            <td>`+ item.EmployeeCode + `</td>
                            <td>`+ item.FullName + `</td>
                            <td>`+ item.GenderName + `</td>
                            <td class="text-align-center">`+ dateOfBirth + `</td>
                            <td>`+ item.PhoneNumber + `</td>
                            <td>`+ item.Email + `</td>
                            <td>`+ item.PositionName + `</td>
                            <td>`+ item.DepartmentName + `</td>
                            <td class="text-align-right">`+ salary + `</td>
                            <td style="max-width:250px" title="`+ item.Address + `">` + item.Address + `</td>
                            <td>`+ item.WorkStateName + `</td>
                            

                        </tr >`);
            $("tbody").append(tr);
        })
    }).fail(function (res) {//chạy có lỗi

    })
    //binding dữ liệu lên table

} */

    /**
    * Thêm dữ liệu
    * Created by : TTLONG (2/7/2021)
    * */
    add() {

        


    }
    /**
    * Sửa dữ liệu
    * Created by : TTLONG (2/7/2021)
    * */
    edit() {

    }
    /**
    * Xóa dữ liệu
    * Created by : TTLONG (2/7/2021)
    * */
    delete() {

    }

    /**
    * Mở dialog chi tiết nhân viên
    * Created by : TTLONG (4/7/2021)
    * */
    open() {
        $(".m-btn.m-btn-default").click(function () {
            $(".dialog-detail").show();
        });
    }
    /**
    * Đóng dialog chi tiết nhân viên
    * Created by : TTLONG (4/7/2021)
    * */
    close() {
        $(".dialog-header-close").click(function () {
            $(".dialog-detail").hide();
        });
    }

}

