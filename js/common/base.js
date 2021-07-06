

/**
     * Tạo đối tượng quản lý chung để thực hiện các chức năng chung cho các đối tượng employee, customer kế thừa
     * Created by : TTLONG (2/7/2021)
     * */
class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvents();
    }
    /**
     * Hàm xử lý các sự kiện trên giao diện
     * TTLONG 04/07/2021
     * */
    initEvents() {
        var me = this;
        //sự kiện click khi nhấn thêm mới:
        $("#btnAdd").click(function () {
            //Hiển thị dialog thông tin chi tiết:
            $(".dialog-detail").show();
        })
        //sự kiện click khi nhấn button "X" trên form:
        $("#btnClose").click(function () {
            //Ẩn dialog thông tin chi tiết:
            $(".dialog-detail").hide();
        })
        //load lại dữ liệu khi nhấn button nạp:
        $("#btnRefresh").click(function () {
            //Hiển thị dialog thông tin chi tiết:
            me.loadData();
        })
        //hiển thị form thông tin khi doubleclick vào từng dòng trong table:
        $("table tbody").on("dblclick","tr",function () {
            //Hiển thị dialog thông tin chi tiết:
            $(".dialog-detail").show();
            //xóa tất cả background color của những tr khác:
 
            /*let trSiblings = $(this).siblings();//lấy tất cả tr đồng cấp
            $(trSiblings).css("background-color", "transparent")*/
            $("tr:nth-child(even)").css("background-color", "#F5F5F5");
            //highlight row vừa chọn -> thay đổi background của tr đang click:
            $(this).css("background", "#8ec252");
            
        })
        //filter select phòng ban:
        $("#dropdown-department .dropdown-button-select").click(function () {
            $("#dropdown-department .dropdown-list-box").toggle();
        })
       
        //lấy giá trị của item được clickc trong dropdown-department:
        $("#dropdown-department .item-list").click(function () {
            //lấy giá trị của item vừa chọn
            var text = $(this).text();
            //hiển thị giá trị lên input
            $("#dropdown-department input").val(text);
            //ẩn danh sách chọn đi
            $("#dropdown-department .dropdown-list-box").hide();
        })
        //select item dropdown
        me.handleClickItemDropdown("#dropdown-department");
        me.handleClickItemDropdown("#dropdown-position");
       
        //hide/show dropdown department
        me.handleDropdown("#dropdown-department");
        //hide/show dropdown position
        me.handleDropdown("#dropdown-position");

        //click outside object
        me.handleClickOutSide("#dropdown-department");
        me.handleClickOutSide("#dropdown-position");
        //ẩn form chi tiết khi nhấn hủy:
        $("#btnCancel").click(function () {
            //Ẩn dialog thông tin chi tiết:
            $(".dialog-detail").hide();
        })
        //thực hiện lưu dữ liệu khi nhấn button "Lưu" trên form:
        $("#btnSave").click(function () {
            //validate dữ liệu:

            //thu thập thông tin dữ liệu đưuọc nhập - >build thành object:

            //gọi service tương ứng thực hiện lưu trữ dữ liệu:

            //sau khi lưu thành công -> đưa ra thông báo cho người dùng, ẩn form chi tiết, load lại dữ liệu:

            $(".dialog-detail").hide();
        })
        me.handleValidate();
    }
    
    /**
    * Hàm load dữ liệu dùng chung cho các trang
    * Create by: TTLONG 02/07/2021
    * */
    loadData() {

        try {
            //làm rỗng bảng để load lại dữ liệu
            $("table tbody").empty();

            //lấy giá trị text của item department có attribute là row của dropdown vào inout
            var textItem = $("#dropdown-department .dropdown-list-box .item-list").closest("#dropdown-department").find("[row]").text();
            $("#dropdown-department input").val(textItem);

            //lấy giá trị text của item position có attribute là row của dropdown vào inout
            var textItem = $("#dropdown-position .dropdown-list-box .item-list").closest("#dropdown-position").find("[row]").text();
            $("#dropdown-position input").val(textItem);

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
                        var value = obj[fieldName];
                        switch (formatType) {
                            case "ddmmyyyy":
                                value = formatDate(value);
                                td.addClass("text-align-center");
                                break;
                            case "Money":
                                value = formatMoney(value);
                                td.addClass("text-align-right");
                                break;
                            default:
                        }
                        
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

    }
    /**
    * Hàm xử lý hide/show dropdown
    * Create by: TTLONG 06/07/2021
    * */
    handleDropdown(id) {
        // hide/show khi click select vị trí:
        $(id + " .dropdown-button-select").click(function (e) {
            if ($(this).attr("hide") == "true") {
                $(this).attr("hide", "false");
                $(id + " .dropdown-list-box").show();
                $(this).css("background-image", "url('../../content/icon/chevron-up.svg')");
            }
            else {
                $(this).attr("hide", "true");
                $(id + " .dropdown-list-box").hide();
                $(this).css("background-image", "url('../../content/icon/chevron-down.svg')");
            }
            e.stopPropagation();

        })
    }
    /**
    * Hàm xử lý click vào item trong dropdown
    * Create by: TTLONG 06/07/2021
    * */
    handleClickItemDropdown(id) {
        //lấy giá trị của item được clickc trong dropdown-position:
        $(id+" .item-list").click(function () {
            //lấy giá trị của item vừa chọn
            var text = $(this).text();
            //hiển thị giá trị lên input
            $(id+" input").val(text);
            //ẩn danh sách chọn đi
            $(id+" .dropdown-list-box").hide();
        })
    }
    /**
    * Hàm xử lý click outside dropdown select
    * Create by: TTLONG 06/07/2021
    * */
    handleClickOutSide(id) {
        //xử lý khi click outside của đối tượng:
        $(document).click(function () {
            $(id+" .dropdown-list-box").hide();
            $(id+" .dropdown-button-select").attr("hide", "true");
            $(id+" .dropdown-button-select").css("background-image", "url('../../content/icon/chevron-down.svg')");
        });
        /*$(document).click(function (evt) {
            var target = evt.target.className;
            var inside = $(id+" .dropdown-list-box");
            *//*alert($(target).html());*//*
            if ($.trim(target) != '') {
                if ($("." + target) != inside) {
                    $(id +" .dropdown-button-select").attr("hide", "true");
                    $(id +" .dropdown-list-box").hide();
                    $(id +" .dropdown-button-select").css("background-image", "url('../../content/icon/chevron-down.svg')");
                }
            }
        });*/
     
    }
    /**
    * Hàm check validate bắt buộc nhập
    * Create by: TTLONG 06/07/2021
    * */
    handleInputValidate(id) {
        $("input[required]").blur(function () {
            //kiểm tra dữ liệu đã nhập , nếu để trống thì cảnh báo:
            
            let value = $(this).val();
            if (!value) {
                $(this).addClass("border-red");
                $(this).attr("title", "Trường này không được phép để trống.");
            }
            else {
                $(this).removeClass("border-red");
            }
            
        })
        
    }
    handleEmailValidate() {  
        $("input[type='email']").blur(function () {
            var email = $(this).val();
            if ($(this).val()) {
                let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!regex.test(email)) {
                    $(this).addClass("border-red");
                    $(this).attr("title", "Bạn đã nhập sai định dạng email");
                } else {
                    $(this).removeClass("border-red");
                }
            }
            
        })
        
        
    }
    /**
     * Hàm tập hợp các Validate
     * Create by: TTLONG 06/07/2021
     * */
    handleValidate() {
        this.handleInputValidate("#txtEmployeeCode");
        
        this.handleEmailValidate();
        /*this.handleInputValidate("#txtFullName");
        this.handleInputValidate("#txtIdentityCard");
        this.handleInputValidate("#txtCardIssuer");
        this.handleInputValidate("#txtEmail");*/
    }
}