var tiWindow = Titanium.UI.currentWindow;

//Include extra bits needed, but broken out to keep the demo focused
Ti.include('./window_setup.js');

if (Titanium.Platform.osname === 'android') {
	//Android doesn't currently work via the module include
	Ti.include('./com.appcelerator.tiphp.js');
} else {
	require('com.appcelerator.tiphp'); //Ti.PHP is an alias of a PHP_JS instance
}

//Working with an array
var cities = ['Pittsburgh', 'Sunnyvale', 'San Jose', 'Detroit'];

addLabelToView("Lets start of with an array of cities:", null, "#000");
addLabelToView(JSON.stringify(cities), 's');

addLabelToView("We'll use PHP's in_array function to test for Pittsburgh:", null, "#000");
addLabelToView("Ti.PHP.in_array('Pittsburgh', cities)");
if (Ti.PHP.in_array("Pittsburgh", cities) === true) {
    addLabelToView("Result = True", 's');
}

addLabelToView("We'll use in_array again to test for Fooville:", null, "#000");
addLabelToView("Ti.PHP.in_array('Fooville', cities)");
if (Ti.PHP.in_array("Fooville", cities) === false) {
    addLabelToView("Result = False", 'd');
}

addLabelToView("Next lets try array_splice. Here are the cities before the splice:", null, "#000");
addLabelToView(JSON.stringify(cities), 's');

addLabelToView("Ti.PHP.array_splice(cities, 2);", "s");
Ti.PHP.array_splice(cities, 2); //splice acts on the array in place

addLabelToView("Here are the cities after the splice:", null, "#000");
addLabelToView(JSON.stringify(cities), "d");

//Working wih dates
addLabelToView("Lets do some date/time manipulation:", null, "#000");
addLabelToView("We'll reformat 1 January 2010 as m/d/Y:", "s", "#000");
addLabelToView("Ti.PHP.date('m/d/Y', Ti.PHP.strtotime('1 January 2010'));", 's');
var formattedDate = Ti.PHP.date("m/d/Y", Ti.PHP.strtotime("1 January 2010"));
addLabelToView("1 January 2010 becomes:", null, '#000');
addLabelToView(formattedDate, 's');
