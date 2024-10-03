const baseURL =     "https://2024-03-06.currency-api.pages.dev/v1/currencies/"; //eur.json" //eur.json";

const dropdown = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdown){
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name=="from" && currcode=="USD"){
            newoption.selected = "selected";
        }
        else if(select.name=="to" && currcode=="INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
     
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })

}

const updateflag = (element)=>{
    let currcode = element.value
    let contrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${contrycode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc
}


btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amt = document.querySelector(".amount input");
    let amtval = amt.value;
    if(amtval=="" || amtval<1){
        amtval = 1;
        amt.value = "1";
    }
    
    const URL=`${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL); 
    let data=await response.json();
    
    let rate= data[`${fromCurr.value.toLowerCase()}`][`${tocurr.value.toLowerCase()}`]
    console.log(rate);
    let finalamount = rate*amtval;
    msg.innerText =` ${amtval}${fromCurr.value} = ${finalamount}${tocurr.value}`//1USD = 80INR essa kuch

})