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
    }
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/employees";
    }
    
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

