/**
	For simple applications, you might define all of your views in this file.
	For more complex applications, you might choose to separate these kind definitions
	into multiple files under this folder.
 */

enyo.kind({
    name: "menuItem",
    classes: "menu-item-wrapper",
    components: [
    {
        kind: "Signals",
        onCloseSubmenu: "removeSelectedClass"
    },
    {
        name: "title",
        classes: "menu-item",
        content: "Default",
        ontap: "toggleSubmenu"
    },
    {
        name: "drawer",
        kind: "enyo.Drawer",
        open: false,
        orient: "v"
    }
    ],
    removeSelectedClass: function() {
        this.$.title.removeClass("selected");
        this.$.drawer.setOpen(false);
    },
    toggleSubmenu: function() {
        var alreadyOpened = this.$.drawer.open;

        if ( !alreadyOpened ) {
            enyo.Signals.send("onCloseSubmenu");
        }

        this.$.title.addRemoveClass("selected", !this.$.drawer.open);
        this.$.drawer.setOpen(!this.$.drawer.open);
    }
});



enyo.kind({
    name: "menuDrawer",
    kind: "enyo.Control",
    components: [

    {
        tag: "div",
        classes: "snap-drawers",
        components: [

        {
            tag: "div",
            classes: "snap-drawer snap-drawer-left",
            components: [

            {
                kind: "enyo.Scroller",
                fit: true,
                touch: true,
                thumb: false,
                classes: "enyo-fit",
                components: [

                {
                    name: "menuWrapper",
                    classes: "enyo-fit menu-wrapper",
                    allowHtml: true,
                    components: [

                    {
                        kind: "Signals",
                        onToggleMenu: "animateMenuItems"
                    },
                    {
                        kind: "Repeater",
                        onSetupItem: "setupMenuItem",
                        components: [

                        {
                            kind: "menuItem"
                        }
                        ]
                    }
                    ]
                }
                ]
            }
            ]
        },
        {
            tag: "div",
            classes: "snap-drawer snap-drawer-right"
        }
        ]
    }
    ],
    create: function() {
        this.inherited(arguments);
        this.$.repeater.setCount(this.entries.length);
    },
    setupMenuItem: function(inSender, inEvent) {
        var index = inEvent.index;
        var item = inEvent.item.$.menuItem;
        var data = this.entries[index];

        if ( typeof data !== 'undefined' ) {
            item.$.title.setContent( data.title );
            item.$.title.addClass( data.classes )

            if ( typeof data.submenu !== 'undefined' ) {
                var submenu = data.submenu;
                var subcount = submenu.length;

                item.$.title.addClass( "subcategories" )

                for (var i = 0; i < subcount; i++) {
                    item.$.drawer.createComponent({
                        tag: "div",
                        classes: "submenu-item",
                        content: submenu[i]
                    });
                }
            }
        }

        return true; // Stop propagation
    },
    animateMenuItems: function(inSender, inEvent) {
        // console.log( "this", this );
        // console.log( "inSender", inSender );
        // console.log( "inEvent", inEvent );

        this.$.menuWrapper.addRemoveClass("animate", inEvent.show);
    },
    entries: [
    {
        title: "Accueil",
        classes: "icon-home"
    },
    {
        title: "À la une",
        classes: "icon-news"
    },
    {
        title: "Agenda",
        classes: "icon-events"
    },
    {
        title: "Tourisme",
        classes: "icon-tourism",
        submenu: [
        "Les incontournables",
        "Musées",
        "Villes et villages classés",
        "Famille",
        "Visite de ferme",
        "Monuments",
        "Parcs et jardins",
        "Sites naturels remarquables",
        "Club des sites"
        ]
    },
    {
        title: "Annuaire sportif",
        classes: "icon-sport",
        submenu: [
        "Association",
        "Communauté de communes",
        "Conseil Général",
        "Entreprise",
        "Établissement public",
        "Fédération",
        "Fondation",
        "Mairie"
        ]
    },
    {
        title: "Pratique",
        classes: "icon-useful",
        submenu: [
        "Tout sur le département",
        "Toutes les démarches",
        "Nous contacter",
        "Applications recommandées",
        "Mentions légales"
        ]
    }
    ]
});



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
    blocksEffectIntervalID: null,
    handlers: {
        // "onScrollStart": "customScrollStart",
        "onScrollStop": "customScrollStop"
    },
    components: [
    {
        kind: "BlocksMasonry"
    }
    ],
    // Function for blocks appearance effect
    // WARNING: it is far too costly
    customScrollStart: function() {
        console.log( 'customScrollStart' );

        var $blocks = $(this.node).find('.block');

        this.blocksEffectIntervalID = setInterval(function() {
            console.log( 'checking blocks...' );

            $blocks.each(function(i, el) {
                var $el = $(el);

                // V1: http://css-tricks.com/slide-in-as-you-scroll-down-boxes/
                // if ($el.visible(true)) {
                // $el.addClass('come-in');
                // }

                // V2: http://css-tricks.com/slide-in-as-you-scroll-down-boxes/#comment-326912
                if (!$el.offScreen(150).top && !$el.offScreen(150).bottom) {
                    $el.removeClass("already-visible off-screen-top off-screen-bottom");
                    $el.addClass("come-in");
                } else {
                    if($el.offScreen(150).top) {
                        $el.addClass("off-screen-top");
                    } else {
                        $el.addClass("off-screen-bottom");
                    }
                }
            });
        },200, $blocks); // Remember to pass the object as an argument to the function
    },
    customScrollStop: function() {
        // console.log( 'customScrollStop' );

        if ( this.blocksEffectIntervalID ) {
            clearInterval(this.blocksEffectIntervalID);
        }

        enyo.Signals.send("onCheckImage");
    }
});



