enyo.kind({
    name: "HeaderNavbar",
    kind: "onyx.Toolbar",
    published: {
        header: "Application",
        showBack: null
    },
    events: {
        onNavBack: ""
    },
    components: [

    {
        name: "back",
        classes: "toolbar-btn btn-back",
        ontap: "doNavBack"
    },
    {
        name: "header",
        tag: "p"
    }
    ],
    create: function() {
        this.inherited(arguments);
        this.headerChanged();
    },
    headerChanged: function() {
        this.$.header.set("content", this.get("header"));
    },
    showBackChanged: function() {
        this.$.back.set("showing", this.get("showBack"));
    }
});



enyo.kind({
    name: "ContentHeaderNavbar",
    kind: "onyx.Toolbar",
    classes: "content-navbar",
    published: {
        header: "Contenu",
        showBack: null,
        showFullscreen: null
    },
    events: {
        onContentNavBack: "",
        onFullscreen: ""
    },
    components: [

    {
        name: "back",
        classes: "toolbar-btn btn-back",
        ontap: "doContentNavBack"
    },
    {
        name: "header",
        tag: "p"
    },
    {
        name: "fullscreen",
        classes: "toolbar-btn btn-fullscreen",
        ontap: "doFullscreen"
    }
    ],
    create: function() {
        this.inherited(arguments);
        this.headerChanged();
    },
    headerChanged: function() {
        this.$.header.set("content", this.get("header"));
    },
    showBackChanged: function() {
        this.$.back.set("showing", this.get("showBack"));
    },
    showFullscreenChanged: function() {
        this.$.fullscreen.set("showing", this.get("showFullscreen"));
    }
});

