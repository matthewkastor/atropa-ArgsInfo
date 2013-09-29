;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
atropa.inquire = require('atropa-inquire').inquire;
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.arrays">tests</a>
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
 * @param {Array} (minuend) fromB The array with elements duplicated in <code>a</code>
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
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * Invalid Argument Types Error
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @class Invalid Argument Types Error
 * @param {String} message Optional. The error message to send. Defaults to
 *  <code>InvalidArgumentTypesError</code>
 * @returns {Error} Returns an instance of the InvalidArgumentTypesError
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.customErrors">tests</a>
 */
atropa.InvalidArgumentTypesError = function InvalidArgumentTypesError(message) {
    'use strict';
    /**
     * The name of the error. Tells the user what kind of custom
     * error has been thrown.
     * @fieldOf atropa.InvalidArgumentTypesError#
     * @type {String}
     * @default "atropa.InvalidArgumentTypesError"
     */
    this.name = "atropa.InvalidArgumentTypesError";
    /**
     * The error message to send.
     * @fieldOf atropa.InvalidArgumentTypesError#
     * @type {String}
     * @default "InvalidArgumentTypesError"
     */
    this.message = message || "InvalidArgumentTypesError";
};
atropa.InvalidArgumentTypesError.prototype = new Error();
atropa.InvalidArgumentTypesError.prototype.constructor = 
    atropa.InvalidArgumentTypesError;




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":4}],4:[function(require,module,exports){
var atropa = {};

/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>

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
var atropa;
atropa = {};
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
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.inquire">tests</a>
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
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/**
 * Required module, the docs for it are in the <code>
 *  atropa-inquire/docs</code> directory where this module 
 *  is located.
 * @see <a href="../../../node_modules/atropa-inquire/docs/jsdoc/index.html">
 * ../../../node_modules/atropa-inquire/docs/jsdoc/index.html</a>,
 *  unless you installed this dependency manually.
 */
atropa.inquire = require('atropa-inquire').inquire;
/**
 * Required module, the docs for it are in the <code>
 *  atropa-arrays/docs</code> directory where this module 
 *  is located.
 * @see <a href="../../../node_modules/atropa-arrays/docs/jsdoc/index.html">
 * ../../../node_modules/atropa-arrays/docs/jsdoc/index.html</a>,
 *  unless you installed this dependency manually.
 */
atropa.arrays = require('atropa-arrays').arrays;
/**
 * Required module, the docs for it are in the <code>
 *  atropa-customErrors/docs</code> directory where this module 
 *  is located.
 * @see <a href="../../../node_modules/atropa-customErrors/docs/jsdoc/index.html">
 * ../../../node_modules/atropa-customErrors/docs/jsdoc/index.html</a>,
 *  unless you installed this dependency manually.
 */
