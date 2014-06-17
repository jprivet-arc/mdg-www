enyo.kind({
    name: "ContentView",
    kind: "FittableRows",
    classes: "enyo-fit",
    handlers: {
        onresize: "checkButtons"
    },
    create: function() {
        this.inherited(arguments);
        if (this.$.navbar) {
            this.$.navbar.set("showBack", enyo.Panels.isScreenNarrow());
            this.$.navbar.set("showFullscreen", !enyo.Panels.isScreenNarrow());
            this.$.navbar.set("inContentView", true); // Tag used by back buttons
        }
    },
    checkButtons: function() {
        // WARNING: 'onresize' is called 3 times!
        // And it is triggered when clicking the back button
        this.log('resize');
        if (this.$.navbar) {
            this.$.navbar.set("showBack", enyo.Panels.isScreenNarrow());
            this.$.navbar.set("showFullscreen", !enyo.Panels.isScreenNarrow());
        }
    }
});

