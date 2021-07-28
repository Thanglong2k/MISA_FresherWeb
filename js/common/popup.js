
function popup({
    title = '',
    message = "",
    type = 'info',
    txtButtonLeft="",
    txtButtonRight = "",
    typeButtonLeft="",
    typeButtonRight = "",
    iconColor=""
}) {
    const main = document.getElementById("popup");
    if (main) {
        const popup = document.createElement("div");
        const icons = {
           
            icon: 'fas fa-exclamation-triangle',
           
        }
        popup.onclick = function (e) {
            if (e.target.closest('#btnClosePopup') || e.target.closest('.btn-popup-left')) {
                main.removeChild(popup);

            }
            else if (e.target.closest('.btn-green')) {
                main.removeChild(popup);
                $(".dialog-detail").hide();
                
            }
            
        }
        var hide = "visible";
        if (typeButtonLeft == "") {
            hide = "none";
        }
        const icon = icons["icon"];
        popup.classList.add("m-dialog");
        popup.innerHTML = `
            <div class="dialog-modal dialog-popup"></div>
            <div class="popup-content">
                <div class="dialog-header">
                    <div class="dialog-header-title">${title}</div>
                    <div class="dialog-header-close">
                        <button id="btnClosePopup"></button>
                    </div>
                </div>
                <div class="dialog-body">
                    <div class="dialog-body-icon icon-${iconColor}">
                        <i class="${icon}"></i>
                    </div>
                    <div class="dialog-body-message">${message}</div>
                </div>
                <div class="dialog-footer">
                    <button class="btn-default btn-${typeButtonLeft}" style="display:${hide}" id="btnLeft">${txtButtonLeft}</button>
                    <button class="btn-default btn-${typeButtonRight}" id="btnRight">
                        ${txtButtonRight}
                    </button>
                </div>
            </div>

            `;
        main.appendChild(popup);
        console.log(main);
    }

    
}

$("#btnClosePopup").click(function () {
    $(this).closest("m-dialog").hide();
})
$(".btn-green").click(function () {
    $(this).closest("m-dialog").hide();
})
/*
function showSuccess() {
    toast({
        title: 'Success',
        message: "Thêm thành công!",
        type: 'success',
        duration: 3000
    });
}
function showError() {
    toast({
        title: 'Error',
        message: "Dữ liệu không hợp lệ!",
        type: 'error',
        duration: 3000
    });
}*/