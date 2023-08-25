// Examples for map, filter, reduce

// Map: creates a NEW array based on the original array 
// -- takes an array, loops over that array and at each iteration applies a CB that we created in our code to the current array element

// Filter: filters elements in the original array which meet a certain condition
// -- so only elements that pass a test(so true in this case) we created will be entered into a NEW array other elements will be filtered out

// Reduce: boils down all array elements into one single value, adds all elements together 
// -- uses an (acclumulator + current) to help add all elemets together, acclumator keeps track of whats been added together while adding in a new element until it outputs a single value


// ------------------------ MAP METHOD -------------------- \\

const movements = [200, 450, -400, 3000, -650, -130, 70];

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

// ---------- Filter Method ------------- \\


