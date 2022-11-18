
  
/* vsdoc for _global_ */

(function (window) {
    

    window._global_ = {
        /// <summary></summary>
        /// <returns type="_global_"/>
                
    };

    var $x = window._global_;
    $x.__namespace = "true";
    $x.__typeName = "_global_";
})(this);

  

  
/* vsdoc for atropa */

(function (window) {
    

    window.atropa = {
        /// <summary>Container for all Glorious classes, functions, etc.</summary>
        /// <returns type="atropa"/>
      
        /// <field name="data" type="">Container for gobal data related to the classes and functions.</field>
        data : {}, 
      
        /// <field name="inquire" type="">Container for functions that test the state of inputs.</field>
        inquire : {}, 
      
        /// <field name="arrays" type="">Utilities for handling arrays.</field>
        arrays : {}, 
      
        /// <field name="customErrors" type="">Container for custom Errors.</field>
        customErrors : {}, 
                
        supportCheck: function(className, errorMessage) {
            /// <summary>Checks whether this class has been marked as unsupported and throws an 
            ///  error if it has.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="errorMessage" type="String">Optional. A custom error message. Defaults to
            ///  atropa.data[className].error</param>
        }, 
        
        requires: function(className, requirementFn, errorMessage) {
            /// <summary>Pushes a requirement check into atropa.data.requirements. The test
            ///  tests whether the class is supported in this environment. Sets
            ///  atropa.data[className]&apos;s support to unsupported and error to errorMessage
            ///  if the requirementFn returns false. The requirement checks will all be run
            ///  after the library has loaded.</summary>
            /// <param name="className" type="String">The name of the class.</param>
            /// <param name="requirementFn" type="Function">A function to test whether or not the class
            ///  is supported in this environment. If supported, returns true otherwise
            ///  return false.</param>
            /// <param name="errorMessage" type="String">The error message to use when this class or its
            ///  methods are called in unsupported environments. Defaults to:
            ///  &apos;The atropa.&apos; + className + &apos; class is unsupported in this environment.&apos;;</param>
        }
        
    };

    var $x = window.atropa;
    $x.__namespace = "true";
    $x.__typeName = "atropa";
})(this);

  

  
  
