enyo.kind({
    name: "RecipeView",
    kind: "FittableRows",
    classes: "enyo-fit",
    handlers: {
        onresize: "checkButtons"
    },
    published: {
        ingredientsSource: "",
        preparationSource: ""
    },
    components: [
    {
        kind: "ContentHeaderNavbar",
        name: "navbar"
    },
    {
        name: "infosContainer",
        classes: "recipeview-infos-container",
        components: [

        {
            kind: "Image",
            name: "image",
            classes: "recipeview-image",
            sizing: "cover"
        },
        {
            kind: "onyx.RadioGroup",
            classes: "recipeview-tabs",
            onActivate: "swapDetails",
            components: [

            {
                content: "Ingrédients",
                active: true
            },
            {
                content: "Préparation"
            }
            ]
        }
        ]
    },
    {
        kind: "Panels",
        name: "detailsPanels",
        fit: true,
        draggable: false,
        /*
        kind: "SmoothPanels",
        name: "detailsPanels",
        fit: true,
        async: false,
        inAnim: "slideInFromLeft",
        outAnim: "slideOutToRight",
        duration: 500,
        */

        components: [

        {
            kind: "Scroller",
            name: "ingredientsView",
            classes: "enyo-fit",
            horizontal: "hidden",
            touch: true,
            // onScroll: "parallax",
            components: [

            {
                name: "ingredientsContent",
                classes: "recipeview-details",
                allowHtml: true,
                content: "ingrédients"
            }
            ]
        },
        {
            kind: "Scroller",
            name: "preparationView",
            classes: "enyo-fit",
            horizontal: "hidden",
            touch: true,
            // onScroll: "parallax",
            components: [

            {
                kind: "BlocksMasonry",
                classes: "recipeview-details"
            }
            ]
        }
        ]
    }
    ],
    imgSrc: [
    "http://www.jocelynmathewesphotography.com/wp-content/uploads/2013/07/2013-food-photography-johnson-city-tennessee-pomegranate-004.jpg",
    "http://www.spiciefoodie.com/blogimages/2012/12/ChickenShawarma02.jpg",
    "http://4.bp.blogspot.com/_L9Je34Cc0ks/S8nRPH8cVoI/AAAAAAAACDQ/ox6S3mAZdA0/s640/Varillas_2.JPG",
    "http://1.bp.blogspot.com/-QGk_FlaV-wc/TqBPD1TlesI/AAAAAAAACn8/Kbx-MtBQbGE/s1600/IMG_6763.JPG",
    "http://www.nourishedbalance.com/wp-content/uploads/2014/02/140226_nourishedbalance_007_web.jpg",
    "http://abeautifulmess.typepad.com/.a/6a00d8358081ff69e20176163b4fe9970c-800wi"
    ],
    create: function() {
        this.inherited(arguments);
        this.$.navbar.set("header", "Recette");
        this.$.navbar.set("showBack", enyo.Panels.isScreenNarrow());
        this.$.navbar.set("showFullscreen", !enyo.Panels.isScreenNarrow());
        this.$.navbar.set("inContentView", true); // Tag used by back buttons
        this.$.image.set("src", this.imgSrc[this.getRandomInt(0, this.imgSrc.length - 1)]);

        var contentBaseline = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        var content = contentBaseline;
        for( var i = 0; i < 50; i++) {
            content += " " + contentBaseline;
        }
        this.$.ingredientsContent.set("content", content);
    },
    ingredientsSourceChanged: function() {
        this.$.ingredientsView.setContent(this.get("ingredientsSource"));
    },
    preparationSourceChanged: function() {
        this.$.preparationView.setContent(this.get("preparationSource"));
    },
    swapDetails: function(inSender, inEvent) {
        if (inEvent.originator.active) {
            this.$.detailsPanels.setIndex(inEvent.originator.indexInContainer());
            // this.$.detailsPanels.selectByIndex(inEvent.originator.indexInContainer());
        }
    },
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    i: 0,
    checkButtons: function() {
        // WARNING: 'onresize' is called 2 times!
        // And it is triggered when clicking the back button
        this.i++;
        this.log('resize: ' + this.i);

        this.$.navbar.set("showBack", enyo.Panels.isScreenNarrow());
        this.$.navbar.set("showFullscreen", !enyo.Panels.isScreenNarrow());

        setTimeout(enyo.bind(this, function() {
            this.reflow();
        }), 0);
    },
    // Configures the scroll position of the specified component to allow parallax scrolling
    parallax: function(inSender, inEvent) {
        var y = -(inSender.getScrollTop()/3);
        console.log(this.$.image.node.offsetHeight + ' | ' + y);
        this.$.image.applyStyle("-webkit-transform", "translate3d(0, " + y + "px, 0)");
    }
});

