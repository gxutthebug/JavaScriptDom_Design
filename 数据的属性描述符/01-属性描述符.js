let obj = {
    a:1,
    b:2,
    c:3
}

console.log(Object.getOwnPropertyDescriptor(obj,'a'))
/*
       打印a属性的属性描述符

   {
    "value": 1,
    "writable": true,   // 可重写
    "enumerable": true,  // 可遍历
    "configurable": true  // 属性描述符本身可修改
}
  
*/

obj.a = 4 
console.log(obj.a) // 4  -----------> 可重写

console.log(Object.keys(obj)) // 'a' 'b' 'c'  -----------> 可遍历

/*--------------------------------------------------------------------------------------------------------------------------------------*/

let obj2 = {
    a:1,
    b:2,
    c:3
}

Object.defineProperty(obj2,'a',{
    value: 10,
    writable: false,   // 可重写
    enumerable: false,  // 可遍历
    configurable: true  // 属性描述符本身可修改
})


obj2.a = 4 
console.log(obj2.a) // 10  -----------> 不可重写

console.log(Object.keys(obj2)) //  ['b', 'c']  -----------> 不可遍历
