// 判断是否有登录
let userid = getCookie("userid");
let type = getCookie("type");
if (!userid) {
    // 需要把当前页面的地址 存在本地存储
    localStorage.setItem("url", location.href);
    location.href = "../views/login.html";
}
// 购物车结构：shopcar
// 购物车单项：goodcarlist
class Car {
    constructor(ele, userid ,type) {
        this.ele = document.querySelector(ele);
        this.userid = userid;
        this.type = type;
        this.init();
    }

    init() {
        this.goodcarlist = this.ele.querySelector(".goodcarlist");
        this.allcheckone = this.ele.querySelector("#allcheckone");
        this.allchecktwo = this.ele.querySelector("#allchecktwo");
        this.goodkind = this.ele.querySelector(".goodkind i");
        this.checknum = this.ele.querySelector(".checknum i");
        this.allgoodprice = this.ele.querySelector('.allgoodprice');
        this.goodlistprice = this.ele.querySelector('.goodlistprice');
        this.getData();
        this.ele.onclick = () => {
            let e = window.event;
            // 全选勾选框
            if (e.target.id == "allcheckone") {
                if (e.target.checked) {
                    this.res.forEach(item => {
                        item.is_select = "1";
                    })
                } else {
                    this.res.forEach(item => {
                        item.is_select = "0";
                    })
                }
            }
            else if (e.target.id == "allchecktwo") {
                if (e.target.checked) {
                    this.res.forEach(item => {
                        item.is_select = "1";
                    })
                } else {
                    this.res.forEach(item => {
                        item.is_select = "0";
                    })
                }
            }
            // 单选勾选框
            else if (e.target.id = "onecheck") {
                let attr = e.target.getAttribute("index");
                if (e.target.checked) {
                    this.res.forEach(item => {
                        if (item.goodid == attr) {
                            item.is_select = "1";
                        }
                    })
                } else {
                    this.res.forEach(item => {
                        if (item.goodid == attr) {
                            item.is_select = "0";
                        }
                    })
                }
            }
            // 记得渲染
            localStorage.setItem("data", JSON.stringify(this.res));
            this.render();
            // 点击增加按钮
            if (e.target.classList.contains("addbtn")) {
                let index = e.target.parentNode.getAttribute("index");
                let goodnum = e.target.previousElementSibling.innerText * 1+1;
                this.changegoodnum(goodnum, index);
            }
            // 点击减少按钮
            if (e.target.classList.contains("reducebtn")) {
                let index = e.target.parentNode.getAttribute("index");
                let goodnum = e.target.nextElementSibling.innerText * 1-1;
                this.changegoodnum(goodnum, index);
            }
            // 点击删除按钮
            if (e.target.classList.contains("delete")) {
                let index = e.target.getAttribute("index");
                this.delgoodnum(index);
            }
            // 点击结算按钮
            if (e.target.classList.contains("putupdata"))
            {
                this.res.forEach(item=>{
                    if( item.is_select=="1")
                    {
                        this.delgoodnum(item.goodid);
                    }
                })
            }
            // 批量删除按钮
            if (e.target.classList.contains("allcheckdel"))
            {
                this.res.forEach(item=>{
                    if( item.is_select=="1")
                    {
                        this.delgoodnum(item.goodid);
                    }
                })
            }
            // 继续购物按钮
            if(e.target.classList.contains("goonshop"))
            {
                location.href = "../views/list.html";
            }
        }
    }
    async getData() {
        let res = await pAjax({
            url: "../api/getCarData.php",
            data: {
                userid: userid,
                type: type,
            },
            type:'get'
        });
        this.res = JSON.parse(res);
        // 将结果放入本地存储
        localStorage.setItem("data", JSON.stringify(this.res));
        this.render();
    }
    render() {
        // 将本地存储中的数据拿出来赋值给this.res
        this.res = JSON.parse(localStorage.getItem("data"));
        // 伴随着页面渲染进行数据的改变
        this.calculation();
        var str = "";
        this.res.forEach(function (item, index) {
            str += 
            `
            <tr>
                <td>
                    <input type="checkbox"  
                        index ="${item.goodid}" 
                        id="onecheck"
                        ${item.is_select =="1" ? "checked":""}>
                </td>
                <td style="width: 320px;" class="goodpic">
                    <img src="${item.goodpic}"alt="">
                    <span>${item.goodname}</span>
                </td>
                <td>${item.goodid}</td>
                <td class="goodprice">${item.goodnum}</td>
                <td>有库存</td>
                <td>是</td>
                <td index="${item.goodid}">
                    <button class="reducebtn" ${item.num == "1" ? "disabled":" "}>-</button>
                    <button type="text" class="goodnum">${item.num}</button>
                    <button class="addbtn">+</button>
                </td>
                <td class="goodtotalprice">￥${(item.goodnum.replace(',','').slice(1)*1)*item.num}</td>
                <td>
                    <span class="collection">收藏</span>
                    <span class="delete" index="${item.goodid}">删除</span>
                </td>
            </tr>
            `;
        });
        this.goodcarlist.innerHTML = str;
    }
    calculation() {
        // 计算商品的种类
        this.goodkind.innerText = this.res.length;
        // 计算所选商品的数量
        this.checknum.innerText = this.res.reduce((pre, cur) => {
            if (cur.is_select == "1") {
                return pre + cur.num * 1;
            }
            return pre;
        }, 0)
        // 计算选中商品的总价格
        let total = this.res.reduce((pre, cur) => {
            if (cur.is_select == "1") {
                return pre + cur.num * cur.goodnum.replace(',','').slice(1)*1;
            }
            return pre;
        }, 0)
        this.goodlistprice.innerText = "￥" + total;
        this.allgoodprice.innerText = "￥" + total;
        // 当所有的单选按钮都勾上了全选按钮也要勾上
        this.allcheckone.checked = this.res.every(item=>{
            return item.is_select == "1";
        });
        this.allchecktwo.checked = this.res.every(item=>{
            return item.is_select == "1";
        });
    }
    // 数据变更
    async changegoodnum(num, index) {
        let res = await pAjax({
            url: "../api/updataCar.php",
            data: {
                userid: this.userid,
                goodid: index,
                num:num
            }
        })
        res = JSON.parse(res);
        // 这个的res结果为返回信息而非返回结果集
        if (res.code) {
            this.res.forEach(item => {
                if(item.goodid==index)
                {
                    item.num=num;
                }
                else 
                {
                    item.num=item.num;
                }
            });
        }
        localStorage.setItem("data", JSON.stringify(this.res));
        this.render();;
    }
    // 删除数据
    async delgoodnum(index)
    {
        let res = await pAjax({
            url: "../api/deleteCar.php",
            data: {
                userid: this.userid,
                goodid: index,
            }
        })
        res = JSON.parse(res);
        if (res.code) {
            this.res = this.res.filter((item) => {
                return item.goodid != index;
            });
        }
        localStorage.setItem("data", JSON.stringify(this.res));
        this.render();
    }
}

new Car(".carlist",userid ,type);
let fslogo = document.querySelector('.fslogo');
fslogo.onclick=function()
{
    location.href = '../views/index.html';
}