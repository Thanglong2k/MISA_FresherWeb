/** ----------------------------------------------
 * Format dữ liệu ngày tháng sang ngày/tháng/năm
 * @param {any} date tham số có kiểu dữ liệu bất kì
 * Created by : TTLONG (2/7/2021)
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) return "";
    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    return day + "/" + month + "/" + year;
}
/**-------------------------------------
 * Định dạng hiển thị tiền tệ
 * @param {Number} money số tiền
 * Created by TTLONG (2/7/2021)
 */
function formatMoney(money) {

    if (money) {
        return money.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }
    

    var num = money.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return num;


}
