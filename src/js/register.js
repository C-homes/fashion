let register = document.querySelector('.register');
let username = document.querySelector('.username');
let phone = document.querySelector('.phone');
let password = document.querySelector('.password');
let checkpassword = document.querySelector('.checkpassword');
let checknum = document.querySelector('.checknum');
let checkchange = document.querySelector('.checkchange');
let a = gv();
console.log('验证码提示:'+a);
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
register.onclick = ()=>{
    async function getData(check) {
        let res = await pAjax({
            url: "../api/register.php",
            type: 'post',
            data: {
                username: username.value,
                phone: phone.value,
                password: password.value
            }
        });
        console.log(res);
        console.log('inner:' + check);
    }
    if (password.value == checkpassword.value&&checknum.value==a) {
        getData(a);
        alert('注册成功');
        location.href = '../views/index.html';
    }else {
        console.log('密码错误');
    }
    username.value = phone.value = password.value = checkpassword.value = " ";
}