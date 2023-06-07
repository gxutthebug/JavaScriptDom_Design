
function a () {
    const  div1 = document.getElementById("testdiv")
    const  p = document.createElement("p")  // 创建dom节点
    const  text = document.createTextNode("阿森纳是不可战胜的")  // 创建文本节点
     
    div1.appendChild(p)   // 注意这里是变量, 不能加双引号
    p.appendChild(text)
}


function b ()  {
     const div2 = document.getElementById("testdiv2")
     div2.innerHTML = "<p>阿森纳是不可战胜的啊</p>"   //  注意innerHTML是一个属性 , 不是一个方法
    // innerHTML适合大片插入html结构片段
}


function c() {
     const div3 = document.createElement("div")
     const body  = document.getElementsByTagName("body")[0]   //  可以用document.body代替
     const em = document.createElement("em")
     const text1 = document.createTextNode("我们")
     const text2 = document.createTextNode("Arsenal")
     const text3 = document.createTextNode("是不可战胜的")


     em.appendChild(text2)       // 嵌套插入各种元素
    //  div3.appendChild(text1)     
    //  div3.appendChild(em)
    //  div3.appendChild(text3)
        div3.append(text1,em,text3) // 可以用append简化

     body.appendChild(div3)
    
}



window.onload = function () {   
    a()
    b()
    c()
}