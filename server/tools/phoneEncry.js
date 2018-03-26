/**
 * Created by LXP on 2017/4/13.
 * 手机号加解密
 */
"use strict";

/**
 * 码表
 * 第一位 对应首字母
 * 第二、三位 效验码
 * 第四、五位 效验码位置
 * 对位交换规则
 */
var encryCodeList = [
    ["abcdefg", "13", "17", "3", "7", "1:4", "2:7", "3:9", "5:6", "8:10", "11:11", "1"],
    ["hijklmmo", "3", "23", "4", "6", "1:5", "2:8", "3:9", "7:6", "4:11", "10:10", "2"],
    ["pqrstu", "11", "23", "2", "5", "1:10", "2:11", "3:9", "4:8", "5:6", "7:7", "3"],
    ["vwxyz", "17", "19", "3", "5", "1:11", "2:10", "3:8", "4:9", "5:6", "7:7", "4"]];

function chang26To10(str) {
    var c = 0;
    for (var i = 0; i < str.length; i++) {
        var r = str.charAt(i);
        var a = str.charCodeAt(i) - 64;
        if (i != str.length - 1)
            c = c + a * Math.pow(26, (str.length - i - 1));
        else
            c = c + a;
    }
    return c.toString();
}

function chang10To26(n) {
    if (n < 0) return "";
    var str = "";
    var numMod = 0,
        numTemp = n,
        ch = 'A';
    do {
        numMod = parseInt(numTemp % 26);
        numTemp = parseInt(numTemp / 26);
        if (numMod == 0) {
            ch = 'Z';
            numTemp--;
        }
        else
            ch = String.fromCharCode('A'.charCodeAt(0) + numMod - 1);
        str = ch + str;
    }
    while (numTemp > 0);
    return str;
}

//解密
exports.decodePhone = function (decodePhone) {
    try {
        var s = decodePhone.match(/./g);//转换为char[]类型
        var k = null;
        for (var i = 0; i < encryCodeList.length; i++) {
            if (encryCodeList[i][0].toUpperCase().indexOf(s[0]) > -1) {
                k = encryCodeList[i];
                break;
            }
        }
        //提取效验码
        var x1 = s[parseInt(k[3]) + 1];
        var x2 = s[parseInt(k[4]) + 2];
        //去除效验码
        s.splice(parseInt(k[3]) + 1, 1);
        s.splice(parseInt(k[4]) + 1, 1);
        s.splice(0, 1);
        decodePhone = s.join('');
        //转10进制
        decodePhone = chang26To10(decodePhone);
        decodePhone = decodePhone.substring(1);
        //反换位
        var p = decodePhone.match(/./g);
        var q = new Array(p.length);
        for (var i in k) {
            var c = k[i];
            if (c.indexOf(":") > 0) {
                var cc = c.split(':');
                q[parseInt(cc[1]) - 1] = p[parseInt(cc[0]) - 1];
                q[parseInt(cc[0]) - 1] = p[parseInt(cc[1]) - 1];
            }
        }
        decodePhone = q.join('');
        //计算效验码
        var _x1 = chang10To26(parseInt(decodePhone) % parseInt(k[1]));
        var _x2 = chang10To26(parseInt(decodePhone) % parseInt(k[2]));
        if (_x1 == x1 && _x2 == x2) {
            return decodePhone;
        }
    }
    catch (e) {
        console.error(e);
    }
    return "";
};

//加密
exports.encodePhone = function (encodePhone) {
    try {
        var times = new Date().getTime();
        var num = times%encryCodeList.length;
        var sk = encryCodeList[num];
        //校验码
        var _x1 = chang10To26(parseInt(encodePhone) % parseInt(sk[1]));
        var _x2 = chang10To26(parseInt(encodePhone) % parseInt(sk[2]));
        //换位
        var p = encodePhone.match(/./g);
        var q = new Array(p.length);
        for (var i in sk) {
            var c = sk[i];
            if (c.indexOf(":") > 0) {
                var cc = c.split(':');
                q[parseInt(cc[1]) - 1] = p[parseInt(cc[0]) - 1];
                q[parseInt(cc[0]) - 1] = p[parseInt(cc[1]) - 1];
            }
        }
        encodePhone = q.join('');
        //避免0开头,加一个随机数1-9的
        encodePhone = parseInt(1+Math.random()*9) +encodePhone;
        //转26进制
        encodePhone = chang10To26(encodePhone);
        //插入校验码
        encodePhone = encodePhone.substring(0,parseInt(sk[3]))+_x1+encodePhone.substring(parseInt(sk[3]),parseInt(sk[4]))+_x2+encodePhone.substring(parseInt(sk[4]),encodePhone.length);
        //加上第一位
        var s = sk[0].match(/./g);//转换为char[]类型
        encodePhone = String(s[times%s.length])+encodePhone;
    }
    catch (e) {
        console.error(e);
    }
    return encodePhone.toUpperCase();
};
