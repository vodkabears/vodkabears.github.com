(function () {
    "use strict";

    $(".interactive-title, .interactive-subtitle").lettering();

    window.onload = function () {
        // make content visible when loading stops.
        $(".page-container").removeClass("hidden");

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
