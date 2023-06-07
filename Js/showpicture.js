
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

   // return false   // 写在这里没有用
}

const  imagegaller  = document.getElementById("imagegaller")
const  links  = imagegaller.getElementsByTagName("a")

console.log(links)
for(let i=0 ; i <links.length ; i++) {
   //  links[i].onclick = showpicture(this)
   links[i].onclick = function() {
      showpicture(this)
      return false
   }
}



///页面加载完成后被调用
window.onload = function () {   
    // 经过实验可知.childNodes获取的是一个父级dom结点下的 子dom节点 与 子文本节点 两个部分
     const body_child = document.getElementsByTagName("body")[0]
     console.log(body_child.childNodes)  
     const  imgplace = document.getElementById("place")
     console.log(imgplace.childNodes) 
}



// 如果您的链接是通过JavaScript动态创建的，那么可能需要使用事件委托来绑定事件处理程序。
// 在这种情况下，您应该绑定事件处理程序到链接的父元素，而不是链接本身。