atropa.customErrors = require('atropa-customErrors').customErrors;
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.ArgsInfo">tests</a>
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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRG9jdW1lbnRzXFxHaXRIdWJcXGF0cm9wYS1BcmdzSW5mb1xcZGV2XFxicm93c2VyTWFpbi5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEb2N1bWVudHNcXEdpdEh1YlxcYXRyb3BhLUFyZ3NJbmZvXFxub2RlX21vZHVsZXNcXGF0cm9wYS1hcnJheXNcXHNyY1xcYXRyb3BhLWFycmF5cy5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEb2N1bWVudHNcXEdpdEh1YlxcYXRyb3BhLUFyZ3NJbmZvXFxub2RlX21vZHVsZXNcXGF0cm9wYS1jdXN0b21FcnJvcnNcXHNyY1xcYXRyb3BhLWN1c3RvbUVycm9ycy5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEb2N1bWVudHNcXEdpdEh1YlxcYXRyb3BhLUFyZ3NJbmZvXFxub2RlX21vZHVsZXNcXGF0cm9wYS1oZWFkZXJcXHNyY1xcYXRyb3BhLWhlYWRlci5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEb2N1bWVudHNcXEdpdEh1YlxcYXRyb3BhLUFyZ3NJbmZvXFxub2RlX21vZHVsZXNcXGF0cm9wYS1pbnF1aXJlXFxzcmNcXGF0cm9wYS1pbnF1aXJlLmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERvY3VtZW50c1xcR2l0SHViXFxhdHJvcGEtQXJnc0luZm9cXHNyY1xcYXRyb3BhLUFyZ3NJbmZvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcGJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEFyZ3NJbmZvID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS1BcmdzSW5mby5qcycpO1xyXG5cclxudHJ5IHtcclxuICAgIE9iamVjdC5rZXlzKEFyZ3NJbmZvKS5mb3JFYWNoKFxyXG4gICAgICAgIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgICAgIGlmKCFhdHJvcGFbcHJvcF0pIHtcclxuICAgICAgICAgICAgICAgIGF0cm9wYVtwcm9wXSA9IEFyZ3NJbmZvW3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSBjYXRjaCAoaWdub3JlKSB7XHJcbiAgICBhdHJvcGEgPSByZXF1aXJlKCcuLi9zcmMvYXRyb3BhLUFyZ3NJbmZvLmpzJyk7XHJcbn1cclxuXHJcbk9iamVjdC5rZXlzKEFyZ3NJbmZvLmRhdGEpLmZpbHRlcihcclxuICAgIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3AgIT09ICdyZXF1aXJlbWVudHMnO1xyXG4gICAgfVxyXG4pLmZvckVhY2goXHJcbiAgICBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgIGF0cm9wYS5kYXRhW3Byb3BdID0gQXJnc0luZm8uZGF0YVtwcm9wXTtcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxuICovXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuYXRyb3BhLmlucXVpcmUgPSByZXF1aXJlKCdhdHJvcGEtaW5xdWlyZScpLmlucXVpcmU7XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgYXJyYXlzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjIxXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgYXJyYXlzLlxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vQXRyb3BhVG9vbGJveFRlc3RzLmh0bWw/c3BlYz1hdHJvcGEuYXJyYXlzXCI+dGVzdHM8L2E+XG4gKi9cbmF0cm9wYS5hcnJheXMgPSB7fTtcbi8qKlxuICogQ29tcGFyZXMgdHdvIGFycmF5cyBiYXNlZCBvbiBzaXplLCBjb250ZW50cywgYW5kIGVsZW1lbnQgb3JkZXIuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBPbmUgYXJyYXkgeW91IHdhbnQgY29tcGFyZWQgdG8gYW5vdGhlci5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBUaGUgb3RoZXIgYXJyYXkuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvblxuICogIHdoZXRoZXIgb3Igbm90IHRoZSBhcnJheXMgbWF0Y2hlZCBpbiBzaXplLCBjb21wb3NpdGlvbiwgYW5kXG4gKiAgZWxlbWVudCBvcmRlci5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDJdO1xuICogdmFyIHkgPSBbMSwxLDNdO1xuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xuICogLy8gcmV0dXJucyBmYWxzZVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMl07XG4gKiB2YXIgeSA9IFsxLDJdO1xuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xuICogLy8gcmV0dXJucyB0cnVlXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwyXTtcbiAqIHZhciB5ID0gWzIsMV07XG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XG4gKiAvLyByZXR1cm5zIGZhbHNlIGJlY2F1c2UgdGhlIGVsZW1lbnRzIGFyZSBub3QgaW4gdGhlIHNhbWUgb3JkZXIuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSx7J2FQcm9wJyA6ICdhVmFsdWUnfV07XG4gKiB2YXIgeSA9IFsxLHsnYVByb3AnIDogJ2FWYWx1ZSd9XTtcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcbiAqIC8vIHJldHVybnMgZmFsc2UgYmVjYXVzZSBldmVuIHRob3VnaCB0aGUgb2JqZWN0IGxvb2tzIHRoZSBzYW1lLCB0aGVcbiAqIC8vIHR3byBvYmplY3RzIGFyZSBpbiBmYWN0IGRpc3RpbmN0IG9iamVjdHMuXG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWx1ZSd9O1xuICogdmFyIHggPSBbMSxvYmpdO1xuICogdmFyIHkgPSBbMSxvYmpdO1xuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xuICogLy8gcmV0dXJucyB0cnVlIGJlY2F1c2UgdGhlIG9iamVjdHMgcmVmZXJlbmNlZCBpbiB0aGUgYXJyYXlzIGFyZVxuICogLy8gaW4gZmFjdCB0aGUgc2FtZSBvYmplY3QuXG4gKi9cbmF0cm9wYS5hcnJheXMubWF0Y2ggPSBmdW5jdGlvbiBhcnJheXNNYXRjaChhcnJheTEsIGFycmF5Mikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB4LFxuICAgIGw7XG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsID0gYXJyYXkxLmxlbmd0aDtcbiAgICBmb3IgKHggPSAwOyB4IDwgbDsgeCArPSAxKSB7XG4gICAgICAgIGlmIChhcnJheTFbeF0gIT09IGFycmF5Mlt4XSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcbi8qKlxuICogU3VidHJhY3RzIG9uZSBhcnJheSBmcm9tIGFub3RoZXIgYXJyYXkgYmFzZWQgb24gdGhlIHVuaXF1ZSB2YWx1ZXMgaW4gYm90aFxuICogIHNldHMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMTJcbiAqIEBwYXJhbSB7QXJyYXl9IGEgKHN1YnRyYWhlbmQpIFRoZSBhcnJheSB0byBzdWJ0cmFjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IChtaW51ZW5kKSBmcm9tQiBUaGUgYXJyYXkgd2l0aCBlbGVtZW50cyBkdXBsaWNhdGVkIGluIDxjb2RlPmE8L2NvZGU+XG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgY29udGFpbmluZyBvbmx5IHRoZSB1bmlxdWVcbiAqICB2YWx1ZXMgZm91bmQgaW4gPGNvZGU+ZnJvbUI8L2NvZGU+IHRoYXQgYXJlIG5vdCBwcmVzZW50IGluIDxjb2RlPmE8L2NvZGU+XG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwyXTtcbiAqIHZhciB5ID0gWzEsMSwzXTtcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgWzNdXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzXTtcbiAqIHZhciB5ID0gWzMsMV07XG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFtdXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzXTtcbiAqIHZhciB5ID0gWzMsMSwxLDldO1xuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbOV1cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ31cbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xuICogdmFyIHkgPSBbMywxLG9ial07XG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFtdIFxuICogLy8gYmVjYXVzZSB0aGUgb2JqZWN0cyByZWZlcmVuY2VkIGluIHRoZSBhcnJheXMgYXJlIHRoZSBzYW1lIG9iamVjdC5cbiAqL1xuYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCA9IGZ1bmN0aW9uKGEsIGZyb21CKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHRoZSA9IHt9O1xuICAgIHRoZS5yZXN1bHQgPSBbXTtcbiAgICBmcm9tQi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICB0aGUubWFyayA9IGZhbHNlO1xuICAgICAgICBhLmZvckVhY2goZnVuY3Rpb24ocm0pe1xuICAgICAgICAgICAgaWYoaXRlbSA9PT0gcm0pIHtcbiAgICAgICAgICAgICAgICB0aGUubWFyayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGUubWFyayAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhlLnJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoZS5yZXN1bHQ7XG59O1xuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlbiBhcnJheXMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMTJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBBbiBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBBbm90aGVyIGFycmF5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlblxuICogIGFycmF5cy5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDMsNF07XG4gKiB2YXIgeSA9IFszLDEsNV07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwzXVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMSwzLDRdO1xuICogdmFyIHkgPSBbMywxLDEsNV07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwxLDNdXG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xuICogdmFyIHkgPSBbMywxLG9ial07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV1cbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFsxLDNdIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwzXSBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cbiAqL1xuYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QgPSBmdW5jdGlvbiBpbnRlcnNlY3QoYXJyYXkxLCBhcnJheTIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgc21hbGxBcnJheSwgbGFyZ2VBcnJheSwgaW50ZXJzZWN0aW9uID0gW107XG4gICAgaWYoYXJyYXkxLmxlbmd0aCA+IGFycmF5Mi5sZW5ndGgpIHtcbiAgICAgICAgbGFyZ2VBcnJheSA9IGFycmF5MS5zcGxpY2UoMCk7XG4gICAgICAgIHNtYWxsQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxhcmdlQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xuICAgICAgICBzbWFsbEFycmF5ID0gYXJyYXkxLnNwbGljZSgwKTtcbiAgICB9XG4gICAgc21hbGxBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhciBpZHhJbkxhcmdlQXJyYXkgPSBsYXJnZUFycmF5LmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmICgwIDw9IGlkeEluTGFyZ2VBcnJheSkgeyAvLyBoYXMgd29yZFxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uLnB1c2gobGFyZ2VBcnJheS5zcGxpY2UoaWR4SW5MYXJnZUFycmF5LCAxKVswXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uO1xufTtcbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZnJlcXVlbmN5IG9mIGl0ZW1zIG9jY3VycmluZyBpbiBhbiBhcnJheS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBjYWxjdWxhdGUgZnJlcXVlbmNpZXMgZnJvbS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdob3NlIGtleXMgYXJlIGVhY2ggdW5pcXVlXG4gKiAgZWxlbWVudHMgZnJvbSB0aGUgYXJyYXkgYW5kIHRoZWlyIHZhbHVlIGlzIHRoZWlyIGZyZXF1ZW5jeSBvZlxuICogIG9jY3VycmVuY2Ugd2l0aGluIHRoZSBhcnJheS4gQmUgY2FyZWZ1bCB0aGF0IHlvdXIgYXJyYXkgZG9lc1xuICogIG5vdCBjb250YWluIHZhbHVlcyBtYXRjaGluZyBvYmplY3QgaW5zdGFuY2UgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwxLDEsMSwxLDMsM107XG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcbiAqIC8vIHJldHVybnMge1xuICogLy8gICAgIFwiMVwiOiA1LFxuICogLy8gICAgIFwiM1wiOiAyXG4gKiAvLyB9XG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdO1xuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XG4gKiAvLyByZXR1cm5zIHtcbiAqIC8vICAgICBcImJpbGxcIjogMSxcbiAqIC8vICAgICBcImZyZWRcIjogMixcbiAqIC8vICAgICBcImphbmVcIjogMVxuICogLy8gfVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XG4gKiAvLyByZXR1cm5zIHtcbiAqIC8vICAgICBcIjFcIjogMSxcbiAqIC8vICAgICBcIjNcIjogMSxcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAxXG4gKiAvLyB9XG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcbiAqIHZhciBvdGhlck9iaiA9IHt9O1xuICogdmFyIHggPSBbMSwzLG9iaixvdGhlck9iaix7J2FEb3VnaG51dCcgOiAnc3ByaW5rbGVzJ31dO1xuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XG4gKiAvLyByZXR1cm5zIHtcbiAqIC8vICAgICBcIjFcIjogMSxcbiAqIC8vICAgICBcIjNcIjogMSxcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAzXG4gKiAvLyB9XG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzLFwidG9TdHJpbmdcIl07XG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcbiAqIC8vIHJldHVybnMge1xuICogLy8gICAgIFwiMVwiOiAxLFxuICogLy8gICAgIFwiM1wiOiAxLFxuICogLy8gICAgIFwidG9TdHJpbmdcIjogXCJmdW5jdGlvbiB0b1N0cmluZygpIHtcXG4gICAgW25hdGl2ZSBjb2RlXVxcbn0xXCJcbiAqIC8vIH1cbiAqL1xuYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3kgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIG91dCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY3Vycikge1xuICAgICAgICBpZiAoYWNjW2N1cnJdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFjY1tjdXJyXSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY2NbY3Vycl0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgICByZXR1cm4gb3V0O1xufTtcbi8qKlxuICogR2V0cyBVbmlxdWUgdmFsdWVzIGZyb20gYW4gYXJyYXkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMThcbiAqIEBwYXJhbSB7QXJyYXl9IGxhcmdlQXJyYXkgVGhlIGFycmF5IHdpdGggZHVwbGljYXRlIHZhbHVlcyBpbiBpdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBjb250YWluaW5nIG9ubHkgdGhlIHVuaXF1ZVxuICogIHZhbHVlcyBmb3VuZCBpbiB0aGUgbGFyZ2VBcnJheS5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDEsMSw0LDQsMyw2XTtcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xuICogLy8gcmV0dXJucyBbIFwiMVwiLCBcIjRcIiwgXCIzXCIsIFwiNlwiIF1cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiamFuZVwiLCBcImZyZWRcIl07XG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcbiAqIC8vIHJldHVybnMgW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbIFxuICogICAgIFwiYmlsbFwiLFxuICogICAgIHtcImFQcm9wXCIgOiBcImFWYWx1ZVwifSxcbiAqICAgICB7XCJhR3V5XCIgOiBcImZyZWRcIn0sXG4gKiAgICAge1wiYUxhZHlcIiA6IFwiamFuZVwifVxuICogXTtcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xuICogLy8gcmV0dXJucyBbIFwiYmlsbFwiLCBcIltvYmplY3QgT2JqZWN0XVwiIF1cbiAqL1xuYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUgPSBmdW5jdGlvbiAobGFyZ2VBcnJheSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeShsYXJnZUFycmF5KSkuc29ydCgpO1xufTtcbi8qKlxuICogUmVtb3ZlcyBlbXB0eSBzdHJpbmdzIGZyb20gdGhlIGdpdmVuIGFycmF5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheVdpdGhFbXB0eUVsZW1lbnRzIFRoZSBhcnJheSB3aXRoIGVtcHR5IHN0cmluZ3MgaW4gaXQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBlbXB0eSBzdHJpbmdzIHJlbW92ZWQuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbIDEwLCAsIDUsIFwiXCIsICcnLCA3IF07XG4gKiBjb25zb2xlLmxvZygnc3RhcnRpbmcgbGVuZ3RoICcgKyB4Lmxlbmd0aCk7XG4gKiBjb25zb2xlLmxvZyh4KTtcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMoeCk7XG4gKiBjb25zb2xlLmxvZygnZW5kaW5nIGxlbmd0aCAnICsgeC5sZW5ndGgpO1xuICogY29uc29sZS5sb2coeCk7XG4gKiAvLyBkaXNwbGF5cyB0aGUgZm9sbG93aW5nXG4gKiAvLyBzdGFydGluZyBsZW5ndGggNlxuICogLy8gWzEwLCB1bmRlZmluZWQsIDUsIFwiXCIsIFwiXCIsIDddXG4gKiAvLyBlbmRpbmcgbGVuZ3RoIDNcbiAqIC8vIFsxMCwgNSwgN11cbiAqL1xuYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzID0gZnVuY3Rpb24gKGFycmF5V2l0aEVtcHR5RWxlbWVudHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gYXJyYXlXaXRoRW1wdHlFbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuICFhdHJvcGEuaW5xdWlyZS5pc0VtcHR5U3RyaW5nKGl0ZW0pO1xuICAgIH0pO1xufTtcbi8qKlxuICogUmVpbmRleGVzIGFuIGFycmF5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHdpdGggZGlzY29udGludW91cyBrZXlzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdpdGggY29udGludW91cyBrZXlzLlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWyBcImFcIiwgXCJiXCIsIFwiY1wiLCB1bmRlZmluZWQgXTtcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCBcImJcIiwgXCJjXCIsIHVuZGVmaW5lZCBdXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDRcbiAqIFxuICogZGVsZXRlIHhbMV07IC8vIGRlbGV0ZXMgdGhlIGtleSBmcm9tIHRoZSBhcnJheSBidXRcbiAqICAgICAgICAgICAgICAvLyB0aGUgYXJyYXkgbGVuZ3RoIHJlbWFpbnMgdGhlIHNhbWVcbiAqICAgICAgICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHRoZSBhcnJheXMga2V5cyBhcmUgMCwgMiwgYW5kIDNcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCB1bmRlZmluZWQsIFwiY1wiLCB1bmRlZmluZWQgXVxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyA0XG4gKiBcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlaW5kZXgoeCk7XG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gIFsgXCJhXCIsIFwiY1wiLCB1bmRlZmluZWQgXVxuICogICAgLy8gbm90ZSB0aGF0IHRoZSBsYXN0IGVsZW1lbnQgZXhpc3RlZCBpbiB0aGUgYXJyYXksIGl0cyB2YWx1ZSB3YXNcbiAqICAgIC8vIHVuZGVmaW5lZCBidXQgaXQgZGlkIGhhdmUgYSBrZXkgc28gdGhlIGVsZW1lbnQgcmVtYWlucyBpbiB0aGUgYXJyYXkuXG4gKiAgICAvL1xuICogICAgLy8gVGhlIGRlbGV0ZWQgZWxlbWVudCB3YXMgaW4gZmFjdCBkZWxldGVkIGZyb20gdGhlIGFycmF5IHNvIHRoZXJlIHdhcyBub1xuICogICAgLy8ga2V5IHhbMV0gYXQgYWxsLCB3aGVuIHRyeWluZyB0byBhY2Nlc3MgdGhpcyBub24gZXhpc3RpbmcgZWxlbWVudCB0aGVcbiAqICAgIC8vIHZhbHVlIG9mIHVuZGVmaW5lZCB3YXMgcmV0dXJuZWQuIFRoaXMgYmVoYXZpb3IgaXMgY29uZnVzaW5nIHVubGVzcyB5b3VcbiAqICAgIC8vIHRoaW5rIGFib3V0IHRoZSBhcnJheWFzIGFuIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBuYW1lZCBieVxuICogICAgLy8gbnVtYmVycy4gQWNjZXNzaW5nIGFuIHVuZGVmaW5lZCBwcm9wZXJ0eSByZXR1cm5zIHVuZGVmaW5lZCByZWdhcmRsZXNzXG4gKiAgICAvLyBvZiB3aGV0aGVyIHRoZSBwcm9wZXJ0eSBleGlzdGVkIGluIHRoZSBwYXN0IG9yIG5vdC5cbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gM1xuICovXG5hdHJvcGEuYXJyYXlzLnJlaW5kZXggPSBmdW5jdGlvbiByZWluZGV4KGFycikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBpZHgsIG91dDtcbiAgICBvdXQgPSBbXTtcbiAgICBmb3IoaWR4IGluIGFycikge1xuICAgICAgICBpZihhcnIuaGFzT3duUHJvcGVydHkoaWR4KSkge1xuICAgICAgICAgICAgb3V0LnB1c2goYXJyW2lkeF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuLyoqXG4gKiBTb3J0cyBhbiBhcnJheSdzIGVsZW1lbnRzIG51bWVyaWNhbGx5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNvcnQuIEFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgbXVzdCBiZVxuICogIG51bWJlci1pc2guXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2hvc2UgZWxlbWVudHMgYXJlIGluIG51bWVyaWMgb3JkZXIuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMywgMiwgOSwgMjYsIDEwLCAxLCA5OSwgMTVdO1xuICogY29uc29sZS5sb2coIGF0cm9wYS5hcnJheXMuc29ydE51bWVyaWNhbGx5KHgpICk7XG4gKiAvLyBsb2dzIFsxLCAyLCAzLCA5LCAxMCwgMTUsIDI2LCA5OV1cbiAqL1xuYXRyb3BhLmFycmF5cy5zb3J0TnVtZXJpY2FsbHkgPSBmdW5jdGlvbiBzb3J0TnVtZXJpY2FsbHkoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIGFyci5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiAoYSAtIGIpO1xuICAgIH0pO1xufTtcbi8qKlxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcbiAqICBzdGFuZGFyZGl6ZWQuXG4gKiBcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcbiAqICBjb21wYXJpc29uIGlzIGltcGxlbWVudGF0aW9uIGRlcGVuZGFudC4gVGhpcyBtZWFucyB0aGF0IFwiYWxwaGFiZXRpY2FsIG9yZGVyXCJcbiAqICBjYW4gYmUgZGlmZmVyZW50IG9uIGRpZmZlcmVudCBwbGF0Zm9ybXMuIFdoYXQgSSBmb3VuZCB3YXMgdGhhdCBpbiBub2RlIHRoZVxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cbiAqICA8Y29kZT5bJ0EnLCdaJywnYScsJ3pcIl08L2NvZGU+LCB3aGlsZSBvblxuICogIGZpcmVmb3ggaXQgd291bGQgYmUgc29ydGVkIHRvIDxjb2RlPlsnYScsJ0EnLCd6JywnWiddPC9jb2RlPi4gV2hvIGtub3dzIGlmXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cbiAqIFxuICogSW4gb3JkZXIgdG8gcHJvdmlkZSBhIHJlbGlhYmxlIGltcGxlbWVudGF0aW9uIEkgd291bGQgaGF2ZSB0byBjcmVhdGUgbXkgb3duXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXG4gKiAganVzdCB0b28gbXVjaCB3b3JrIGZvciBtZSB0byBkbyBhbG9uZS5cbiAqIEB0aHJvd3Mge0Vycm9yfSBcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCJcbiAqL1xuYXRyb3BhLmFycmF5cy5zb3J0QWxwaGFiZXRpY2FsbHkgPSBmdW5jdGlvbiBzb3J0QWxwaGFiZXRpY2FsbHkoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIik7XG59O1xuLyoqXG4gKiBEZWxldGVzIHRoZSBnaXZlbiBlbGVtZW50IGZyb20gdGhlIGFycmF5IGF0IHRoZSBnaXZlbiBpbmRleC4gSXQgYmFzaWNhbGx5XG4gKiAgZG9lcyB3aGF0IHlvdSB3b3VsZCBleHBlY3QgdGhlIGRlbGV0ZSBvcGVyYXRvciB0byBkbywgZXhjZXB0IHRoZSBkZWxldGVcbiAqICBvcGVyYXRvciBkb2Vzbid0IGRvIHdoYXQgeW91IHdvdWxkIGV4cGVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkuXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGRlbGV0ZS5cbiAqIEByZXR1cm5zIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgZWxlbWVudCByZW1vdmVkLCBjb250aWd1b3VzIGtleXMsIGFuZFxuICogIHdob3NlIGxlbmd0aCBpcyAxIGxlc3MgdGhhbiB0aGUgaW5wdXQgYXJyYXkuXG4gKi9cbmF0cm9wYS5hcnJheXMuZGVsZXRlRWxlbWVudCA9IGZ1bmN0aW9uIChhcnIsIGluZGV4KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZGVsZXRlIGFycltpbmRleF07XG4gICAgcmV0dXJuIGF0cm9wYS5hcnJheXMucmVpbmRleChhcnIpO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLyoqXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxuICovXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuXG4vKipcbiAqIEludmFsaWQgQXJndW1lbnQgVHlwZXMgRXJyb3JcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxuICogQGNsYXNzIEludmFsaWQgQXJndW1lbnQgVHlwZXMgRXJyb3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIE9wdGlvbmFsLiBUaGUgZXJyb3IgbWVzc2FnZSB0byBzZW5kLiBEZWZhdWx0cyB0b1xuICogIDxjb2RlPkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3I8L2NvZGU+XG4gKiBAcmV0dXJucyB7RXJyb3J9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgdGhlIEludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL0F0cm9wYVRvb2xib3hUZXN0cy5odG1sP3NwZWM9YXRyb3BhLmN1c3RvbUVycm9yc1wiPnRlc3RzPC9hPlxuICovXG5hdHJvcGEuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvciA9IGZ1bmN0aW9uIEludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IobWVzc2FnZSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgZXJyb3IuIFRlbGxzIHRoZSB1c2VyIHdoYXQga2luZCBvZiBjdXN0b21cbiAgICAgKiBlcnJvciBoYXMgYmVlbiB0aHJvd24uXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IjXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKiBAZGVmYXVsdCBcImF0cm9wYS5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXCJcbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSBcImF0cm9wYS5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXCI7XG4gICAgLyoqXG4gICAgICogVGhlIGVycm9yIG1lc3NhZ2UgdG8gc2VuZC5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvciNcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqIEBkZWZhdWx0IFwiSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiXG4gICAgICovXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBcIkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcIjtcbn07XG5hdHJvcGEuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcbmF0cm9wYS5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFxuICAgIGF0cm9wYS5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yO1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCJ2YXIgYXRyb3BhID0ge307XG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG5cbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBYUGF0aFJlc3VsdCAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXG4gKi9cbnZhciBhdHJvcGE7XG5hdHJvcGEgPSB7fTtcbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBjbGFzcyBoYXMgYmVlbiBtYXJrZWQgYXMgdW5zdXBwb3J0ZWQgYW5kIHRocm93cyBhbiBcbiAqICBlcnJvciBpZiBpdCBoYXMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAzMDhcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgVGhlIG5hbWUgb2YgdGhlIGNsYXNzLlxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBPcHRpb25hbC4gQSBjdXN0b20gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdHMgdG9cbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yXG4gKi9cbmF0cm9wYS5zdXBwb3J0Q2hlY2sgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBlcnJvck1lc3NhZ2UpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBjbGFzc05hbWUgPSBTdHJpbmcoY2xhc3NOYW1lKTtcbiAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvcjtcbiAgICBlcnJvck1lc3NhZ2UgPSBTdHJpbmcoZXJyb3JNZXNzYWdlKTtcbiAgICBcbiAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPT09ICd1bnN1cHBvcnRlZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgfVxufTtcbi8qKlxuICogUHVzaGVzIGEgcmVxdWlyZW1lbnQgY2hlY2sgaW50byBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMuIFRoZSB0ZXN0XG4gKiAgdGVzdHMgd2hldGhlciB0aGUgY2xhc3MgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIFNldHNcbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdJ3Mgc3VwcG9ydCB0byB1bnN1cHBvcnRlZCBhbmQgZXJyb3IgdG8gZXJyb3JNZXNzYWdlXG4gKiAgaWYgdGhlIHJlcXVpcmVtZW50Rm4gcmV0dXJucyBmYWxzZS4gVGhlIHJlcXVpcmVtZW50IGNoZWNrcyB3aWxsIGFsbCBiZSBydW5cbiAqICBhZnRlciB0aGUgbGlicmFyeSBoYXMgbG9hZGVkLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlcXVpcmVtZW50Rm4gQSBmdW5jdGlvbiB0byB0ZXN0IHdoZXRoZXIgb3Igbm90IHRoZSBjbGFzc1xuICogIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50LiBJZiBzdXBwb3J0ZWQsIHJldHVybnMgdHJ1ZSBvdGhlcndpc2VcbiAqICByZXR1cm4gZmFsc2UuXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoaXMgY2xhc3Mgb3IgaXRzXG4gKiAgbWV0aG9kcyBhcmUgY2FsbGVkIGluIHVuc3VwcG9ydGVkIGVudmlyb25tZW50cy4gRGVmYXVsdHMgdG86XG4gKiAgJ1RoZSBhdHJvcGEuJyArIGNsYXNzTmFtZSArICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xuICovXG5hdHJvcGEucmVxdWlyZXMgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCByZXF1aXJlbWVudEZuLCBlcnJvck1lc3NhZ2UpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0ZXN0ID0gZmFsc2U7XG4gICAgICAgIGlmKHR5cGVvZiBjbGFzc05hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5yZXF1aXJlcyByZXF1aXJlcyB0aGUgY2xhc3MgbmFtZSB0byBiZSAnICtcbiAgICAgICAgICAgICAgICAnc3BlY2lmaWVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9IHt9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0eXBlb2YgcmVxdWlyZW1lbnRGbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVtZW50Rm4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCAnVGhlIGF0cm9wYS4nICsgY2xhc3NOYW1lICtcbiAgICAgICAgICAgICAgICAgICAgJyBjbGFzcyBpcyB1bnN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50Lic7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRlc3QgPSByZXF1aXJlbWVudEZuKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGVzdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0ZXN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wdXNoKGNoZWNrKTtcbn07XG4vKipcbiAqIENvbnRhaW5lciBmb3IgZ29iYWwgZGF0YSByZWxhdGVkIHRvIHRoZSBjbGFzc2VzIGFuZCBmdW5jdGlvbnMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxuICovXG5hdHJvcGEuZGF0YSA9IHt9O1xuXG5hdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMgPSBbXTtcblxuYXRyb3BhLm5vcCA9IGZ1bmN0aW9uIG5vcCAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIG51bGw7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG5cbiIsIi8qKlxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cbiAqL1xudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXG4gKiBAc2VlIDxhIGhyZWY9XCIuLi8uLi8uLi9BdHJvcGFUb29sYm94VGVzdHMuaHRtbD9zcGVjPWF0cm9wYS5pbnF1aXJlXCI+dGVzdHM8L2E+XG4gKi9cbmF0cm9wYS5pbnF1aXJlID0ge307XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBudWxsLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIG51bGwuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHggPT09IG51bGwuXG4gKi9cbmF0cm9wYS5pbnF1aXJlLmlzTnVsbCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuICh4ID09PSBudWxsKTtcbn07XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhbiBvYmplY3QuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgYW4gb2JqZWN0LlxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0eXBlb2YoeCkgPT09ICdvYmplY3QnLlxuICovXG5hdHJvcGEuaW5xdWlyZS5pc09iamVjdCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpO1xufTtcbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGJvdGggYW4gb2JqZWN0IGFuZCBub3QgbnVsbC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBib3RoIGFuXG4gKiBvYmplY3QgYW5kIG51bGwuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHggaXMgYm90aCBhbiBvYmplY3QgYW5kXG4gKiBub3QgbnVsbC4gKG51bGwgaXMgYW4gb2JqZWN0KS5cbiAqL1xuYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsID0gZnVuY3Rpb24gKHgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gYXRyb3BhLmlucXVpcmUuaXNPYmplY3QoeCkgJiYgKCFhdHJvcGEuaW5xdWlyZS5pc051bGwoeCkpO1xufTtcbi8qKlxuICogQ2hlY2tzIGFuIG9iamVjdCBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhIHByb3BlcnR5XG4gKiByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhlIHByb3BlcnR5IHdhcyBpbmhlcml0ZWRcbiAqIG9yIG5vdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3Qgd2hpY2ggbWF5IG9yIG1heSBub3RcbiAqIGhhdmUgdGhlIHByb3BlcnR5IGlkZW50aWZpZWQgYnkgcHJvcC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIEEgc3RyaW5nIHZhbHVlIHJlcHJlc2VudGluZyB0aGVcbiAqIG5hbWUgb2YgdGhlIHByb3BlcnR5LlxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBvYmoucHJvcCBleGlzdHMsXG4gKiBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cbiAqL1xuYXRyb3BhLmlucXVpcmUuaGFzUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaWYgKGF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0Tm90TnVsbChvYmopKSB7XG4gICAgICAgIHJldHVybiAocHJvcCBpbiBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYW4gZW1wdHkgc3RyaW5nLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgeW91IHdhbnQgdG8ga25vdyBhYm91dFxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBzdHIgaXMgYW4gZW1wdHkgc3RyaW5nLFxuICogIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxuICovXG5hdHJvcGEuaW5xdWlyZS5pc0VtcHR5U3RyaW5nID0gZnVuY3Rpb24gKHN0cikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBvdXQgPSBmYWxzZTtcbiAgICBpZiAoJycgPT09IHN0cikge1xuICAgICAgICBvdXQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qKlxyXG4gKiBSZXF1aXJlZCBtb2R1bGUsIHRoZSBkb2NzIGZvciBpdCBhcmUgaW4gdGhlIDxjb2RlPlxyXG4gKiAgYXRyb3BhLWlucXVpcmUvZG9jczwvY29kZT4gZGlyZWN0b3J5IHdoZXJlIHRoaXMgbW9kdWxlIFxyXG4gKiAgaXMgbG9jYXRlZC5cclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F0cm9wYS1pbnF1aXJlL2RvY3MvanNkb2MvaW5kZXguaHRtbFwiPlxyXG4gKiAuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXRyb3BhLWlucXVpcmUvZG9jcy9qc2RvYy9pbmRleC5odG1sPC9hPixcclxuICogIHVubGVzcyB5b3UgaW5zdGFsbGVkIHRoaXMgZGVwZW5kZW5jeSBtYW51YWxseS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlID0gcmVxdWlyZSgnYXRyb3BhLWlucXVpcmUnKS5pbnF1aXJlO1xyXG4vKipcclxuICogUmVxdWlyZWQgbW9kdWxlLCB0aGUgZG9jcyBmb3IgaXQgYXJlIGluIHRoZSA8Y29kZT5cclxuICogIGF0cm9wYS1hcnJheXMvZG9jczwvY29kZT4gZGlyZWN0b3J5IHdoZXJlIHRoaXMgbW9kdWxlIFxyXG4gKiAgaXMgbG9jYXRlZC5cclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F0cm9wYS1hcnJheXMvZG9jcy9qc2RvYy9pbmRleC5odG1sXCI+XHJcbiAqIC4uLy4uLy4uL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL2RvY3MvanNkb2MvaW5kZXguaHRtbDwvYT4sXHJcbiAqICB1bmxlc3MgeW91IGluc3RhbGxlZCB0aGlzIGRlcGVuZGVuY3kgbWFudWFsbHkuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzID0gcmVxdWlyZSgnYXRyb3BhLWFycmF5cycpLmFycmF5cztcclxuLyoqXHJcbiAqIFJlcXVpcmVkIG1vZHVsZSwgdGhlIGRvY3MgZm9yIGl0IGFyZSBpbiB0aGUgPGNvZGU+XHJcbiAqICBhdHJvcGEtY3VzdG9tRXJyb3JzL2RvY3M8L2NvZGU+IGRpcmVjdG9yeSB3aGVyZSB0aGlzIG1vZHVsZSBcclxuICogIGlzIGxvY2F0ZWQuXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9hdHJvcGEtY3VzdG9tRXJyb3JzL2RvY3MvanNkb2MvaW5kZXguaHRtbFwiPlxyXG4gKiAuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXRyb3BhLWN1c3RvbUVycm9ycy9kb2NzL2pzZG9jL2luZGV4Lmh0bWw8L2E+LFxyXG4gKiAgdW5sZXNzIHlvdSBpbnN0YWxsZWQgdGhpcyBkZXBlbmRlbmN5IG1hbnVhbGx5LlxyXG4gKi9cclxuYXRyb3BhLmN1c3RvbUVycm9ycyA9IHJlcXVpcmUoJ2F0cm9wYS1jdXN0b21FcnJvcnMnKS5jdXN0b21FcnJvcnM7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIFRoaXMgcmVwcmVzZW50cyBhIGZpbHRlciBmb3IgYXJndW1lbnRzIGJhc2VkIG9uIHR5cGUuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxyXG4gKiBAY2xhc3MgVGhpcyByZXByZXNlbnRzIGEgZmlsdGVyIGZvciBhcmd1bWVudHMgYmFzZWQgb24gdHlwZS5cclxuICogQHJldHVybnMge0FyZ3NJbmZvfSBSZXR1cm5zIGFuIEFyZ3NJbmZvIGZpbHRlci5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5hcnJheXMubWF0Y2hcclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vQXRyb3BhVG9vbGJveFRlc3RzLmh0bWw/c3BlYz1hdHJvcGEuQXJnc0luZm9cIj50ZXN0czwvYT5cclxuICogQGV4YW1wbGVcclxuICogZnVuY3Rpb24gbXlDbGFzc3lDb25zdHJ1Y3Rvcih0YWtlcywgYSwgZmV3LCBhcmdzKSB7XHJcbiAqICAgICB2YXIgZXhwZWN0ZWRBcmdUeXBlcywgY2hlY2tlcjtcclxuICogICAgIFxyXG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcyA9IHt9O1xyXG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcy5yZXF1ZXN0V2l0aE1lc3NhZ2UgPSBcclxuICogICAgICAgICAgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbiddO1xyXG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcy5yZXF1ZXN0TnVsbE1lc3NhZ2UgPSBcclxuICogICAgICAgICAgWydzdHJpbmcnLCAnc3RyaW5nJywgJ29iamVjdCcsICdmdW5jdGlvbiddO1xyXG4gKiAgICAgXHJcbiAqICAgICBjaGVja2VyID0gbmV3IGF0cm9wYS5BcmdzSW5mbygpO1xyXG4gKiAgICAgY2hlY2tlci5zZXRFeHBlY3RlZEFyZ1R5cGVzKGV4cGVjdGVkQXJnVHlwZXMpO1xyXG4gKiAgICAgXHJcbiAqICAgICB0cnkge1xyXG4gKiAgICAgXHJcbiAqICAgICAgICAgLy8gQ2hlY2sgdGhlIHN1cHBsaWVkIGFyZ3VtZW50cyBwc2V1ZG8gYXJyYXkncyBhcmd1bWVudCB0eXBlc1xyXG4gKiAgICAgICAgIC8vIGlmIHRoZSBwYXR0ZXJuIG9mIHR5cGVzIGluIGFyZ3VtZW50cyBtYXRjaGVzIG9uZSBvZiB0aGVcclxuICogICAgICAgICAvLyBwYXR0ZXJucyBzZXQgb24gZXhwZWN0ZWRBcmdUeXBlcyB0aGVuIHRoZSBtYXRjaGluZyBwYXR0ZXJuXHJcbiAqICAgICAgICAgLy8gd2lsbCBiZSByZXR1cm5lZC4gT3RoZXJ3aXNlLCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cclxuICogICAgICAgICBcclxuICogICAgICAgICBjaGVja2VyLmNoZWNrQXJnVHlwZXMoYXJndW1lbnRzKTtcclxuICogICAgIH0gY2F0Y2ggKGUpIHtcclxuICogICAgIFxyXG4gKiAgICAgICAgIC8vIEludmFsaWQgYXJndW1lbnQgdHlwZXMgc3VwcGxpZWQuIEhhbmRsZVxyXG4gKiAgICAgICAgIC8vIHRoZSBlcnJvciBvciBiYWlsLlxyXG4gKiAgICAgICAgIFxyXG4gKiAgICAgfVxyXG4gKiAgICAgXHJcbiAqICAgICAvLyB0aGUgYXJndW1lbnRzIHN1cHBsaWVkIHdpbGwgYmUgb2YgdGhlIHByb3BlciB0eXBlXHJcbiAqICAgICAvLyB5b3VyIGZ1bmN0aW9uIGNhbiBnbyBhaGVhZCBhbmQgZG8gdGhpbmdzIHdpdGggdGhlbVxyXG4gKiB9XHJcbiAqL1xyXG5hdHJvcGEuQXJnc0luZm8gPSBmdW5jdGlvbiBBcmdzSW5mbygpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBleHBlY3RlZEFyZ1R5cGVzLFxyXG4gICAgY2hlY2tBcmdzLFxyXG4gICAgdGhhdDtcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHByb3BlciByZWZlcmVuY2UgdG8gPGNvZGU+dGhpczwvY29kZT5cclxuICAgICAqIGZvciBwcml2YXRlIGZ1bmN0aW9ucy5cclxuICAgICAqIEB0eXBlIFRoaXNcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuQXJnc0luZm8tXHJcbiAgICAgKi9cclxuICAgIHRoYXQgPSB0aGlzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgZXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMgb2JqZWN0LlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIEV4cGVjdGVkIEFyZyBUeXBlc1xyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkFyZ3NJbmZvLVxyXG4gICAgICovXHJcbiAgICBleHBlY3RlZEFyZ1R5cGVzID0ge307XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGV4cGVjdGVkIGFyZ3VtZW50IHR5cGVzLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvI1xyXG4gICAgICogQHBhcmFtIHtFeHBlY3RlZCBBcmcgVHlwZXN9IHR5cGVzT2JqIEFuIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uXHJcbiAgICAgKiAgYWJvdXQgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cyB5b3UgZXhwZWN0LiBTcGVjaWZpY2FsbHksIHRoZSBvYmplY3Qgc2hvdWxkXHJcbiAgICAgKiAgbG9vayBsaWtlIHRoZSBleGFtcGxlLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIHR5cGVzT2JqIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHRoZSBmb3JtOlxyXG4gICAgICogXHJcbiAgICAgKiB2YXIgdHlwZXNPYmogPSB7XHJcbiAgICAgKiAgICAgXCJuYW1lZEFyZ3VtZW50VHlwZXNBcnJheVwiIDogW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sXHJcbiAgICAgKiAgICAgXCJuYW1lZEFsdGVybmF0ZUFyZ3VtZW50VHlwZXNBcnJheVwiIDogW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl1cclxuICAgICAqIH07XHJcbiAgICAgKiBcclxuICAgICAqIC8vIFlvdSBtYXkgdXNlIGFzIG1hbnkgbmFtZWQgYXJyYXlzIGFzIHlvdSB3aXNoIGFuZCBjaGVja0FyZ1R5cGVzIHdpbGxcclxuICAgICAqIC8vIHRlc3QgZm9yIGEgbWF0Y2ggdG8gYXQgbGVhc3Qgb25lIG9mIHRoZSBwcm92aWRlZCBuYW1lZCBhcnJheXMuXHJcbiAgICAgKiBAdGhyb3dzIHthdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVcclxuICAgICAqICB0eXBlc09iaiBjYW4gbm90IGJlIHVzZWQgdG8gc2V0IHRoZSBleHBlY3RlZCBhcmd1bWVudCB0eXBlcy5cclxuICAgICAqL1xyXG4gICAgdGhpcy5zZXRFeHBlY3RlZEFyZ1R5cGVzID0gZnVuY3Rpb24gc2V0RXhwZWN0ZWRBcmdUeXBlcyh0eXBlc09iaikge1xyXG4gICAgICAgIHZhciBlcnJvciwgbmFtZXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZXJyb3IgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBpZihhdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwodHlwZXNPYmopKSB7XHJcbiAgICAgICAgICAgIG5hbWVzID0gT2JqZWN0LmtleXModHlwZXNPYmopO1xyXG4gICAgICAgICAgICBpZiAobmFtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRBcmdUeXBlcyA9IHR5cGVzT2JqO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKFxyXG4gICAgICAgICAgICAgICAgJ3R5cGVzT2JqIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHRoZSBmb3JtOiB2YXIgdHlwZXNPYmogPSAnICtcclxuICAgICAgICAgICAgICAgICd7IFwibmFtZWRBcmd1bWVudFR5cGVzQXJyYXlcIiA6ICcgK1xyXG4gICAgICAgICAgICAgICAgJyAgICBbXCJzdHJpbmdcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSwgJyArXHJcbiAgICAgICAgICAgICAgICAnXCJuYW1lZEFsdGVybmF0ZUFyZ3VtZW50VHlwZXNBcnJheVwiIDogJyArXHJcbiAgICAgICAgICAgICAgICAnICAgW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0gfTsgJyArXHJcbiAgICAgICAgICAgICAgICAnWW91IG1heSB1c2UgYXMgbWFueSBuYW1lZCBhcnJheXMgYXMgeW91IHdpc2ggYW5kJyArXHJcbiAgICAgICAgICAgICAgICAnY2hlY2tBcmdUeXBlcyB3aWxsIHRlc3QgZm9yIGEgbWF0Y2ggdG8gYXQgbGVhc3Qgb25lIG9mIHRoZSAnICtcclxuICAgICAgICAgICAgICAgICdwcm92aWRlZCBuYW1lZCBhcnJheXMuJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cy5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5BcmdzSW5mbyNcclxuICAgICAqIEBwYXJhbSB7YXJndW1lbnRzfSBhcmdzIEFuIGFyZ3VtZW50cyBvYmplY3QsIG9yIGFueXRoaW5nIHlvdSB3YW50IHRvXHJcbiAgICAgKiBjaGVjayB0aGUgdHlwZSBvZi5cclxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgdHlwZXMgb2YgYXJndW1lbnRzIHBhc3NlZCBpbi5cclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXRBcmdUeXBlcyA9IGZ1bmN0aW9uIGdldEFyZ1R5cGVzKGFyZ3MpIHtcclxuICAgICAgICB2YXIgeCxcclxuICAgICAgICBhcmdUeXBlcztcclxuICAgICAgICBhcmdUeXBlcyA9IFtdO1xyXG4gICAgICAgIGZvciAoeCBpbiBhcmdzKSB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmhhc093blByb3BlcnR5KHgpKSB7XHJcbiAgICAgICAgICAgICAgICBhcmdUeXBlcy5wdXNoKHR5cGVvZihhcmdzW3hdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFyZ1R5cGVzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ29tcGFyZXMgdGhlIGV4cGVjdGVkIGFyZ3VtZW50cyB0eXBlcyB0byB0aGVcclxuICAgICAqIHJlY2VpdmVkIGFyZ3VtZW50cyB0eXBlcy5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQXJnc0luZm8tXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBleHBlY3RlZFR5cGVzQXJyYXkgQW4gYXJyYXkgdGFrZW4gZnJvbSB0aGUgdXNlclxyXG4gICAgICogY3JlYXRlZCBhcmd1bWVudCB0eXBlcyBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge2FyZ3VtZW50c30gYXJncyBhbiBhcmd1bWVudHMgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgZXhwZWN0ZWQgdHlwZXMgbWF0Y2ggZm9yIHR5cGVcclxuICAgICAqICBhbmQgYXJlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSByZWNlaXZlZCB0eXBlcy5cclxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzLm1hdGNoXHJcbiAgICAgKi9cclxuICAgIGNoZWNrQXJncyA9IGZ1bmN0aW9uIGNoZWNrQXJncyhleHBlY3RlZFR5cGVzQXJyYXksIGFyZ3MpIHtcclxuICAgICAgICB2YXIgdHlwZXM7XHJcbiAgICAgICAgdHlwZXMgPSB7fTtcclxuICAgICAgICB0eXBlcy5leHBlY3RlZCA9IGV4cGVjdGVkVHlwZXNBcnJheTtcclxuICAgICAgICB0eXBlcy5yZWNlaXZlZCA9IHRoYXQuZ2V0QXJnVHlwZXMoYXJncyk7XHJcbiAgICAgICAgcmV0dXJuIGF0cm9wYS5hcnJheXMubWF0Y2godHlwZXMuZXhwZWN0ZWQsIHR5cGVzLnJlY2VpdmVkKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB0aGUgZ2l2ZW4gYXJndW1lbnRzIG9iamVjdCBhZ2FpbnN0IHRoZSBleHBlY3RlZFxyXG4gICAgICogYXJndW1lbnRzIHR5cGVzLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvI1xyXG4gICAgICogQHBhcmFtIHthcmd1bWVudHN9IGFyZ3MgQW4gYXJndW1lbnRzIG9iamVjdFxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVzZXIgYXNzaWduZWQga2V5IHdoaWNoIG1hdGNoZXMgdGhlXHJcbiAgICAgKiBhcmd1bWVudHMgc3VwcGxpZWQsIG9yIHRocm93cyBhbiBlcnJvci5cclxuICAgICAqIEB0aHJvd3Mge2F0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIG5vIG1hdGNoaW5nXHJcbiAgICAgKiAgcGF0dGVybiBvZiBhcmd1bWVudCB0eXBlcyBjYW4gYmUgZm91bmQgZm9yIDxjb2RlPmFyZ3M8L2NvZGU+XHJcbiAgICAgKiBAc2VlIGF0cm9wYS5BcmdzSW5mbyNzZXRFeHBlY3RlZEFyZ1R5cGVzXHJcbiAgICAgKi9cclxuICAgIHRoaXMuY2hlY2tBcmdUeXBlcyA9IGZ1bmN0aW9uIGNoZWNrQXJnVHlwZXMoYXJncykge1xyXG4gICAgICAgIHZhciBleHBlY3RlZFR5cGVzO1xyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhleHBlY3RlZEFyZ1R5cGVzKS5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMgaXMgbm90IHNldC4gVXNlICcgK1xyXG4gICAgICAgICAgICAgICAgJ3NldEV4cGVjdGVkQXJnVHlwZXModHlwZXNPYmopIHRvIHNldC4gdHlwZXNPYmogaXMgYW4gJyArXHJcbiAgICAgICAgICAgICAgICAnb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIGFycmF5cyBvZiBzdHJpbmdzIHJlcHJlc2VudGluZyAnICtcclxuICAgICAgICAgICAgICAgICd0aGUgdHlwZW9mKGFyZ3VtZW50KSBmb3IgZWFjaCBhcmd1bWVudCwgaW4gdGhlIGV4YWN0IG9yZGVyICcgK1xyXG4gICAgICAgICAgICAgICAgJ2luIHdoaWNoIHRoZXkgd2lsbCBiZSBnaXZlbiB0byB0aGUgZnVuY3Rpb24uIFVzaW5nIG11bHRpcGxlICcgK1xyXG4gICAgICAgICAgICAgICAgJ3Byb3BlcnRpZXMgaXQgaXMgcG9zc2libGUgdG8gZGVmaW5lIGFsdGVybmF0aXZlIGFjY2VwdGFibGUgJyArXHJcbiAgICAgICAgICAgICAgICAnYXJndW1lbnQgdHlwZSBzZXRzLiBVc2UgZ2V0QXJnVHlwZXMoYXJndW1lbnRzKSBhcyBhICcgK1xyXG4gICAgICAgICAgICAgICAgJ2NvbnZlbmllbnQgd2F5IG9mIGdldHRpbmcgdGhlIGFycmF5IHlvdSB3YW50IHRvIGhhcmQgY29kZSAnICtcclxuICAgICAgICAgICAgICAgICdpbiBmb3IgdmFsaWRhdGlvbi4gRXhhbXBsZTogdmFyIHR5cGVzT2JqID0gJyArXHJcbiAgICAgICAgICAgICAgICAneyBcIm1lc3NhZ2VJbmNsdWRlZFwiIDogW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sICcgK1xyXG4gICAgICAgICAgICAgICAgJ1wibWVzc2FnZU5vdEluY2x1ZGVkXCIgOiBbXCJvYmplY3RcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSB9OydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChleHBlY3RlZFR5cGVzIGluIGV4cGVjdGVkQXJnVHlwZXMpIHtcclxuICAgICAgICAgICAgaWYgKGV4cGVjdGVkQXJnVHlwZXMuaGFzT3duUHJvcGVydHkoZXhwZWN0ZWRUeXBlcykpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja0FyZ3MoZXhwZWN0ZWRBcmdUeXBlc1tleHBlY3RlZFR5cGVzXSwgYXJncykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhwZWN0ZWRUeXBlcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKFxyXG4gICAgICAgICAgICAnaW52YWxpZCBhcmd1bWVudCB0eXBlIEAgYXRyb3BhLkFyZ3NJbmZvLmNoZWNrQXJnVHlwZXMnKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiJdfQ==
;