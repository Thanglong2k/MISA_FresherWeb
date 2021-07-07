

/**
     * Tạo đối tượng quản lý chung để thực hiện các chức năng chung cho các đối tượng employee, customer kế thừa
     * Created by : TTLONG (2/7/2021)
     * */
class BaseJS {
    constructor() {
        this.host = "http://cukcuk.manhnv.net";
        this.apiRouter = null;
        this.getDataUrl = null;
        this.setApiRouter();
        this.loadData();
        this.initEvents();
        this.Gender = 0;
        this.PositionID = 0;
        this.DepartmentID = 0;
        this.WorkStatus = 0;
    }

    setApiRouter() {
    
    }
    setDataUrl() {

    }
    /**
     * Hàm xử lý các sự kiện trên giao diện
     * TTLONG 04/07/2021
     * */
    initEvents() {
        var me = this;
        
        //hiển thị form thông tin khi doubleclick vào từng dòng trong table:
        $("table tbody").on("dblclick","tr",function () {
            //Hiển thị dialog thông tin chi tiết:
            $(".dialog-detail").show();
            //xóa tất cả background color của những tr khác:
 
            /*let trSiblings = $(this).siblings();//lấy tất cả tr đồng cấp
            $(trSiblings).css("background-color", "transparent")*/
            $("tr:nth-child(even)").css("background-color", "#F5F5F5");
            $("tr:nth-child(odd)").css("background-color", "transparent");
            //highlight row vừa chọn -> thay đổi background của tr đang click:
            $(this).css("background", "#8ec252");
            
        })
        
        //select item dropdown
        me.clickItemDropdown();
        //click dropdown
        me.clickDropdown();
        
        //click outside object
        me.clickOutsideDropdown();
        //click button
        me.clickButton();
        //validate
        me.handleValidate();
        //load giá trị mặc định cho các dropdown
        me.includeFunctionDefaultDropdown();
    }
    
