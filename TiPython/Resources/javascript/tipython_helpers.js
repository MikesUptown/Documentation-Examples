Sk.builtins.helpers = (function() {
    return {
        executeIntoVariable: function(variableToReturn, pycode) {
            var module,
                returnVariable,
                returnVariableValue;

            module = Sk.importMainWithBody("<stdin>", false, pycode); //Identify the code/module to run
            returnVariable = module.tp$getattr(variableToReturn); //Locate the variable of interest
            returnVariableValue = returnVariable.v; //The return value is assigned to the "v" property during execution
            return returnVariableValue;
        },
        
        setModule: function(pycode) {
            var module = Sk.importMainWithBody("<stdin>", false, pycode); //Identify the code/module to run
            return module;
        },

        executeModuleFunction: function(module, classInstanceVariableName, methodToCall, args) {
            var cInstanceObject,
                methodObject,
                result,
                passedArgs;

            cInstanceObject = module.tp$getattr(classInstanceVariableName); //Locate the object we'll interact with
            methodObject = cInstanceObject.tp$getattr(methodToCall);

            passedArgs = Array.prototype.slice.call(arguments, 3);
            result = Sk.misceval.apply(methodObject, undefined, undefined, undefined, passedArgs);

            return result;
        }
    };
}());

Ti.Python = Sk;