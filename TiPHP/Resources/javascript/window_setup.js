/* Important code, but stuffed here to keep the demo focused on Python interaction */
var scrollView = Titanium.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'auto',
	top: Titanium.Platform.osname === 'android' ? 0 : 50,
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:true
});

var view = Ti.UI.createView({
	backgroundColor:'#fff',
	width:300,
	height: 'auto',
	layout: 'vertical'
});
scrollView.add(view);
tiWindow.add(scrollView);

if (Titanium.Platform.osname !== 'android') {
	//Custom toolbar not implemented on Android
	var navBar = Titanium.UI.createToolbar({
        barColor: '#000',
        translucent: true,
        top: 0
    });

    var navBarImage = Titanium.UI.createImageView({
        image:'../images/php.png',
        right: 270,
        top: 8,
        height: 30
    });
    navBar.add(navBarImage);  

    var navBarTitle = Titanium.UI.createLabel({
        text: 'TiPHP',
        height: 'auto',
        width: 'auto',
        color: '#fff',
        font: {
            fontSize: 18,
            fontWeight: 'bold'
        },
        textAlign: 'left',
        left: 55
    });
    navBar.add(navBarTitle);
    tiWindow.add(navBar);
}

//Some simple label helpers
function addBlankSpace() {
    view.add(
        Titanium.UI.createLabel({
            text: ' ',
            height:'auto',
            width:'auto'
        })
    );
}

function addDivider() {
    view.add(
        Titanium.UI.createLabel({
            text: '-----',
            height:'auto',
            width:'auto',
            color:'#777bb4',
            textAlign:'left',
            left: 5
        })
    );
}

function addLabelToView(labelText, addSpaceOrDivider, color) {
    view.add(
        Titanium.UI.createLabel({
            text: labelText,
            height:'auto',
            width:'auto',
            color: (color) ? color : '#777bb4',
            textAlign:'left',
            left: 5
        })
    );
    
    if (addSpaceOrDivider && addSpaceOrDivider === 's') {
        addBlankSpace();
    } else if (addSpaceOrDivider && addSpaceOrDivider === 'd') {
        addDivider();
    }
}