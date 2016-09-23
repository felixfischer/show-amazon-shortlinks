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
        var html = `<div class="a-spacing-large a-text-center a-size-mini" id="my-shortlink">
                        <a href="http://${URL}" onclick="return false" class="">${URL}</a>
                    </div>`;
        var pos = document.getElementById('tell-a-friend');
        pos.insertAdjacentHTML('afterend', html);
        //pos.classList.remove('a-spacing-small');
        //pos.classList.add('a-spacing-none');
        var el = document.getElementById('my-shortlink');
        el.onclick = function() {
            GM_setClipboard('http://'+URL);
            var info = document.getElementById('my-shortlink-info');
        };
    }

})(document);