/* vsdoc for atropa.ArgsInfo */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.ArgsInfo = function(){
        /// <summary>This represents a filter for arguments based on type.</summary>
    };

    var $x = window.atropa.ArgsInfo;
    $x.prototype = {
                
        setExpectedArgTypes: function(typesObj) {
            /// <summary>Sets the expected argument types.</summary>
            /// <param name="typesObj" type="Expected Arg Types">An object containing information
            ///  about the types of arguments you expect. Specifically, the object should
            ///  look like the example.</param>
        }, 
        
        getArgTypes: function(args) {
            /// <summary>Gets the types of arguments.</summary>
            /// <param name="args" type="arguments">An arguments object, or anything you want to
            /// check the type of.</param>
            /// <returns type="Array">Returns an array of the types of arguments passed in.</returns>
        }, 
        
        checkArgTypes: function(args) {
            /// <summary>Checks the given arguments object against the expected
            /// arguments types.</summary>
            /// <param name="args" type="arguments">An arguments object</param>
            /// <returns type="String">The user assigned key which matches the
            /// arguments supplied, or throws an error.</returns>
        }
        
    };

    $x.__class = "true";
    $x.__typeName = "atropa.ArgsInfo";
})(this);


  
/* vsdoc for atropa.arrays */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.arrays = {
        /// <summary>Utilities for handling arrays.</summary>
        /// <returns type="atropa.arrays"/>
                
        match: function(array1, array2) {
            /// <summary>Compares two arrays based on size, contents, and element order.</summary>
            /// <param name="array1" type="Array">One array you want compared to another.</param>
            /// <param name="array2" type="Array">The other array.</param>
            /// <returns type="Boolean">Returns true or false depending on
            ///  whether or not the arrays matched in size, composition, and
            ///  element order.</returns>
        }, 
        
        subtract: function(a, fromB) {
            /// <summary>Subtracts one array from another array based on the unique values in both
            ///  sets.</summary>
            /// <param name="a" type="Array">(subtrahend) The array to subtract.</param>
            /// <param name="fromB" type="Array">(minuend) The array with elements duplicated in &lt;code&gt;a&lt;/code&gt;</param>
            /// <returns type="Array">Returns a new array containing only the unique
            ///  values found in &lt;code&gt;fromB&lt;/code&gt; that are not present in &lt;code&gt;a&lt;/code&gt;</returns>
        }, 
        
        intersect: function(array1, array2) {
            /// <summary>Returns an array of values found in both of the given arrays.</summary>
            /// <param name="array1" type="Array">An array.</param>
            /// <param name="array2" type="Array">Another array.</param>
            /// <returns type="Array">Returns an array of values found in both of the given
            ///  arrays.</returns>
        }, 
        
        getFrequency: function(arr) {
            /// <summary>Calculates the frequency of items occurring in an array.</summary>
            /// <param name="arr" type="Array">The array to calculate frequencies from.</param>
            /// <returns type="Object">Returns an object whose keys are each unique
            ///  elements from the array and their value is their frequency of
            ///  occurrence within the array. Be careful that your array does
            ///  not contain values matching object instance property names.</returns>
        }, 
        
        getUnique: function(largeArray) {
            /// <summary>Gets Unique values from an array.</summary>
            /// <param name="largeArray" type="Array">The array with duplicate values in it.</param>
            /// <returns type="Array">Returns a new array containing only the unique
            ///  values found in the largeArray.</returns>
        }, 
        
        removeEmptyElements: function(arrayWithEmptyElements) {
            /// <summary>Removes empty strings from the given array.</summary>
            /// <param name="arrayWithEmptyElements" type="Array">The array with empty strings in it.</param>
            /// <returns type="Array">Returns a new array with empty strings removed.</returns>
        }, 
        
        reindex: function(arr) {
            /// <summary>Reindexes an array.</summary>
            /// <param name="arr" type="Array">The array with discontinuous keys.</param>
            /// <returns type="Array">Returns an array with continuous keys.</returns>
        }, 
        
        sortNumerically: function(arr) {
            /// <summary>Sorts an array&apos;s elements numerically.</summary>
            /// <param name="arr" type="Array">The array to sort. All elements of the array must be
            ///  number-ish.</param>
            /// <returns type="Array">Returns an array whose elements are in numeric order.</returns>
        }, 
        
        sortAlphabetically: function(arr) {
            /// <summary>Throws an error, &lt;code&gt;String.prototype.localeCompare&lt;/code&gt; is not 
            ///  standardized.
            /// 
            ///  Yes, localeCompare is in the standard but, at this time the actual
            ///  comparison is implementation dependant. This means that &quot;alphabetical order&quot;
            ///  can be different on different platforms. What I found was that in node the
            ///  array of &lt;code&gt;[&apos;a&apos;,&apos;Z&apos;,&apos;A&apos;,&apos;z&apos;]&lt;/code&gt; would be sorted to
            ///  &lt;code&gt;[&apos;A&apos;,&apos;Z&apos;,&apos;a&apos;,&apos;z&quot;]&lt;/code&gt;, while on
            ///  firefox it would be sorted to &lt;code&gt;[&apos;a&apos;,&apos;A&apos;,&apos;z&apos;,&apos;Z&apos;]&lt;/code&gt;. Who knows if
            ///  another implementor would sort it &lt;code&gt;[&apos;A&apos;,&apos;a&apos;,&apos;Z&apos;,&apos;z&apos;]&lt;/code&gt;?
            /// 
            /// In order to provide a reliable implementation I would have to create my own
            ///  implementation of &lt;code&gt;String.prototype.localeCompare&lt;/code&gt; and that&apos;s
            ///  just too much work for me to do alone.</summary>
            /// <param name="arr" type=""></param>
        }, 
        
        deleteElement: function(arr, index) {
            /// <summary>Deletes the given element from the array at the given index. It basically
            ///  does what you would expect the delete operator to do, except the delete
            ///  operator doesn&apos;t do what you would expect.</summary>
            /// <param name="arr" type="Array">The array.</param>
            /// <param name="index" type="Number">The index of the element to delete.</param>
            /// <returns type="">Returns an array with the element removed, contiguous keys, and
            ///  whose length is 1 less than the input array.</returns>
        }
        
    };

    var $x = window.atropa.arrays;
    $x.__namespace = "true";
    $x.__typeName = "atropa.arrays";
})(this);

  

  
/* vsdoc for atropa.customErrors */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.customErrors = {
        /// <summary>Container for custom Errors.</summary>
        /// <returns type="atropa.customErrors"/>
                
    };

    var $x = window.atropa.customErrors;
    $x.__namespace = "true";
    $x.__typeName = "atropa.customErrors";
})(this);

  

  
  
