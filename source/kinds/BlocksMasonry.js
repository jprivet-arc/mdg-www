
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

        /*
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
        */

        var imageSources = [
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
