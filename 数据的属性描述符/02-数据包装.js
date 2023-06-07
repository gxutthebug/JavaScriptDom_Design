let aGood = {
    pic: '/xxxxx/xxxx',
    title: '生椰拿铁',
    desc: '【年度重磅 , 一口吞云】',
    sellNumber:200,
    favorRate:95,
    price:32
}  // 按理说这应该是请求回来一个对象数组的, 现在只用单个对象模拟

/*
-------------------------------------------------------------------------------------------------------------------------
function UIGoods(g) {
    this.data = g
    this.choose = 0
    // this.totalPrice = 0   该商品总价
}

UIGoods.prototype.getTotalPrice = function () {
    return this.data.price * this.choose
}

UIGoods.prototype.isChoosse = function () {
    return this.choose > 0
}

let uig  = createUIGoods(aGood)
--------------------------------------------------------------------------------------------------------------------------
*/

class UIGoods {
    constructor(g) {
        this.data = g
        this.choose = 0
    }

    getTotalPrice () {
        return this.data.price * this.choose
    }

    isChoosse () {
        return this.choose > 0
    }

    increase() {
        this.choose++
    }

    decrease() {
        if (this.choose === 0) {
            return
        }
        this.choose--
    }
}

class UIdata {
    constructor () {
        this.UIGoods = new UIGoods(aGood) // 这里按理说应该是一个对象数组...
    }
}

class UI {
    constructor () {
        this.uidata = new UIdata(aGood) // 这里按理说应该是一个对象数组...
        this.doms = {
            
        }
    }
}