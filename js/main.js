/*!
 * Main
 */
(function ($, ContentSlider) {
    "use strict";

    ContentSlider.init();

    $(".rslides").responsiveSlides({
        maxwidth: 570
    });

    $(window).load(function () {
        setTimeout(function () {
            window.scrollTo(0, 1);
        }, 0);
        $(document.getElementById('loadingScreen')).fadeOut();
    });
})($, ContentSlider);
