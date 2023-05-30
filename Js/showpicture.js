
function showpicture(a) {
   const source = a.getAttribute("href")
   const  imgplace = document.getElementById("place")
   imgplace.setAttribute("src" , source)
   console.log(imgplace.getAttribute("src"))

   const description = document.getElementById("description")
   const text = a.getAttribute("title")
   description.childNodes[0].nodeValue = text
   //  注意这里不是description.nodeValue , nodeValue 获取的并不是dom元素的值 dom.nodeValue 得到的是null,因为dom节点没有值
   //  nodeValue获取的是node对象()的值, 准确的说是获取文本节点对象的值 , 用来获取文本节点的文本的 ！
   //  对于 p / a 标签来说 , .childNodes[0]获取到的通常就是文本节点

   // ps:   childNodes[0] 可以用 childNodes.fristChild来代替  ;  childNodes[length-1] 可以用 lastNodes.fristChild
}



///页面加载时被调用
window.onload = function () {   
    // 经过实验可知.childNodes获取的是一个父级dom结点下的 子dom节点 与 子文本节点 两个部分
     const body_child = document.getElementsByTagName("body")[0]
     console.log(body_child.childNodes)  
     const  imgplace = document.getElementById("place")
     console.log(imgplace.childNodes) 
  
}