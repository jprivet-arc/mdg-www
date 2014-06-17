enyo.kind({
    name: "SimpleView",
    kind: "FittableRows",
    classes:"enyo-fit enyo-unselectable",
    published: {
        samples:""
    },
    events: {
        onNavBack:"",
        onPushView: "",
        onOpenDialog: "",
        onPushContent: ""
    },
    components: [

    {
        kind: "HeaderNavbar",
        name: "navbar"
    },
    {
        name: "gridlist",
        kind: "enyo.DataGridList",
        classes: "gridlist",
        fit: true,
        // rowsPerPage: 2,
        // pageSizeMultiplier: 0.5,
        scrollerOptions: {
            horizontal: "hidden",
            touch: true,
            thumb: false
        },
        components: [

        {
            ontap: "doPushContent",
            components: [

            {
                classes: "gridlist-item",
                components: [

                {
                    name: "productName",
                    classes: "gridlist-title",
                    tag: "p"
                },
                {
                    name: "image",
                    kind: "enyo.Image",
                    classes: "gridlist-image",
                    sizing: "cover"
                }
                ]
            }
            ],
            bindings: [
            {
                from: ".model.productName",
                to: ".$.productName.content"
            },
            {
                from: ".model.url",
                to: ".$.image.src"
            }
            ]
        }
        ],
        minWidth: 150,
        minHeight: 150,
        spacing: 4
    },
    {
        kind: "onyx.Toolbar",
        layoutKind:"FittableColumnsLayout",
        classes:"footer-toolbar",
        components: [

        {
            kind: "onyx.Button",
            content: "List",
            ontap: "addView"
        },
        {
            kind: "onyx.Button",
            content: "Dialog",
            ontap: "doOpenDialog"
        },
        {
            kind: "onyx.Button",
            content: "Content",
            ontap: "doPushContent"
        }
        ]
    }
    ],
    bindings: [
    {
        from: ".collection",
        to: ".$.gridlist.collection"
    }
    ],
    create: function() {
        this.inherited(arguments);
        this.collection = new enyo.Collection(this.data);
        if (this.firstView) {
            this.$.navbar.set("showBack", false);
        }
    },
    addView: function() {
        this.doPushView({
            name: "view"
        });
    },
    data: [
    {
        productName: "Nom du produit",
        url: "http://dzinetrip.com/wp-content/uploads/2012/04/photography-we-are-sepcial-because-we-are-magic-by-alba+-soler-04.jpg"
    },
    {
        productName: "Nom du produit et plus",
        url: "http://www.hanoutkoum.com/images/photos/he9s6i726v.jpg"
    },
    {
        productName: "Nom du produit sur plusieurs lignes",
        url: "http://ninjaeatsfood.files.wordpress.com/2013/02/beautiful-photography-191.jpg"
    },
    {
        productName: "Nom du produit",
        url: "http://images.nationalgeographic.com/wpf/media-live/photos/000/259/cache/african-lions-tanzania_25990_600x450.jpg"
    },
    {
        productName: "Nom du produit sur plusieurs lignes",
        url: "http://images.nationalgeographic.com/wpf/media-live/photos/000/259/cache/covered-bridge-dale_25992_600x450.jpg"
    },
    {
        productName: "Nom du produit et plus",
        url: "http://images.nationalgeographic.com/wpf/media-live/photos/000/259/cache/fishermen-chad_25993_600x450.jpg"
    },
    {
        productName: "Nom du produit",
        url: "http://browseideas.com/wp-content/uploads/2012/02/beautiful-pictures-of-rain-photography-02.jpg"
    },
    {
        productName: "Nom du produit et plus",
        url: "http://img.xcitefun.net/users/2011/09/264111,xcitefun-under-waves-of-sea-beautiful-photography.jpg"
    },
    {
        productName: "Nom du produit et plus",
        url: "http://www.hanoutkoum.com/images/photos/he9s6i726v.jpg"
    },
    {
        productName: "Nom du produit sur plusieurs lignes",
        url: "http://ninjaeatsfood.files.wordpress.com/2013/02/beautiful-photography-191.jpg"
    },
    {
        productName: "Nom du produit",
        url: "http://images.nationalgeographic.com/wpf/media-live/photos/000/259/cache/african-lions-tanzania_25990_600x450.jpg"
    },
    {
        productName: "Nom du produit sur plusieurs lignes",
        url: "http://images.nationalgeographic.com/wpf/media-live/photos/000/259/cache/covered-bridge-dale_25992_600x450.jpg"
    }
    ]
});

