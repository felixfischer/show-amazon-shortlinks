// ==UserScript==
// @name         Amazon Short Links
// @namespace    http://felixfischer.com/
// @version      1.0
// @description  Adds a shortlink to Amazon product pages
// @author       Felix Fischer
// @include      *.amazon.*
// @grant        GM_setClipboard
// ==/UserScript==


(function(doc) {

    var ASIN = doc.getElementById("ASIN") || doc.getElementsByName("ASIN.0")[0];

    if (ASIN) {
        ASIN = ASIN.value;
        var TLD = window.location.hostname.split('.').pop();
        var URL = `amzn.${TLD}/dp/${ASIN}`;
        var html = `
<div class="a-spacing-large a-text-center" id="my-shortlink">
<span class="a-button a-button-small a-spacing-mini">
<span class="a-button-inner">
Short Link: <a href="http://${URL}" onclick="return false" class="a-button-text" data-orig-text="${URL}">${URL}</a>
</span>
</span>
<p class="navFooterDescText" id="my-shortlink-info">click to copy short link</p>
</div>
<style>
#my-shortlink #my-shortlink-info { opacity: 0; transition: 0.5s; }
#my-shortlink:hover #my-shortlink-info { opacity: 1; transition: 0.5s; }
</style>
`;
        var pos = document.getElementById('rightCol');
        pos.insertAdjacentHTML('afterbegin', html);
        var el = document.getElementById('my-shortlink');
        el.onclick = function() {
            GM_setClipboard('http://'+URL);
            var info = document.getElementById('my-shortlink-info');
            console.log(info);
            info.innerHTML = 'copied to clipboard';
        };
    }


})(document);
