
    function toast({
        title = '',
        message="",
        type = 'info',
        duration = 3000
    }) {
        const main = document.getElementById("toast");
        if (main) {
            const toast = document.createElement("div");
            //tự động xóa sau khi hết thời gian
            const autoRemoveId = setTimeout(function () {//trả về id
                main.removeChild(toast);
            }, duration + 1000);
            //xóa sau khi click close
            toast.onclick = function (e) {
                if (e.target.closest('.toast-close')) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            }
            const icons = {
                success: 'fas fa-check-circle',
                info: 'fas fa-info-circle',
                warning: 'fas fa-exclamation-triangle',
                error: 'fas fa-exclamation-circle',

            }
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);
            toast.classList.add("toast", `toast-${type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;/*delay 3s mới mờ đi,forwards là để dừng lại điểm cuối*/
            toast.innerHTML = `
            
                    <div class="toast-icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast-body">
                        
                        <p class="toast-msg">${message}</p>
                    </div>
                    <div class="toast-close">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
            `;
            main.appendChild(toast);
        /*<h3 class="toast-title">${title}</h3>*/
        }
    }
    /*toast({
        title: 'Success',
        message: "Thành công!",
        type: 'success',
        duration: 3000
    });*/
    function showSuccess(messageAlert) {
        toast({
            title: 'Success',
            message: messageAlert,
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
    }

