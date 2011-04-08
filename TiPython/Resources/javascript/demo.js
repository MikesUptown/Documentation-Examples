var tiWindow = Titanium.UI.currentWindow;

//Include extra bits needed, but broken out to keep the demo focused
Ti.include('./window_setup.js');

if (Titanium.Platform.osname === 'android') {
	/* Android doesn't currently work via the module include so lets attempt to
	load the JavaScript via a standard include. */
	Ti.include('./com.appcelerator.tipython.js');
} else {
	require('com.appcelerator.tipython'); //Ti.Python is an alias of Skulpt's Sk object.
	
	/* @TODO: Ideally this next include would be set inside the module, but injecting/exporting them
    into Skulpt's namespace isn't working at the moment.  Works via Ti.include, but not via require()
    so for now set again after the module is loaded to mimic it. */
    Ti.include('./tipython_helpers.js');
}

/* Core Python functions (those that have been ported thus far) live off the builtins object.  We can
call these directly.  Lets try a few: */
var minValue = Ti.Python.builtins.min(677, 45, 99, 12, 200),
    maxValue = Ti.Python.builtins.max(677, 45, 99, 12, 200),
    absValue = Ti.Python.builtins.abs(-400);

addLabelToView("Given 677, 45, 99, 12, 200...", null, '#000');
addLabelToView("* the min value is... " + minValue);
addLabelToView("* the max value is... " + maxValue, 'd');
addLabelToView("The absolute value of -400 is... " + absValue, 'd');


/* We can execute some python code inline.  Lets try it with range: */
var newRangeResult = Ti.Python.builtins.helpers.executeIntoVariable("r", "a = 5; b = 10; r = range(a, b)");
addLabelToView("Given the inline code:", null, '#000');
addLabelToView("a = 5; b = 10; r = range(a, b)", 's');
addLabelToView("* our new range is.... " + newRangeResult);
addLabelToView("* the 3rd element of the range is.... " + newRangeResult[2]);


/* Cool stuff right... How about we try running some Python code from a pre-existing python file? */
var pyFile, pyCode, funWithMathModule, addResult, subResult;
	
pyFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + '/python','pycode.py');
pyCode = pyFile.read().text;

funWithMathModule = Ti.Python.builtins.helpers.setModule(pyCode);
//Lets do some addition
addResult = Ti.Python.builtins.helpers.executeModuleFunction(funWithMathModule, 'fun', 'addValues', 10, 20);
//Lets do some subtraction
subResult = Ti.Python.builtins.helpers.executeModuleFunction(funWithMathModule, 'fun', 'subtractValues', 20, 10);

addDivider();
addLabelToView("We can also execute python code from an external file.  Lets assume we've read in the following code:", null, '#000');
addBlankSpace();
addLabelToView(pyCode);
addBlankSpace();

addLabelToView("We can call methods on the 'fun' instance...", null, '#000');
addLabelToView("* addValues 10 + 20 = " + addResult);
addLabelToView("* subtractValues 20 - 10 = " + subResult, 's');


/* As an added bonus it's worth pointing out that we can also do custom 
output redirection (this is called from print, etc) */
function tiPythonOutput(text) {
	Ti.API.info("This output is from tiPythonOutput: " + text);
}
Ti.Python.configure({output: tiPythonOutput});
Ti.Python.importMainWithBody("<stdin>", false, "print 'test 123'");