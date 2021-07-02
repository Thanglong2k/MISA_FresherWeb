

class BaseJS {
    constructor() {
        this.loadData();
    }

    loadData() {
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
    }
}