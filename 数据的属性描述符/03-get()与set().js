let obj = {}

Object.defineProperty(obj, 'a' , {

    get : function() {
        console.log("hello world")
        return 123
    } ,

    set : function(val) {
        console.log('hahaha')
    }

})

console.log(obj.a) // get() -----> 输出 hello world  +   123
 
obj.a = 5  // set(5) -----> 输出  hahaha


/*
注意：不能在get()里面return obj.a ; 不能在set()里面对obj.a进行赋值操作
否则会导致无限递归

比如：
Object.defineProperty(obj, 'a' , {

    get : function() {
        return obj.a    //  get()
    } ,

    set : function(val) {
        obj.a = val      // set(val)
    }

})
*/

/*------------------------------------------------------------------------------------------------------------------*/
/*利用这个知识点来升级之前的数据包装*/



class UIGoods {
    constructor(g) {
        Object.defineProperty(this , 'data' , {
            get: function () {
                return g
            },
            set: function () {
                throw new Error('data是只读属性,不能修改')
            },
            configurable: false
        })

         let interValue =0 // 借用一个中间变量,使得choose属性可修改
        Object.defineProperty(this,'choose',{
            get: function() {
                return interValue
            },
            set: function (val) {
                if (typeof val !== Number) {
                    throw new Error('choose属性必须是数字')
                }
                if( val !== parseInt(val)) {
                    throw new Error('choose属性必须是整数')
                }
                if ( val < 0 ) {
                    throw new Error('choose属性必须大于等于 0')
                }
                 interValue = val
            },
            configurable: false
        })
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