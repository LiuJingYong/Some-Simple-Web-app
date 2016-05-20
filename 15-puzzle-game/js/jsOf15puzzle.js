/*13331172_刘景镛_hw7*/
/*this is a js file of a 15puzzle*/

window.onload = function() {
    initialization();
    document.getElementById('startGame').onclick = start;
    document.getElementById('resetGame').onclick = initialization;
    document.getElementById('puzzleArea').onmouseover = listen;
}

/*初始化页面*/
function initialization() {
    for (var count = 0; count < 16; count++) {
        document.getElementById('puzzleArea').appendChild(document.createElement('div'));
    }
    var x = document.getElementById('puzzleArea').children;
    for (var i = 0; i < 16; i++) {
        x[i].style.width = "98px";
        x[i].style.height = "98px";
        x[i].style.left = (100 * (i % 4)).toString() + "px";
        x[i].style.top = (100 * (i - i % 4) / 4).toString() + "px";
        x[i].id = "piece" + i.toString();
        x[i].className = "puzzlePiece";
        x[i].style.border = "1px solid lightskyblue";
        if (i != 15) {
            x[i].style.backgroundImage = 'url(../pic/1.png)';
            x[i].style.backgroundPosition = (-100 * (i % 4)).toString() + "px "
                + (400 - 100 * (i - i % 4) / 4).toString() + "px";
        }
    }
}

/*开始后，打乱拼图*/
var start = function() {
    var k = document.getElementById('puzzleArea');
    var allDiv = k.getElementsByTagName("div");
    for (var i = 0, len = allDiv.length; i < len; i++) {
        var ref = allDiv[i];
        ref.className = ref.className.replace("puzzlePiece", "").replace(" ", "");
    }
    for (var n = 0; n < 1000; n++) {
        var i = Math.floor(Math.random() * 15);
        var x = document.getElementById('puzzleArea').children;
        var blank = document.getElementById('piece15');
        if (judge(x[i], blank)) {
            move(x[i]);
        }
    }
    /*后续点击移动，有过渡动画效果*/
    for (var i = 0, len = allDiv.length; i < len; i++) {
        var ref = allDiv[i];
        ref.className = "puzzlePiece";
    }
}


/*判断一个块附近有没有空白*/
var judge = function(elem, blank) {
    var disX = Math.abs(elem.offsetLeft - blank.offsetLeft);
    var disY = Math.abs(elem.offsetTop - blank.offsetTop);
    return !!(Math.abs(disX - disY) == 100 && disX + disY == 100);
}

/*移动拼图块*/
var move = function(elem) {
    var x = document.getElementById('piece15');
    var temp = x.style.left;
    x.style.left = elem.style.left;
    elem.style.left = temp;
    temp = x.style.top;
    x.style.top = elem.style.top;
    elem.style.top = temp;
}

/*监视鼠标的位置，在能移动的块上时，块的框变为白色*/
var listen = function() {
    var x = window.event.srcElement;
    var blank = document.getElementById('piece15');
    x.onmouseleave = recover;
    if (judge(x, blank)) {
        x.style.border = "1px solid white";
    }
    x.onclick = function() {
        if (judge(x, blank)) {
            move(x);
            if (isFinish()) {
                alert("Congratulation! You solve the puzzle!");
            }
        }
    };
}

var recover = function() {
    var x = window.event.srcElement;
    if (x.id != 15) {
        x.style.border = "1px solid lightskyblue";
    }
}

/*判断是否完成拼图*/
var isFinish = function() {
    var n = document.getElementById('puzzleArea').children;
    for (var i = 0; i < 16; i++) {
        if (n[i].style.top !=  Math.floor(i / 4 ) * 100 + "px" ||
            n[i].style.left != i % 4 * 100 + "px") {
            return false;
        }
    }
    return true;
}
