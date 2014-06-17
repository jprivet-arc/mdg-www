enyo.kind({
    name: "Dialog",
    kind: "enyo.Control",
    classes: "dialog-container",
    events: {
        onForceResize: ""
    },
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
            // this.node.offsetHeight; // Hack to refresh view on Android - Src: http://goo.gl/VI2a87
            this.addClass('show');
            this.doForceResize();
        }), 0);
    },
    hideDialog: function(inSender, inEvent) {
        this.removeClass('show');

        // Wait for CSS transition to end
        setTimeout(enyo.bind(this, function() {
            this.destroy();
        }), 500);
    }
});

