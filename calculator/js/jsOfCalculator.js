/*13331172_刘景镛_hw5*/
/*this is a js file of a simple calculator*/

/*当按下数字或括号或小数点时显示对应的字符*/
function showInputButton() {
    var displayDom = document.getElementById("inputDisplay");
    var allInputButtons = document.getElementsByClassName("inputButton");
    for (var i = 0; i < allInputButtons.length; i++) {
        var ref = allInputButtons[i];
        ref.onclick = function() {
//            if (document.getElementById("outputDisplay").value != "") {
//                document.getElementById("inputDisplay").value = "";
//                document.getElementById("outputDisplay").value = "";
//                var temp = displayDom.value;
//                temp += this.innerHTML;
//                displayDom.value = temp;
//            } else {
//                var temp = displayDom.value;
//                temp += this.innerHTML;
//                displayDom.value = temp;
//            }
            var temp = displayDom.value;
            temp += this.innerHTML;
            displayDom.value = temp;
        }
    }
};

/*当按下操作符按钮显示操作符*/
function showOperatorButton() {
    var displayDom = document.getElementById("inputDisplay");
    var allOperatorButtons = document.getElementsByClassName("operatorButton");
    for (var i = 0; i < allOperatorButtons.length; i++) {
        var ref = allOperatorButtons[i];
        ref.onclick = function() {
            if (document.getElementById("outputDisplay").value != "") {
                document.getElementById("outputDisplay").value = "";
            }
            var temp = displayDom.value;
            temp += this.innerHTML;
            displayDom.value = temp;
        }
    }
};

/*对计算式进行计算*/
function calculate() {
    var inputstr = document.getElementById("inputDisplay").value;
    if (/\/\*((\n|\r|.)*?)\*\//mg.test(inputstr) ||
        /\/\/.*/g.test(inputstr)) {
        alert("输入的计算式不合法！");
    } else {
        try {
            eval(inputstr);
        } catch (e) {
            if (e instanceof SyntaxError) {
                document.getElementById("outputDisplay").value = "Invalid";
                alert("输入的计算式不合法！");
            } else if (e instanceof TypeError) {
                document.getElementById("outputDisplay").value = "Invalid";
                alert("输入的计算式不合法！");
            }
        } finally {
            if (eval(inputstr) == "Infinity") {
                document.getElementById("outputDisplay").value = "Invalid";
                alert("输入的计算式不合法！");
            } else {
                var finalOutput = eval(inputstr).toFixed(6);
                document.getElementById("outputDisplay").value = eval(finalOutput);
            }
        }
    }
};

window.onload = function() {
    showInputButton();
    showOperatorButton();

    /*删除前一字符*/
    document.getElementById("left-arrow").onclick = function(){
        var temp = document.getElementById("inputDisplay").value;
        temp = temp.substr(0, temp.length - 1);
        document.getElementById("inputDisplay").value = temp;
    }

    /*删除整个计算式*/
    document.getElementById("ceButton").onclick = function(){
        document.getElementById("inputDisplay").value = "";
        document.getElementById("outputDisplay").value = "";
    }

    /*对计算式进行计算*/
    document.getElementById("equalButton").onclick = function() {
        calculate();
    }

}