enyo.kind({
    name: "android.SlideContent",
    kind: "android.Scroller",
    horizontal: "hidden",
    classes: "enyo-fit",
    touch: true,
    handlers: {
        "onScrollStop": "customScrollStop"
    },
    components: [
    {
        kind: "BlocksMasonry"
    }
    ],
    customScrollStop: function() {
        // console.log( 'customScrollStop' );
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

    /*
    kind: "rwatkins.SnapScroller",
    classes: "snap-scroller",
    horizontal: "scroll",
    vertical: "hidden",
    handlers: {
        onSnap: "",
        onSnapFinish: "checkImage" // This seems to create a bug, going from the 1st snap to the 3rd
    },
    */

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


/*
enyo.kind({
    name: "mdg.MainView",
    kind: "FittableRows",
    snapper: null,
    components: [

    {
        kind: "menuDrawer"
    },

    {
        kind: "FittableRows",
        fit: true,
        classes: "main-content",
        attributes: {
            "data-snap-ignore": "true" // Needed to avoid swiping with snap.js
        },
        components: [

        {
            kind: "onyx.Toolbar",
            components: [

            {
                tag: "div",
                classes: "btn-menu",
                ontap: "toggleDrawer"
            },
            {
                tag: "p",
                content: "Application"
            }
            ]
        },
        {
            kind: "Slides"
        }
        ]
    }
    ],
    rendered: function() { // Function called right after the DOM has been created; whereas with create() DOM elements haven't been appended yet
        this.inherited(arguments);

        // WARNING: need to create a kind for snap
        // Example: https://github.com/morethanreal/enyo-googlemap/blob/master/lib/GoogleMap.js
        if (this.hasNode()) {
            this.snapper = new Snap({
                element: this.$.fittableRows.node,
                disable: 'right',
                tapToClose: true,
                maxPosition: 265 // same as CSS width, otherwise there is a 1px border
            });
        }

        // Uncomment this if swiping is activated to avoid blank menu on swiping
        // this.snapper.on('start', function() {
            // enyo.Signals.send("onToggleMenu", {
                // "show": true
            // });
        // });

            // For blocks effect
            // WARNING: the selector is ugly
            // $(enyo.$.app_mainView.node).find('.block').each(function(i, el) {
                // var $el = $(el);
                // if (!$el.offScreen(150).bottom) {
                    // $el.addClass("already-visible");
                // }
            // });

            // Check visible images
            enyo.Signals.send("onCheckImage");
    },
    toggleDrawer: function(inSender, inEvent) {
        // console.log( "this", this );
        // console.log( "inSender", inSender );
        // console.log( "inEvent", inEvent );

        if ( !!this.snapper ) {
            if( this.snapper.state().state == 'left' ){
                this.snapper.close();

                enyo.Signals.send("onToggleMenu", {
                    "show": false
                });

                enyo.Signals.send("onCloseSubmenu");
            } else {
                this.snapper.open( 'left' );

                enyo.Signals.send("onToggleMenu", {
                    "show": true
                });
            }
        }
    },
    resizeHandler: function(){
        this.inherited(arguments);

        setTimeout(function() {
            enyo.Signals.send("onCheckImage");
        }, 500);
    }
});
*/



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
    name: "mdg.MainView",
    kind: "FittableRows",
    snapper: null,
    handlers: {
        "onSnapScrollerResize": "checkViews"
    },
    components: [

    {
        kind: "menuDrawer"
    },

    {
        kind: "FittableRows",
        fit: true,
        classes: "main-content",
        attributes: {
            "data-snap-ignore": "true" // Needed to avoid swiping with snap.js
        },
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
        /*
        {
            name: "snapScroller",
            kind: "android.HSnapScroller",
            onTransitionFinish: "checkIndex",
            loadingView: {
                name: "loadingview",
                kind: "SnapScrollerCell",
                style: "width: " + window.innerWidth + "px; height: " + (window.innerHeight - 50) + "px;",
                cellComponents: [
                {
                    content: "Chargement...",
                    style: "font-size:200%;"
                }
                ]
            }
        },
                */
        {
            kind: "SmoothPanels",
            name: "panels",
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
        },

        {
            name: "sheet",
            kind: "Slideable",
            axis: "v",
            unit: "%",
            min: 0,
            max: 100,
            value: 100,
            draggable: false,
            overMoving: false,
            preventDragPropagation: true,
            classes: "enyo-fit sheet",
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
            ]
        }
        ]
    }
    ],
    next: function() {
        this.$.panels.select(this.$.second);
    },
    previous: function() {
        this.$.panels.select(this.$.first, SmoothPanels.SLIDE_IN_FROM_LEFT, SmoothPanels.SLIDE_OUT_TO_RIGHT);
    },
    rendered: function() { // Function called right after the DOM has been created; whereas with create() DOM elements haven't been appended yet
        this.inherited(arguments);

        // WARNING: need to create a kind for snap
        // Example: https://github.com/morethanreal/enyo-googlemap/blob/master/lib/GoogleMap.js
        if (this.hasNode()) {
            this.snapper = new Snap({
                element: this.$.fittableRows.node,
                disable: 'right',
                tapToClose: true,
                maxPosition: 265 // same as CSS width, otherwise there is a 1px border
            });
        }

        // Check visible images
        enyo.Signals.send("onCheckImage");
    },
    toggleDrawer: function(inSender, inEvent) {
        if ( !!this.snapper ) {
            if( this.snapper.state().state == 'left' ){
                this.snapper.close();

                enyo.Signals.send("onToggleMenu", {
                    "show": false
                });

                enyo.Signals.send("onCloseSubmenu");
            } else {
                this.snapper.open( 'left' );

                enyo.Signals.send("onToggleMenu", {
                    "show": true
                });
            }
        }

        return true;
    },
    showSheet: function(inSender, inEvent) {
        var sheet = this.$.sheet;

        if (sheet.hasNode()) {
            $(sheet.node).find( 'input, textarea' ).each(function(){
                this.disabled = false;
            });

            sheet.animateToMin();
        }

        return true;
    },
    hideSheet: function(inSender, inEvent) {
        var sheet = this.$.sheet;

        if (sheet.hasNode()) {
            $(sheet.node).find( 'input, textarea' ).each(function(){
                this.disabled = true;
            });

            sheet.animateToMax();
        }

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

    cellIndex: 0,
    views: [],
    create: function() {
        this.inherited(arguments);

        if (this.$.snapScroller) {
            this.resetToZero();
        }
    },
    resetToZero: function() {
        this.views = [];
        this.cellIndex = 0;
        this.viewIndex = 0;
        this.generateViews(6);
        this.$.snapScroller.setItems(this.views, 0, true);
    },
    createCell: function() {
        var offset = 54; //this.$.toolbar.outerHeight();
        var a = {
            kind: "SnapScrollerCell",
            name: "cell" + this.cellIndex,
            heightOffset: offset,
            style: "width: " + window.innerWidth + "px; height:" + ( window.innerHeight - offset ) + "px;",
            cellComponents: [
            {
                kind: "android.SlideContent"
            }
            ]
        };
        this.cellIndex++;
        return a;

    /* TEST WITH DELAYED IMAGES - No flicker, but only with 3-4 images...
        var h = window.innerHeight - 54; // Must be toolbar's height
        var a = {
            kind: "SnapScrollerCell",
            name: "cell" + this.cellIndex,
            style: "width: " + window.innerWidth + "px;height:" + h + "px;",
            cellComponents: [
            {
                kind: "android.Scroller",
                classes: "enyo-fit",
                horizontal: "hidden",
                components: []
            }
            ]
        };
        a.cellComponents[0].components.push({
            content: "<b>View Number: " + this.cellIndex + "</b>",
            allowHtml: true
        });
        for (var i = 0; i < 3; i++) {
            a.cellComponents[0].components.push(this.generateImage("DelayedImage"));
        }
        this.cellIndex++;
        return a;
        */
    },
    generateImage: function(kind) {
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
        var x = Math.floor(Math.random() * imageSources.length);
        var a = {
            kind: kind,
            src: imageSources[x],
            maxWidth: window.innerWidth + "px"
        };
        if (kind == "Image") {
            a.style = "max-width:" + a.maxWidth + ";";
        }
        return a;
    },
    generateViews: function(count) {
        for (var i = 0; i < count; i++) {
            this.views.push(this.createCell());
        }
    },
    viewIndex: 0,
    sentRequest: false,
    checkIndex: function(inSender, inEvent) {
        this.viewIndex = inEvent.index;
        if (inEvent.index + 3 > this.views.length && this.sentRequest === false) {
            this.sentRequest = true;
            this.generateNewViews();
        }

        // MODIF: transition is finished; check visible images
        enyo.Signals.send("onCheckImage");
    },
    generateNewViews: function() {
        this.generateViews(6);
        this.$.snapScroller.setItems(this.views, this.viewIndex, false);
        this.sentRequest = false;
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
