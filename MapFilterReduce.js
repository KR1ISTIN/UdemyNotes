// Examples for map, filter, reduce

// Map: creates a NEW array based on the original array 
// -- takes an array, loops over that array and at each iteration applies a CB that we created in our code to the current array element

// Filter: filters elements in the original array which meet a certain condition
// -- so only elements that pass a test(so true in this case) we created will be entered into a NEW array other elements will be filtered out

// Reduce: boils down all array elements into one single value, adds all elements together 
// -- uses an (acclumulator + current) to help add all elemets together, acclumator keeps track of whats been added together while adding in a new element until it outputs a single value


// ------------------------ MAP METHOD -------------------- \\

const movements = [200, 450, -400, 3000, -650, -130, 70, 4000];

const eurToUsd = 1.1;

// returns a new array based on movements 
// automatically creating new array, more functional programming
const newArray = movements.map(function(m) {
    return m * eurToUsd;
});
console.log('map method', newArray);


// manually creating a new array
const movementsUSD = [];
for(const mov of movements) {
    movementsUSD.push(mov * eurToUsd)
};
console.log('example with for of loop with pushing into new array', movementsUSD);

// map with args
const exArg = movements.map((m, i, a) => 
    // a would be the array
    `Movement ${i + 1}, You ${m > 0 ? 'deposited' : 'withdrew'}  ${m}`
    // if(m > 0) console.log(`Movement ${i +1}, you deposited ${m}`);
    // else console.log(`Movement ${ i +1}, you withdrew ${m}`) // Math.abs(m) gets rid of the negitve sign
);
console.log(exArg);


// ---------------------------Filter Method ---------------------------- \\

// returns new array
const deposits = movements.filter(function(m, i, a) {
    return m > 0
});
console.log(deposits);

// or manually create a new array
const depositsArr = [];
for(const m of movements) m > 0 ? depositsArr.push(m) : console.log(`${m} is not greater than 0`)
console.log(depositsArr);

// -------------------------- Reduce Method ------------------ \\

// acc is the total- snowball
// acc will be the sum of all the previous values that have already been added up 
const total = movements.reduce(function(acc, curr, i, arr) {
    console.log(acc,'----', 'current element to be added:', curr, 'index:', i)
    return acc + curr
}, 0);
// 0 is the second argument of the reduce method with is what you want the acc to start at for the first loop iteration
console.log(total);

// manually update
let total2 = 0;
for(const m of movements) total2 += m;
console.log('for of loop', total2);

// get MAX value
const maxVal = movements.reduce((acc, m) => {
    if(acc > m ) return acc
    else return m
}, movements[0]); // start at index 0 of movements array which is equal to the acc 
console.log(maxVal);

// ------------------ Chaining Methods Together ---------------- \\

// can only chain if the method returns a array
const chaining = movements
    .filter(m => m > 0)
    .map((m, i, arr) => { // add args to check array to help debug
        console.log('check array here', arr)
        return m * eurToUsd
    })
    .reduce((acc, curr) => acc += curr, 0);
console.log('chaining', chaining);


// ----------------------- Find Method ---------------------- \\
// will reteive the FIRST element in that array that RETURNS a true condition 
const fistWithdraw= movements.find(m => m < 0);
console.log(fistWithdraw); 

// ** filter returns all elements that meet the conditon, and returns new array 
// find returns the first element to meet condition, does not return an array 



// ----------------------- Some method vs Includes method -------------- \\

// checks to equality, just to check if it includes value 
console.log('line 106', movements.includes(-130)); //boolean

// can input a condition
const some = movements.some(m => m > 0);
console.log('line 110', some);  // boolean 

// ----------- Every method ----------- \\
// only returns true if all elements meet the condition 
console.log('line 114', movements.every(m => m > 0)); // returns false since there are negitives values in the movements array 

// example to add a cb function more dynamically
const cb = m => m > 0;
console.log('line 118', movements.some(cb)); 
console.log('line 119', movements.every(cb)); 
console.log('line 120', movements.filter(cb)); 


// ------------------- flat vs flatMap methods -------------------- \\

// Flat will go only one level deep to create one array, does not modifiy original array
const a = [[1,2], 3,4, [5,6]];
console.log(a.flat()); 
console.log(a);

const b = [[[1,2], 3], [4,[5,6]], 7,8];
console.log(b.flat(2)); // 2 represents how nested you want to go down 

// --------- sort method --------- \\
// a - z, it sorts strings
// original array is modified
// with strings
const people = ['kristin', 'jarred', 'amy', 'briley'];
console.log(people.sort());
console.log(people); 

// with numbers
// a: current value, b: next value 
// example below shows ascending order , if want opposite just reserve logic -1, 1
movements.sort((a,b) => {
    if(a > b) 
        return 1;
    if (b > a)
        return -1
});
console.log('line 147', movements)