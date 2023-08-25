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
console.log('of of loop', total2);

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

