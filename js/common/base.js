
<<<<<<< HEAD
/**
     * Tạo đối tượng quản lý chung để thực hiện các chức năng chung cho các đối tượng employee, customer kế thừa
     * Created by : TTLONG (2/7/2021)
     * */
class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
=======

class BaseJS {
    constructor() {
>>>>>>> 5536ef4de6f8cd5baa8bbe638ab9998d2d22fca5
        this.loadData();
    }

    loadData() {
<<<<<<< HEAD
        try {
            //lấy thông tin các cột dữ liệu

            var columns = $("table tr th");
            var fieldNames = [];
            var getDataUrl = this.getDataUrl;
            //lấy dữ liệu về
            $.ajax({
                url: getDataUrl,

                method: "GET"
            }).done(function (res) {//chạy ko có lỗi, res là data khi sử dụng postman nó trả về res
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    //lấy thông tin dữ liệu sẽ map tương ứng với các cột:
                    $.each(columns, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr("fieldName");
                        var formatType = $(th).attr("formatType");
                        switch (formatType) {
                            case "ddmmyy":
                                value = formatDate(value);
                                td.addClass("text-align-center");
                                break;
                            case "Money":
                                value = formatMoney(value);
                                td.addClass("text-align-right");
                                break;
                            default:
                        }
                        var value = obj[fieldName];
                        td.append(value);
                        $(tr).append(td);
                    })
                    $("table tbody").append(tr);
                })


            }).fail(function (res) {//chạy có lỗi

            })
             //binding dữ liệu lên table

        } catch (e) {

        }
=======
        //lấy thông tin các cột dữ liệu

        var ths = $("table tr th");
        var fieldNames = [];
        
        //lấy dữ liệu về
        $.ajax({
            url: "http://api.manhnv.net/api/employees",

            method: "GET"
        }).done(function (res) {//chạy ko có lỗi, res là data khi sử dụng postman nó trả về res
            $.each(res, function (index,obj) {
                var tr = $(`<tr></tr>`);
                //lấy thông tin dữ liệu sẽ map tương ứng với các cột:
                $.each(ths, function (index, th) {
                    var td = `<td><div><span></span></div></td>`;
                    var fieldName = $(th).attr("fieldName");
                    var value = obj.fieldName;
                    td.append(value);
                    $(tr).append(td);
                })
                $("table tbody").append(tr);
            })


        }).fail(function (res) {//chạy có lỗi

        })
    //binding dữ liệu lên table
>>>>>>> 5536ef4de6f8cd5baa8bbe638ab9998d2d22fca5
    }
}