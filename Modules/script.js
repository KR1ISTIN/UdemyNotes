// all imports will be parsed first before running any code 

// import {addToCart, totalPrice as price, totalQuant}  from './shoppingCart.js'; // addToCart needs to be the same name from the exporting file 
// if we want to change the name of a export you use the word "as"

// now we can call the function that was exported 
//addToCart('bread', 5); 
//console.log(price, totalQuant);



//------------------------ example two, importing ALL --------------------------\\

// importing all exports at the same time
// basically SHoppingCart is an object containing everything from the exported file 
import * as ShoppingCart from './shoppingCart.js'
console.log('importing');

ShoppingCart.addToCart('bread', 10);
console.log(ShoppingCart.totalPrice, ShoppingCart.totalQuant);
