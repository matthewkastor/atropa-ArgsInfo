(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var ArgsInfo = require('../src/atropa-ArgsInfo.js');

try {
    Object.keys(ArgsInfo).forEach(
        function (prop) {
            if(!atropa[prop]) {
                atropa[prop] = ArgsInfo[prop];
            }
        }
    );
} catch (ignore) {
    atropa = require('../src/atropa-ArgsInfo.js');
}

Object.keys(ArgsInfo.data).filter(
    function (prop) {
        return prop !== 'requirements';
    }
).forEach(
    function (prop) {
        atropa.data[prop] = ArgsInfo.data[prop];
    }
);

},{"../src/atropa-ArgsInfo.js":6}],2:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.inquire = require('atropa-inquire').inquire;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Utilities for handling arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @namespace Utilities for handling arrays.
 */
atropa.arrays = {};
/**
 * Compares two arrays based on size, contents, and element order.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} array1 One array you want compared to another.
 * @param {Array} array2 The other array.
 * @returns {Boolean} Returns true or false depending on
 *  whether or not the arrays matched in size, composition, and
 *  element order.
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.match(x,y);
 * // returns false
 * @example
 * var x = [1,2];
 * var y = [1,2];
 * atropa.arrays.match(x,y);
 * // returns true
 * @example
 * var x = [1,2];
 * var y = [2,1];
 * atropa.arrays.match(x,y);
 * // returns false because the elements are not in the same order.
 * @example
 * var x = [1,{'aProp' : 'aValue'}];
 * var y = [1,{'aProp' : 'aValue'}];
 * atropa.arrays.match(x,y);
 * // returns false because even though the object looks the same, the
 * // two objects are in fact distinct objects.
 * @example
 * var obj = {'aProp' : 'aValue'};
 * var x = [1,obj];
 * var y = [1,obj];
 * atropa.arrays.match(x,y);
 * // returns true because the objects referenced in the arrays are
 * // in fact the same object.
 */
atropa.arrays.match = function arraysMatch(array1, array2) {
    "use strict";
    var x,
    l;
    if (array1.length !== array2.length) {
        return false;
    }
    l = array1.length;
    for (x = 0; x < l; x += 1) {
        if (array1[x] !== array2[x]) {
            return false;
        }
    }
    return true;
};
/**
 * Subtracts one array from another array based on the unique values in both
 *  sets.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} a (subtrahend) The array to subtract.
 * @param {Array} fromB (minuend) The array with elements duplicated in <code>a</code>
 * @returns {Array} Returns a new array containing only the unique
 *  values found in <code>fromB</code> that are not present in <code>a</code>
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.subtract(x,y);
 * // returns [3]
 * @example
 * var x = [1,3];
 * var y = [3,1];
 * atropa.arrays.subtract(x,y);
 * // returns []
 * @example
 * var x = [1,3];
 * var y = [3,1,1,9];
 * atropa.arrays.subtract(x,y);
 * // returns [9]
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'}
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.subtract(x,y);
 * // returns [] 
 * // because the objects referenced in the arrays are the same object.
 */
atropa.arrays.subtract = function(a, fromB) {
    "use strict";
    var the = {};
    the.result = [];
    fromB.forEach(function(item){
        the.mark = false;
        a.forEach(function(rm){
            if(item === rm) {
                the.mark = true;
            }
        });
        if(the.mark !== true) {
            the.result.push(item);
        }
    });
    return the.result;
};
/**
 * Returns an array of values found in both of the given arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} array1 An array.
 * @param {Array} array2 Another array.
 * @returns {Array} Returns an array of values found in both of the given
 *  arrays.
 * @example
 * var x = [1,3,4];
 * var y = [3,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3]
 * @example
 * var x = [1,1,3,4];
 * var y = [3,1,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,1,3]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3,{'aProp' : 'aVal'}]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 */
atropa.arrays.intersect = function intersect(array1, array2) {
    "use strict";
    var smallArray, largeArray, intersection = [];
    if(array1.length > array2.length) {
        largeArray = array1.splice(0);
        smallArray = array2.splice(0);
    } else {
        largeArray = array2.splice(0);
        smallArray = array1.splice(0);
    }
    smallArray.forEach(function (item) {
        var idxInLargeArray = largeArray.indexOf(item);
        if (0 <= idxInLargeArray) { // has word
            intersection.push(largeArray.splice(idxInLargeArray, 1)[0]);
        }
    });
    return intersection;
};
/**
 * Calculates the frequency of items occurring in an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array to calculate frequencies from.
 * @returns {Object} Returns an object whose keys are each unique
 *  elements from the array and their value is their frequency of
 *  occurrence within the array. Be careful that your array does
 *  not contain values matching object instance property names.
 * @example
 * var x = [1,1,1,1,1,3,3];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 5,
 * //     "3": 2
 * // }
 * @example
 * var x = ["bill", "fred", "fred", "jane"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "bill": 1,
 * //     "fred": 2,
 * //     "jane": 1
 * // }
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 1
 * // }
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var otherObj = {};
 * var x = [1,3,obj,otherObj,{'aDoughnut' : 'sprinkles'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 3
 * // }
 * @example
 * var x = [1,3,"toString"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "toString": "function toString() {\n    [native code]\n}1"
 * // }
 */
