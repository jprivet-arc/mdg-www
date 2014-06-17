/**
	For simple applications, you might define all of your views in this file.
	For more complex applications, you might choose to separate these kind definitions
	into multiple files under this folder.
 */

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



enyo.kind({
    name: "BlocksMasonry",
    kind: "Repeater",
    classes: "masonry-grid",
    handlers: {
        "onSetupItem": "createBlocks"
    },
    allowHtml: true,
    components: [

    {
        classes: "block",
        components: [

        {
            tag: "div",
            name: "image",
            kind: "SmartImage"
        // classes: "block-image"
        },
        {
            tag:"div",
            name: "text",
            classes: "block-text"
        }
        ]
    }
    ],
    create: function() {
        this.inherited(arguments);
        this.setCount(this.getRandomInt( 6, 10 ));
    },
    createBlocks: function(inSender, inEvent) {
        // console.log( "createBlocks() | this", this );
        // console.log( "createBlocks() | inSender", inSender );
        // console.log( "createBlocks() | inEvent", inEvent );

        var index = inEvent.index;
        var image = inEvent.item.$.image;
        var text = inEvent.item.$.text;

        var imageSources = [
        "http://wallpapersfor.me/wp-content/uploads/2012/02/car-skyline-motor-city-1920x1200-1024x640.jpg",
        "http://wallpapersfor.me/wp-content/uploads/2013/10/spin_out_move_it_wheel_fun_fair_attraction_1920x1080-1024x576.jpg",
        "http://wallpapersfor.me/wp-content/uploads/2012/10/ferrari-rear-lights-rain-street-city-1920x1080-1024x576.jpg",
        "http://wallpapersfor.me/wp-content/uploads/2012/02/city-hazy-blurred-unsharp-night-rain-1920x1080-1024x576.jpg",
        "http://wallpapersfor.me/wp-content/uploads/2013/09/cherry-blossoms-tree-bench-nature-1920x1080-1024x576.jpg",
        "http://wallpapersfor.me/wp-content/uploads/2012/10/cherryflowers_beautiful_nature_1920x1080-1024x576.jpg",
        "http://wallpapersfor.me/wp-content/uploads/2012/09/footbridge-domo-lake-water-nature-serene-1600x1200-1024x640.jpg",
        "http://wallpapersfor.me/wp-content/uploads/2012/10/tree-moss-green-plant-nature-1920x1200-1024x640.jpg",
        "http://kichiwall.com/wp-content/uploads/2014/01/BeautifulReflectionPhotography_001.png",
        "http://www.iainclaridge.co.uk/blog/wp-content/uploads/zhang_jingna2.jpg",
        "http://crispme.com/wp-content/uploads/Header2101.jpg?pass",
        ];
        
        imageSources = [
            "http://www.prevention.com/sites/default/files/imagecache/ssm_600w/static/heart-food-600x450-COMP-3058667.jpg",
            "http://npic.orst.edu/images/foodsafebnr.jpg",
            "http://www.seattleorganicrestaurants.com/vegan-whole-foods/images/Food-Guidelines.jpg",
            "http://static.guim.co.uk/sys-images/Observer/Pix/pictures/2012/12/17/1355742850221/Christmas-Dinner-008.jpg",
            "http://nancyguberti.com/wp-content/uploads/2013/10/foodforlifeblog.jpg",
            "http://www.brake.co.uk/_assets/495x320/School-food-standards-main-image_495x320px.jpg",
            "http://www.ctvnews.ca/polopoly_fs/1.840137!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg",
            "http://www.rawfoodlife.com/iStock_000009999916Small.jpg"
        ];

        var imageHeights = [
        80,
        120,
        180,
        250
        ]

        var textContents = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet sem lorem. In quis mauris rutrum, suscipit mauris nec, suscipit lacus. Sed quis neque vestibulum, lacinia urna in, hendrerit arcu. Nam luctus fermentum quam, ac rhoncus neque consectetur at. Donec vel sapien vehicula, lobortis tortor sed, commodo elit. Vestibulum sit amet aliquam mi, sit amet congue sapien. Ut placerat est vel ultricies laoreet. Morbi risus tortor, pretium quis dolor a, laoreet placerat lacus. Vivamus ut egestas tellus.",
        "Proin nec tellus sit amet nisl tincidunt dapibus. Duis faucibus, massa at rutrum adipiscing, tellus nisl vulputate nunc, et feugiat mauris tellus sit amet diam. Fusce eleifend pharetra elit quis porttitor. Phasellus vel lectus consectetur, vehicula sapien in, vulputate libero.",
        "Quisque elementum ornare dolor sed suscipit. Fusce eu felis id augue pulvinar consectetur.",
        "Phasellus id sollicitudin est. Sed congue, turpis sit amet sagittis placerat, massa arcu mattis orci, et cursus nunc justo sed purus. Donec augue eros, iaculis id adipiscing sed, tincidunt non libero. Sed eget lectus sed libero semper sodales id eu odio.",
        "Nullam condimentum odio sit amet lacus adipiscing, venenatis mollis nulla condimentum. Sed commodo felis a malesuada ultrices. Mauris turpis augue, consequat semper sodales ac, placerat ut metus.",
        "Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec a nibh sed massa fringilla porta a et orci. Integer turpis orci, vehicula ac dolor vel, rutrum pharetra enim. Donec sit amet hendrerit risus. Etiam ac orci mauris. Vestibulum malesuada bibendum ornare. Maecenas dolor metus, condimentum ut justo at, tincidunt gravida est. Ut ornare interdum nibh ut convallis.",
        "Vivamus quis risus libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus in tempus nulla, vitae egestas tellus. Nam at tellus quam.",
        "Donec facilisis tristique nulla, ac consectetur quam convallis rhoncus. Etiam porttitor lobortis velit, vitae porttitor odio tempus mattis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas blandit mi ante, vitae sodales erat egestas sed.",
        ];

        var colors = [
        "#F0B034",
        "#F59625",
        "#D76F13",
        "#8E3500",
        "#592300"
        ];

        var blockColor = this.getRandomInt( 0, ( colors.length - 1 ) );
        var imageIndex = this.getRandomInt( 0, ( imageSources.length - 1 ) );
        var imageHeightIndex = this.getRandomInt( 0, ( imageHeights.length - 1 ) );
        var textIndex = this.getRandomInt( 0, ( textContents.length - 1 ) );

        //image.applyStyle( 'background-image', 'url(\'' + imageSources[imageIndex] + '\')' );
        image.setSrc( imageSources[imageIndex] );
        image.applyStyle( 'height', imageHeights[imageHeightIndex] + 'px' );
        text.setContent( textContents[textIndex] );
        text.applyStyle( 'background', colors[blockColor] );

        return true; // Stop propagation
    },
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});



