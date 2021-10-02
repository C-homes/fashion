// 初始化元素
let hotrecommend = document.querySelector('#hotrecommend');
let hotsaleright = document.querySelector('.hotsaleright');
let hotsaleleft = document.querySelector('.hotsaleleft');
let household = document.querySelector('#household');
let dresshold = document.querySelector('#dresshold');
let foodhold = document.querySelector('#foodhold');
let jewelryhold = document.querySelector('#jewelryhold');
let beautyhold = document.querySelector('#beautyhold');
let healthcarehold = document.querySelector('#healthcarehold');
let appliancehold = document.querySelector('#appliancehold');
let adverpart = document.querySelector('.adverpart');
let navindex = document.querySelector('.navindex');
let loginbtn = document.querySelector('.loginbtn');
let regsiterbtn = document.querySelector('.regsiterbtn');

// 类型
let hottype = hotrecommend.getAttribute('type');
let homelifetype = household.getAttribute('type');
let dresstype = dresshold.getAttribute('type');
let foodtype = foodhold.getAttribute('type');
let jewelrytype = jewelryhold.getAttribute('type');
let beautytype = beautyhold.getAttribute('type');
let healthcaretype = healthcarehold.getAttribute('type');
let appliancetype = appliancehold.getAttribute('type');

// 初始渲染页面
window.onload=function(){
    localStorage.removeItem("data");
    setCookie(`type`,' ',-1);
    setCookie(`id`,' ',-1);
    setCookie(`goodtype`,' ',-1);
}
// 渲染数据
let onehotInfo = {
    len: 1,
    num: 1,
    type: hottype
};
let averInfo = {
    len: 5,
    num: 5,
    type: "food"
};
let defaulthotInfo = {
    len: 6,
    num: 2,
    type: hottype
};
async function gethotData(obj) {
    let res = await pAjax({
        url: "../api/getData.php",
        data: {
            start: obj.num,
            len: obj.len,
            type: obj.type
        }
    });
    res = JSON.parse(res);
    if (obj.len != 1) {
        renderhotmore(res)
    } else {
        renderhotone(res)
    }
}

function renderhotmore(data) {
    let str = "";
    data.forEach((item) => {
        str +=
            `
        <div class="hotsalesmall" >
            <img class="hotsalesmallX" src="${item.goodpic}" alt="" type='${item.type}' index='${item.goodid}'>
            <p>${item.goodname}</p>
            <span>${item.goodnum}</span>
        </div>
        `;
    });
    hotsaleright.innerHTML = str;
}



function renderhotone(data) {
    let str = "";
    data.forEach((item) => {
        str =
            `
        <div class="hotsalebig">
                <img class="hotsalebigX" src="${item.goodpic}" alt="" type='${item.type}' index='${item.goodid}'>
                <p>${item.goodname}</p>
                <span>${item.goodnum}</span>
        </div>
        `;
    });
    hotsaleleft.innerHTML = str;
}

function renderavermore(data) {
    let str = "";
    data.forEach((item) => {
        str +=
            `
        <li>
            <a href="javascript:;">
                <img src="${item.goodpic}" type='${item.type}' index='${item.goodid}' class="hotsalesmall" alt="">
            </a>
        </li>
        `;
    });
    adverpart.innerHTML = str;
}
async function getaverData(obj) {
    let res = await pAjax({
        url: "../api/getData.php",
        data: {
            start: obj.num,
            len: obj.len,
            type: obj.type
        }
    });
    res = JSON.parse(res);
    renderavermore(res)
}
getaverData(averInfo);
gethotData(onehotInfo);
gethotData(defaulthotInfo);

/* 下方不同 */
function rendermore(data, parent) {
    let str = "";
    data.forEach((item, index) => {
        if (index == 0) {
            str +=
                `
            <div class="itemlazy">
                <img class="itemlazyX" src="${item.goodpic}" alt="" type='${item.type}' index='${item.goodid}'>
            </div>
            `;
        } else {
            str +=
                `
            <div class="itemgood">
                <img class="itemgoodX"  src="${item.goodpic}" alt="" type='${item.type}' index='${item.goodid}'>
                <p>${item.goodname}</p>
                <span>${item.goodnum}</span>
            </div>
            `;
        }
    });
    let itemlistcontent = parent.querySelector('.itemlistcontent');
    itemlistcontent.innerHTML = str;
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
    rendermore(res, parent)
}

function settype(type, parent, index) {
    let defaultInfo = {
        len: 6,
        num: index,
        type: type
    };
    getData(defaultInfo, parent);
}

settype(homelifetype, household, 1);
settype(dresstype, dresshold, 1);
settype(foodtype, foodhold, 1);
settype(jewelrytype, jewelryhold, 1);
settype(beautytype, beautyhold, 1);
settype(healthcaretype, healthcarehold, 1);
settype(appliancetype, appliancehold, 1);
/* 转换nav */
let navtag = document.querySelectorAll('#navtag');
let tabnav = document.querySelectorAll('.tabnav')
tabnav.forEach((item)=>{
    item.onclick =()=> {
        let e = window.event;
        if (e.target.id == 'navtag') {
            navtag.forEach(function (item) {
                item.className = "";
            })
            let type = e.target.parentNode.getAttribute('type');
            let part = e.target.parentNode.getAttribute('part');
            let hold = document.querySelector(`#${part}`);
            e.target.className = "sel";
            let tagindex = e.target.getAttribute('tagindex');
            settype(type, hold, tagindex);
        }
    }
})

document.onclick = function () {
    let e = window.event;
    if (e.target.className == "hotsalesmallX") {
        location.href = "../views/detail.html";
        let type = e.target.getAttribute('type');
        let id = e.target.getAttribute('index');
        setCookie(`id`, id);
        setCookie(`type`, type);
    } else if (e.target.className == "hotsalebigX") {
        location.href = "../views/detail.html";
        let type = e.target.getAttribute('type');
        let id = e.target.getAttribute('index');
        setCookie(`id`, id);
        setCookie(`type`, type);
    } else if (e.target.className == "hotsalesmall") {
        location.href = "../views/detail.html";
        let type = e.target.getAttribute('type');
        let id = e.target.getAttribute('index');
        setCookie(`id`, id);
        setCookie(`type`, type);
    } else if (e.target.className == "itemlazyX") {
        location.href = "../views/detail.html";
        let type = e.target.getAttribute('type');
        let id = e.target.getAttribute('index');
        setCookie(`id`, id);
        setCookie(`type`, type);
    } else if (e.target.className == "itemgoodX") {
        location.href = "../views/detail.html";
        let type = e.target.getAttribute('type');
        let id = e.target.getAttribute('index');
        setCookie(`id`, id);
        setCookie(`type`, type);
    } else if (e.target.className == "loginbtn") {
        location.href = '../views/login.html';
    } else if (e.target.className == "regsiterbtn") {
        location.href = '../views/register.html';
    } else if (e.target.className == "itemlisttop") {
        let toptype = e.target.getAttribute('type');
        setCookie(`goodtype`, toptype);
        location.href = '../views/list.html'
    }
}