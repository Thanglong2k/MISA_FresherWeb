$(document).ready(function () {
    /**
    * Hàm check validate bắt buộc nhập
    * Create by: TTLONG 06/07/2021
    * */
    
        $("input[required]").blur(function () {
            //kiểm tra dữ liệu đã nhập , nếu để trống thì cảnh báo:

            let value = $(this).val();
            if (!value) {

                $(this).addClass("error-border");
                //$(this).attr("title", "Trường này không được phép để trống.");
                $(this).siblings(".tooltip-alert").text("Trường này không được phép để trống.");
                $(this).attr("validate", false);
            }
            else {
                $(this).removeClass("error-border");
                $(this).attr("validate", true);
            }

        })

    
    /**
     * Hàm check email hợp lệ
     * Create by: TTLONG 06/07/2021
     * */
    
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
    
})
    