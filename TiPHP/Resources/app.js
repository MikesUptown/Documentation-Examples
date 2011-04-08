// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var tiWindow = Titanium.UI.createWindow({
  backgroundColor:'#fff',
  url: 'javascript/demo.js',
  navBarHidden: true
});

tiWindow.open();