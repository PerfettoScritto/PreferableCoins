$(document).ready(function() {

    setDefaultCurrency("RUB");

    var currency = localStorage.getItem("currency");

    var YQL = "https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22" + currency + "BYR%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

    $.getJSON(YQL, function(data) {

        var currencyData = data;

        var currencyRate = currencyData.query.results.rate.Rate * 1;


        var cardPrice = document.querySelector("div.adview_subject__price>strong.adview_subject__amount");

        var pastCardPrice = document.querySelector(".adview_subject__discount>strong.adview_subject__amount");

        var discountPrice = document.querySelectorAll(".list_ads__price>.list_ads__discount");

        var denominationPrice = document.querySelectorAll("span.adview_list__no_denom_price");

        if (discountPrice) {

            for (var k = 0; k < discountPrice.length; k++) {

                var discountPriceNumber = getPrice(discountPrice[k], currencyRate);

                discountPrice[k].style.textDecoration = "none";

                //Don't show temporarily discount price , because the right
                //data is missing now
               /* discountPrice[k].innerHTML = "<span class='endPrice' style='text-decoration:line-through'>" + discountPriceNumber + "</span>" + "<span style='font-size:14px;padding-right:12px;'>  " + currencySymbol(currency) + "</span> ";*/
               discountPrice[k].innerHTML ="";


                      }
                }
        if  (denominationPrice)   {
              for (var a = 0; a < denominationPrice.length; a++) {
                denominationPrice[a].style.display="none";

              }

        }

        if (pastCardPrice) {

            var pastCardPriceNumber = getPrice(pastCardPrice, currencyRate);

            pastCardPrice.parentNode.style.textDecoration = "none";

           //Don't show temporarily discount price , because the right
           //data is missing now
           // pastCardPrice.nextSibling.textContent = " ";

           /* pastCardPrice.innerHTML = "<span style='font-size:20px;color:grey;text-decoration:line-through'>" + pastCardPriceNumber + "</span>" + "<span style='font-size:22px;color:grey;padding-right:25px'> " + currencySymbol(currency) + "</span>";*/
           pastCardPrice.innerHTML =" ";

                       }

        if (cardPrice) {

            var cardPriceNumber = getPrice(cardPrice, currencyRate);

            cardPrice.nextSibling.textContent = " ";

            cardPrice.innerHTML = "<span style='font-size:25px;font-weight:normal' class='endPrice'> " + cardPriceNumber + "</span>" + "<span style='font-size:26px;font-weight:normal'> " + currencySymbol(currency) + "</span>";

                    }


        var prices = document.getElementsByTagName("span");



        for (var i = 0, sum = [], y = 0; i < prices.length; i++, y++) {

            if (prices[i].hasAttribute("dir") && prices[i].innerHTML !== "") {

                sum[y] = prices[i];

                  } else {

                         y = y - 1;

                        }
                   }

        for (var z = 0; z < sum.length; z++) {

            var endPrice = getPrice(sum[z], currencyRate);

            sum[z].nextSibling.textContent = " ";

            sum[z].innerHTML = "<span class='endPrice'>" + endPrice + "</span>" + "<span style='font-size:14px'> " + currencySymbol(currency) + "</span> ";
                    }

               sum = [];

 });


 chrome.runtime.onMessage.addListener(

     function(request, sender, sendResponse) {


            if (localStorage.getItem("currency") === request.action) {

                return false;

               } else {

            // console.log(localStorage.getItem("currency") + request.action);

                localStorage.setItem("currency", request.action);

                sendResponse({

                    farewell: "goodbye"

                });

                location.reload();
            }


      });


});




function currencySymbol(symbol) {

    var symbols = {
        RUB: "&#8381;",
        USD: "$",
        EUR: "&euro;",
        BYR: "Br"
    };

    return symbols[symbol];
}


function getPrice(itemPrice, currencyRate) {

    // var price = itemPrice.innerHTML.replace(/\s+/g, '');
    // price = parseInt(price, 10);
    // price = Math.round(price / currencyRate);
    // price = formatNumber(price);
    // return price;

    // After denomination in Belarus 2016
    //return array of rubles and copecks
    var price = itemPrice.innerHTML.replace(/\s+/g, '');
    price = price.match(/\d+/gi);
    //console.log(price);
    if(price[0]&&price[1]){
    price = (parseInt(price[0], 10)*100 + parseInt(price[1],10))/100;}
    else {price=parseInt(price[0], 10);}
    if (currencyRate!=1) {
    price = Math.round(price*10000/currencyRate);
    price = formatNumber(price);
    // console.log(currencyRate);
    return price;}
     else {
      price = Math.round(price/currencyRate);
      price = formatNumber(price);
      return price;
     }



}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}

function setDefaultCurrency(currency) {
    if (!localStorage.getItem("currency")) {
        localStorage.setItem("currency", currency);
    }
}
