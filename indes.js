document.addEventListener("DOMContentLoaded", function() {
    const display = document.querySelector("#display");
    const buttons = document.querySelectorAll("button");
    const list = document.querySelector("#historyList");
    const customHistory = localStorage.getItem("customHistory");
    if(!customHistory){
        localStorage.setItem("customHistory", JSON.stringify([]));
    }

    buttons.forEach(btn =>{
        btn.addEventListener("click", handleBtn);
    })

    showHistory(list, JSON.parse(customHistory));


    function handleBtn(event) {
        const {value,name} = event.target
        console.log(value,name)
        console.log(event.target);
        switch (name) {
            case "C":
                clear();
                break;
    
            case "result":
                showResult();
                break;
            
            case "clear":
                localStorage.clear();
                window.location = "/";
                break;
        
            default:
                show(name, value);
                break;
        }
    }
    function clear() {
        display.setAttribute("value", "");
    }

    function run(operation) {
        try {
            return new Function(`return ${operation};`)();
        } catch (error) {
            return "Syntax Error"
        }
    }

    function showResult() {
        const result = run(display.getAttribute("value"));
        if (result !== "Syntax Error"){
            addToHist(display.getAttribute("value"), result);
        }
        display.setAttribute("value", result);
    }

    function show(name,v) {
        let preValue = display.value;
        if (v === "."){
            if(preValue.includes(".")){
                v = ""
            }
            else if(!preValue.includes(".") && !preValue){
                v = "0."
            }
        }
        else if(preValue === "" && ["-", "+", "*", "/"].includes(name)){
            v = "";
        }
        let newValue = preValue + v;
        display.setAttribute("value", newValue);
    }

    
    function addToHist(operation, result){
        let history = JSON.parse(localStorage.getItem("customHistory"))
        const element = {opLine: operation, resultLine: result}
        history.push(element)
        localStorage.setItem("customHistory", JSON.stringify(history));
        showHistory(list, history);
    }

    function showHistory(list, history){
        list.innerHTML= '';
        history.forEach(element => {
            const listItem = document.createElement("li");
            const textChild =  `${element.opLine} = ${element.resultLine}`
            listItem.append(textChild);
            list.appendChild(listItem);
        });
    }
});