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
        $(document.getElementById('loadingScreen')).fadeOut();
    });
})($, ContentSlider);
