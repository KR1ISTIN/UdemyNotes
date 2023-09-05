'use strict';
// ------------------ CONSTRUCTOR FUNCTIONS -------------- 

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

// ---------------- ES6 CLASSES ---------------
// class expression example
// const p = class {

// }

// class declaration 
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName; // whatever we pass will be set
        this.birthYear = birthYear
    }
    // methods will be added to .prototype property to the PersonCl class
    calcAge() {
        console.log('calcAge:', 2023 - this.birthYear)
    }

    greet() {
        console.log(`hey ${this.fullName}`)
    }

    get age() {
        return  2023 - this.birthYear
    }

    // SET a property that already exist 
    set fullName(name){ // but this will also verify if it is a full name being passed
        console.log(name)
        if(name.includes(' '))this._fullName = name 
        else alert(`${name} is not a FULL name`)
    }
    get fullName() {
        return this._fullName
    }
};

const person3 = new PersonCl('Briley BRI', 2020);
console.log(person3);
person3.calcAge();

// this or you can do line 56 instead and works the sameway 
// PersonCl.prototype.greet = function() {
//     console.log(`hey ${this.firstName}`)
// };

person3.greet();

// getter
console.log('getter', person3.age);

// classes are not hoisted
// classes are first class citizens
// body of a class is always executed in strict mode 

// ---------------- GETTERS AND SETTERS -----------------
// get and set properties

const account = {
    owner: 'kristin',
    movements: [200, 300, 50,150],

    // getter
    get latest() {
        return this.movements.slice(-1).pop()
    },
    //  setter, has to have one param
    set latest(m) {
        this.movements.push(m)
    }
};

console.log(account.latest)
// setting 
account.latest = 20;
console.log(account.movements);



