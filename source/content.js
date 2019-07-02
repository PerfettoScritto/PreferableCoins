$(document).ready(function() {

    setDefaultCurrency("RUB");

    var currency = localStorage.getItem("currency");

    var YQL = "https://www.nbrb.by/API/ExRates/Rates?Periodicity=0";

    $.getJSON(YQL, function(data) {

        var currencyData = data;

        console.log(currencyData);

        var currencyRate = getCurrencyRate(currency, currencyData);


        var cardPrice = document.querySelector(".src-components-cardPrice-style__price_byn__adview--LI54oDZlad");
        // console.log(cardPrice);

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
                discountPrice[k].innerHTML = "";


            }
        }
        if (denominationPrice) {
            for (var a = 0; a < denominationPrice.length; a++) {
                denominationPrice[a].style.display = "none";

            }

        }

        if (pastCardPrice) {

            var pastCardPriceNumber = getPrice(pastCardPrice, currencyRate);

            pastCardPrice.parentNode.style.textDecoration = "none";

            //Don't show temporarily discount price , because the right
            //data is missing now
            // pastCardPrice.nextSibling.textContent = " ";

            /* pastCardPrice.innerHTML = "<span style='font-size:20px;color:grey;text-decoration:line-through'>" + pastCardPriceNumber + "</span>" + "<span style='font-size:22px;color:grey;padding-right:25px'> " + currencySymbol(currency) + "</span>";*/
            pastCardPrice.innerHTML = " ";

        }

        if (cardPrice) {

            var cardPriceNumber = getPrice(cardPrice, currencyRate);

            var priceBlock = document.createElement("div");

            priceBlock.setAttribute("class", "price-block");

            priceBlock.innerHTML = "<span style='font-size:25px;font-weight:normal' class='endPrice'> " + cardPriceNumber + "</span>" + "<span style='font-size:26px;font-weight:normal'> " + currencySymbol(currency) + "</span>";
            document.body.appendChild(priceBlock);
            // cardPrice.nextSibling.textContent = " ";

        }


        var prices = document.querySelectorAll("span.kf-o-R-Ynlu");



        for (var i = 0, sum = [], y = 0; i < prices.length; i++, y++) {

            if (prices[i].getAttribute("class") && prices[i].innerHTML !== "") {

                sum[y] = prices[i];

            } else {

                y = y - 1;

            }
        }

        for (var z = 0; z < sum.length; z++) {

            var endPrice = getPrice(sum[z], currencyRate);

            // sum[z].nextSibling.textContent = " ";

            sum[z].innerHTML = "<span class='endPrice'>" + endPrice + "</span>" + "<span style='font-size:14px'> " + currencySymbol(currency) + "</span> ";
        }

        sum = [];


    });

    reloadPage();

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
    if (price[0] && price[1]) {
        price = (parseInt(price[0], 10) * 100 + parseInt(price[1], 10)) / 100;
    } else { price = parseInt(price[0], 10); }
    if (currencyRate != 1) {
        price = Math.round(price / currencyRate);
        price = formatNumber(price);
        // console.log(currencyRate);
        return price;
    } else {
        price = Math.round(price / currencyRate);
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


function getCurrencyRate(currency, currencyData) {

    var currency = currency;
    var currencyData = currencyData;
    // console.log(currency);
    // console.log(currencyData);
    if (currency === "BYR") {
        var currencyRate = 1;
        return currencyRate;
    }
    for (var i = 0; i < currencyData.length; i++) {

        if (currency === currencyData[i].Cur_Abbreviation && currency !== "RUB") {

            console.log(" В настоящий момент валюта " + currency);

            var currencyRate = currencyData[i].Cur_OfficialRate * 1;

            console.log(currencyRate);

            return currencyRate;

        }

        if (currency === currencyData[i].Cur_Abbreviation && currency === "RUB") {

            var currencyRate = currencyData[i].Cur_OfficialRate / 100;
            console.log(currencyRate);
            return currencyRate;
        }
    }

}

function reloadPage() {

    var pagination = document.querySelectorAll("a.kf-a-c-luaw");
    // console.log(pagination);
    for (var i = 0; i < pagination.length; i++) {
        console.log(pagination[i]);
        pagination[i].addEventListener("click", function() { setTimeout(function() { window.location.reload(); }, 300) })
    }
}

