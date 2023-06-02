
function showpicture(a) {
    const source = a.getAttribute("href")
    const  title  = a.title
    const  imagegaller  = document.getElementById("imagegaller")
    const  body = document.getElementsByTagName("body")[0]

    const  p = document.createElement("p")
    const  text =  document.createTextNode(title)
    p.appendChild(text)   

    const  img = document.createElement("img")
    img.src = source
    img.alt = "my image gallery"

    body.insertBefore(p,imagegaller)    // 父元素.insertBefore(新元素 ,定位元素)  在定位元素前插入新元素
    body.insertBefore(img,imagegaller)
  
 }
 
 const  imagegaller  = document.getElementById("imagegaller")
 const  links  = imagegaller.getElementsByTagName("a")
 
 
 for(let i=0 ; i <links.length ; i++) {
    //  links[i].onclick = showpicture(this)
    links[i].onclick = function() {
       showpicture(this)
       return false
    }
 }
 
 
// DOM只提供了insertBefore()方法并没有提供 insertAfter() , 我们可以模仿insertBefore自己封装一个

function insertAfter (newElement ,targetElement) {
    var parent = targetElement.parentNode  // 找到 定位元素的父元素
    if (parent.lastChild == targetElement) { // 判断定位元素是否是父元素的最后一个子元素
        parent.appendChild(newElement)
    }  else {
         parent.insertBefore(newElement,targetElement.nextSibling)  
         // 如果定位元素不是最后一个, 就插入到定位元素的 "下一个兄弟元素" 之前
    }

}