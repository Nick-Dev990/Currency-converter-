async function converter() {
    const amount=parseFloat(document.getElementById("amount").value);
    const from=document.getElementById("from").value;
    const to=document.getElementById("to").value;

    if (!amount||amount <=0){
        alert("Enter a valid Amount");
        return;
    }
    if(from===to){
    document.getElementById("result").innerText=
        `${amount} ${from}=$(amount} ${to}`;
        return;
        }

    document.getElementById("result").innerText="Convertion in progress...⌛";
    let result=null;
    try{
        const response=await fetch(`https://api.frankfurter.dev/v1/latest?from=${from}&to=${to}`);

    if(!response.ok){
        throw new Error("Bad request");
    }
        const data=await response.json();
        const rate=data.rates[to];
    if (!rate){
        throw new Error("Unsupported currency");
    }
    result=rate*amount;

        document.getElementById("result").innerText=
        `${amount} ${from}=${result.toFixed(2)} ${to}`;

    }catch(error){
        document.getElementById("result").innerText="Currency not supported ⚠️";
        console.error(error);
        return;
    }
        const historyList=document.getElementById("history");
        const item=document.createElement("li");
        item.innerHTML=`${amount} ${from} -> ${result.toFixed(2)} ${to}
        <span class="delete-btn">x</span>
        `;

        item.querySelector(".delete-btn").addEventListener("click", ()=>{
            item.remove();
        });
        
        historyList.prepend(item);

    
function convertCurrency(){
    const amount=parseFloat(document.getElementById("amount").value);
    const from=document.getElementById("from").value;
    const to=document.getElementById("to").value;

    const resultBox=document.getElementById("result");
    const resultText=document.getElementById("result-text");

    const converted=(amount*0.92).toFixed(2);
    resultText.innerHTML=`${amount} ${from} -> ${converted} ${to}`;
    resultBox.classList.remove("show");

    setTimeout(()=>{
        resultBox.classList.add("show");
    },50);
   }
}

function saveHistory(text){
    let history=JSON.parse(localStorage.getItem("history"))||[];
    history.unshift(text);
    localStorage.setItem("history", JSON.stringify(history));
}

function loadHistory(){
    let history=JSON.parse(localStorage.getItem("history"))||[];
    const historyList=document.getElementById("history");
    
    history.forEach(item => {
    const li=document.createElement("li");
    li.innerText=item;
    historyList.apprendChild(li);
    });
}
function swap(){
    const fromSelect=document.getElementById("from");
    const toSelect=document.getElementById("to");

    const fromValue=fromSelect.value;
    const toValue=toSelect.value;

    fromSelect.value=toValue;
    toSelect.value=fromValue;
}

function toggleTheme(){
    document.body.classList.toggle("dark");
}