/* vsdoc for atropa.customErrors.InvalidArgumentTypesError */

(function (window) {
    window.atropa.customErrors = window.atropa.customErrors || {};

    window.atropa.customErrors.InvalidArgumentTypesError = function(message){
        /// <summary>Invalid Argument Types Error</summary>
        /// <param name="message" type="String">Optional. The error message to send. Defaults to
        ///  &lt;code&gt;InvalidArgumentTypesError&lt;/code&gt;</param>
        /// <field name="name" type="">The name of the error. Tells the user what kind of custom
        /// error has been thrown.</field>
        name : {}, 
        /// <field name="message" type="">The error message to send.</field>
        message : {}
    };

    var $x = window.atropa.customErrors.InvalidArgumentTypesError;
    $x.prototype = {
                
    };

    $x.__class = "true";
    $x.__typeName = "atropa.customErrors.InvalidArgumentTypesError";
})(this);


  
/* vsdoc for atropa.data */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.data = {
        /// <summary>Container for gobal data related to the classes and functions.</summary>
        /// <returns type="atropa.data"/>
                
    };

    var $x = window.atropa.data;
    $x.__namespace = "true";
    $x.__typeName = "atropa.data";
})(this);

  

  
/* vsdoc for atropa.inquire */

(function (window) {
    window.atropa = window.atropa || {};

    window.atropa.inquire = {
        /// <summary>Container for functions that test the state of inputs.</summary>
        /// <returns type="atropa.inquire"/>
                
        isNull: function(x) {
            /// <summary>Checks whether the input is null.</summary>
            /// <param name="x" type="Mixed">Any input that may or may not be null.</param>
            /// <returns type="Boolean">Returns true if x === null.</returns>
        }, 
        
        isObject: function(x) {
            /// <summary>Checks whether the input is an object.</summary>
            /// <param name="x" type="Mixed">Any input that may or may not be an object.</param>
            /// <returns type="Boolean">Returns true if typeof(x) === &apos;object&apos;.</returns>
        }, 
        
        isObjectNotNull: function(x) {
            /// <summary>Checks whether the input is both an object and not null.</summary>
            /// <param name="x" type="Mixed">Any input that may or may not be both an
            /// object and null.</param>
            /// <returns type="Boolean">Returns true if x is both an object and
            /// not null. (null is an object).</returns>
        }, 
        
        hasProperty: function(obj, prop) {
            /// <summary>Checks an object for the existence of a property
            /// regardless of whether the property was inherited
            /// or not.</summary>
            /// <param name="obj" type="Object">An object which may or may not
            /// have the property identified by prop.</param>
            /// <param name="prop" type="String">A string value representing the
            /// name of the property.</param>
            /// <returns type="Boolean">Returns true if obj.prop exists,
            /// otherwise returns false.</returns>
        }, 
        
        isEmptyString: function(str) {
            /// <summary>Checks whether the input is an empty string.</summary>
            /// <param name="str" type="String">The string you want to know about</param>
            /// <returns type="Boolean">Returns true if str is an empty string,
            ///  otherwise returns false.</returns>
        }
        
    };

    var $x = window.atropa.inquire;
    $x.__namespace = "true";
    $x.__typeName = "atropa.inquire";
})(this);

  

