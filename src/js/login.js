let login = document.querySelector('.login');
let phone = document.querySelector('.phone');
let password = document.querySelector('.password');
let checknum = document.querySelector('.checknum');
let checkchange = document.querySelector('.checkchange');
let reglinbtn = document.querySelector('.reglinbtn');
let fslogo = document.querySelector('.fslogo img');
let a = gv();
console.log('验证码提示:'+a);
// 初始渲染页面
window.onload=function(){
    setCookie('type',' ',-1);
    setCookie('id',' ',-1);
}
function gv() {
    let options = {
        id: "checkshow"
    }
    let temp = new GVerify(options);
    return temp.options.code
}
checkchange.onclick = () => {
    a = gv();
    // console.log('outer:'+a);
}
reglinbtn.onclick = () => {
    location.href = '../views/register.html';
}
login.onclick = function () {
    async function getData(check) {
        let res = await pAjax({
            url: "../api/login.php",
            type: 'post',
            data: {
                phone: phone.value,
                password: password.value
            }
        });
        res = JSON.parse(res);
        // console.log('inner:' + check);
        if (checknum.value == check) {
            if (res.code == 1) {
                // 登录成功存储 登录的状态
                setCookie('userid', phone.value);
                // 跳转页面 如果从购物车过来的时候登录成功去购物车页面
                // 否则就去到首页
                let url = localStorage.getItem('url');
                if (url) {
                    location.href = url;
                    // 登录成功的时候把url的这个localstorage值清除
                    localStorage.removeItem('url');
                } else {
                    location.href = '../views/index.html';
                }
            }
        }
        else
        {
            alert('验证码错误');
        }
    }
    getData(a);
}
fslogo.onclick = function () {
    location.href = '../views/index.html';
}