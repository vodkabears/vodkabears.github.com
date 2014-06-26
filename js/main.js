(function () {
    "use strict";

    $(".title, .subtitle").lettering();

    window.onload = function () {
        // make content visible when loading stops.
        $(".container").removeClass("hidden");

        // init canvas background
        BG.init();
    };

    var resizeTimeout;
    window.onresize = function () {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(function () {
            BG.resize();
        }, 100);
    };
})();
