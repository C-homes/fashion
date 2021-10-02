let userid = getCookie('userid');
let id = getCookie('id');
let type = getCookie('type');
let caritem = document.querySelector('.caritem');
let fslogo = document.querySelector('.fslogo');
// 初始渲染页面
// window.onload=function(){
//     setCookie(`type`,' ',-1);
//     setCookie(`id`,' ',-1);
// }
async function applydetail(id,userid,type) {
    let detailres = await pAjax({
        url: "../api/getDetail.php",
        data: {
            id: id,
            type: type
        },
        type: "get"
    })
    let res = JSON.parse(detailres)[0]
    showdetail(res);
    entercar(id,userid,type);
}
function entercar(id,userid,type) {
    let addcar = document.querySelector('.addcar');
    addcar.onclick = function () {
        pAjax({
            url:"../api/addCar.php",
            data:{
                id:id,
                userid:userid,
                type: type,
            },
            type:"post"
        }).then(res=>{
            console.log(res);
        })
        location.href = "../views/car.html";
        if(!userid)
        {
            location.href = "../views/login.html"
        }
    }
}
applydetail(id,userid,type);
fslogo.onclick = function()
{
    location.href = '../views/index.html'
    setCookie('type',' ',-1);
    setCookie('id',' ',-1);
}
function showdetail(res) {
    let str =
        `
    <div class="smallup">
        <div class="spicup"><img src="../assets/img/xbSmallup.gif" alt=""></div>
        <div class="smalllist">
            <ul>
                <li><img src="${res.goodpic}" alt=""></li>
            </ul>
        </div>
        <div class="spicdown"><img src="../assets/img//xbSmalldown.gif" alt=""></div>
    </div>
    <div class="bigup">
        <img src="${res.goodpic}" alt="">
        <div class="mask"></div>
        <div class="enlarge"></div>
    </div>
    <div class="itembaseinfo">
        <div class="itemname">
            <h2>${res.goodname}</h2>
        </div>
        <div class="itemid">
            <span>商品货号:${res.goodid}</span>
        </div>
        <div class="itemprice">
            <div class="iprice">
                <span>风尚价 : </span>
                <i>${res.goodnum}</i>
            </div>
            <div class="promotion">
                <span>促销信息:</span>
                <span>买赠</span>
                <i>${res.goodgit==null?" ":res.goodgit}</i>
            </div>
        </div>
        <div class="itemaddress">
            <span>送至:</span>
            <div class="iareaconfirm">江西省 抚州市 宜黄县
                <div class="iareashow">
                    <div class="iareatop">
                        <ul>
                            <li>江西省</li>
                            <li>抚州市</li>
                            <li>宜黄县</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="itemqty">
            <a href="" class="itemqtyr">-</a>
            <input type="text" class="itemqtyn" value="1">
            <a href="" class="itemqtya">+</a>
        </div>
        <div class="itembtn">
            <a href="javascript:;" class="gobuy">立即购买</a>
            <a href="javascript:;" class="addcar">加入购物车</a>
        </div>
    </div>
        `
    caritem.innerHTML = str;
    new enlarge(".bigup");
    str = ' ';
}


/* 放大镜 */
class enlarge {
    constructor(str) {
        this.str = str;
        this.init(); //用于初始化\
        this.move();
    }
    init() {
        //初始化部分元素
        this.bigup = document.querySelector(this.str);
        this.bigImg = this.bigup.querySelector('img');
        this.smalllist = document.querySelector('.smalllist')
        this.smallimg = this.smalllist.querySelectorAll('img');
        this.mask = this.bigup.querySelector('.mask');
        this.enlarge = document.querySelector('.enlarge');
        // 初始化enlarge
        this.enlarge.style.backgroundImage = 'url(' +this.bigImg.getAttribute('src') + ')';
        // 给每个小图框设置点击事件
        this.smallimg.forEach((item, index) => {
            item.onclick = () => {
                this.change(item, index);
            }
        })
    }
    change(item, index) {
        this.smallimg.forEach((item, index) => {
            item.classList.remove('activeborder');
        })
        item.classList.add('activeborder');
        this.bigImg.setAttribute('src', item.getAttribute('src'))
        this.enlarge.style.backgroundImage = 'url(' + item.getAttribute('src') + ')';
    }
    move() {
        this.bigup.onmouseenter = () => {
            this.mask.style.display = 'block';
            this.enlarge.style.display = 'block';
            this.setstyle();
        }
        this.bigup.onmouseout = () => {
            this.mask.style.display = 'none';
            this.enlarge.style.display = 'none';
        }
        this.bigup.onmousemove = () => {
            this.mask.style.display = 'block';
            this.enlarge.style.display = 'block';
            this.setstyle();
            let e = window.event;
            let left = e.pageX - this.bigup.offsetLeft - this.mask.offsetWidth / 2;
            let top = e.pageY - this.bigup.offsetTop - this.mask.offsetHeight / 2;
            if (left > this.bigup.offsetWidth - this.mask.offsetWidth) {
                left = this.bigup.offsetWidth - this.mask.offsetWidth;
            }
            if (left <= 0) {
                left = 0;
            }
            if (top <= 0) {
                top = 0;
            }
            if (top > this.bigup.offsetHeight - this.mask.offsetHeight) {
                top = this.bigup.offsetHeight - this.mask.offsetHeight;
            }
            this.mask.style.left = left + 'px';
            this.mask.style.top = top + 'px';
            let x = left * this.egbW / this.showW;
            let y = top * this.egbH / this.showH;
            this.enlarge.style.backgroundPosition = `${-x}px ${-y}px`;
        }
    }
    setstyle() {
        // 放大镜的 的width = 背景图的宽度 * mask 宽度/ show宽度
        let style = getStyle(this.enlarge, 'backgroundSize');
        this.egbW = parseInt(style.split(" ")[0]);
        this.egbH = parseInt(style.split(" ")[1]);
        let maskW = this.mask.offsetWidth;
        let maskH = this.mask.offsetHeight;
        this.showW = this.bigup.offsetWidth;
        this.showH = this.bigup.offsetHeight;
        this.enlarge.style.width = (this.egbW * maskW) / this.showW + 'px';
        this.enlarge.style.height = (this.egbH * maskH) / this.showH + 'px';
    }
}