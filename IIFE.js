// immediatley invoked functions expressions (IIFE)
// functions that only run one time and never again 

(function() {
    console.log('will never run again')
})();
// wrapping this function in () creates a IIFE expression

(() => console.log('will NEVER run again'))();  // arrow functions can also be wrapped in a IIFE

// can be used to hide variables