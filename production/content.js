function currencySymbol(e){var t={RUB:"&#8381;",USD:"$",EUR:"&euro;",BYR:"Br"};return t[e]}function getPrice(e,t){var r=e.innerHTML.replace(/\s+/g,"");return r=r.match(/\d+/gi),r=r[0]&&r[1]?(100*parseInt(r[0],10)+parseInt(r[1],10))/100:parseInt(r[0],10),1!=t?(r=Math.round(r/t),r=formatNumber(r)):(r=Math.round(r/t),r=formatNumber(r))}function formatNumber(e){return e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1 ")}function setDefaultCurrency(e){localStorage.getItem("currency")||localStorage.setItem("currency",e)}function getCurrencyRate(e,t){var e=e,t=t;if("BYR"===e){var r=1;return r}for(var n=0;n<t.length;n++){if(e===t[n].Cur_Abbreviation&&"RUB"!==e){console.log(" В настоящий момент валюта "+e);var r=1*t[n].Cur_OfficialRate;return console.log(r),r}if(e===t[n].Cur_Abbreviation&&"RUB"===e){var r=t[n].Cur_OfficialRate/100;return console.log(r),r}}}$(document).ready(function(){setDefaultCurrency("RUB");var e=localStorage.getItem("currency"),t="http://www.nbrb.by/API/ExRates/Rates?Periodicity=0";$.getJSON(t,function(t){var r=t;console.log(r);var n=getCurrencyRate(e,r),o=document.querySelector("div.adview_subject__price>strong.adview_subject__amount"),a=document.querySelector(".adview_subject__discount>strong.adview_subject__amount"),c=document.querySelectorAll(".list_ads__price>.list_ads__discount"),i=document.querySelectorAll("span.adview_list__no_denom_price");if(c)for(var l=0;l<c.length;l++){getPrice(c[l],n);c[l].style.textDecoration="none",c[l].innerHTML=""}if(i)for(var u=0;u<i.length;u++)i[u].style.display="none";if(a){getPrice(a,n);a.parentNode.style.textDecoration="none",a.innerHTML=" "}if(o){var s=getPrice(o,n);o.nextSibling.textContent=" ",o.innerHTML="<span style='font-size:25px;font-weight:normal' class='endPrice'> "+s+"</span><span style='font-size:26px;font-weight:normal'> "+currencySymbol(e)+"</span>"}for(var g=document.getElementsByTagName("span"),d=0,f=[],y=0;d<g.length;d++,y++)g[d].hasAttribute("dir")&&""!==g[d].innerHTML?f[y]=g[d]:y-=1;for(var m=0;m<f.length;m++){var _=getPrice(f[m],n);f[m].nextSibling.textContent=" ",f[m].innerHTML="<span class='endPrice'>"+_+"</span><span style='font-size:14px'> "+currencySymbol(e)+"</span> "}f=[]}),chrome.runtime.onMessage.addListener(function(e,t,r){return localStorage.getItem("currency")===e.action?!1:(localStorage.setItem("currency",e.action),r({farewell:"goodbye"}),location.reload(),void 0)})});