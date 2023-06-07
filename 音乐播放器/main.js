let data = `[00:01.26]卜卦 - 覃沐曦\n[00:22.00]风吹沙 蝶恋花 千古佳话\n[00:26.66]似水中月 情迷着镜中花\n[00:32.00]竹篱笆 木琵琶 拱桥月下\n[00:36.63]谁在弹唱 思念远方牵挂\n[00:41.83]那年仲夏 你背上行囊离开家\n[00:46.99]古道旁 我欲语泪先下\n[00:51.79]庙里求签 我哭诉青梅等竹马\n[00:57.60]求 菩萨保佑我俩\n[01:01.66]不停的猜 猜 猜 又卜了一卦\n[01:06.55]吉凶祸福 还是担惊受怕\n[01:11.56]对你的爱 爱 爱 望断了天涯\n[01:16.74]造化弄人 缘分阴错阳差\n[01:22.00]风吹沙 蝶恋花 千古佳话\n[01:26.61]似水中月 情迷着镜中花\n[01:31.67]竹篱笆 木琵琶 拱桥月下\n[01:36.62]谁在弹唱 思念远方牵挂\n[01:41.77]那年仲夏 你背上行囊离开家\n[01:46.97]古道旁 我欲语泪先下\n[01:51.68]田里庄稼 收获了一茬又一茬\n[01:57.60]而 我们何时发芽\n[02:01.75]不停的猜 猜 猜 又卜了一卦\n[02:06.60]吉凶祸福 还是担惊受怕\n[02:11.60]对你的爱 爱 爱 望断了天涯\n[02:16.59]造化弄人 缘分阴错阳差\n[02:22.57]猜 猜 猜 又卜了一卦\n[02:26.62]是上上签 可还是放不下\n[02:31.57]对你的爱 爱 挨过几个冬夏\n[02:36.62]日夜思念 祈求别再变卦`


let domobj = {
    audio: document.getElementsByTagName("audio")[0],
    ul: document.getElementsByTagName("ul")[0],
    div: document.getElementsByTagName("div")[0]
}

let list = parse(data)
console.log(list)
RenderWordlist()

let containerHeight = domobj.div.clientHeight  // 获取div容器高度
let liHeight = domobj.ul.children[0].clientHeight  // 获取子dom(li) + li容器高度
// let liHeight = 30
let maxOffset = domobj.ul.clientHeight - containerHeight // 偏移量的上边界值 , 就是ul 比 div 长出来那一截
// 当偏移量超出这个长度, 就说明到底了 , 此时停止偏移



function TimeToPure(time) {
    return time.slice(1)
}

function TimeToNumber(time) {
     let parse2 = time.split(":")
     return +parse2[0]*60+ +parse2[1]
}


function parse(data) {  // 将歌词字符串处理成object形式
    let lines =data.split("\n")
    return lines.map(x=> {
        let parse1 = x.split("]")
        let puretime = TimeToPure(parse1[0])
        let obj = {
            time:TimeToNumber(puretime),
            word:parse1[1]
        }
        return obj
    })
}


function RenderWordlist () {  // 根据歌词数据生成歌词列表
    for(let i =0 ;  i<list.length ;i++) {
       let li = document.createElement("li")
       let word = document.createTextNode(list[i].word)
       // li.textContent = list[i].word
       li.appendChild(word)
       domobj.ul.appendChild(li)
    }
}

function findindx() {
     let currenttime = domobj.audio.currentTime  // 播放器当前时间戳(进度)
     for (let i = 0 ; i < list.length ; i++ ) {  // 遍历歌词列表 , 找到与当前时间戳匹配的歌词  
        if(currenttime < list[i].time) {    // 当歌词的time第一次大于该时间戳时就说明上一条歌词是正好符合的
            return i - 1
        }
     }


     return list.length-1
}


/*
注意：我们设置Ul上下移动使用transform , 而没有使用margin-top 也是因为transform的性能更好
*/

function setOffset() {  // 核心逻辑就是, 通过findindx()找到当前时间戳的位于哪一条歌词index , 然后根据index确定偏移量
    let index = findindx()
    let offset =liHeight*index + liHeight / 2  -  containerHeight / 2  // 这就是偏移量计算公式(一个小几何问题)

    if (offset < 0) {  // 处理上边界,在歌词没走到中间前不用偏移,一旦歌词第一次来到最中间就开始偏移,偏移是为了维持后续歌词也在正中间
        offset = 0
    }                       
    if(offset >maxOffset) {   // 处理下边界,当偏移量超出最大偏移量, 就说明到底了 , 此时停止偏移(停止增长偏移量)
        offset = maxOffset
    }
     
    domobj.ul.style.transform = `translateY(-${offset}px)`   //  修改偏移量 实现Ul偏移

    let li = domobj.ul.querySelector('.active')
    if (li) {
        li.classList.remove('active')   // 在下一条歌词添加高亮前,先移除上一条歌词的高亮
    }

    li = domobj.ul.children[index]
    if(li) {
        li.classList.add('active')  // 添加高亮,因为刚开始时index可能是负数 , 所以li先验存一下
    }
}


domobj.audio.addEventListener('timeupdate', setOffset)   // 当进度条改变时,调用setOffset尝试改变偏移量