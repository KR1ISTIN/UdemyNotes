console.log('exporting');

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

