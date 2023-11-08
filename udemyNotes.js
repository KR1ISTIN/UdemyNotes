// ARRAY and OBJECT DESTRUCTURING

"use strict";
// new object literal syntax
const weekdayz = ["mon", "tues", "wed", "thru", "fri"];
const openingHours = {
  [weekdayz[0]]: {
    open: 12,
    close: 22,
  },
  [weekdayz[3]]: {
    open: 11,
    close: 23,
  },
  [`day-${2 + 2}`]: {
    open: 0,
    close: 3,
  },
};

const restaurant = {
  name: "Mama Mia",
  location: "San Antonio, Tx",
  categories: ["Italian", "Pizzeria", "Pasta", "Organic"],
  starterMenu: ["Focaccia", "Brushcetta", "Salad", "Garlic bread"],
  mainMenu: ["Pizza", "Spahgetti", "Risotto"],
  openingHours,
  hours: {
      thru: {
          open: 12,
          close: 22
       },
      fri: {
          open: 11,
          close: 23
      },
      sat: {
          open: 0,
          close: 3
      }
  },
  // with new es6 syntax you can get rid of the word function 
  order(startedIndex, mainIndex) {
    return [this.starterMenu[startedIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({ startedIndex, mainIndex, address, time }) {
    // if obj was passed in the parameter, instead automatically destructure it like in exam above
    //console.log(obj); // will print as an object with the argument below when method was called
    console.log(
      `Order received: ${this.starterMenu[startedIndex]} and ${this.mainMenu[mainIndex]}, will de delivered to ${address} at ${time}`
    );
    // you can also do default values the same way as below in the notes line 98
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your pasta with the ingredients: ${ing1}, ${ing2}, ${ing3}`
    );
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

restaurant.orderDelivery({
  time: "22:15",
  address: "2247 estate view",
  mainIndex: 2,
  startedIndex: 2,
});

// normal way to retreive data from an array
// const arr = [1, 2, 3];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];
// console.log(a, b, c);

// THIS IS BETTER
// now we can declare all three variables at the sametime, brackets on the left mean is breaks down (destructures the array)
// const [x,y,z] = arr
// console.log(x,y,z)

//------------------DESTRUCTURING ARRAYS--------------\\

const [first, second] = restaurant.categories; // we dont have to take all elements out of the array if we don't want
console.log(`LINE 87: ${first}, ${second}`); //  Italian, Pizzeria
const [firstItem, , secondItem] = restaurant.categories; // add a space to skip over an index in the array if you dont want to assign is a variable
console.log(`LINE 89: ${firstItem}, ${secondItem}`); // Italian, Pasta

// Now if we want to SWAP the indecies of Pizzeria and Pasta
let [firstCat, , secondCat] = restaurant.categories; // destructure the variables - italian and Pasta
console.log(`LINE 93: ${firstCat}, ${secondCat}`); // italian, pasta
[firstCat, secondCat] = [secondCat, firstCat];
console.log(`LINE 95: ${firstCat}, ${secondCat}`); // Pasta, italian

console.log('LINE 97:', restaurant.order(2, 0)); // prints an array [Pasta, Pizza]
// destructure the values in the method called order
const [starter, main] = restaurant.order(2, 0);
console.log(`LINE 100 ${starter}, ${main}`); // Pasta, Pizza

// Nested Array Destructure
const nested = [2, 4, [3, 6]];
const [i, , j] = nested;
console.log('line 105', i, j); // 2, [3,6]
// if we want all individual values
const [k, , [l, m]] = nested;
console.log('line 108', k, l, m); // 2,3,6

// Setting Default Values
const [p, q, r] = [8, 9];
console.log('line 112', p, q, r); // 8, 9, undefined
// now set defaults:
const [b = 1, n = 2, o = 3] = [8, 9];
console.log('line 115', b, n, o); // 8, 9, 3

// ------------------DESTRUCTURING OBJECTS------------------\\

// destructuring objects
const { name, hours, categories } = restaurant;
console.log('line 121', name, hours, categories); // prints: Mama Mia, {thu: {...}, fri: {...}, sat:{...}, ["Italian", "Pizzeria", "Pasta", "Organic"]}

// if we want variable names to be different that the property names
const {
  name: restaurantName,
  hours: hoursOfOperation,
  categories: foodTypes,
} = restaurant;
console.log('line 129', restaurantName, hoursOfOperation, foodTypes);

// setting default values
// starterMenu does exist, but menu does not
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log('line 134', menu, starters); // prints: [], ["Focaccia", "Brushcetta", "Salad", "Garlic bread"]

// Mutating Variables
let e = 111;
let t = 500;
const obj = { e: 22, t: 44, c: 14 };
({ e, t } = obj);
console.log('line 141', e, t); // 22, 44

// Nested Objects
// const {fri} = hours;
// console.log(fri); // {open: 11,close: 23}
const {
  fri: { open, close },
} = hours; // needs to be exact properties
console.log('line 149', open, close); // 11, 23

// can even assign them to different variables
const {
  fri: { open: openHours, close: closeHours },
} = hours; // needs to be exact properties
console.log('line 155', openHours, closeHours);

// -------------------The spread Operator-----------------\\

const spreadArr = [8, 9, 10];
const goodNewArr = [1, 2, ...spreadArr];
console.log('line 161', goodNewArr); // [1,2,8,9,10] makes a new array
console.log('line 162', ...goodNewArr); // 1,2,8,9,10 gives indiviual values

const newMenu = [...restaurant.mainMenu, "gnocci,"];
console.log('line 165', newMenu); // ["Pizza", "Spahgetti", "Risotto", "gnocci"]

// copy array
const mainMenuCopy = [...restaurant.mainMenu];
// join 2 arrays together
const joinMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log('line 171', joinMenu);

// Iterables: strings, arrays, maps, sets, but not Objects
// you can use the spread operator on iterables
const str = "kristin";
const letters = [...str, " ", "HI"];
console.log('line 177', letters); // ['k', 'r', 'i', 's', 't', 'i', 'n', ' ', 'HI']

// prompt just using an example not functionality right now
// const ingredients = [
//   prompt("let's make pasta!!!!, Ingredient 1:?"),
//   prompt(" Ingredient 2:?"),
//   prompt(" Ingredient 3:?"),
// ];
// console.log(ingredients); // prints an array with whatever you input in the prompt
// //restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// // or a short way to write line 151
// restaurant.orderPasta(...ingredients);

// since 2018 since objects are not iterables, you can still use spread operator
const newRest = { ...restaurant, found: "Kristin Desalme", builtIn: 1994 };
console.log('line 192', newRest);

// Making a Copy and changing the restaurant name
const restaurantCopy = { ...restaurant };
restaurantCopy.name = "New Name coming soon"; // changing name on the copy 
console.log(restaurantCopy.name); // New Name coming soon
console.log(restaurant.name); // "Mama Mia" didnt effect main obj 

// Rest Pattern with the spread operator (to collect elements that are unused in the destructuring assignment )
const [a, h, ...others] = [1, 2, 3, 4, 5, 6];
console.log(a, h, others); // prints 1,2, [3,4,5,6]

// Rest pattern with an object, collecting data with a destructuring spread operator
const { sat, ...weekdays } = restaurant.hours;
console.log(weekdays); // prints an object with only weekdays (thu and fri)

// Functions with the REST Pattern
// the function is taking multi values and packs them into ONE ARRAY
const add = function (...numbers) {
  // ...numbers are called REST arguments
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
    console.log(sum);
  }
};
add(1, 2);
add(1, 2, 3, 4, 5);
add(8, 1, 2, 3, 4, 5, 5);

// OR
const x = [22, 23, 44];
add(...x); // spread out the array

// so the spread operator expands out of the array, and the rest pattern compresses it into an array

restaurant.orderPizza("mushrooms", "olives", "tomatoes");





//------------------for-of Loop-------------------\\
console.log('-------------------------for of loop --------------------------------')
for (const item of joinMenu) console.log( item); // will print each value individually
// but if we want the index
for (const item of joinMenu.entries()) {
  console.log('line 239', item); // will print indivual arrays with index and value
}
// if we want to destructure this array
for (const [i, el] of joinMenu.entries()) {
  console.log('line 243', `${i + 1}: ${el}`); // will print index and value not in an array
}




//-----------------OPTIONAL CHAINING, (?.)---------------\\
console.log('-------------------------Optional chaining--------------------------------')
// if we certain property does not exist, then undefined is returned
console.log('line253', restaurant.openingHours.mon?.open); // if the statement before the ? exist then it will continue to .open, if not the undefined is returned
const days = ["mon", "tues", "wed", "thru", "fri"];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? `closed`; // ?? is used if a open or close value is set to 0 which is falsey which would read undefined, but we dont want that so we use the Nullish Coalsing
  console.log(`On ${day}, we open at ${open}`);
}

// for methods:
console.log(restaurant.order?.(0, 1) ?? `method does not exist`); // will print first first statement's value since its true is does exist
console.log(restaurant.orderWine?.(0, 1) ?? `method does not exist`); // method does not exist will print

// for arrays
const users = [{ name: "kristin", email: "hello@yahoo" }];
console.log(users[0]?.name ?? `user array empty`); // will print my name does name does exist
// longer way to do this
if (users.length > 0) console.log(users[0].name);
else console.log("user array empty");



//-----------------Looping through objects------------------\\

// getting property names
const properties = Object.keys(openingHours); // returns an array
console.log('line 277', properties)

let openStr = `we are open ${properties.length} days: `;

for (const day of properties) {
  console.log('line 282', day); // prints individual day values
  openStr += `${day}, `; // adding each day resturant is open
}
console.log('line 285', openStr); // we are open 3 days: ${day}

// getting propety values , returns an array 
const values = Object.values(openingHours);
console.log('line 289', values); // prints an array of the object values of each property for the days

//entire object
const entries = Object.entries(openingHours); // 
console.log(entries); // prints an array key and values printed

// prints key and value
for (const [day, { open, close }] of entries) {
  console.log(`on ${day} we open at ${open} and close at ${close}`); // prints property and value in a str
}

