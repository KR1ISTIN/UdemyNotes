'use strict';
// usually constructor functions start with a capital letter
// you cannot use arrow functions for this, bc arrow functions dont have its own this keyword, we we need it 
const Person = function(firstName, birthYear) {
    //console.log(this);

    // set the properties to the values
    this.firstName = firstName;
    this.birthYear = birthYear;

}
const person1 = new Person('Kristin', 1994);
console.log(person1)

// -----BEHIND THE SCENCES-----
// 1. new {} is created
// 2. then the function is called
// the this keyword is now created with that object 
// 3. {} linked to a prototype 
// 4. function automatically returns the empty object from begining 

const person2 = new Person('Jarred', 1993); // creating a new instance on Person
console.log(person2);

// prototypes
// all objects created through the Person constructor function, will get access to all methods and properties 
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
};
person1.calcAge(); 
person2.calcAge();

// adding a property
Person.prototype.species = 'human';
console.log(person1.species, person1);


