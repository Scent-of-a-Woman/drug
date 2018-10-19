// 所有数据api的域名地址
import axios from "axios"
export function familyDoctor() {
    return 'http://120.24.178.254:9090'
    // return 'http://chensheng.premier-tech.cn'
    // return 'http://192.168.3.22:8080'
    
}
// 时间格式化代码 
export function getLastDate(time) {
    if (time == "") {
        return ""
    }
    var data = new Date(time);
    var m = data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1;
    var d = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    return data.getFullYear() + '-' + m + "-" + d;
}
export function getLastDate1(time) {
    if (time == "") {
        return ""
    }
    var data = new Date(time);
    var m = data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1;
    var d = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    var hour = data.getHours();
    var minutes = data.getMinutes();
    var seconds = data.getSeconds();
    return data.getFullYear() + '-' + m + "-" + d + ' ' + hour + ':' + minutes + ':' + seconds;
}
export function getLastDate2(time) {
    if (time == "") {
        return ""
    }
    var data = new Date(time);
    var m = data.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : data.getMonth() + 1;
    var d = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    var hour = data.getHours();
    var minutes = data.getMinutes();
    return data.getFullYear() + '-' + m + "-" + d + ' ' + hour + ':' + minutes;
}






