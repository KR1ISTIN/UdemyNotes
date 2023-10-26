// all imports will be parsed first before running any code 
import {addToCart}  from './shoppingCart.js'; // addToCart needs to be the same name from the exporting file 

console.log('importing');

// now we can call the function that was exported 
addToCart('bread', 5); 