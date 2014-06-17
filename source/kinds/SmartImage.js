enyo.kind({
    name: "SmartImage",
    kind: "enyo.Image",
    classes: "smart-image",
    sizing: "cover",
    components: [

    {
        kind: "Signals",
        onCheckImage: "toggleImage"
    }
    ],
    toggleImage: function(inSender, inEvent) {
        // console.log( "toggleImage | this", this );
        // console.log( "toggleImage | inSender", inSender );
        // console.log( "toggleImage | inEvent", inEvent );

        var $el = $(this.node);
        var loadingStepClass = 'transition-init';
        var loadingClass = 'loading';
        if ($el.visible(true)) {
            if ( $el.hasClass( loadingClass ) ) {
                $el.addClass( loadingStepClass ).removeClass( loadingClass );

                setTimeout(function(){
                    $el.removeClass( loadingStepClass );
                }, 300 ); // Check CSS transition duration
            }
        } else {
            $el.addClass( loadingClass );
        }
    }
});

