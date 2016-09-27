// ==UserScript==
// @name         Amazon Shortlinks
// @namespace    https://github.com/felixfischer/show-amazon-shortlinks
// @version      1.2
// @description  Adds a shortlink to Amazon product pages
// @supportURL   https://github.com/felixfischer/show-amazon-shortlinks/issues
// @author       Felix Fischer
// @include      *www.amazon.*
// @include      *smile.amazon.*
// @grant        GM_setClipboard
// ==/UserScript==

(function(doc) {

    var ASIN = doc.getElementById("ASIN") || doc.getElementsByName("ASIN.0")[0];
    if (ASIN) {
        ASIN = ASIN.value;
        history.replaceState(null, "", "/dp/" + ASIN);
        var TLD = window.location.hostname.split('.').pop();
        var URL = `amzn.${TLD}/dp/${ASIN}`;
        var html = `<div class="a-spacing-large a-text-center a-size-mini" id="my-shortlink">
                        <a href="http://${URL}" onclick="return false" title="click to copy">${URL}</a>
                    </div>`;
        var pos = document.getElementById('tell-a-friend');
        pos.insertAdjacentHTML('afterend', html);
        var el = document.getElementById('my-shortlink');
        el.onclick = function() {
            GM_setClipboard('http://'+URL);
        };
    }

})(document);
