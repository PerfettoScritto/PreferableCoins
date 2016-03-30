
window.onload= function() {

   if (localStorage.getItem("currency")) {

   checkRadioButton();
} else {localStorage.setItem("currency","RUB");

checkRadioButton();




}



var currencyForm = document.forms.currencyForm;
currencyForm.addEventListener("click", function(e){
  if(event.target.type==="radio"&&event.target.name==="currency"){


localStorage.setItem("currency", event.target.value);

chrome.runtime.sendMessage({greeting: "popup", currency:event.target.value});

}

},false)


}


function checkRadioButton () {
       var radios = document.getElementsByTagName('input');

     for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === 'radio'&& radios[i].name === 'currency' ) {


        if (radios[i].value===localStorage.getItem("currency")) {
          radios[i].checked=true;
          chrome.runtime.sendMessage({greeting: "popup", currency:radios[i].value});
        }
    }

}
}