enyo.kind({
    name: "SlideContent",
    kind: "enyo.Scroller",
    horizontal: "hidden",
    touch: true,
    classes: "enyo-fit",
    blocks: 10,
    handlers: {
        "onScrollStop": "customScrollStop"
    },
    components: [
    {
        kind: "BlocksMasonry"
    }
    ],
    customScrollStop: function() {
        enyo.Signals.send("onCheckImage");
    }
});




enyo.kind({
    name: "Slides",
    kind: "enyo.Panels",
    fit: true,
    classes: "slide",
    arrangerKind: "CarouselArranger",
    realtimeFit: false,
    wrap: false,
    handlers: {
        "onTransitionFinish": "checkImage"
    },
    create: function() {
        this.inherited(arguments);

        for (var i = 0; i < 3; i++) {
            this.createComponent({
                kind: "SlideContent",
                // classes: "snap-slide", // Activate this class with rwatkins.Snapscroller
                blocks: this.getRandomInt( 8, 14 )
            });
        }
    },
    checkImage: function() {
        enyo.Signals.send("onCheckImage");
    },
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});



enyo.kind({
    name: "Dialog",
    kind: "enyo.Control",
    classes: "dialog-container",
    components: [

    {
        classes: "dialog",
        components: [

        {
            classes: "button",
            content: "Choix 1",
            ontap: "hideDialog"
        },
        {
            classes: "button",
            content: "Choix 2",
            ontap: "hideDialog"
        },
        {
            classes: "button ok",
            content: "Valider",
            ontap: "hideDialog"
        },
        {
            classes: "button cancel",
            content: "Annuler",
            ontap: "hideDialog"
        }
        ]
    }
    ],
    rendered: function() {
        this.inherited(arguments);

        setTimeout(enyo.bind(this, function() {
            this.addClass('show');
        }), 50);
    },
    hideDialog: function(inSender, inEvent) {
        this.removeClass('show');

        // Wait for CSS transition to end
        setTimeout(enyo.bind(this, function() {
            this.destroy();
        }), 500);

        return true;
    }
});