atropa.arrays.getFrequency = function (arr) {
    "use strict";
    var out = arr.reduce(function (acc, curr) {
        if (acc[curr] === undefined) {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
    return out;
};
/**
 * Gets Unique values from an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} largeArray The array with duplicate values in it.
 * @returns {Array} Returns a new array containing only the unique
 *  values found in the largeArray.
 * @example
 * var x = [1,1,1,4,4,3,6];
 * atropa.arrays.getUnique(x);
 * // returns [ "1", "4", "3", "6" ]
 * @example
 * var x = ["bill", "fred", "jane", "fred"];
 * atropa.arrays.getUnique(x);
 * // returns ["bill", "fred", "jane"]
 * @example
 * var x = [ 
 *     "bill",
 *     {"aProp" : "aValue"},
 *     {"aGuy" : "fred"},
 *     {"aLady" : "jane"}
 * ];
 * atropa.arrays.getUnique(x);
 * // returns [ "bill", "[object Object]" ]
 */
atropa.arrays.getUnique = function (largeArray) {
    "use strict";
    return Object.keys(atropa.arrays.getFrequency(largeArray)).sort();
};
/**
 * Removes empty strings from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arrayWithEmptyElements The array with empty strings in it.
 * @returns {Array} Returns a new array with empty strings removed.
 * @example
 * var x = [ 10, , 5, "", '', 7 ];
 * console.log('starting length ' + x.length);
 * console.log(x);
 * x = atropa.arrays.removeEmptyElements(x);
 * console.log('ending length ' + x.length);
 * console.log(x);
 * // displays the following
 * // starting length 6
 * // [10, undefined, 5, "", "", 7]
 * // ending length 3
 * // [10, 5, 7]
 */
atropa.arrays.removeEmptyElements = function (arrayWithEmptyElements) {
    "use strict";
    return arrayWithEmptyElements.filter(function (item) {
        return !atropa.inquire.isEmptyString(item);
    });
};
/**
 * Reindexes an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array with discontinuous keys.
 * @returns {Array} Returns an array with continuous keys.
 * @example
 * var x = [ "a", "b", "c", undefined ];
 * console.log(x); // [ "a", "b", "c", undefined ]
 * console.log(x.length); // 4
 * 
 * delete x[1]; // deletes the key from the array but
 *              // the array length remains the same
 *              // at this point the arrays keys are 0, 2, and 3
 * console.log(x); // [ "a", undefined, "c", undefined ]
 * console.log(x.length); // 4
 * 
 * x = atropa.arrays.reindex(x);
 * console.log(x); //  [ "a", "c", undefined ]
 *    // note that the last element existed in the array, its value was
 *    // undefined but it did have a key so the element remains in the array.
 *    //
 *    // The deleted element was in fact deleted from the array so there was no
 *    // key x[1] at all, when trying to access this non existing element the
 *    // value of undefined was returned. This behavior is confusing unless you
 *    // think about the arrayas an object whose properties are named by
 *    // numbers. Accessing an undefined property returns undefined regardless
 *    // of whether the property existed in the past or not.
 * console.log(x.length); // 3
 */
atropa.arrays.reindex = function reindex(arr) {
    "use strict";
    var idx, out;
    out = [];
    for(idx in arr) {
        if(arr.hasOwnProperty(idx)) {
            out.push(arr[idx]);
        }
    }
    return out;
};
/**
 * Sorts an array's elements numerically.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @param {Array} arr The array to sort. All elements of the array must be
 *  number-ish.
 * @returns {Array} Returns an array whose elements are in numeric order.
 * @example
 * var x = [3, 2, 9, 26, 10, 1, 99, 15];
 * console.log( atropa.arrays.sortNumerically(x) );
 * // logs [1, 2, 3, 9, 10, 15, 26, 99]
 */
atropa.arrays.sortNumerically = function sortNumerically(arr) {
    "use strict";
    return arr.sort(function (a, b) {
        return (a - b);
    });
};
/**
 * Throws an error, <code>String.prototype.localeCompare</code> is not 
 *  standardized.
 * 
 *  Yes, localeCompare is in the standard but, at this time the actual
 *  comparison is implementation dependant. This means that "alphabetical order"
 *  can be different on different platforms. What I found was that in node the
 *  array of <code>['a','Z','A','z']</code> would be sorted to
 *  <code>['A','Z','a','z"]</code>, while on
 *  firefox it would be sorted to <code>['a','A','z','Z']</code>. Who knows if
 *  another implementor would sort it <code>['A','a','Z','z']</code>?
 * 
 * In order to provide a reliable implementation I would have to create my own
 *  implementation of <code>String.prototype.localeCompare</code> and that's
 *  just too much work for me to do alone.
 * @throws {Error} "String.prototype.localeCompare is not standardized"
 */
atropa.arrays.sortAlphabetically = function sortAlphabetically(arr) {
    "use strict";
    throw new Error("String.prototype.localeCompare is not standardized");
};
/**
 * Deletes the given element from the array at the given index. It basically
 *  does what you would expect the delete operator to do, except the delete
 *  operator doesn't do what you would expect.
 * @param {Array} arr The array.
 * @param {Number} index The index of the element to delete.
 * @returns Returns an array with the element removed, contiguous keys, and
 *  whose length is 1 less than the input array.
 */
atropa.arrays.deleteElement = function (arr, index) {
    "use strict";
    delete arr[index];
    return atropa.arrays.reindex(arr);
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":4,"atropa-inquire":5}],3:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header
/**
 * Container for custom Errors.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for custom Errors.
 */
atropa.customErrors = {};

/**
 * Invalid Argument Types Error
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @class Invalid Argument Types Error
 * @param {String} message Optional. The error message to send. Defaults to
 *  <code>InvalidArgumentTypesError</code>
 * @returns {Error} Returns an instance of the InvalidArgumentTypesError
 */
atropa.customErrors.InvalidArgumentTypesError = function InvalidArgumentTypesError(message) {
    'use strict';
    /**
     * The name of the error. Tells the user what kind of custom
     * error has been thrown.
     * @fieldOf atropa.customErrors.InvalidArgumentTypesError#
     * @type {String}
     * @default "atropa.customErrors.InvalidArgumentTypesError"
     */
    this.name = "atropa.customErrors.InvalidArgumentTypesError";
    /**
     * The error message to send.
     * @fieldOf atropa.customErrors.InvalidArgumentTypesError#
     * @type {String}
     * @default "InvalidArgumentTypesError"
     */
    this.message = message || "InvalidArgumentTypesError";
};
atropa.customErrors.InvalidArgumentTypesError.prototype = new Error();
atropa.customErrors.InvalidArgumentTypesError.prototype.constructor = 
    atropa.customErrors.InvalidArgumentTypesError;




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":4}],4:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global XPathResult */
// end header

/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = {};
/**
 * Checks whether this class has been marked as unsupported and throws an 
 *  error if it has.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {String} errorMessage Optional. A custom error message. Defaults to
 *  atropa.data[className].error
 */
atropa.supportCheck = function (className, errorMessage) {
    "use strict";
    className = String(className);
    errorMessage = errorMessage || atropa.data[className].error;
    errorMessage = String(errorMessage);
    
    if(atropa.data[className].support === 'unsupported') {
        throw new Error(errorMessage);
    }
};
/**
 * Pushes a requirement check into atropa.data.requirements. The test
 *  tests whether the class is supported in this environment. Sets
 *  atropa.data[className]'s support to unsupported and error to errorMessage
 *  if the requirementFn returns false. The requirement checks will all be run
 *  after the library has loaded.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {Function} requirementFn A function to test whether or not the class
 *  is supported in this environment. If supported, returns true otherwise
 *  return false.
 * @param {String} errorMessage The error message to use when this class or its
 *  methods are called in unsupported environments. Defaults to:
 *  'The atropa.' + className + ' class is unsupported in this environment.';
 */
atropa.requires = function (className, requirementFn, errorMessage) {
    "use strict";
    var check = function () {
        var test = false;
        if(typeof className !== 'string') {
            throw new Error('atropa.requires requires the class name to be ' +
                'specified');
        }
        
        if(atropa.data[className] === undefined) {
            atropa.data[className] = {};
            
            if(typeof requirementFn !== 'function') {
                requirementFn = false;
            }
            errorMessage = errorMessage || 'The atropa.' + className +
                    ' class is unsupported in this environment.';
            try {
                test = requirementFn();
            } catch (e) {
                test = false;
            }
            
            atropa.data[className].error = errorMessage;
            
            if(test === false) {
                atropa.data[className].support = 'unsupported';
            }
        }
    };
    
    atropa.data.requirements.push(check);
};
/**
 * Container for gobal data related to the classes and functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for gobal data related to the classes and functions.
 */
atropa.data = {};

atropa.data.requirements = [];

atropa.nop = function nop () {
    "use strict";
    return null;
};
module.exports = atropa;


},{}],5:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Container for functions that test the state of inputs.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for functions that test the state of inputs.
 */
atropa.inquire = {};
/**
 * Checks whether the input is null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be null.
 * @returns {Boolean} Returns true if x === null.
 */
atropa.inquire.isNull = function (x) {
    "use strict";
    return (x === null);
};
/**
 * Checks whether the input is an object.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be an object.
 * @returns {Boolean} Returns true if typeof(x) === 'object'.
 */
atropa.inquire.isObject = function (x) {
    "use strict";
    return (typeof x === 'object');
};
/**
 * Checks whether the input is both an object and not null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be both an
 * object and null.
 * @returns {Boolean} Returns true if x is both an object and
 * not null. (null is an object).
 */
atropa.inquire.isObjectNotNull = function (x) {
    "use strict";
    return atropa.inquire.isObject(x) && (!atropa.inquire.isNull(x));
};
/**
 * Checks an object for the existence of a property
 * regardless of whether the property was inherited
 * or not.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Object} obj An object which may or may not
 * have the property identified by prop.
 * @param {String} prop A string value representing the
 * name of the property.
 * @returns {Boolean} Returns true if obj.prop exists,
 * otherwise returns false.
 */
atropa.inquire.hasProperty = function (obj, prop) {
    "use strict";
    if (atropa.inquire.isObjectNotNull(obj)) {
        return (prop in obj);
    }
    return false;
};
/**
 * Checks whether the input is an empty string.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} str The string you want to know about
 * @returns {Boolean} Returns true if str is an empty string,
 *  otherwise returns false.
 */
atropa.inquire.isEmptyString = function (str) {
    "use strict";
    var out = false;
    if ('' === str) {
        out = true;
    }
    return out;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":4}],6:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    node: true
*/
var atropa = require('atropa-header');
atropa.inquire = require('atropa-inquire').inquire;
atropa.arrays = require('atropa-arrays').arrays;
atropa.customErrors = require('atropa-customErrors').customErrors;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * This represents a filter for arguments based on type.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @class This represents a filter for arguments based on type.
 * @returns {ArgsInfo} Returns an ArgsInfo filter.
 * @requires atropa.arrays.match
 * @example
 * function myClassyConstructor(takes, a, few, args) {
 *     var expectedArgTypes, checker;
 *     
 *     expectedArgTypes = {};
 *     expectedArgTypes.requestWithMessage = 
 *          ['string', 'string', 'string', 'function'];
 *     expectedArgTypes.requestNullMessage = 
 *          ['string', 'string', 'object', 'function'];
 *     
 *     checker = new atropa.ArgsInfo();
 *     checker.setExpectedArgTypes(expectedArgTypes);
 *     
 *     try {
 *     
 *         // Check the supplied arguments pseudo array's argument types
 *         // if the pattern of types in arguments matches one of the
 *         // patterns set on expectedArgTypes then the matching pattern
 *         // will be returned. Otherwise, an error will be thrown.
 *         
 *         checker.checkArgTypes(arguments);
 *     } catch (e) {
 *     
 *         // Invalid argument types supplied. Handle
 *         // the error or bail.
 *         
 *     }
 *     
 *     // the arguments supplied will be of the proper type
 *     // your function can go ahead and do things with them
 * }
 */
atropa.ArgsInfo = function ArgsInfo() {
    'use strict';
    var expectedArgTypes,
    checkArgs,
    that;
    /**
     * Holds the proper reference to <code>this</code>
     * for private functions.
     * @type This
     * @private
     * @fieldOf atropa.ArgsInfo-
     */
    that = this;
    /**
     * Holds the expected argument types object.
     * @private
     * @type Expected Arg Types
     * @fieldOf atropa.ArgsInfo-
     */
    expectedArgTypes = {};
    /**
     * Sets the expected argument types.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.ArgsInfo#
     * @param {Expected Arg Types} typesObj An object containing information
     *  about the types of arguments you expect. Specifically, the object should
     *  look like the example.
     * @example
     * // typesObj is expected to be of the form:
     * 
     * var typesObj = {
     *     "namedArgumentTypesArray" : ["string", "function", "number"],
     *     "namedAlternateArgumentTypesArray" : ["object", "function", "number"]
     * };
     * 
     * // You may use as many named arrays as you wish and checkArgTypes will
     * // test for a match to at least one of the provided named arrays.
     * @throws {atropa.customErrors.InvalidArgumentTypesError} Throws an error if the
     *  typesObj can not be used to set the expected argument types.
     */
    this.setExpectedArgTypes = function setExpectedArgTypes(typesObj) {
        var error, names;
        
        error = false;
        
        if(atropa.inquire.isObjectNotNull(typesObj)) {
            names = Object.keys(typesObj);
            if (names.length > 0) {
                expectedArgTypes = typesObj;
            } else {
                error = true;
            }
        } else {
            error = true;
        }
        
        if(error) {
            throw new atropa.customErrors.InvalidArgumentTypesError(
                'typesObj is expected to be of the form: var typesObj = ' +
                '{ "namedArgumentTypesArray" : ' +
                '    ["string", "function", "number"], ' +
                '"namedAlternateArgumentTypesArray" : ' +
                '   ["object", "function", "number"] }; ' +
                'You may use as many named arrays as you wish and' +
                'checkArgTypes will test for a match to at least one of the ' +
                'provided named arrays.'
            );
        }
    };
    /**
     * Gets the types of arguments.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.ArgsInfo#
     * @param {arguments} args An arguments object, or anything you want to
     * check the type of.
     * @returns {Array} Returns an array of the types of arguments passed in.
     */
    this.getArgTypes = function getArgTypes(args) {
        var x,
        argTypes;
        argTypes = [];
        for (x in args) {
            if (args.hasOwnProperty(x)) {
                argTypes.push(typeof(args[x]));
            }
        }
        return argTypes;
    };
    /**
     * Compares the expected arguments types to the
     * received arguments types.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @private
     * @methodOf atropa.ArgsInfo-
     * @param {Array} expectedTypesArray An array taken from the user
     * created argument types object.
     * @param {arguments} args an arguments object.
     * @returns {Boolean} Returns true if the expected types match for type
     *  and are in the same order as the received types.
     * @requires atropa.arrays.match
     */
    checkArgs = function checkArgs(expectedTypesArray, args) {
        var types;
        types = {};
        types.expected = expectedTypesArray;
        types.received = that.getArgTypes(args);
        return atropa.arrays.match(types.expected, types.received);
    };
    /**
     * Checks the given arguments object against the expected
     * arguments types.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.ArgsInfo#
     * @param {arguments} args An arguments object
     * @returns {String} The user assigned key which matches the
     * arguments supplied, or throws an error.
     * @throws {atropa.customErrors.InvalidArgumentTypesError} Throws an error if no matching
     *  pattern of argument types can be found for <code>args</code>
     * @see atropa.ArgsInfo#setExpectedArgTypes
     */
    this.checkArgTypes = function checkArgTypes(args) {
        var expectedTypes;
        if (Object.keys(expectedArgTypes).length < 1) {
            throw new atropa.customErrors.InvalidArgumentTypesError(
                'Expected argument types is not set. Use ' +
                'setExpectedArgTypes(typesObj) to set. typesObj is an ' +
                'object whose properties are arrays of strings representing ' +
                'the typeof(argument) for each argument, in the exact order ' +
                'in which they will be given to the function. Using multiple ' +
                'properties it is possible to define alternative acceptable ' +
                'argument type sets. Use getArgTypes(arguments) as a ' +
                'convenient way of getting the array you want to hard code ' +
                'in for validation. Example: var typesObj = ' +
                '{ "messageIncluded" : ["string", "function", "number"], ' +
                '"messageNotIncluded" : ["object", "function", "number"] };'
            );
        }
        for (expectedTypes in expectedArgTypes) {
            if (expectedArgTypes.hasOwnProperty(expectedTypes)) {
                if (checkArgs(expectedArgTypes[expectedTypes], args)) {
                    return expectedTypes;
                }
            }
        }
        throw new atropa.customErrors.InvalidArgumentTypesError(
            'invalid argument type @ atropa.ArgsInfo.checkArgTypes');
    };
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-arrays":2,"atropa-customErrors":3,"atropa-header":4,"atropa-inquire":5}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYnJvd3Nlck1haW4uanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLWFycmF5cy9zcmMvYXRyb3BhLWFycmF5cy5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtY3VzdG9tRXJyb3JzL3NyYy9hdHJvcGEtY3VzdG9tRXJyb3JzLmpzIiwibm9kZV9tb2R1bGVzL2F0cm9wYS1oZWFkZXIvc3JjL2F0cm9wYS1oZWFkZXIuanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLWlucXVpcmUvc3JjL2F0cm9wYS1pbnF1aXJlLmpzIiwic3JjL2F0cm9wYS1BcmdzSW5mby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciBBcmdzSW5mbyA9IHJlcXVpcmUoJy4uL3NyYy9hdHJvcGEtQXJnc0luZm8uanMnKTtcclxuXHJcbnRyeSB7XHJcbiAgICBPYmplY3Qua2V5cyhBcmdzSW5mbykuZm9yRWFjaChcclxuICAgICAgICBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgICAgICBpZighYXRyb3BhW3Byb3BdKSB7XHJcbiAgICAgICAgICAgICAgICBhdHJvcGFbcHJvcF0gPSBBcmdzSW5mb1twcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn0gY2F0Y2ggKGlnbm9yZSkge1xyXG4gICAgYXRyb3BhID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS1BcmdzSW5mby5qcycpO1xyXG59XHJcblxyXG5PYmplY3Qua2V5cyhBcmdzSW5mby5kYXRhKS5maWx0ZXIoXHJcbiAgICBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wICE9PSAncmVxdWlyZW1lbnRzJztcclxuICAgIH1cclxuKS5mb3JFYWNoKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICBhdHJvcGEuZGF0YVtwcm9wXSA9IEFyZ3NJbmZvLmRhdGFbcHJvcF07XHJcbiAgICB9XHJcbik7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5pbnF1aXJlID0gcmVxdWlyZSgnYXRyb3BhLWlucXVpcmUnKS5pbnF1aXJlO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXRpZXMgZm9yIGhhbmRsaW5nIGFycmF5cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMjIxXHJcbiAqIEBuYW1lc3BhY2UgVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzID0ge307XHJcbi8qKlxyXG4gKiBDb21wYXJlcyB0d28gYXJyYXlzIGJhc2VkIG9uIHNpemUsIGNvbnRlbnRzLCBhbmQgZWxlbWVudCBvcmRlci5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBPbmUgYXJyYXkgeW91IHdhbnQgY29tcGFyZWQgdG8gYW5vdGhlci5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIFRoZSBvdGhlciBhcnJheS5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb25cclxuICogIHdoZXRoZXIgb3Igbm90IHRoZSBhcnJheXMgbWF0Y2hlZCBpbiBzaXplLCBjb21wb3NpdGlvbiwgYW5kXHJcbiAqICBlbGVtZW50IG9yZGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDJdO1xyXG4gKiB2YXIgeSA9IFsxLDEsM107XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyBmYWxzZVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDJdO1xyXG4gKiB2YXIgeSA9IFsxLDJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgdHJ1ZVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDJdO1xyXG4gKiB2YXIgeSA9IFsyLDFdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgZmFsc2UgYmVjYXVzZSB0aGUgZWxlbWVudHMgYXJlIG5vdCBpbiB0aGUgc2FtZSBvcmRlci5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSx7J2FQcm9wJyA6ICdhVmFsdWUnfV07XHJcbiAqIHZhciB5ID0gWzEseydhUHJvcCcgOiAnYVZhbHVlJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgZmFsc2UgYmVjYXVzZSBldmVuIHRob3VnaCB0aGUgb2JqZWN0IGxvb2tzIHRoZSBzYW1lLCB0aGVcclxuICogLy8gdHdvIG9iamVjdHMgYXJlIGluIGZhY3QgZGlzdGluY3Qgb2JqZWN0cy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWx1ZSd9O1xyXG4gKiB2YXIgeCA9IFsxLG9ial07XHJcbiAqIHZhciB5ID0gWzEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIHRydWUgYmVjYXVzZSB0aGUgb2JqZWN0cyByZWZlcmVuY2VkIGluIHRoZSBhcnJheXMgYXJlXHJcbiAqIC8vIGluIGZhY3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5tYXRjaCA9IGZ1bmN0aW9uIGFycmF5c01hdGNoKGFycmF5MSwgYXJyYXkyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB4LFxyXG4gICAgbDtcclxuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbCA9IGFycmF5MS5sZW5ndGg7XHJcbiAgICBmb3IgKHggPSAwOyB4IDwgbDsgeCArPSAxKSB7XHJcbiAgICAgICAgaWYgKGFycmF5MVt4XSAhPT0gYXJyYXkyW3hdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuLyoqXHJcbiAqIFN1YnRyYWN0cyBvbmUgYXJyYXkgZnJvbSBhbm90aGVyIGFycmF5IGJhc2VkIG9uIHRoZSB1bmlxdWUgdmFsdWVzIGluIGJvdGhcclxuICogIHNldHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhIChzdWJ0cmFoZW5kKSBUaGUgYXJyYXkgdG8gc3VidHJhY3QuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGZyb21CIChtaW51ZW5kKSBUaGUgYXJyYXkgd2l0aCBlbGVtZW50cyBkdXBsaWNhdGVkIGluIDxjb2RlPmE8L2NvZGU+XHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBjb250YWluaW5nIG9ubHkgdGhlIHVuaXF1ZVxyXG4gKiAgdmFsdWVzIGZvdW5kIGluIDxjb2RlPmZyb21CPC9jb2RlPiB0aGF0IGFyZSBub3QgcHJlc2VudCBpbiA8Y29kZT5hPC9jb2RlPlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDJdO1xyXG4gKiB2YXIgeSA9IFsxLDEsM107XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbM11cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzXTtcclxuICogdmFyIHkgPSBbMywxXTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFtdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsM107XHJcbiAqIHZhciB5ID0gWzMsMSwxLDldO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzldXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFt7J2FQcm9wJyA6ICdhVmFsJ31dIFxyXG4gKiAvLyBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIHggPSBbMSwzLG9ial07XHJcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW3snYVByb3AnIDogJ2FWYWwnfV0gXHJcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9XHJcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xyXG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFtdIFxyXG4gKiAvLyBiZWNhdXNlIHRoZSBvYmplY3RzIHJlZmVyZW5jZWQgaW4gdGhlIGFycmF5cyBhcmUgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCA9IGZ1bmN0aW9uKGEsIGZyb21CKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciB0aGUgPSB7fTtcclxuICAgIHRoZS5yZXN1bHQgPSBbXTtcclxuICAgIGZyb21CLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgdGhlLm1hcmsgPSBmYWxzZTtcclxuICAgICAgICBhLmZvckVhY2goZnVuY3Rpb24ocm0pe1xyXG4gICAgICAgICAgICBpZihpdGVtID09PSBybSkge1xyXG4gICAgICAgICAgICAgICAgdGhlLm1hcmsgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodGhlLm1hcmsgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhlLnJlc3VsdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoZS5yZXN1bHQ7XHJcbn07XHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlbiBhcnJheXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgQW4gYXJyYXkuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBBbm90aGVyIGFycmF5LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdmFsdWVzIGZvdW5kIGluIGJvdGggb2YgdGhlIGdpdmVuXHJcbiAqICBhcnJheXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyw0XTtcclxuICogdmFyIHkgPSBbMywxLDVdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDNdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMSwzLDRdO1xyXG4gKiB2YXIgeSA9IFszLDEsMSw1XTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwxLDNdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xyXG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV1cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDNdIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsM10gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmludGVyc2VjdCA9IGZ1bmN0aW9uIGludGVyc2VjdChhcnJheTEsIGFycmF5Mikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgc21hbGxBcnJheSwgbGFyZ2VBcnJheSwgaW50ZXJzZWN0aW9uID0gW107XHJcbiAgICBpZihhcnJheTEubGVuZ3RoID4gYXJyYXkyLmxlbmd0aCkge1xyXG4gICAgICAgIGxhcmdlQXJyYXkgPSBhcnJheTEuc3BsaWNlKDApO1xyXG4gICAgICAgIHNtYWxsQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsYXJnZUFycmF5ID0gYXJyYXkyLnNwbGljZSgwKTtcclxuICAgICAgICBzbWFsbEFycmF5ID0gYXJyYXkxLnNwbGljZSgwKTtcclxuICAgIH1cclxuICAgIHNtYWxsQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBpZHhJbkxhcmdlQXJyYXkgPSBsYXJnZUFycmF5LmluZGV4T2YoaXRlbSk7XHJcbiAgICAgICAgaWYgKDAgPD0gaWR4SW5MYXJnZUFycmF5KSB7IC8vIGhhcyB3b3JkXHJcbiAgICAgICAgICAgIGludGVyc2VjdGlvbi5wdXNoKGxhcmdlQXJyYXkuc3BsaWNlKGlkeEluTGFyZ2VBcnJheSwgMSlbMF0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGludGVyc2VjdGlvbjtcclxufTtcclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGZyZXF1ZW5jeSBvZiBpdGVtcyBvY2N1cnJpbmcgaW4gYW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIGNhbGN1bGF0ZSBmcmVxdWVuY2llcyBmcm9tLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aG9zZSBrZXlzIGFyZSBlYWNoIHVuaXF1ZVxyXG4gKiAgZWxlbWVudHMgZnJvbSB0aGUgYXJyYXkgYW5kIHRoZWlyIHZhbHVlIGlzIHRoZWlyIGZyZXF1ZW5jeSBvZlxyXG4gKiAgb2NjdXJyZW5jZSB3aXRoaW4gdGhlIGFycmF5LiBCZSBjYXJlZnVsIHRoYXQgeW91ciBhcnJheSBkb2VzXHJcbiAqICBub3QgY29udGFpbiB2YWx1ZXMgbWF0Y2hpbmcgb2JqZWN0IGluc3RhbmNlIHByb3BlcnR5IG5hbWVzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDEsMSwxLDEsMywzXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDUsXHJcbiAqIC8vICAgICBcIjNcIjogMlxyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJmcmVkXCIsIFwiamFuZVwiXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCJiaWxsXCI6IDEsXHJcbiAqIC8vICAgICBcImZyZWRcIjogMixcclxuICogLy8gICAgIFwiamFuZVwiOiAxXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiAxLFxyXG4gKiAvLyAgICAgXCIzXCI6IDEsXHJcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAxXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIG90aGVyT2JqID0ge307XHJcbiAqIHZhciB4ID0gWzEsMyxvYmosb3RoZXJPYmoseydhRG91Z2hudXQnIDogJ3Nwcmlua2xlcyd9XTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDEsXHJcbiAqIC8vICAgICBcIjNcIjogMSxcclxuICogLy8gICAgIFwiW29iamVjdCBPYmplY3RdXCI6IDNcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMsXCJ0b1N0cmluZ1wiXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDEsXHJcbiAqIC8vICAgICBcIjNcIjogMSxcclxuICogLy8gICAgIFwidG9TdHJpbmdcIjogXCJmdW5jdGlvbiB0b1N0cmluZygpIHtcXG4gICAgW25hdGl2ZSBjb2RlXVxcbn0xXCJcclxuICogLy8gfVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3kgPSBmdW5jdGlvbiAoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBvdXQgPSBhcnIucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGN1cnIpIHtcclxuICAgICAgICBpZiAoYWNjW2N1cnJdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYWNjW2N1cnJdID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhY2NbY3Vycl0gKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBHZXRzIFVuaXF1ZSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGxhcmdlQXJyYXkgVGhlIGFycmF5IHdpdGggZHVwbGljYXRlIHZhbHVlcyBpbiBpdC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IGNvbnRhaW5pbmcgb25seSB0aGUgdW5pcXVlXHJcbiAqICB2YWx1ZXMgZm91bmQgaW4gdGhlIGxhcmdlQXJyYXkuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMSwxLDQsNCwzLDZdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcclxuICogLy8gcmV0dXJucyBbIFwiMVwiLCBcIjRcIiwgXCIzXCIsIFwiNlwiIF1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImphbmVcIiwgXCJmcmVkXCJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcclxuICogLy8gcmV0dXJucyBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImphbmVcIl1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbIFxyXG4gKiAgICAgXCJiaWxsXCIsXHJcbiAqICAgICB7XCJhUHJvcFwiIDogXCJhVmFsdWVcIn0sXHJcbiAqICAgICB7XCJhR3V5XCIgOiBcImZyZWRcIn0sXHJcbiAqICAgICB7XCJhTGFkeVwiIDogXCJqYW5lXCJ9XHJcbiAqIF07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xyXG4gKiAvLyByZXR1cm5zIFsgXCJiaWxsXCIsIFwiW29iamVjdCBPYmplY3RdXCIgXVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUgPSBmdW5jdGlvbiAobGFyZ2VBcnJheSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3kobGFyZ2VBcnJheSkpLnNvcnQoKTtcclxufTtcclxuLyoqXHJcbiAqIFJlbW92ZXMgZW1wdHkgc3RyaW5ncyBmcm9tIHRoZSBnaXZlbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5V2l0aEVtcHR5RWxlbWVudHMgVGhlIGFycmF5IHdpdGggZW1wdHkgc3RyaW5ncyBpbiBpdC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IHdpdGggZW1wdHkgc3RyaW5ncyByZW1vdmVkLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsgMTAsICwgNSwgXCJcIiwgJycsIDcgXTtcclxuICogY29uc29sZS5sb2coJ3N0YXJ0aW5nIGxlbmd0aCAnICsgeC5sZW5ndGgpO1xyXG4gKiBjb25zb2xlLmxvZyh4KTtcclxuICogeCA9IGF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyh4KTtcclxuICogY29uc29sZS5sb2coJ2VuZGluZyBsZW5ndGggJyArIHgubGVuZ3RoKTtcclxuICogY29uc29sZS5sb2coeCk7XHJcbiAqIC8vIGRpc3BsYXlzIHRoZSBmb2xsb3dpbmdcclxuICogLy8gc3RhcnRpbmcgbGVuZ3RoIDZcclxuICogLy8gWzEwLCB1bmRlZmluZWQsIDUsIFwiXCIsIFwiXCIsIDddXHJcbiAqIC8vIGVuZGluZyBsZW5ndGggM1xyXG4gKiAvLyBbMTAsIDUsIDddXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMgPSBmdW5jdGlvbiAoYXJyYXlXaXRoRW1wdHlFbGVtZW50cykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXJyYXlXaXRoRW1wdHlFbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gIWF0cm9wYS5pbnF1aXJlLmlzRW1wdHlTdHJpbmcoaXRlbSk7XHJcbiAgICB9KTtcclxufTtcclxuLyoqXHJcbiAqIFJlaW5kZXhlcyBhbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgd2l0aCBkaXNjb250aW51b3VzIGtleXMuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSB3aXRoIGNvbnRpbnVvdXMga2V5cy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbIFwiYVwiLCBcImJcIiwgXCJjXCIsIHVuZGVmaW5lZCBdO1xyXG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gWyBcImFcIiwgXCJiXCIsIFwiY1wiLCB1bmRlZmluZWQgXVxyXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDRcclxuICogXHJcbiAqIGRlbGV0ZSB4WzFdOyAvLyBkZWxldGVzIHRoZSBrZXkgZnJvbSB0aGUgYXJyYXkgYnV0XHJcbiAqICAgICAgICAgICAgICAvLyB0aGUgYXJyYXkgbGVuZ3RoIHJlbWFpbnMgdGhlIHNhbWVcclxuICogICAgICAgICAgICAgIC8vIGF0IHRoaXMgcG9pbnQgdGhlIGFycmF5cyBrZXlzIGFyZSAwLCAyLCBhbmQgM1xyXG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gWyBcImFcIiwgdW5kZWZpbmVkLCBcImNcIiwgdW5kZWZpbmVkIF1cclxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyA0XHJcbiAqIFxyXG4gKiB4ID0gYXRyb3BhLmFycmF5cy5yZWluZGV4KHgpO1xyXG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gIFsgXCJhXCIsIFwiY1wiLCB1bmRlZmluZWQgXVxyXG4gKiAgICAvLyBub3RlIHRoYXQgdGhlIGxhc3QgZWxlbWVudCBleGlzdGVkIGluIHRoZSBhcnJheSwgaXRzIHZhbHVlIHdhc1xyXG4gKiAgICAvLyB1bmRlZmluZWQgYnV0IGl0IGRpZCBoYXZlIGEga2V5IHNvIHRoZSBlbGVtZW50IHJlbWFpbnMgaW4gdGhlIGFycmF5LlxyXG4gKiAgICAvL1xyXG4gKiAgICAvLyBUaGUgZGVsZXRlZCBlbGVtZW50IHdhcyBpbiBmYWN0IGRlbGV0ZWQgZnJvbSB0aGUgYXJyYXkgc28gdGhlcmUgd2FzIG5vXHJcbiAqICAgIC8vIGtleSB4WzFdIGF0IGFsbCwgd2hlbiB0cnlpbmcgdG8gYWNjZXNzIHRoaXMgbm9uIGV4aXN0aW5nIGVsZW1lbnQgdGhlXHJcbiAqICAgIC8vIHZhbHVlIG9mIHVuZGVmaW5lZCB3YXMgcmV0dXJuZWQuIFRoaXMgYmVoYXZpb3IgaXMgY29uZnVzaW5nIHVubGVzcyB5b3VcclxuICogICAgLy8gdGhpbmsgYWJvdXQgdGhlIGFycmF5YXMgYW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIG5hbWVkIGJ5XHJcbiAqICAgIC8vIG51bWJlcnMuIEFjY2Vzc2luZyBhbiB1bmRlZmluZWQgcHJvcGVydHkgcmV0dXJucyB1bmRlZmluZWQgcmVnYXJkbGVzc1xyXG4gKiAgICAvLyBvZiB3aGV0aGVyIHRoZSBwcm9wZXJ0eSBleGlzdGVkIGluIHRoZSBwYXN0IG9yIG5vdC5cclxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyAzXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnJlaW5kZXggPSBmdW5jdGlvbiByZWluZGV4KGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgaWR4LCBvdXQ7XHJcbiAgICBvdXQgPSBbXTtcclxuICAgIGZvcihpZHggaW4gYXJyKSB7XHJcbiAgICAgICAgaWYoYXJyLmhhc093blByb3BlcnR5KGlkeCkpIHtcclxuICAgICAgICAgICAgb3V0LnB1c2goYXJyW2lkeF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBTb3J0cyBhbiBhcnJheSdzIGVsZW1lbnRzIG51bWVyaWNhbGx5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMjBcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBzb3J0LiBBbGwgZWxlbWVudHMgb2YgdGhlIGFycmF5IG11c3QgYmVcclxuICogIG51bWJlci1pc2guXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSB3aG9zZSBlbGVtZW50cyBhcmUgaW4gbnVtZXJpYyBvcmRlci5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMywgMiwgOSwgMjYsIDEwLCAxLCA5OSwgMTVdO1xyXG4gKiBjb25zb2xlLmxvZyggYXRyb3BhLmFycmF5cy5zb3J0TnVtZXJpY2FsbHkoeCkgKTtcclxuICogLy8gbG9ncyBbMSwgMiwgMywgOSwgMTAsIDE1LCAyNiwgOTldXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnNvcnROdW1lcmljYWxseSA9IGZ1bmN0aW9uIHNvcnROdW1lcmljYWxseShhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGFyci5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhIC0gYik7XHJcbiAgICB9KTtcclxufTtcclxuLyoqXHJcbiAqIFRocm93cyBhbiBlcnJvciwgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBpcyBub3QgXHJcbiAqICBzdGFuZGFyZGl6ZWQuXHJcbiAqIFxyXG4gKiAgWWVzLCBsb2NhbGVDb21wYXJlIGlzIGluIHRoZSBzdGFuZGFyZCBidXQsIGF0IHRoaXMgdGltZSB0aGUgYWN0dWFsXHJcbiAqICBjb21wYXJpc29uIGlzIGltcGxlbWVudGF0aW9uIGRlcGVuZGFudC4gVGhpcyBtZWFucyB0aGF0IFwiYWxwaGFiZXRpY2FsIG9yZGVyXCJcclxuICogIGNhbiBiZSBkaWZmZXJlbnQgb24gZGlmZmVyZW50IHBsYXRmb3Jtcy4gV2hhdCBJIGZvdW5kIHdhcyB0aGF0IGluIG5vZGUgdGhlXHJcbiAqICBhcnJheSBvZiA8Y29kZT5bJ2EnLCdaJywnQScsJ3onXTwvY29kZT4gd291bGQgYmUgc29ydGVkIHRvXHJcbiAqICA8Y29kZT5bJ0EnLCdaJywnYScsJ3pcIl08L2NvZGU+LCB3aGlsZSBvblxyXG4gKiAgZmlyZWZveCBpdCB3b3VsZCBiZSBzb3J0ZWQgdG8gPGNvZGU+WydhJywnQScsJ3onLCdaJ108L2NvZGU+LiBXaG8ga25vd3MgaWZcclxuICogIGFub3RoZXIgaW1wbGVtZW50b3Igd291bGQgc29ydCBpdCA8Y29kZT5bJ0EnLCdhJywnWicsJ3onXTwvY29kZT4/XHJcbiAqIFxyXG4gKiBJbiBvcmRlciB0byBwcm92aWRlIGEgcmVsaWFibGUgaW1wbGVtZW50YXRpb24gSSB3b3VsZCBoYXZlIHRvIGNyZWF0ZSBteSBvd25cclxuICogIGltcGxlbWVudGF0aW9uIG9mIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gYW5kIHRoYXQnc1xyXG4gKiAganVzdCB0b28gbXVjaCB3b3JrIGZvciBtZSB0byBkbyBhbG9uZS5cclxuICogQHRocm93cyB7RXJyb3J9IFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5zb3J0QWxwaGFiZXRpY2FsbHkgPSBmdW5jdGlvbiBzb3J0QWxwaGFiZXRpY2FsbHkoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCIpO1xyXG59O1xyXG4vKipcclxuICogRGVsZXRlcyB0aGUgZ2l2ZW4gZWxlbWVudCBmcm9tIHRoZSBhcnJheSBhdCB0aGUgZ2l2ZW4gaW5kZXguIEl0IGJhc2ljYWxseVxyXG4gKiAgZG9lcyB3aGF0IHlvdSB3b3VsZCBleHBlY3QgdGhlIGRlbGV0ZSBvcGVyYXRvciB0byBkbywgZXhjZXB0IHRoZSBkZWxldGVcclxuICogIG9wZXJhdG9yIGRvZXNuJ3QgZG8gd2hhdCB5b3Ugd291bGQgZXhwZWN0LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5LlxyXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGRlbGV0ZS5cclxuICogQHJldHVybnMgUmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBlbGVtZW50IHJlbW92ZWQsIGNvbnRpZ3VvdXMga2V5cywgYW5kXHJcbiAqICB3aG9zZSBsZW5ndGggaXMgMSBsZXNzIHRoYW4gdGhlIGlucHV0IGFycmF5LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5kZWxldGVFbGVtZW50ID0gZnVuY3Rpb24gKGFyciwgaW5kZXgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgZGVsZXRlIGFycltpbmRleF07XHJcbiAgICByZXR1cm4gYXRyb3BhLmFycmF5cy5yZWluZGV4KGFycik7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBjdXN0b20gRXJyb3JzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGN1c3RvbSBFcnJvcnMuXHJcbiAqL1xyXG5hdHJvcGEuY3VzdG9tRXJyb3JzID0ge307XHJcblxyXG4vKipcclxuICogSW52YWxpZCBBcmd1bWVudCBUeXBlcyBFcnJvclxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAyMjFcclxuICogQGNsYXNzIEludmFsaWQgQXJndW1lbnQgVHlwZXMgRXJyb3JcclxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgT3B0aW9uYWwuIFRoZSBlcnJvciBtZXNzYWdlIHRvIHNlbmQuIERlZmF1bHRzIHRvXHJcbiAqICA8Y29kZT5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yPC9jb2RlPlxyXG4gKiBAcmV0dXJucyB7RXJyb3J9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgdGhlIEludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcclxuICovXHJcbmF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvciA9IGZ1bmN0aW9uIEludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IobWVzc2FnZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgZXJyb3IuIFRlbGxzIHRoZSB1c2VyIHdoYXQga2luZCBvZiBjdXN0b21cclxuICAgICAqIGVycm9yIGhhcyBiZWVuIHRocm93bi5cclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvciNcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKiBAZGVmYXVsdCBcImF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiXHJcbiAgICAgKi9cclxuICAgIHRoaXMubmFtZSA9IFwiYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXCI7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBlcnJvciBtZXNzYWdlIHRvIHNlbmQuXHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IjXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICogQGRlZmF1bHQgXCJJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXCJcclxuICAgICAqL1xyXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBcIkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcIjtcclxufTtcclxuYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xyXG5hdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gXHJcbiAgICBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3I7XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBYUGF0aFJlc3VsdCAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKi9cclxudmFyIGF0cm9wYSA9IHt9O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBjbGFzcyBoYXMgYmVlbiBtYXJrZWQgYXMgdW5zdXBwb3J0ZWQgYW5kIHRocm93cyBhbiBcclxuICogIGVycm9yIGlmIGl0IGhhcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgVGhlIG5hbWUgb2YgdGhlIGNsYXNzLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIE9wdGlvbmFsLiBBIGN1c3RvbSBlcnJvciBtZXNzYWdlLiBEZWZhdWx0cyB0b1xyXG4gKiAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvclxyXG4gKi9cclxuYXRyb3BhLnN1cHBvcnRDaGVjayA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIGVycm9yTWVzc2FnZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBjbGFzc05hbWUgPSBTdHJpbmcoY2xhc3NOYW1lKTtcclxuICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yO1xyXG4gICAgZXJyb3JNZXNzYWdlID0gU3RyaW5nKGVycm9yTWVzc2FnZSk7XHJcbiAgICBcclxuICAgIGlmKGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9PT0gJ3Vuc3VwcG9ydGVkJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogUHVzaGVzIGEgcmVxdWlyZW1lbnQgY2hlY2sgaW50byBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMuIFRoZSB0ZXN0XHJcbiAqICB0ZXN0cyB3aGV0aGVyIHRoZSBjbGFzcyBpcyBzdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4gU2V0c1xyXG4gKiAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSdzIHN1cHBvcnQgdG8gdW5zdXBwb3J0ZWQgYW5kIGVycm9yIHRvIGVycm9yTWVzc2FnZVxyXG4gKiAgaWYgdGhlIHJlcXVpcmVtZW50Rm4gcmV0dXJucyBmYWxzZS4gVGhlIHJlcXVpcmVtZW50IGNoZWNrcyB3aWxsIGFsbCBiZSBydW5cclxuICogIGFmdGVyIHRoZSBsaWJyYXJ5IGhhcyBsb2FkZWQuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVxdWlyZW1lbnRGbiBBIGZ1bmN0aW9uIHRvIHRlc3Qgd2hldGhlciBvciBub3QgdGhlIGNsYXNzXHJcbiAqICBpcyBzdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4gSWYgc3VwcG9ydGVkLCByZXR1cm5zIHRydWUgb3RoZXJ3aXNlXHJcbiAqICByZXR1cm4gZmFsc2UuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvck1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UgdG8gdXNlIHdoZW4gdGhpcyBjbGFzcyBvciBpdHNcclxuICogIG1ldGhvZHMgYXJlIGNhbGxlZCBpbiB1bnN1cHBvcnRlZCBlbnZpcm9ubWVudHMuIERlZmF1bHRzIHRvOlxyXG4gKiAgJ1RoZSBhdHJvcGEuJyArIGNsYXNzTmFtZSArICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xyXG4gKi9cclxuYXRyb3BhLnJlcXVpcmVzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSwgcmVxdWlyZW1lbnRGbiwgZXJyb3JNZXNzYWdlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBjaGVjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGVzdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHR5cGVvZiBjbGFzc05hbWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXRyb3BhLnJlcXVpcmVzIHJlcXVpcmVzIHRoZSBjbGFzcyBuYW1lIHRvIGJlICcgK1xyXG4gICAgICAgICAgICAgICAgJ3NwZWNpZmllZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9IHt9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodHlwZW9mIHJlcXVpcmVtZW50Rm4gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVtZW50Rm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgJ1RoZSBhdHJvcGEuJyArIGNsYXNzTmFtZSArXHJcbiAgICAgICAgICAgICAgICAgICAgJyBjbGFzcyBpcyB1bnN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50Lic7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0ID0gcmVxdWlyZW1lbnRGbigpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3IgPSBlcnJvck1lc3NhZ2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0ZXN0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5zdXBwb3J0ID0gJ3Vuc3VwcG9ydGVkJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wdXNoKGNoZWNrKTtcclxufTtcclxuLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgZ29iYWwgZGF0YSByZWxhdGVkIHRvIHRoZSBjbGFzc2VzIGFuZCBmdW5jdGlvbnMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgZ29iYWwgZGF0YSByZWxhdGVkIHRvIHRoZSBjbGFzc2VzIGFuZCBmdW5jdGlvbnMuXHJcbiAqL1xyXG5hdHJvcGEuZGF0YSA9IHt9O1xyXG5cclxuYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzID0gW107XHJcblxyXG5hdHJvcGEubm9wID0gZnVuY3Rpb24gbm9wICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG5cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgZnVuY3Rpb25zIHRoYXQgdGVzdCB0aGUgc3RhdGUgb2YgaW5wdXRzLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUgPSB7fTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBudWxsLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBudWxsLlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHggPT09IG51bGwuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZS5pc051bGwgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gKHggPT09IG51bGwpO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGFuIG9iamVjdC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgYW4gb2JqZWN0LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHR5cGVvZih4KSA9PT0gJ29iamVjdCcuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZS5pc09iamVjdCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiAodHlwZW9mIHggPT09ICdvYmplY3QnKTtcclxufTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBib3RoIGFuIG9iamVjdCBhbmQgbm90IG51bGwuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIGJvdGggYW5cclxuICogb2JqZWN0IGFuZCBudWxsLlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHggaXMgYm90aCBhbiBvYmplY3QgYW5kXHJcbiAqIG5vdCBudWxsLiAobnVsbCBpcyBhbiBvYmplY3QpLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsID0gZnVuY3Rpb24gKHgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0KHgpICYmICghYXRyb3BhLmlucXVpcmUuaXNOdWxsKHgpKTtcclxufTtcclxuLyoqXHJcbiAqIENoZWNrcyBhbiBvYmplY3QgZm9yIHRoZSBleGlzdGVuY2Ugb2YgYSBwcm9wZXJ0eVxyXG4gKiByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhlIHByb3BlcnR5IHdhcyBpbmhlcml0ZWRcclxuICogb3Igbm90LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3Qgd2hpY2ggbWF5IG9yIG1heSBub3RcclxuICogaGF2ZSB0aGUgcHJvcGVydHkgaWRlbnRpZmllZCBieSBwcm9wLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcCBBIHN0cmluZyB2YWx1ZSByZXByZXNlbnRpbmcgdGhlXHJcbiAqIG5hbWUgb2YgdGhlIHByb3BlcnR5LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIG9iai5wcm9wIGV4aXN0cyxcclxuICogb3RoZXJ3aXNlIHJldHVybnMgZmFsc2UuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZS5oYXNQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgaWYgKGF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0Tm90TnVsbChvYmopKSB7XHJcbiAgICAgICAgcmV0dXJuIChwcm9wIGluIG9iaik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYW4gZW1wdHkgc3RyaW5nLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHlvdSB3YW50IHRvIGtub3cgYWJvdXRcclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBzdHIgaXMgYW4gZW1wdHkgc3RyaW5nLFxyXG4gKiAgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2UuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZS5pc0VtcHR5U3RyaW5nID0gZnVuY3Rpb24gKHN0cikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgb3V0ID0gZmFsc2U7XHJcbiAgICBpZiAoJycgPT09IHN0cikge1xyXG4gICAgICAgIG91dCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG4vKmpzbGludFxyXG4gICAgbm9kZTogdHJ1ZVxyXG4qL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEuaW5xdWlyZSA9IHJlcXVpcmUoJ2F0cm9wYS1pbnF1aXJlJykuaW5xdWlyZTtcclxuYXRyb3BhLmFycmF5cyA9IHJlcXVpcmUoJ2F0cm9wYS1hcnJheXMnKS5hcnJheXM7XHJcbmF0cm9wYS5jdXN0b21FcnJvcnMgPSByZXF1aXJlKCdhdHJvcGEtY3VzdG9tRXJyb3JzJykuY3VzdG9tRXJyb3JzO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHJlcHJlc2VudHMgYSBmaWx0ZXIgZm9yIGFyZ3VtZW50cyBiYXNlZCBvbiB0eXBlLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAyMjFcclxuICogQGNsYXNzIFRoaXMgcmVwcmVzZW50cyBhIGZpbHRlciBmb3IgYXJndW1lbnRzIGJhc2VkIG9uIHR5cGUuXHJcbiAqIEByZXR1cm5zIHtBcmdzSW5mb30gUmV0dXJucyBhbiBBcmdzSW5mbyBmaWx0ZXIuXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzLm1hdGNoXHJcbiAqIEBleGFtcGxlXHJcbiAqIGZ1bmN0aW9uIG15Q2xhc3N5Q29uc3RydWN0b3IodGFrZXMsIGEsIGZldywgYXJncykge1xyXG4gKiAgICAgdmFyIGV4cGVjdGVkQXJnVHlwZXMsIGNoZWNrZXI7XHJcbiAqICAgICBcclxuICogICAgIGV4cGVjdGVkQXJnVHlwZXMgPSB7fTtcclxuICogICAgIGV4cGVjdGVkQXJnVHlwZXMucmVxdWVzdFdpdGhNZXNzYWdlID0gXHJcbiAqICAgICAgICAgIFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nXTtcclxuICogICAgIGV4cGVjdGVkQXJnVHlwZXMucmVxdWVzdE51bGxNZXNzYWdlID0gXHJcbiAqICAgICAgICAgIFsnc3RyaW5nJywgJ3N0cmluZycsICdvYmplY3QnLCAnZnVuY3Rpb24nXTtcclxuICogICAgIFxyXG4gKiAgICAgY2hlY2tlciA9IG5ldyBhdHJvcGEuQXJnc0luZm8oKTtcclxuICogICAgIGNoZWNrZXIuc2V0RXhwZWN0ZWRBcmdUeXBlcyhleHBlY3RlZEFyZ1R5cGVzKTtcclxuICogICAgIFxyXG4gKiAgICAgdHJ5IHtcclxuICogICAgIFxyXG4gKiAgICAgICAgIC8vIENoZWNrIHRoZSBzdXBwbGllZCBhcmd1bWVudHMgcHNldWRvIGFycmF5J3MgYXJndW1lbnQgdHlwZXNcclxuICogICAgICAgICAvLyBpZiB0aGUgcGF0dGVybiBvZiB0eXBlcyBpbiBhcmd1bWVudHMgbWF0Y2hlcyBvbmUgb2YgdGhlXHJcbiAqICAgICAgICAgLy8gcGF0dGVybnMgc2V0IG9uIGV4cGVjdGVkQXJnVHlwZXMgdGhlbiB0aGUgbWF0Y2hpbmcgcGF0dGVyblxyXG4gKiAgICAgICAgIC8vIHdpbGwgYmUgcmV0dXJuZWQuIE90aGVyd2lzZSwgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXHJcbiAqICAgICAgICAgXHJcbiAqICAgICAgICAgY2hlY2tlci5jaGVja0FyZ1R5cGVzKGFyZ3VtZW50cyk7XHJcbiAqICAgICB9IGNhdGNoIChlKSB7XHJcbiAqICAgICBcclxuICogICAgICAgICAvLyBJbnZhbGlkIGFyZ3VtZW50IHR5cGVzIHN1cHBsaWVkLiBIYW5kbGVcclxuICogICAgICAgICAvLyB0aGUgZXJyb3Igb3IgYmFpbC5cclxuICogICAgICAgICBcclxuICogICAgIH1cclxuICogICAgIFxyXG4gKiAgICAgLy8gdGhlIGFyZ3VtZW50cyBzdXBwbGllZCB3aWxsIGJlIG9mIHRoZSBwcm9wZXIgdHlwZVxyXG4gKiAgICAgLy8geW91ciBmdW5jdGlvbiBjYW4gZ28gYWhlYWQgYW5kIGRvIHRoaW5ncyB3aXRoIHRoZW1cclxuICogfVxyXG4gKi9cclxuYXRyb3BhLkFyZ3NJbmZvID0gZnVuY3Rpb24gQXJnc0luZm8oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgZXhwZWN0ZWRBcmdUeXBlcyxcclxuICAgIGNoZWNrQXJncyxcclxuICAgIHRoYXQ7XHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHRoZSBwcm9wZXIgcmVmZXJlbmNlIHRvIDxjb2RlPnRoaXM8L2NvZGU+XHJcbiAgICAgKiBmb3IgcHJpdmF0ZSBmdW5jdGlvbnMuXHJcbiAgICAgKiBAdHlwZSBUaGlzXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkFyZ3NJbmZvLVxyXG4gICAgICovXHJcbiAgICB0aGF0ID0gdGhpcztcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIGV4cGVjdGVkIGFyZ3VtZW50IHR5cGVzIG9iamVjdC5cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSBFeHBlY3RlZCBBcmcgVHlwZXNcclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5BcmdzSW5mby1cclxuICAgICAqL1xyXG4gICAgZXhwZWN0ZWRBcmdUeXBlcyA9IHt9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBleHBlY3RlZCBhcmd1bWVudCB0eXBlcy5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5BcmdzSW5mbyNcclxuICAgICAqIEBwYXJhbSB7RXhwZWN0ZWQgQXJnIFR5cGVzfSB0eXBlc09iaiBBbiBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvblxyXG4gICAgICogIGFib3V0IHRoZSB0eXBlcyBvZiBhcmd1bWVudHMgeW91IGV4cGVjdC4gU3BlY2lmaWNhbGx5LCB0aGUgb2JqZWN0IHNob3VsZFxyXG4gICAgICogIGxvb2sgbGlrZSB0aGUgZXhhbXBsZS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyB0eXBlc09iaiBpcyBleHBlY3RlZCB0byBiZSBvZiB0aGUgZm9ybTpcclxuICAgICAqIFxyXG4gICAgICogdmFyIHR5cGVzT2JqID0ge1xyXG4gICAgICogICAgIFwibmFtZWRBcmd1bWVudFR5cGVzQXJyYXlcIiA6IFtcInN0cmluZ1wiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdLFxyXG4gICAgICogICAgIFwibmFtZWRBbHRlcm5hdGVBcmd1bWVudFR5cGVzQXJyYXlcIiA6IFtcIm9iamVjdFwiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdXHJcbiAgICAgKiB9O1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBZb3UgbWF5IHVzZSBhcyBtYW55IG5hbWVkIGFycmF5cyBhcyB5b3Ugd2lzaCBhbmQgY2hlY2tBcmdUeXBlcyB3aWxsXHJcbiAgICAgKiAvLyB0ZXN0IGZvciBhIG1hdGNoIHRvIGF0IGxlYXN0IG9uZSBvZiB0aGUgcHJvdmlkZWQgbmFtZWQgYXJyYXlzLlxyXG4gICAgICogQHRocm93cyB7YXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yfSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlXHJcbiAgICAgKiAgdHlwZXNPYmogY2FuIG5vdCBiZSB1c2VkIHRvIHNldCB0aGUgZXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMuXHJcbiAgICAgKi9cclxuICAgIHRoaXMuc2V0RXhwZWN0ZWRBcmdUeXBlcyA9IGZ1bmN0aW9uIHNldEV4cGVjdGVkQXJnVHlwZXModHlwZXNPYmopIHtcclxuICAgICAgICB2YXIgZXJyb3IsIG5hbWVzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsKHR5cGVzT2JqKSkge1xyXG4gICAgICAgICAgICBuYW1lcyA9IE9iamVjdC5rZXlzKHR5cGVzT2JqKTtcclxuICAgICAgICAgICAgaWYgKG5hbWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGV4cGVjdGVkQXJnVHlwZXMgPSB0eXBlc09iajtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcihcclxuICAgICAgICAgICAgICAgICd0eXBlc09iaiBpcyBleHBlY3RlZCB0byBiZSBvZiB0aGUgZm9ybTogdmFyIHR5cGVzT2JqID0gJyArXHJcbiAgICAgICAgICAgICAgICAneyBcIm5hbWVkQXJndW1lbnRUeXBlc0FycmF5XCIgOiAnICtcclxuICAgICAgICAgICAgICAgICcgICAgW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sICcgK1xyXG4gICAgICAgICAgICAgICAgJ1wibmFtZWRBbHRlcm5hdGVBcmd1bWVudFR5cGVzQXJyYXlcIiA6ICcgK1xyXG4gICAgICAgICAgICAgICAgJyAgIFtcIm9iamVjdFwiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdIH07ICcgK1xyXG4gICAgICAgICAgICAgICAgJ1lvdSBtYXkgdXNlIGFzIG1hbnkgbmFtZWQgYXJyYXlzIGFzIHlvdSB3aXNoIGFuZCcgK1xyXG4gICAgICAgICAgICAgICAgJ2NoZWNrQXJnVHlwZXMgd2lsbCB0ZXN0IGZvciBhIG1hdGNoIHRvIGF0IGxlYXN0IG9uZSBvZiB0aGUgJyArXHJcbiAgICAgICAgICAgICAgICAncHJvdmlkZWQgbmFtZWQgYXJyYXlzLidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB0eXBlcyBvZiBhcmd1bWVudHMuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQXJnc0luZm8jXHJcbiAgICAgKiBAcGFyYW0ge2FyZ3VtZW50c30gYXJncyBBbiBhcmd1bWVudHMgb2JqZWN0LCBvciBhbnl0aGluZyB5b3Ugd2FudCB0b1xyXG4gICAgICogY2hlY2sgdGhlIHR5cGUgb2YuXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cyBwYXNzZWQgaW4uXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZ2V0QXJnVHlwZXMgPSBmdW5jdGlvbiBnZXRBcmdUeXBlcyhhcmdzKSB7XHJcbiAgICAgICAgdmFyIHgsXHJcbiAgICAgICAgYXJnVHlwZXM7XHJcbiAgICAgICAgYXJnVHlwZXMgPSBbXTtcclxuICAgICAgICBmb3IgKHggaW4gYXJncykge1xyXG4gICAgICAgICAgICBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG4gICAgICAgICAgICAgICAgYXJnVHlwZXMucHVzaCh0eXBlb2YoYXJnc1t4XSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcmdUeXBlcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENvbXBhcmVzIHRoZSBleHBlY3RlZCBhcmd1bWVudHMgdHlwZXMgdG8gdGhlXHJcbiAgICAgKiByZWNlaXZlZCBhcmd1bWVudHMgdHlwZXMuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvLVxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXhwZWN0ZWRUeXBlc0FycmF5IEFuIGFycmF5IHRha2VuIGZyb20gdGhlIHVzZXJcclxuICAgICAqIGNyZWF0ZWQgYXJndW1lbnQgdHlwZXMgb2JqZWN0LlxyXG4gICAgICogQHBhcmFtIHthcmd1bWVudHN9IGFyZ3MgYW4gYXJndW1lbnRzIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGV4cGVjdGVkIHR5cGVzIG1hdGNoIGZvciB0eXBlXHJcbiAgICAgKiAgYW5kIGFyZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgcmVjZWl2ZWQgdHlwZXMuXHJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLmFycmF5cy5tYXRjaFxyXG4gICAgICovXHJcbiAgICBjaGVja0FyZ3MgPSBmdW5jdGlvbiBjaGVja0FyZ3MoZXhwZWN0ZWRUeXBlc0FycmF5LCBhcmdzKSB7XHJcbiAgICAgICAgdmFyIHR5cGVzO1xyXG4gICAgICAgIHR5cGVzID0ge307XHJcbiAgICAgICAgdHlwZXMuZXhwZWN0ZWQgPSBleHBlY3RlZFR5cGVzQXJyYXk7XHJcbiAgICAgICAgdHlwZXMucmVjZWl2ZWQgPSB0aGF0LmdldEFyZ1R5cGVzKGFyZ3MpO1xyXG4gICAgICAgIHJldHVybiBhdHJvcGEuYXJyYXlzLm1hdGNoKHR5cGVzLmV4cGVjdGVkLCB0eXBlcy5yZWNlaXZlZCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgdGhlIGdpdmVuIGFyZ3VtZW50cyBvYmplY3QgYWdhaW5zdCB0aGUgZXhwZWN0ZWRcclxuICAgICAqIGFyZ3VtZW50cyB0eXBlcy5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5BcmdzSW5mbyNcclxuICAgICAqIEBwYXJhbSB7YXJndW1lbnRzfSBhcmdzIEFuIGFyZ3VtZW50cyBvYmplY3RcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSB1c2VyIGFzc2lnbmVkIGtleSB3aGljaCBtYXRjaGVzIHRoZVxyXG4gICAgICogYXJndW1lbnRzIHN1cHBsaWVkLCBvciB0aHJvd3MgYW4gZXJyb3IuXHJcbiAgICAgKiBAdGhyb3dzIHthdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiBubyBtYXRjaGluZ1xyXG4gICAgICogIHBhdHRlcm4gb2YgYXJndW1lbnQgdHlwZXMgY2FuIGJlIGZvdW5kIGZvciA8Y29kZT5hcmdzPC9jb2RlPlxyXG4gICAgICogQHNlZSBhdHJvcGEuQXJnc0luZm8jc2V0RXhwZWN0ZWRBcmdUeXBlc1xyXG4gICAgICovXHJcbiAgICB0aGlzLmNoZWNrQXJnVHlwZXMgPSBmdW5jdGlvbiBjaGVja0FyZ1R5cGVzKGFyZ3MpIHtcclxuICAgICAgICB2YXIgZXhwZWN0ZWRUeXBlcztcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZXhwZWN0ZWRBcmdUeXBlcykubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKFxyXG4gICAgICAgICAgICAgICAgJ0V4cGVjdGVkIGFyZ3VtZW50IHR5cGVzIGlzIG5vdCBzZXQuIFVzZSAnICtcclxuICAgICAgICAgICAgICAgICdzZXRFeHBlY3RlZEFyZ1R5cGVzKHR5cGVzT2JqKSB0byBzZXQuIHR5cGVzT2JqIGlzIGFuICcgK1xyXG4gICAgICAgICAgICAgICAgJ29iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBhcnJheXMgb2Ygc3RyaW5ncyByZXByZXNlbnRpbmcgJyArXHJcbiAgICAgICAgICAgICAgICAndGhlIHR5cGVvZihhcmd1bWVudCkgZm9yIGVhY2ggYXJndW1lbnQsIGluIHRoZSBleGFjdCBvcmRlciAnICtcclxuICAgICAgICAgICAgICAgICdpbiB3aGljaCB0aGV5IHdpbGwgYmUgZ2l2ZW4gdG8gdGhlIGZ1bmN0aW9uLiBVc2luZyBtdWx0aXBsZSAnICtcclxuICAgICAgICAgICAgICAgICdwcm9wZXJ0aWVzIGl0IGlzIHBvc3NpYmxlIHRvIGRlZmluZSBhbHRlcm5hdGl2ZSBhY2NlcHRhYmxlICcgK1xyXG4gICAgICAgICAgICAgICAgJ2FyZ3VtZW50IHR5cGUgc2V0cy4gVXNlIGdldEFyZ1R5cGVzKGFyZ3VtZW50cykgYXMgYSAnICtcclxuICAgICAgICAgICAgICAgICdjb252ZW5pZW50IHdheSBvZiBnZXR0aW5nIHRoZSBhcnJheSB5b3Ugd2FudCB0byBoYXJkIGNvZGUgJyArXHJcbiAgICAgICAgICAgICAgICAnaW4gZm9yIHZhbGlkYXRpb24uIEV4YW1wbGU6IHZhciB0eXBlc09iaiA9ICcgK1xyXG4gICAgICAgICAgICAgICAgJ3sgXCJtZXNzYWdlSW5jbHVkZWRcIiA6IFtcInN0cmluZ1wiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdLCAnICtcclxuICAgICAgICAgICAgICAgICdcIm1lc3NhZ2VOb3RJbmNsdWRlZFwiIDogW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0gfTsnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoZXhwZWN0ZWRUeXBlcyBpbiBleHBlY3RlZEFyZ1R5cGVzKSB7XHJcbiAgICAgICAgICAgIGlmIChleHBlY3RlZEFyZ1R5cGVzLmhhc093blByb3BlcnR5KGV4cGVjdGVkVHlwZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tBcmdzKGV4cGVjdGVkQXJnVHlwZXNbZXhwZWN0ZWRUeXBlc10sIGFyZ3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4cGVjdGVkVHlwZXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcihcclxuICAgICAgICAgICAgJ2ludmFsaWQgYXJndW1lbnQgdHlwZSBAIGF0cm9wYS5BcmdzSW5mby5jaGVja0FyZ1R5cGVzJyk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iXX0=
