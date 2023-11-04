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
ShoppingCart.addToCart('pizza', 2);
console.log(ShoppingCart.totalPrice, ShoppingCart.totalQuant);
console.log(ShoppingCart.cart);


// ------------------ importing the exported default example ----------------\\
// use can give it any import name you want 

//import add from './shoppingCart.js'
// add('pizza', 2);



// TOP LEVEL AWAIT example
// blocks the excution of model, lines  38 and 42, 
// bc js can work async top level code should be exucuted first, but with await it blocks it unitl its finished
// line 38 and 40 should be excuted first 

// console.log('start fetch');
// const getData = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await getData.json();
// console.log(data);
// console.log('end fetch');

// async will always return a promise, which is what getLastPost will be equal too 
const getLastPost = async function() {
    const getData = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await getData.json();

return {
    // very last element of array 
    title: data.at(-1).title,
    text: data.at(-1).body
};
};

const lastPost = getLastPost(); // going to return a pending promise no actual data yet
// not a clean way to write it
//lastPost.then(last => console.log(last)); // .then will return the data from the promise with the cb function

// better way to write it
const lastPost2 = await getLastPost();
console.log(lastPost2);