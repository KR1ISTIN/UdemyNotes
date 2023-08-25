'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// NOTE: .innerHTML returns everything including the html tags and content, .textContent returns the text itself


// adding functionality to dymanically append a str to the html doc
const displayMovements = function(movements) {
  // set the element to empty str to then allow the forEach method to display properly 
  containerMovements.innerHTML = '';
  
  movements.forEach(function(m, i) {
    const type = m > 0 ? 'deposit' : 'withdrawal'

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
     <div class="movements__value">${m}</div>
    </div>`

    // method to insert html, accepts two args, the first which represents: the position in which we want to attach the html
    // so will attach to to AFTER the containerMovements variable in the html doc, so after the parent attach
    // the second arg, is the str we want to insert
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
};
displayMovements(account1.movements);

// show total balance 
const printTotal = function(movements) {
  const total = movements.reduce((acc,m) => acc += m)
  labelBalance.textContent = `${total} EUR`
};
printTotal(account1.movements);



const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a','b', 'c', 'd','e'];

// slice
console.log(arr.slice(2)); // grabs everything at position 2 and on
console.log(arr.slice(2, 4)); // grabs everything at position 2 and up to but does not include postion 4 
// can also use negitives to go backwards 
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

//splice
// alters the original array 
//console.log(arr.splice(2)); //looks like line 81, so it extracts (gets rid of) everything at posotion 2 and on 
arr.splice(-1); // gets rid of the last index
arr.splice(1, 2); // the first parameter represents the starting index, the seond param represents how many to delete 
console.log(arr); 

// reverse 
// changes the original array 
arr = ['a','b', 'c', 'd','e'];
const arr2 = ['j', 'k', 'l'];
console.log(arr2.reverse());

// concat or we can use the spread operator to add two arrays together 
// makes a new array by combing two arrays together 
const letters = arr.concat(arr2);
console.log(letters)

// join
// returns a string by joining this symbols inbetween 
console.log(letters.join(' - '));


// New AT methods
// can be used on strings too 
const arr3 = [11,22,23];
console.log(arr3[0]);
console.log(arr3.at(0));

// getting last element
console.log(arr3[arr3.length -1]); 
console.log(arr3.slice(-1)[0]);

//instead do this:
console.log(arr3.at(-1));

// if you want do get the last element in the array, use at method or method chaining 


//------------- FOR EACH METHOD----------\\
console.log('----------- FOR EACH------------')
const numbers = [100,-200, 300, -400];
// for each is basically a higher order function since it takes in another function which is a CB 

numbers.forEach(function(num, index, array) { // the first param needs to be the value, the second is the index of that value, and 3rd is the array
  //console.log(array)
  if (num > 0) {
    console.log(`num is greater than 0, index: ${index +1 } ${num}`)
  }
  else 
  console.log(`num is less than 0, index: ${index +1 } ${num}`)
});

// continues and break statements dont work in a for each method, 
//therefore a foreach will ALWAYS loop over the ENTIRE array instead of breaking if needed



// ------- FOR OF METHOD -------------\\
// use this method is need to break out of a loop

console.log('----------- FOR OF------------')
// for (const num of numbers) {
//   if (num > 0) {
//     console.log(`num is greater than 0, ${num}`)
//   }
//   else 
//   console.log(`num is less than 0, ${num}`)
// }

for (const [i, num] of numbers.entries()) { // i is the index, num is the val of that index
  if (num > 0) {
    console.log(`num is greater than 0, index: ${i + 1}  number:${num}`) // add one bc ppl dont know arrays start at 0
  }
  else 
  console.log(`num is less than 0, ${num}`)
}


// ---------- for each with MAPS and SETS -------------\\

const curr2 = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

curr2.forEach(function(value, key, map) {
  console.log(`${key}, ${value}`)
})

const curr = new Set([' USA', 'TSW', 'POP']);
curr.forEach(function(value, _ , map) { // dont need the key as a param bc the set does not have a key, therefpre we can just omit it by place a _ 
  // _ a underscore means a unesssary variable 
  console.log(`${value}, ${value}`)
})