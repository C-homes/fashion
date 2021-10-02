// 冒泡排序:从小到大得出任意多个参数
function compare() {
    var temp;
    for (var i = 0; i < arguments.length - 1; i++) {
        for (var j = 0; j < arguments.length - 1 - i; j++) {
            if (arguments[j] > arguments[j + 1]) {
                temp = arguments[j];
                arguments[j] = arguments[j + 1];
                arguments[j + 1] = temp;
            }
        }
    }
    for (var z = 0; z < arguments.length; z++) {
        console.log(arguments[z]);
    }
}
//得出任意多个参数中的最大值
function max() {
    var max = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (max < arguments[i]) {
            max = arguments[i];
        }
        console.log(arguments[i]);
    }
    console.log('最大的数是' + max);
}
// 得出任意多个参数中的最小值
function min() {
    var min = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (min > arguments[i]) {
            min = arguments[i];
        }
        console.log(arguments[i]);
    }
    console.log('最小的数是' + min);
}
// 判断一个数是否为质数
function zishu(num) {
    if (num <= 3) {
        return true;
    }
    for (var i = 2; i < num; i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}
// 任意参数的之和
function sum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}



// 封装一个随机数的函数
// 封装函数的时候 需要知道函数有哪些参数，看这个函数中哪些值是可变（不固定）
// 返回值：把随机生成的随机数返回
function randomNumber(min, max) {
    var num;
    if (min > max) {
        num = parseInt(Math.random() * (min - max + 1) + max);
    } else {
        num = parseInt(Math.random() * (max - min + 1) + min);
    }
    return num;
}

// 封装一个随机颜色
// #十六进制  rgb(0-255,0-255,0-255)
// 返回值就是一个颜色

function randomColor() {
    // rga(0-255,0-255,0-255)
    // #十六进制
    // 0123456789abcdef
    var str = "0123456789abcdef";

    // 随机取str中取出 6个字符出 组成一个颜色
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += str[randomNumber(0, str.length - 1)];
    }

    return color;
}
// 时间格式化函数
/*
    参数d 为date函数
    参数f 为规定的连接字符
*/
function formattime(d, f) {
    // 函数中形参的默认值，这形参是可传递
    // 如果不传递 这个变量的值为undefined
    // 设置这个形参的有一个默认值

    // 短路运算符
    // 如果f有值 那么就会把 f赋值给面的f，|| 两边有其中一边为真的时候
    // || 符号的左边如果为真，那么久不会执行右边的代码
    // 如果 f 没有值的时候 undefined，会执行 || 右边的代码 ，就会把'-' 赋值给 f变量
    var f = f || "-";
    var years = d.getFullYear();
    var month = d.getMonth() + 1;
    // 3===>03
    month = month >= 10 ? month : "0" + month;
    var date = d.getDate();
    date = date >= 10 ? date : "0" + date;
    var hours = d.getHours();
    hours = hours >= 10 ? hours : "0" + hours;
    var min = d.getMinutes();
    min = min >= 10 ? min : "0" + min;
    var sec = d.getSeconds();
    sec = sec >= 10 ? sec : "0" + sec;
    return `${years}${f}${month}${f}${date} ${hours}:${min}:${sec}`;
}


// 时间差（计算两个时间的时间差）
function difference(d1, d2,callback) {
    var time1 = d1.getTime();
    var time2 = d2.getTime();

    var time = Math.abs(time1 - time2);
    var d = parseInt(time / 1000 / 60 / 60 / 24);
    var h = parseInt((time / 1000 / 60 / 60) % 24);
    var m = parseInt((time / 1000 / 60) % 60);
    var s = parseInt((time / 1000) % 60);
    // console.log(`两个时间相差${d}天${h}小时${m}分钟${s}秒`);

    var obj = {
        day: d,
        hours: h,
        min: m,
        sec: s,
    };

    callback(obj);
    // return obj;
}
// 使用示范
// difference(date1, date2, function (date) {
//     console.log(
//         `距离购物倒计时还剩${date.day}天${date.hours}小时${date.min}分钟${date.sec}秒`
//     );
// });


// 获取样式的方法
function getStyle(ele, attr) {
    // 兼容的获取方法
    var style;
    if (window.getComputedStyle) {
        style = window.getComputedStyle(ele)[attr];
    } else {
        style = ele.currentStyle[attr];
    }

    return style;
}

// 封装一个 事件监听的函数
// 参数：事件源  事件类型  回调函数（事件处理函数）
function addEvent(ele, type, callback) {
    if (ele.addEventListener) {
        ele.addEventListener(type, callback);
    } else {
        ele.attachEvent("on" + type, callback);
    }
}

