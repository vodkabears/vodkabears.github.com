/*!
 * Content slider module
 */
(function (global, $, Modernizr) {
    "use strict";

    var ContentSlider = (function () {

        // default hash
        var defaultAnchor = 'aboutme';

        /**
         * Hash change handler
         * @private
         * @param {string} hash
         */
        var hashHandler = function (hash) {
            var anchor = hash.substr(1);

            //if no anchor, set default
            if (!anchor) {
                anchor = defaultAnchor;
            }

            ContentSlider.goTo(anchor);
        };

        /**
         * Add event listeners
         * @private
         */
        var addEventListeners = function () {
            ContentSlider.$leftCtrl.bind('click', function () {
                ContentSlider.prev();
            });

            ContentSlider.$rightCtrl.bind('click', function () {
                ContentSlider.next();
            });

            ContentSlider.$toStartCtrl.bind('click', function () {
                ContentSlider.first();
            });

            // Swipe left listener for touch screens
            $(document.body).hammer().on('swipeleft', function () {
                ContentSlider.next();
            });

            // Swipe right listener for touch screens
            $(document.body).hammer().on('swiperight', function () {
                ContentSlider.prev();
            });

            $(document.body).bind('keyup', function (e) {
                switch (e.which) {
                    case 37:
                        ContentSlider.prev();
                        break;
                    case 39:
                        ContentSlider.next();
                        break;
                    default:
                        break;
                }
            });

            $(window).bind('hashchange', function () {
                hashHandler(location.hash);
            });
        };

        /**
         * Move slides
         * @private
         * @param {number} number
         */
        var moveTo = function (number) {
            //check
            if (number <= 0 ||
                number > ContentSlider.count ||
                ContentSlider.currentNumber === number ||
                ContentSlider.isBlocked) {
                return;
            }

            // then check the current number, and set it, if it is not.
            if (ContentSlider.currentNumber === -1) {
                ContentSlider.currentNumber = 1;
            }

            var $nextSlide = $(ContentSlider.$slides[number - 1]);

            ContentSlider.isBlocked = true;
            (function ($prev, $next) {
                $next.removeClass('invisible').css('opacity', '0').animate({
                    opacity: 1
                }, 600, function () {
                    ContentSlider.isBlocked = false;
                    $prev.addClass('invisible');
                });
            })(ContentSlider.$currentSlide, $nextSlide);

            // update classes of slides
            if (ContentSlider.$currentSlide) {
                ContentSlider.$currentSlide.removeClass('current');
            }
            ContentSlider.currentNumber = number;
            ContentSlider.$currentSlide = $nextSlide;
            ContentSlider.$currentSlide.addClass('current');

            // remove classes from controls
            ContentSlider.$toStartCtrl.removeClass('hidden');
            ContentSlider.$leftCtrl.removeClass('hidden');
            ContentSlider.$rightCtrl.removeClass('hidden');

            // add classes to controls
            if (ContentSlider.currentNumber === 1) {
                ContentSlider.$toStartCtrl.addClass('hidden');
                ContentSlider.$leftCtrl.addClass('hidden');
            } else if (ContentSlider.currentNumber === ContentSlider.count) {
                ContentSlider.$rightCtrl.addClass('hidden');
            }

            // update hash. It will call hashHandler again,
            // and then progress will stop at the beginning of this function
            var anchor = ContentSlider.$currentSlide.attr('data-name');
            if (anchor) {
                location.hash = anchor;
            }
        };

        return {
            /**
             * Initialization. Must be called first.
             * @public
             */
            init: function () {
                this.$container = $(document.getElementById('container'));
                this.$slides = this.$container.find('.slide');
                this.$leftCtrl = $(document.getElementById('leftCtrl'));
                this.$rightCtrl = $(document.getElementById('rightCtrl'));
                this.$toStartCtrl = $(document.getElementById('toStartCtrl'));
                this.currentNumber = -1;
                this.$currentSlide = $();
                this.count = this.$slides.length;
                this.acceleration = Modernizr.csstransitions;
                this.isBlocked = false;

                this.$slides.addClass('invisible');

                addEventListeners();
                hashHandler(location.hash);
            },

            /**
             * Next slide.
             * @public
             */
            next: function () {
                moveTo(this.currentNumber + 1);
            },

            /**
             * Previous slide.
             * @public
             */
            prev: function () {
                moveTo(this.currentNumber - 1);
            },

            /**
             * To the first slide.
             * @public
             */
            first: function () {
                moveTo(1);
            },

            /**
             * to the last slide
             * @public
             */
            last: function () {
                moveTo(this.count);
            },

            /**
             * Find and show a slide by a number or name.
             * @public
             * @param {string, number} param
             */
            goTo: function (param) {
                var number;

                if (typeof param === 'number') {
                    number = param;
                } else if (typeof param === 'string') {
                    number = this.$slides.filter('[data-name="' + param + '"]').index() + 1;
                    if (number === 0) {
                        number = 1;
                    }
                } else {
                    return;
                }

                moveTo(number);
            }
        };
    })();

    global.ContentSlider = ContentSlider;

})(this, jQuery, Modernizr);
