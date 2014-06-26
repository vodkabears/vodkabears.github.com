(function () {
    $(".title, .subtitle").lettering();

    Pace.on("done", function(){
        $(".container").show();
    });
})();
