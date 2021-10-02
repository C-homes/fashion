let home = document.querySelector('.home');
let appliance = document.querySelector('.appliance');
let care = document.querySelector('.care');
let beauty = document.querySelector('.beauty');
let dress = document.querySelector('.dress');
let health = document.querySelector('.health');
let jewelry = document.querySelector('.jewelry');
let navbar= document.querySelector('.navbar');
let Cart = document.querySelector('.Cart');
let sidercar = document.querySelector('.sidercar');
let sidercari = sidercar.querySelector('i');

let typeh = home.getAttribute('type');
let typea = appliance.getAttribute('type');
let typec = care.getAttribute('type');
let typed = dress.getAttribute('type');
let typef = health.getAttribute('type');
let typej = jewelry.getAttribute('type');
let typeu = beauty.getAttribute('type');

function rendernav(data, parent) {
    let str = "";
    data.forEach((item) => {
        str +=
            `
            <li>
                <img class="navX" src="${item.goodpic}" alt="" type='${item.type}' index='${item.goodid}'>
                <p class="goodtitle">${item.goodname}</p>
                <p class="goodprice">
                    <span>价格:</span>
                    <span>${item.goodnum}</span>
                </p>
            </li>
            `;
    });
    let ul = parent.querySelector('.showlist ul');
    ul.innerHTML = str;
}
async function getData(obj, parent) {
    let res = await pAjax({
        url: "../api/getData.php",
        data: {
            start: obj.num,
            len: obj.len,
            type: obj.type
        }
    });
    res = JSON.parse(res);
    rendernav(res, parent)
}

function settype(type, parent) {
    let defaultInfo = {
        len: 5,
        num: 3,
        type: type
    };
    getData(defaultInfo, parent);
}
settype(typeh, home);
settype(typea, appliance);
settype(typec, care);
settype(typed, dress);
settype(typef, health);
settype(typej, jewelry);
settype(typeu, beauty);

navbar.onclick = function () {
    let e = window.event;
    if (e.target.className == "navX") {
        location.href = "../views/detail.html";
        let type = e.target.getAttribute('type');
        let id = e.target.getAttribute('index');
        setCookie(`id`, id);
        setCookie(`type`, type);
    }
}
Cart.onclick = function()
{
    location.href = "../views/car.html";
}
sidercar.onclick = function()
{
    location.href = "../views/car.html";
}
/* 右侧购物车数量 */
let sidercarid = getCookie('userid');
async function getsiderData() {
    if(sidercarid)
    {
        let res = await pAjax({
            url: "../api/getsidercar.php",
            data: {
                userid: sidercarid,
            },
            type:'get'
        });
        sidercari.innerText=JSON.parse(res).length;
    }
    else
    {
        sidercari.innerText=0
    }
}
getsiderData();