enyo.kind({
    name: "InputSheet",
    kind: "Slideable",
    classes: "enyo-fit sheet",
    draggable: false,
    overMoving: false,
    preventDragPropagation: true,
    axis: "v",
    unit: "%",
    min: 0,
    max: 100,
    value: 100,
    destroyOnDisappearance: false,
    handlers: {
        "onAnimateFinish": "destroySheet"
    },
    components: [

    {
        kind: "FittableRows",
        classes: "enyo-fit",
        components: [

        {
            kind: "onyx.Toolbar",
            components: [

            {
                tag: "p",
                content: "Inputs"
            },
            {
                tag: "div",
                classes: "toolbar-btn btn-sheet-close",
                ontap: "hideSheet"
            }
            ]
        },
        {
            kind: "enyo.Input",
            type: "search",
            classes: "app-input",
            placeholder: "Rechercher...",
            selectOnFocus: true
        },
        {
            kind: "enyo.Scroller",
            fit: true,
            touch: true,
            thumb: false,
            // classes: "enyo-fit",
            components: [

            {
                classes: "app-section",
                components: [
                {
                    kind: "enyo.Input",
                    type: "text",
                    classes: "app-input",
                    placeholder: "Champ texte...",
                    selectOnFocus: true
                }
                ]
            },
            {
                tag: "form",
                classes: "app-section",
                components: [
                {
                    kind: "enyo.Input",
                    type: "text",
                    classes: "app-input",
                    placeholder: "Sujet...",
                    selectOnFocus: true
                },
                {
                    kind: "enyo.TextArea",
                    type: "text",
                    classes: "app-input",
                    placeholder: "Message...",
                    selectOnFocus: true
                },
                {
                    classes: "app-button dark",
                    content: "Envoyer",
                    ontap: "hideSheet"
                }
                ]
            }
            ]
        }
        ]
    }
    ],
    showSheet: function(inSender, inEvent) {
        if (this.hasNode()) {
            $(this.node).find( 'input, textarea' ).each(function(){
                this.disabled = false;
            });

            this.animateToMin();
        }

        return true;
    },
    hideSheet: function(inSender, inEvent) {
        if (this.hasNode()) {
            $(this.node).find( 'input, textarea' ).each(function(){
                this.disabled = true;
            });

            this.animateToMax();
        }

        return true;
    },
    destroySheet: function() {
        if (this.destroyOnDisappearance) {
            this.destroy();
        }
    }
});



enyo.kind({
    name: "MainView",
    classes: "enyo-unselectable",
    handlers: {
        "onSnapScrollerResize": "checkViews"
    },
    components: [

    {
        kind: "FittableRows",
        classes: "enyo-fit",
        components: [

        {
            kind: "onyx.Toolbar",
            components: [

            {
                tag: "div",
                classes: "toolbar-btn btn-menu",
                ontap: "toggleDrawer"
            },
            {
                tag: "p",
                content: "Application"
            },
            {
                tag: "div",
                classes: "toolbar-btn btn-dialog",
                ontap: "showDialog"
            },
            {
                tag: "div",
                classes: "toolbar-btn btn-sheet",
                ontap: "showSheet"
            }
            ]
        },
        {
            kind: "SmoothPanels",
            name: "panels",
            // fit: true,
            classes: "enyo-fill",
            components: [

            {
                name: "first",
                classes: "panel",
                style: "background-color: blue",
                ontap: "next",
                content: "Click me!"
            },

            {
                name: "second",
                classes: "panel",
                style: "background-color: red",
                ontap: "previous",
                content: "Click me!"
            }
            ]
        }
        ]
    },
    {
        kind: "InputSheet",
        name: "sheet"
    },
    {
        kind: "Signals",
        ondeviceready: "deviceReady",
        ononline: "online",
        onoffline: "offline",
        onresume: "resume",
        onpause: "pause"
    }
    ],
    next: function() {
        this.$.panels.select(this.$.second);
    },
    previous: function() {
        this.$.panels.select(this.$.first, SmoothPanels.SLIDE_IN_FROM_LEFT, SmoothPanels.SLIDE_OUT_TO_RIGHT);
    },
    rendered: function() {
        this.inherited(arguments);

        // Check visible images
        enyo.Signals.send("onCheckImage");
    },
    showSheet: function(inSender, inEvent) {
        this.$.sheet.showSheet();
        return true;
    },
    showDialog: function(inSender, inEvent) {
        // this.$.dialog.addRemoveClass('show', true);
        if (!this.$.dialog) {
            this.log(this);
            this.createComponent({
                kind: "Dialog",
                name: "dialog"
            });

            this.$.dialog.render();
        } else {
            this.$.dialog.addRemoveClass('show', true);
        }

        return true;
    },
    checkViews: function(inSender, inEvent){
        // Resize stored views, otherwise snapScroller is going to mess up
        for (var i = 0; i < this.views.length; i++) {
            var view = this.views[i];
            view.style = "width: " + window.innerWidth + "px; height:" + ( window.innerHeight - view.heightOffset ) + "px;";
        }

        // WARNING: calling resized() will trigger resizeHandler() on snapScroller, resulting in an infinite loop
        // this.resized();

        enyo.Signals.send("onCheckImage");

        return true; // Otherwise Enyo keep searching through ancestors for other event handlers
    }
});
