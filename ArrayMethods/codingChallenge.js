'use strict'

// practice using slice, splice, concat, and foreach method with arrays

const data1 = [3,5,2,12,7];
const data2 = [4,1,15,8,3];

const checkDogs = function(dogsJulia, dogsJarred) {
    const dogsJuliaCorrected = dogsJulia.slice(); // made a copy of the array, so we dont modify the original
    console.log('line 8', dogsJuliaCorrected)
    dogsJuliaCorrected.splice(0,1); // start at index 0 and up until index 1 and extract everything after that including index 1
    console.log('line 9', dogsJuliaCorrected)
    dogsJuliaCorrected.splice(-2); // remove the last two indexes 
    console.log('line 11', dogsJuliaCorrected);

    const dogs = dogsJuliaCorrected.concat(dogsJarred); // add the two arrays together
    console.log('line 15', dogs);

    dogs.forEach((dog, i) => {
        if(dog >= 3) console.log(`Dog number ${i+1} is an adult and is ${dog} years old`);
        else 
        console.log(`Dog number ${i+1} is still a puppy.`)
    });

};
checkDogs(data1,data2);

const avgHumanAge = function(ages) {
    const humaAge = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
    const adults = humaAge.filter( age => age >= 18) 
    console.log('human', humaAge);
    console.log('adult', adults);
    const avg = adults.reduce((acc, curr) => 
        acc += curr,0 / adults.length
    )
    console.log('avg', avg)
};
avgHumanAge(data1);