// 动画函数
function move(ele, obj, callback) {
    let index = 0;
    for (let attr in obj) {
        index++;
        clearInterval(ele[attr]);
        ele[attr] = setInterval(function () {
            let left;
            // 如果是透明度的时候 不需要取整的
            // 并且把 透明度的取值乘以100
            if (attr == "opacity") {
                left = getStyle(ele, attr) * 100;
            } else {
                left = parseInt(getStyle(ele, attr));
            }
            let x = (obj[attr] - left) / 10;
            // 0.9==》1   -0.9==>-1     -0.9 向上取整为0
            let speed = x > 0 ? Math.ceil(x) : Math.floor(x);

            left += speed;
            // console.log(left);

            // 如果是改变 opacity属性的值的时候 不需要加单位
            if (attr == "opacity") {
                // 因为声明的透明度的取值 乘以100 ，在设置的时候 需要除以100
                ele.style[attr] = left / 100;
            } else {
                ele.style[attr] = left + "px";
            }
            if (left == obj[attr]) {
                clearInterval(ele[attr]);
                index--;
                if (index == 0) {
                    callback && callback();
                }
            }
        }, 30);
    }
}
// 封装ajax请求
/* 
    参数：
        【1】请求的地址 
        【2】请求方式（get||post）
        【3】回调函数（用于获取异步代码执行结果），成功，失败
        【4】请求的携带的参数
        【5】设置同步或者异步
    当函数的参数 过多的时候 应该把参数 写成一个对象传递
    {
        url:'请求的地址',  //请求地址是必须
        type:'get',   选填，不填的时候 默认值为get请求 
        data:{username:'aaa',password:'123123'} || "username=aaa&password=123123",  选填，有参数就传递 没有可以不填，需要有默认值为 ''
        async:false, 选填 ，值为布尔值，不填写的时候为 true
        success:fucntion(){},  必填 请求成功之后执行的函数 获取到请求的结果
        error:function(){}  选填 请求失败之后执行的函数
    }
*/
function ajax(obj) {
    // 判断必填的属性 是否有传递
    if (!obj.url) {
        // d当url没有填写的时候 抛出错误
        throw Error("url属性不能为空");
    }

    // 判断success 是否有传递
    if (!obj.success) {
        throw Error("success属性不能为空");
    }

    // 当有一些参数没有传递的时候 需要添加默认值
    let option = {
        url: obj.url,
        type: obj.type || "get",
        data: obj.data || "",
        async: obj.async || true,
        success: obj.success,
        error: obj.error || function (err) {
            console.log(err);
        },
    };

    // 判断一下 请求方式是否正确 post || get
    if (!(option.type == "get" || option.type == "post")) {
        throw Error("type属性的取值 暂时只支持 get 和 post");
    }

    // 判断data参数 是否是 对象 或者字符串
    let datatype = Object.prototype.toString.call(option.data);
    if (!(datatype == "[object Object]" || datatype == "[object String]")) {
        throw Error("data参数的格式 暂时只支持对象或者字符串");
    }

    // 判断 async 是否是布尔值
    if (!(Object.prototype.toString.call(option.async) == "[object Boolean]")) {
        throw Error("async的取值只能为布尔值（true|| false）");
    }

    // 判断success 是否是函数
    if (
        !(Object.prototype.toString.call(option.success) == "[object Function]")
    ) {
        throw Error("success 必须是一个函数");
    }

    // 判断error参数是否为函数
    if (
        !(Object.prototype.toString.call(option.error) == "[object Function]")
    ) {
        throw Error("error 必须是一个函数");
    }

    // 如果参数为对象的时候 需要把对象转化为
    // {name:'老谢',age:48}==>name=老谢&age=18
    // "key=value&key=value"

    if (Object.prototype.toString.call(option.data) == "[object Object]") {
        let str = "";
        for (let key in option.data) {
            str += key + "=" + option.data[key] + "&";
        }
        option.data = str.substr(0, str.length - 1);
    }

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // ajax状态
        if (xhr.readyState == 4 && /^[23]\d{2}$/.test(xhr.status)) {
            // console.log(xhr.responseText);
            option.success(xhr.responseText);
        }

        // http的状态码为 4 或者 5开头的时候
        if (/^[45]\d{2}$/.test(xhr.status)) {
            option.error(xhr.responseText)
        }
    };

    // 判断请求方式
    if (option.type == "get") {
        xhr.open(option.type, `${option.url}?${option.data}`, option.async);
        xhr.send();

        return;
    }

    xhr.open(option.type, option.url, option.async);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(option.data);
}

function pAjax(obj) {
    return new Promise((resolve, reject) => {
        ajax({
            url: obj.url,
            type: obj.type,
            data: obj.data,
            async: obj.async,
            success: function (res) {
                resolve(res)
            },
            error: function(err){
                reject(err)
            }
        })
    })
}
