
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
        this.loadDropdown();
        this.loadData();
        //this.includeFunctionDefaultDropdown();
        //this.loadDefaultDropdownValue();
        this.initEvents();
        
        this.Gender = 0;
        this.PositionID = 0;
        this.DepartmentID = 0;
        this.WorkStatus = 0;

    }
    loadDropdown() {
        let me = this;
        //khi load data thì hiển thị loading
        $(".loading").show();
        
        //load dữ liệu cho các dropdown
        try {
            var dropdowns = $(".dropdown-list")

            $.each(dropdowns, function (index, dropdown) {
                let arrayItemDropdown = [
                    { value: "", text: "" }
                ];
                var fieldValue = $(dropdown).attr("fieldValue");
                var fieldName = $(dropdown).attr("fieldName");
                var api = $(dropdown).attr("api");
                
                if (api != undefined) {
                    //#region lấy dữ liệu vị trí
                    $.ajax({
                        url: me.host + api,
                        method: "GET",
                        async: false
                    }).done(function (res) {
                        if (res) {
                            $.each(res, function (index, obj) {
                                var rowDropdown = $(`<div class="item-list" value="${obj[fieldValue]}">
                                                <div class="icon-check"></div>
                                                <div class="item-dropdown-text">${obj[fieldName]}</div>
                                            </div>`);
                                $(dropdown).children(".dropdown-list-box").append(rowDropdown);
                                arrayItemDropdown.push({ value:$(rowDropdown).attr("value"), text:$(rowDropdown).children(".item-dropdown-text").text() });
                            })
                            
                            //console.log($(dropdown).children("input").val());
                            //$(dropdown).children("input").val(arrayItemDropdown[0].text);
                        }
                    }).fail(function (res) {
                        console.log(res);
                    })
                    //#endregion
                    //tắt loading khi load dữ liệu xong
                    
                }
                var itemDropdown = $(dropdown).children(".dropdown-list-box").children(":first");

                $(itemDropdown).attr("selected", "");
                $(itemDropdown).addClass("selected");
                $(dropdown).children("input").val($(itemDropdown).find(".item-dropdown-text").text());
                $(".loading").hide();
            })
        }
        catch(e) {
            console.log(e);
        }
        
        
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
        me.clickDblRowTable()
        //click vào bản ghi
        me.clickRowTable();
        //select item dropdown
        me.clickItemDropdown();
        //click dropdown
        me.handleDropdown();
        
        //click outside object
        me.clickOutsideDropdown();
        //click button
        me.clickButton();
        //click logo icon header
        me.clickToggleNavbar();
        //event keyup
        me.eventKeyUp();
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

            
            $(".loading").show();
            //lấy thông tin các cột dữ liệu

            var columns = $("table tr th");
            var fieldNames = [];
            //lấy dữ liệu về
            $.ajax({
                url: me.host + me.apiRouter,

                method: "GET"
            }).done(function (res) {//chạy ko có lỗi, res là data khi sử dụng postman nó trả về res
                $.each(res, function (index, obj) {
                    var tr = $(`<tr fieldName="EmployeeId"></tr>`);
                    var fieldNameRow = $(tr).attr("fieldName");
                    $(tr).data('recordId', obj[fieldNameRow]);
                    //lấy thông tin dữ liệu sẽ map tương ứng với các cột:
                    $.each(columns, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr("fieldName");
                        var formatType = $(th).attr("formatType");
                        var value = obj[fieldName];
                        if (fieldName == "CheckBox") {
                            value = $(`<input type="checkbox"/>`);
                        }
                        
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
                        
                        $(td).find("span").append(value);
                        $(tr).append(td);
                    })
                    $("table tbody").append(tr);
                })
                $(".loading").hide();

            }).fail(function (res) {//chạy có lỗi
                $(".loading").hide();
            })
            
             //binding dữ liệu lên table

        } catch (e) {

        }

    }
    /**
    * Hàm xử lý hide/show dropdown
    * Create by: TTLONG 06/07/2021
    * @param {any} id id của các dropdown
    * */
     /*handleDropdown(id) {
        let me = this;
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
    }*/
    handleDropdown() {
        let me = this;
        // hide/show khi click select vị trí:
        $(".dropdown-button-select").click(function (e) {

            if ($(this).attr("hide") == "true") {
                $(this).attr("hide", "false");
                $(this).siblings(" .dropdown-list-box").show();
                $(this).css("background-image", "url('../../content/icon/chevron-up.svg')");
            }
            else {
                $(this).attr("hide", "true");
                $(this).siblings(" .dropdown-list-box").hide();
                $(this).css("background-image", "url('../../content/icon/chevron-down.svg')");
            }

            /*$(this).addClass("background-button-select-down");*/
            /*$(this).toggleClass("background-button-select-up background-button-select-down");
            $(this).siblings(" .dropdown-list-box").toggle();*/
            e.stopPropagation();
        })
    }
    /**
     * Hàm xử lý click vào item trong dropdown
     * Create by: TTLONG 06/07/2021
     * @param {any} id id của các dropdown
     */
    handleClickItemDropdown(id) {
        var me = this;
        //lấy giá trị của item được clickc trong dropdown:
        //bắt sự kiện vào div chứa các item cần lấy dữ liệu vì khi này nó sẽ được render và item chưa được sinh ra nên không thể bắt sự kiện vào các item
        
            $(id+" .dropdown-list-box").on("click", ".item-list", function () {
                //lấy giá trị của item vừa chọn
                //var text = $(this).attr("value");
                $(this).attr("selected", "");
                $(this).addClass("selected");
                $(this).siblings().removeClass("selected");
                $(this).closest(".dropdown-list").addClass("success-border");
                
                var text = $(this).find(".item-dropdown-text").text();
                
                //hiển thị giá trị lên input
                $(id + " input").val(text);

                
                //ẩn danh sách chọn đi
                $(id + " .dropdown-list-box").hide();
            })
  
        
    }
    
    /**
    * Hàm xử lý click outside dropdown select
    * Create by: TTLONG 06/07/2021
    * @param {any} id id của các dropdown
    * */
    handleClickOutSide(id) {
        //xử lý khi click outside của đối tượng:
        $(document).click(function () {
            $(id+" .dropdown-list-box").hide();
            $(id+" .dropdown-button-select").attr("hide", "true");
            $(id+" .dropdown-button-select").css("background-image", "url('../../content/icon/chevron-down.svg')");
        });
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
            try {
                me.FormMode = "Add";
                //Hiển thị dialog thông tin chi tiết:
                $(".dialog-detail").show();
                //me.loadDropdown();
            } catch (e) {
                console.log(e);
            }
            
        })
        //#region
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
        //xóa các dữ liệu được chọn khi nhấn button xóa:
        me.deleteRow ();
        //ẩn form chi tiết khi nhấn hủy:
        $("#btnCancel").click(function () {
            //Ẩn dialog thông tin chi tiết:
            $(".dialog-detail").hide();
        })
        //#endregion
        //thực hiện lưu dữ liệu khi nhấn button "Lưu" trên form:
        me.save();
    }
    /**
     * Hàm lấy giá trị mặc định của dropdown khi load trang
     * Create by: TTLONG 07/07/2021
     * @param {any} id id của các thẻ div chứa dropbox
     */
    /**
     * Lấy giá trị mặc định cho input dropdown
     * Create by: TTLONG 08/07/2021
     * */
    /*loadDefaultDropdownValue() {
        //lấy giá trị text của item department có attribute là row của dropdown vào inout
        *//*var textItem = $(id +" .dropdown-list-box .item-list:first-child .item-dropdown-text").text();        
        $(id+" input").val(textItem);*//*
        var itemDropdowns = $(".dropdown-list");
        $.each(itemDropdowns, function (index, itemDropdown) {
            let itemList = $(this).children(".dropdown-list-box").children();
            $.each(itemList, function (index, item) {
                console.log($(item).html());
            })
            *//*var textItem = $(this).find(".dropdown-list-box .item-list:first-child .item-dropdown-text").text();
            $(this).find("input").val(textItem);*//*
        })
        

    }*/
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
    /**
    * Hàm lưu lại thông tin thêm mới hoặc chỉnh sửa dữ liệu
    * Create by: TTLONG 07/07/2021
    * */
    save() {
        let me = this;
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
                /*if ($(this).parent().attr('fieldValue')) {
                    var propertyValue = $(this).parent().attr('fieldValue');
                    employee[propertyValue] = value;
                }*/

                /*var value = $(this).val();
                if (propertyName == "Gender") {
                    //employee["GenderName"] = value;//gán GenderName=textGender
                    value = me.Gender;//gán value = value Gender để lưu vào trường Gender trong DB
                }
                else if (propertyName == "DepartmentId") {
                    //employee["GenderName"] = value;//gán GenderName=textGender
                    value = me.DepartmentID;//gán value = value Gender để lưu vào trường Gender trong DB
                }
                else if (propertyName == "PositionId") {
                    //employee["GenderName"] = value;//gán GenderName=textGender
                    value = me.PositionID;//gán value = value Gender để lưu vào trường Gender trong DB
                }
                else if (propertyName == "WorkStatus") {
                    //employee["GenderName"] = value;//gán GenderName=textGender
                    value = me.WorkStatus;//gán value = value Gender để lưu vào trường Gender trong DB
                }*/
                var value = $(this).val();
                employee[propertyName] = value; 
                if ($(this).attr("class") == "dropdown-input-text") {
                    propertyName = $(this).parent().attr('fieldName');
                    let propertyValue = $(this).parent().attr('fieldValue');
                    let textInput = $(this).val();
                    let items = $(this).siblings(".dropdown-list-box").children(".item-list");
                    $.each(items, function (index, item) {
                        if ($(item).children(".item-dropdown-text").text() == textInput) {
                            
                            employee[propertyName] = textInput;
                            employee[propertyValue] = $(this).attr("value");
                        }
                    })

                }
                
            })


            var method = "POST";
            var idRow = "";
            var textAlert = "Thêm thành công!";
            if (me.FormMode == "Edit") {
                method = "PUT";
                employee.EmployeeId = me.recordId;
                idRow += `/${me.recordId}`;
                textAlert = "Sửa thành công!"
            }

            //gọi service tương ứng thực hiện lưu trữ dữ liệu:
            $.ajax({
                url: me.host + me.apiRouter + idRow,
                method: method,
                data: JSON.stringify(employee),
                /* crossDomain: true,
                    dataType:'jsonp',//giải quyết được tình trạng tên miền chéo*/
                contentType: 'application/json'
            }).done(function (res) {
                //sau khi lưu thành công -> đưa ra thông báo cho người dùng, ẩn form chi tiết, load lại dữ liệu:
                alert(textAlert);
                me.loadData();
                $(".dialog-detail").hide();

            }).fail(function (res) {
                alert("Đã xảy ra lỗi. Vui lòng liên hệ Misa");
            })



        })
    }
    /**
    * Hàm xóa dữ liệu
    * Create by: TTLONG 07/07/2021
    * */
    deleteRow() {
        let me = this;
        $("#btnDelete").click(function () {
            //Hiển thị dialog thông tin chi tiết:
            var trs = $('table tbody tr[selected]');
            $.each(trs, function (index, tr) {
                var method = "DELETE";
                var textAlert = "Xóa thành công!";
                var idRow=`/${$(tr).data("recordId")}`;


                //gọi service tương ứng thực hiện lưu trữ dữ liệu:
                $.ajax({
                    url: me.host + me.apiRouter + idRow,
                    method: method,
                    /* crossDomain: true,
                        dataType:'jsonp',//giải quyết được tình trạng tên miền chéo*/
                    contentType: 'application/json'
                }).done(function (res) {
                    //sau khi lưu thành công -> đưa ra thông báo cho người dùng, ẩn form chi tiết, load lại dữ liệu:
                    alert(textAlert);


                    me.loadData();

                }).fail(function (res) {

                })
            })




        })
    }
    /**
    * double click vào 1 hàng trong table 
    * Create by: TTLONG 09/07/2021
    * */
    clickDblRowTable() {
        let me = this;
        $("table tbody").on("dblclick", "tr", function () {

            me.FormMode = "Edit";
            //Lấy khóa chính của bản ghi:
            var recordId = $(this).data("recordId");
            me.recordId = recordId;
            //Gọi service lấy thông tin chi tiết qua id:
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET"

            }).done(function (res) {
                //Build dữ liệu lên form chi tiết:
                //thu thập thông tin dữ liệu được nhập - >build thành object:
                var employee = {};
                var inputs = $('input[fieldName]');
                $.each(inputs, function (index, input) {
                    var propertyName = $(this).attr('fieldName');
                    var text = res[propertyName];
                    if ($(this).attr("class") == "dropdown-input-text") {
                        propertyName = $(this).parent().attr('fieldName');
                        let propertyValue = $(this).parent().attr('fieldValue');
                        let items = $(this).siblings(".dropdown-list-box").children(".item-list");
                        $.each(items, function (index, item) {
                            if ($(item).attr("value") == res[propertyValue]) {
                                text = $(item).children(".item-dropdown-text").text();
                            }
                        })
                      
                    }
                    $(this).val(text);
                })
            }).fail(function (res) {
                alert("Đã xảy ra lỗi. Hãy liên hệ Misa để đưuọc hỗ trợ");
            })

            //Hiển thị dialog thông tin chi tiết:
            $(".dialog-detail").show();
            //Load Form:
            //me.loadDropdown();
            //xóa tất cả background color của những tr khác:

            /*let trSiblings = $(this).siblings();//lấy tất cả tr đồng cấp
            $(trSiblings).css("background-color", "transparent")*/
            $("tr:nth-child(even)").css("background-color", "#F5F5F5");
            $("tr:nth-child(odd)").css("background-color", "transparent");
            //highlight row vừa chọn -> thay đổi background của tr đang click:
            $(this).css("background", "#8ec252");



        })
    }
    /**
    * click vào các hàng trong table
    * Create by: TTLONG 09/07/2021
    * */
    clickRowTable() {
        let me = this;
        $("table tbody").on("click", "tr", function (event) {


            //Lấy khóa chính của bản ghi:
            var recordId = $(this).data("recordId");
            me.recordId = recordId;

            if ($(this).attr("selected")) {
                $(this).removeAttr("selected");
                $(this).children("td").find("input").removeAttr("checked");

                $(this).css("background", "transparent");
                
            } else {
                $(this).attr("selected", "");
                $(this).children("td").find("input").attr("checked","");

                $(this).css("background", "#8ec252");
            }
            
            /*if (event.target.type !== 'checkbox') {
                $(':checkbox', this).trigger('click');
            }*/
                
           

        })
    }
    /**
    * click toggle icon trên logo để thực hiện thức năng thu gọn navbar và mở rộng navbar
    * Create by: TTLONG 10/07/2021
    * */
    clickToggleNavbar() {
        $("#toggle-icon").click(function () {
            
            $(".navbar .navbar-content .nav-item-text").toggle();
            if ($(".navbar .navbar-content").attr("hide")==="true") {               
                $(".navbar").width(220);
                $(".navbar .navbar-content").attr("hide","false");
            }
            else { 
                $(".navbar").width(52);
                $(".navbar .navbar-content").attr("hide","true");
            }
            let widthNavbar = $(".navbar").width();
            //"width:calc(100% - " + `${widthNavbar}` + ")", 
            $(".content").css({ "width": `calc(100% - ${widthNavbar+1}px)`, "left": `calc(${widthNavbar+1}px)` });
            
        })
    }
    
    /**
     * Hàm gõ phím trong input để lọc thông tin
     * Create by: TTLONG 11/07/2021
     * */
    eventKeyUp() {
        let me = this;
        $("input.dropdown-input-text").keyup(function (e) {
            if (e.keyCode != 9) {
                
                var checkSuccess = false,
                    inputText = $(this).val(),
                    itemDropdowns = $(this).siblings(".dropdown-list-box");

                
                $(itemDropdowns).children(".item-list").removeAttr("selected");
                $(itemDropdowns).children(".item-list").removeClass("selected");
                 
                //có sự kiện nhấn phím thì mở dropdown
                itemDropdowns = $(itemDropdowns).find(".item-dropdown-text");
                if (inputText != "") {
                    if ($(this).siblings(".dropdown-button-select").attr("hide") == "true") {
                        $(this).siblings(".dropdown-button-select").attr("hide", "false");
                        $(this).siblings(".dropdown-list-box").slideDown();
                        $(this).siblings(".dropdown-button-select").css("background-image", "url('../../content/icon/chevron-up.svg')");
                    }
                    /*$(this).siblings(".dropdown-button-select").toggleClass("background-button-select-up background-button-select-down");*/
                }

                /*else {
                    $(this).siblings(".dropdown-button-select").attr("hide", "true");
                    $(this).siblings(".dropdown-list-box").hide();
                    $(this).siblings(".dropdown-button-select").css("background-image", "url('../../content/icon/chevron-down.svg')");
                }*/
                e.stopPropagation();
                //nếu input rỗng thì đóng dropdown
                if (inputText == "") {
                    $(this).siblings(".dropdown-button-select").attr("hide", "true");
                    $(this).siblings(".dropdown-list-box").slideUp();
                    $(this).siblings(".dropdown-button-select").css("background-image", "url('../../content/icon/chevron-down.svg')");
                    /*$(this).siblings(".dropdown-button-select").toggleClass("background-button-select-up background-button-select-down");*/
                }
                //else
                    //hiện các item có chưa key và ẩn những cái khác
                    $.each(itemDropdowns, function (index, itemDropdown) {
                        /*$(`itemDropdown:contains("${inputText}")`)*/

                        if ($(itemDropdown).text().toUpperCase().includes(inputText.toUpperCase())) {
                            $(this).parent().show();
                          
                        }
                        else {
                            $(this).parent().hide();
                        }
                        /*if (inputText == $(itemDropdown).text()) {
                            $(this).parent().siblings().removeAttr("selected");
                            $(this).parent().attr("selected", "");
                            $(this).parent().siblings().removeClass("selected");
                            $(this).parent().addClass("selected", "");
        
                            $(this).closest(".dropdown-list").addClass("success-border");
                            checkSuccess = true;
                        }*/
                    })
                

                /*if (checkSuccess == false) {
                    $(this).parent().removeClass("success-border");
                    $(this).parent().addClass("error-border");
                    $(this).parent().attr("title", "Dữ liệu không tồn tại trong hệ thống");
              
                }*/
                /*//nếu dropdown có item vả phím nhấn là phím down thì đặt tabindex vào phần tử đầu
                if ($(this).siblings(".dropdown-list-box").children(":visible").length > 0 && e.keyCode!=38 && e.keyCode != 40 && e.keyCode != 13) {
                    $(this).siblings(".dropdown-list-box").children().removeAttr("tabindex");
                    $(this).siblings(".dropdown-list-box").children(":visible:first").attr("tabindex", -1);
                    //$(this).siblings(".dropdown-list-box").children(":first").focus();
                    $.each($(this).siblings(".dropdown-list-box").children(), function () {
                        if ($(this).attr("tabindex") == -1) {
                            $(this).focus();
                        }
                    })

                }*/

                var value = $(this).siblings(".dropdown-list-box").children(":visible"),
                    first = value[0],
                    last = value[value.length - 1],
                    key = e.keyCode,
                    currentIndex = $(value).siblings("[tabindex]");
                //nếu dropdown có item vả phím nhấn là phím down thì đặt tabindex vào phần tử đầu
                if ($(value).length > 0 && e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13) {
                    $(this).siblings(".dropdown-list-box").children().removeAttr("tabindex");
                    $(first).attr("tabindex", -1);
                    /*//$(this).siblings(".dropdown-list-box").children(":first").focus();
                    $.each($(this).siblings(".dropdown-list-box").children(), function () {
                        if ($(this).attr("tabindex") == -1) {
                            $(this).focus();
                        }
                    })*/

                }
                
                    
                    //last = value.

                switch (key) {
                    case 40:
                       
                        if ($(currentIndex).is(last)) {
                            $(first).attr("tabindex", -1);
                            $(first).siblings().removeAttr("tabindex");

                        } else {
                            $(currentIndex).next().attr("tabindex",-1);
                            currentIndex = $(currentIndex).next();
                            $(currentIndex).siblings().removeAttr("tabindex");
                        }

                        //$(value).next().siblings().removeAttr("tabindex");
                        //$(value).next().attr("tabindex", -1);
                        /*if (value == $(this).siblings(".dropdown-list-box").children(":visible:last")) {
                            value = $(this).siblings(".dropdown-list-box").children(":visible:first");
                        }
                        if ($(value).next().css("display") == "none") {
                            value = $(value).next();
                        }

                        $(value).next().siblings().removeAttr("tabindex");
                        $(value).next().attr("tabindex", -1);*/
                        break;
                    //phím lên
                    case 38:
                        if ($(currentIndex).is(first)) {
                            $(last).attr("tabindex", -1);
                            $(last).siblings().removeAttr("tabindex");

                        } else {
                            $(currentIndex).prev().attr("tabindex", -1);
                            currentIndex = $(currentIndex).prev();
                            $(currentIndex).siblings().removeAttr("tabindex");
                        }
                        break;
                    //phím enter
                    case 13:
                        //value = $(this).siblings(".dropdown-list-box").children("[tabindex]");
                        $(currentIndex).siblings().removeAttr("selected");
                        $(currentIndex).attr("selected", "selected");
                        $(currentIndex).siblings().removeClass("selected");
                        $(currentIndex).addClass("selected");
                        //set text cho input
                        $(this).val($(this).parent().getText());
                        //đóng dropdown
                        $(this).siblings(".dropdown-button-select").attr("hide", "true");
                        $(this).siblings(".dropdown-list-box").hide();
                        $(this).siblings(".dropdown-button-select").css("background-image", "url('../../content/icon/chevron-down.svg')");
                        break;
                }
                
                
                
                /*if (e.keyCode == 13) {
                    value = $(this).siblings(".dropdown-list-box").children("[tabindex]");
                    $(value).siblings().removeAttr("selected");
                    $(value).attr("selected", "selected");
                    $(value).siblings().removeClass("selected");
                    $(value).addClass("selected");
                    //set text cho input
                    $(this).val($(this).parent().getText());
                    //đóng dropdown
                    $(this).siblings(".dropdown-button-select").attr("hide", "true");
                    $(this).siblings(".dropdown-list-box").hide();
                    $(this).siblings(".dropdown-button-select").css("background-image", "url('../../content/icon/chevron-down.svg')");
                }*/
            }
            

        })
        $("input.dropdown-input-text").on("keydown", function (e) {
            if ($(this).siblings(".dropdown-button-select").attr("hide") == "true") {
                $(this).siblings(".dropdown-button-select").attr("hide", "false");
                $(this).siblings(".dropdown-list-box").slideDown();
                $(this).siblings(".dropdown-button-select").css("background-image", "url('../../content/icon/chevron-up.svg')");
            }
        });

    }
    /**
     * Ẩn hiện dropdown
     * Create by: TTLONG 11/07/2021
     * */
    toggleDropdown() {
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
    }
    

}

$.fn.getValue = function () {
    
      return  this.children(".dropdown-list-box").find(".item-list[selected]").attr("value");
    
}
$.fn.getText = function () {
    return this.children(".dropdown-list-box").find(".item-list[selected] .item-dropdown-text").text();
}
$.fn.getData = function () {
    var itemDropdowns = $(this).children(".dropdown-list-box").find(".item-list");
    var data = {
        value:"",
        text:""
    }
    $.each(itemDropdowns, function (index, item) {
        data.push($(this).getValue(), $(this).getText());
    })
    return data;
}
$.fn.setValue = function (value) {

    return this.children(".dropdown-list-box").find(".item-list[selected]").attr("value",value);

}
$.fn.setText = function (text) {
    return this.children(".dropdown-list-box").find(".item-list[selected] .item-dropdown-text").text(text);
}
