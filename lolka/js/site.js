$(function(){
    "use strict";

    //Cross-domain AJAX
    $.support.cors = true;

    /**
     * Forms initialization function
     */
    var formsInit = function(){
        $('.form').submit(function(e){
            e.preventDefault();

            var $this = $(this),
                $emailInputs = $this.find('input[type="email"]'),
                $success = $this.find('.form-success'),
                $inputs = $this.find('.form-inputs'),
                $loader = $this.find('.form-loader'),
                flag = true,
                flagOne = true,
                reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            $emailInputs.each(function(i, elem){
                flagOne = reg.test(elem.value);
                if(!flagOne){
                    $(elem).addClass('invalid');
                } else {
                    $(elem).removeClass('invalid');
                }
                flag *= flagOne;
            });

            if(flag){
                $inputs.hide();
                $loader.show();

                $.post(this.action, $this.serialize(), function(){
                    $loader.hide();
                    $success.fadeIn();
                });
            }
        });
    };

    //initialization
    formsInit();
});