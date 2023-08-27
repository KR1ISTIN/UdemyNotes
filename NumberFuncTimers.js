console.log(Number('23'));// will turn into a string into number
// or a cleaner way to write line 1:
console.log(+'23'); // will turn into a number due to type coersion, will convert all operands to numbers

// parsing a (int)number from a string
console.log(Number.parseInt('30px', 10)); // 10 is the second arg for parseInt and it represents base numbers 0-9, helps to advoid bugs
// for line 6: JS will automatically look for the number in the str, but the str has to start with the number 
console.log(Number.parseInt('px30'));  // this will return NaN

// parsing a float 
console.log(Number.parseFloat('2.5rem')); // will print the 2.5 
console.log(Number.parseInt('2.5rem')); // will only give the int value which is 2

// check to see any value is a number
console.log(Number.isNaN(20)); // false, asking this isnt not a number
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20')); // this is converting a str to a number to it be true
// a better way to check to see if a value is not a number:
console.log(Number.isFinite('line 19', 30)); // true bc 30 is a number
console.log(Number.isFinite('line 20', '30')); // false bc '30' is a str

console.log('----------------Math and Rounding-------------------');

console.log(Math.sqrt(25)); // 5 bc 5x5 is 25
console.log(Math.max(25, 30, 2, 5, 90)); // 90 bc its the highest value 
console.log(Math.max(25, 30, 2, 5, '90')); // can read it with a string, but cannot have letter with it that would result in NaN
console.log(Math.min(25, 30, 2, 5, 90));

console.log('line 29', Math.random()); // will give a number between 0 and 1
console.log('line 30', Math.trunc(Math.random() *6) + 1); // only goes up until 5, thats why we need the + 1

// function to stay between the min and max values
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min
console.log('line 34', randomInt(10, 20));

// rounding INTS and works with type coercion 
// .round will round up
console.log('line 38', Math.round(23.3));
console.log('line 39', Math.round(23.7));
// .floor will round down and works with negitives and remove the remainders, so this is better to work with than trunc
console.log('line 40', Math.floor(23.3));
console.log('line 42', Math.floor(23.8));

console.log('-------------------The remainder operator-------------');
// returns the remainder of division
console.log( 5 % 2); // 1 bc 2 can go into 5 2 times with a remainder one 1 leftover
console.log(5 / 2); // basically what is happening in line 46

// function to check if a num is even or odd
const isEven = n => n % 2 === 0;
console.log('line 51', isEven(8));
console.log('line 52', isEven(23));

