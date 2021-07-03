

$(document).ready(function () {
    new CustomerJS();
});

/** *******************************************
 * Class quản lý sự kiện cho trang Employee
 * Created by : TTLONG (2/7/2021)
 * */
class CustomerJS extends BaseJS{
    constructor() {
        super();
        /*this.loadData();*/
    }

    loadData() {
        alert("cus");
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
                            <td style="max-width:250px" title="`+ item.Address + `">` + item.Address + `</td>
                           
                        </tr >`);
                $("tbody").append(tr);
            })
        }).fail(function (res) {//chạy có lỗi

        })
    //binding dữ liệu lên table

    }*/
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
}