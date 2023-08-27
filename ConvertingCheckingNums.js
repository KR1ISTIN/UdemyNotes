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