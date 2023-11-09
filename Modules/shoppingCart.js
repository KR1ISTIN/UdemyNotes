console.log('exporting');

// -------------------------blocking code example--------------
console.log('start fetching user');
await fetch('https://jsonplaceholder.typicode.com/users');
console.log('finish fetching');

// this example above shows how top level await blocks code from exucuting as async
// line 4 will print then after the fetch is done all other code will run in this module and in script.js 



// all variables will be scopped to their module, which is like the top level scope
// all top level variables are privates 
const shippingCost = 10;
export const cart = [];

// named export example 
// all exports need to happen at top level code
export const addToCart = function(product, quant) {
    cart.push({product, quant});
    console.log(`${quant} ${product} was added to the cart`)
};

const totalPrice = 237;
const totalQuant = 23; 

// exporting multi values example 
export {totalPrice, totalQuant}


// ------------------ export default example ------------------

// when you want to use the export default, you typically use this when you want to export one thing per module 

// export default function(product, quant) {
//     cart.push({product, quant});
//     console.log(`${quant} ${product} was added to the cart`)
// };

