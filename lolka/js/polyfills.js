$(function () {
    "use strict";

    var placeholderSupported = 'placeholder' in document.createElement('input');

    if (!placeholderSupported) {
        $.getScript('js/jquery.placeholder.min.js', function () {
            $('input, textarea').placeholder();
        });
    }
});