
chrome.runtime.onMessage.addListener(

  function(request, sender, sendResponse) {

    if (request.greeting === "popup"){

     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

         if(tabs[0].url.search(/kufar.by/i)!==-1) {

         chrome.tabs.sendMessage(tabs[0].id, {action: request.currency},

              function(response) {});
           }
            else {
           localStorage.setItem("currency",request.currency);

           chrome.tabs.onActivated.addListener(function (activeInfo) {


             chrome.tabs.get(activeInfo.tabId, function(tab){


                 if(tab.url.search(/kufar.by/i)!==-1) {


                   var currency =localStorage.getItem("currency");

                  chrome.tabs.sendMessage(tab.id, {action: currency}, function(response) {

                     if(!response) {console.log(chrome.runtime.lastError);}

                           else {console.log(response.farewell);}

                                  });

                        }

                  });

          });


      }

   });


 }

});