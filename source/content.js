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

        if (discountPrice) {

            for (var k = 0; k < discountPrice.length; k++) {

                var discountPriceNumber = getPrice(discountPrice[k], currencyRate);

                discountPrice[k].style.textDecoration = "none";


                discountPrice[k].innerHTML = "<span class='endPrice' style='text-decoration:line-through'>" + discountPriceNumber + "</span>" + "<span style='font-size:14px;padding-right:12px;'>  " + currencySymbol(currency) + "</span> ";

                      }
                }

        if (pastCardPrice) {

            var pastCardPriceNumber = getPrice(pastCardPrice, currencyRate);

            pastCardPrice.parentNode.style.textDecoration = "none";

            pastCardPrice.nextSibling.textContent = " ";

            pastCardPrice.innerHTML = "<span style='font-size:20px;color:grey;text-decoration:line-through'>" + pastCardPriceNumber + "</span>" + "<span style='font-size:22px;color:grey;padding-right:25px'> " + currencySymbol(currency) + "</span>";

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

    var price = itemPrice.innerHTML.replace(/\s+/g, '');
    price = parseInt(price, 10);
    price = Math.round(price / currencyRate);
    price = formatNumber(price);
    return price;

}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}

function setDefaultCurrency(currency) {
    if (!localStorage.getItem("currency")) {
        localStorage.setItem("currency", currency);
    }
}
