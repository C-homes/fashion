let type = getCookie('goodtype');
let goodlistc = document.querySelector('#goodlistc');
let page = document.querySelector(".page");
let navindex = document.querySelector('.navindex');
let fslogo = document.querySelector('.fslogo');
// 初始渲染页面
window.onload=function(){
    setCookie(`type`,' ',-1);
    setCookie(`id`,' ',-1);
}
fslogo.onclick = function()
{
    location.href = '../views/index.html'
}
let defaultInfo = {
    len: 20,
    num: 1,
};
pAjax({
    url: "../api/getData.php",
    data: {
        start: defaultInfo.num,
        len: defaultInfo.len,
        type:type
    },
}).then((res) => {
    res = JSON.parse(res);
    
    new Pagination(page, {
        pageInfo: {
            pagenum: 1,
            pagesize: defaultInfo.len,
            total: res.total,
            totalpage: Math.ceil(res.total / defaultInfo.len),
        },
        textInfo: {
            first: "首页",
            prev: "上一页",
            list: "",
            next: "下一页",
            last: "最后一页",
        },
        change: function (num) {
            defaultInfo.num = num;
            getData(type);
            // scrollTo(0, 0);
        },
    });
});


async function getData(type) {
    let res = await pAjax({
        url: "../api/getData.php",
        data:{
            start: defaultInfo.num,
            len: defaultInfo.len,
            type:type
        }
    });
    res = JSON.parse(res);
    renderHtml(res);
}
function renderHtml(data) {
    let str = "";
    data.forEach((item, index) => {
        str+=
        `
        <div class="gitem">
            <img class="gitemX" src="${item.goodpic}"alt="" type='${item.type}' index='${item.goodid}'>
            <p>${item.goodname}</p>
            <span>${item.goodnum}</span>
            <span>立即订购</span>
        </div>
        `;
    });

    goodlistc.innerHTML = str;
}
goodlistc.onclick = function () {
    let e = window.event;
    if (e.target.className == "gitemX") {
        location.href = "../views/detail.html";
        let type = e.target.getAttribute('type');
        let id = e.target.getAttribute('index');
        setCookie(`id`, id);
        setCookie(`type`, type);

    }
}
navindex.onclick = function()
{
    location.href = '../views/index.html'
}