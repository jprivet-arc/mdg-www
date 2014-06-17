/**
    Define and instantiate your enyo.Application kind in this file.  Note,
    application rendering should be deferred until DOM is ready by wrapping
    it in a call to enyo.ready().
*/

enyo.kind({
    name: "mdg.Application",
    kind: "enyo.Application",
    view: "GlobalView"
});


enyo.ready(function() {
    var bodyClass;

    if ( enyo.platform.android ) {
        bodyClass = 'isAndroid';
    } else if ( enyo.platform.ios ) {
        bodyClass = 'isiOS';
    } else {
        bodyClass = 'isDesktop';
    }

    // This class will be used in CSS
    // jQuery( 'body' ).addClass( bodyClass );
    // document.body.className += ' ' + bodyClass;
    document.body.classList.add(bodyClass);

    // Render the app
    new mdg.Application({
        name: "app"
    });
});