    /**
    * Hàm load dữ liệu dùng chung cho các trang
    * Create by: TTLONG 02/07/2021
    * */
    loadData() {
        var me = this;
        try {
            //làm rỗng bảng để load lại dữ liệu
            $("table tbody").empty();

            this.loadDefaultDropdownValue();

            //lấy thông tin các cột dữ liệu

            var columns = $("table tr th");
            var fieldNames = [];
            //lấy dữ liệu về
            $.ajax({
                url: me.host + me.apiRouter,

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
        var me = this;
        //lấy giá trị của item được clickc trong dropdown:
        $(id + " .item-list").click(function () {
            let t = this;
            //lấy giá trị của item vừa chọn
            //var text = $(this).attr("value");
            var text = $(this).attr("value");
            if (id == "#dropdown-gender") {
                me.Gender = $(this).attr("value");
            }
            else if (id == "#dropdown-form-department") {
                me.DepartmentID = $(this).attr("value");
            }
            else if (id == "#dropdown-form-position") {
                me.PositionID = $(this).attr("value");
            }
            else if (id == "#dropdown-form-workstatus") {
                me.WorkStatus = $(this).attr("value");
            }
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
                $(this).attr("validate", false);
            }
            else {
                $(this).removeClass("border-red");
                $(this).attr("validate", true);
            }
            
        })
        
    }
    /**
     * Hàm check email hợp lệ
     * Create by: TTLONG 06/07/2021
     * */
    handleEmailValidate() {  
        $("input[type='email']").blur(function () {
            var email = $(this).val();
            if ($(this).val()) {
                let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!regex.test(email)) {
                    $(this).addClass("border-red");
                    $(this).attr("title", "Bạn đã nhập sai định dạng email");
                    $(this).attr("validate", false);
                } else {
                    $(this).removeClass("border-red");
                    $(this).attr("validate", true);
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
        
    }
    /**
     * Hàm tập hợp các sự kiện click item dropdown của các dropdown khác nhau
     * Create by: TTLONG 07/07/2021
     * */
    clickItemDropdown() {
        this.handleClickItemDropdown("#dropdown-department");
        this.handleClickItemDropdown("#dropdown-position");
        this.handleClickItemDropdown("#dropdown-restaurent");
    }
    /**
     * Hàm tập hợp các sự kiện click dropdown của các dropdown khác nhau
     * Create by: TTLONG 07/07/2021
     * */
    clickDropdown() {
        //hide/show dropdown department
        this.handleDropdown("#dropdown-department");
        //hide/show dropdown position
        this.handleDropdown("#dropdown-position");
        //hide/show dropdown restaurent
        this.handleDropdown("#dropdown-restaurent");
    }
    /**
     * Hàm tập hợp các sự kiện click outside dropdown của các dropdown khác nhau
     * Create by: TTLONG 07/07/2021
     * */
    clickOutsideDropdown() {
        this.handleClickOutSide("#dropdown-department");
        this.handleClickOutSide("#dropdown-position");
        this.handleClickOutSide("#dropdown-restaurent");
    }
    /**
     * Hàm tập hợp các sự kiện click button
     * Create by: TTLONG 07/07/2021
     * */
    clickButton() {
        let me = this;
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
        //ẩn form chi tiết khi nhấn hủy:
        $("#btnCancel").click(function () {
            //Ẩn dialog thông tin chi tiết:
            $(".dialog-detail").hide();
        })
        //thực hiện lưu dữ liệu khi nhấn button "Lưu" trên form:
        $("#btnSave").click(function () {
            //validate dữ liệu:
            var inputValidates = $('input[required],input[type="email"]');
            $.each(inputValidates, function (index, input) {
                var value = $(input).val();
                $(input).trigger('blur');
            })
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại");
                inputNotValids[0].focus();//focus vào ô nhập lỗi đầu tiên
                return;
            }
            //thu thập thông tin dữ liệu được nhập - >build thành object:
            var employee = {};
            var inputs = $('input[fieldName]');
            $.each(inputs, function (index, input) {
                var propertyName = $(this).attr('fieldName');
                var value = $(this).val();
                if (propertyName == "Gender") {
                    //employee["GenderName"] = value;//gán GenderName=textGender
                    value = me.Gender;//gán value = value Gender để lưu vào trường Gender trong DB
                }
                else if (propertyName == "DepartmentID") {
                    //employee["GenderName"] = value;//gán GenderName=textGender
                    value = me.DepartmentID;//gán value = value Gender để lưu vào trường Gender trong DB
                }
                else if (propertyName == "PositionID") {
                    //employee["GenderName"] = value;//gán GenderName=textGender
                    value = me.PositionID;//gán value = value Gender để lưu vào trường Gender trong DB
                }
                else if (propertyName == "WorkStatus") {
                    //employee["GenderName"] = value;//gán GenderName=textGender
                    value = me.WorkStatus;//gán value = value Gender để lưu vào trường Gender trong DB
                }
                employee[propertyName] = value;
            })
     
            /*var employee = {
                EmployeeCode: $("#txtEmployeeCode").val(),
                FullName: $("#txtFullName").val(),
                DateOfBirth: $("#dtDateOfBirth").val(),
                GenderName: $("#drpGender").val(),
                IdentityNumber: $("#txtIdentityNumber").val(),
                IdentityDate: $("#dtIdentityDate").val(),
                IdentityPlace: $("#txtIdentityPlace").val(),
                Email: $("#txtEmail").val(),
                PhoneNumber: $("#txtPhoneNumber").val(),
                PositionName: $("#drpPosition").val(),
                DepartmentName: $("#drpDepartment").val(),
                PersonalTaxCode: $("#txtPersonalTaxCode").val(),
                Salary: $("#txtSalary").val(),
                JoinDate: $("#dtJoinDate").val(),
                WorkStatus: $("#txtWorkStatus").val(),
            }*/

            //gọi service tương ứng thực hiện lưu trữ dữ liệu:
            $.ajax({
                url: me.host + me.apiRouter,
                method: 'POST',
                data: JSON.stringify(employee),
                /* crossDomain: true,
                 dataType:'jsonp',//giải quyết được tình trạng tên miền chéo*/
                contentType: 'application/json'
            }).done(function (res) {
                //sau khi lưu thành công -> đưa ra thông báo cho người dùng, ẩn form chi tiết, load lại dữ liệu:
                alert("Thêm thành công!");
                me.loadData();
                $(".dialog-detail").hide();
                debugger;
            }).fail(function (res) {
                debugger;
            })

        })
    }
    /**
     * Hàm lấy giá trị mặc định của dropdown khi load trang
     * Create by: TTLONG 07/07/2021
     * */
    loadDefaultDropdownValue(id) {
        //lấy giá trị text của item department có attribute là row của dropdown vào inout
        var textItem = $(id+" .dropdown-list-box .item-list[row] .item-dropdown-text").text();        
        $(id+" input").val(textItem);

        /*//lấy giá trị text của item position có attribute là row của dropdown vào inout
        *//*var textItem = $("#dropdown-position .dropdown-list-box .item-list").closest("#dropdown-position").find("[row]").text();*//*
        var textItem = $("#dropdown-position .dropdown-list-box .item-list[row] .item-dropdown-text").text(); 
        $("#dropdown-position input").val(textItem);
        //lấy giá trị text của item position có attribute là row của dropdown vào inout
        var textItem = $("#dropdown-restaurent .dropdown-list-box .item-list[row] .item-dropdown-text").text(); 
        $("#dropdown-restaurent input").val(textItem);*/

    }
    /**
    * Hàm tập hợp các hàm lấy giá trị mặc định của dropdown khi load trang
    * Create by: TTLONG 07/07/2021
    * */
    includeFunctionDefaultDropdown() {
        this.loadDefaultDropdownValue("#dropdown-department");
        this.loadDefaultDropdownValue("#dropdown-position");
        this.loadDefaultDropdownValue("#dropdown-restaurent");
        this.loadDefaultDropdownValue("#dropdown-gender");
        this.loadDefaultDropdownValue("#dropdown-form-department");
        this.loadDefaultDropdownValue("#dropdown-form-position");
        this.loadDefaultDropdownValue("#dropdown-form-workstatus");
    }
}