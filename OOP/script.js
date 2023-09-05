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

// static method example:
Person.hey = function() {
    console.log('heeeey heeeey');
    console.log(this)
};
Person.hey(); // this is an example of a static method, its on the Person object itself 
// person1.hey(); // will not work bc it is not in the prototype in the person1 object



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

    // static method for classes
    static hey() {
        console.log('HELLLLLO');
        console.log(this)
    }
};

const person3 = new PersonCl('Briley BRI', 2020);
console.log(person3);
person3.calcAge();

PersonCl.hey()


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

// ------------------- Object.create --------------------
// manually sets a prototype of an object to any other object 

const PersonProto = {
    calcAge() {
        console.log('calcAge:', 2023 - this.birthYear)
    }
};

const kristin = Object.create(PersonProto);
kristin.name = 'kristin';
kristin.birthYear = 1994;
console.log(kristin);
kristin.calcAge();

// ---------------- Inheritance Between "classes": constructor functions ----------------

const PersonC = function(firstName, birthYear) {
    // set the properties to the values
    this.firstName = firstName;
    this.birthYear = birthYear;
}

PersonC.prototype.calcAgee = function() {
    console.log(2037 - this.birthYear);
};


const Student = function(firstName, birthYear, course) {
    PersonC.call(this, firstName, birthYear); // .call allows for this this keyword to be used properly
    this.course = course;
}

// linking prototypes
Student.prototype = Object.create(PersonC.prototype); // now Student.prototype can now inherit Person.prototype 

Student.prototype.introduce = function() {
    console.log(`hello my name is ${this.firstName}, i study ${this.course}`)
}


const student1 = new Student('mike', 1997, 'comp science');
student1.introduce();
student1.calcAgee(); // now has access to the PersonC prototype methods



// ---------------- Inheritance Between "classes": ES6 Classes ----------------


class PersonClass {
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

};

// entends links the prototypes type so StudentClass is a child of PersonClass (the parent class)
class StudentClass extends PersonClass {
    // takes in same args as parent class, but with a few more
    constructor(fullName, birthYear, course) {
        // super is basically the constructor function of the parent class
        // so pass in args for super function that match the parent class, 
        // super always needs to comes first
        super(fullName,birthYear) 
        this.course = course;
    }

    introduce() {
        console.log(`hello my name is ${this.fullName}, i study ${this.course}`)
    }

    greet() {
        console.log('this is polymorphism, im overwriding a method')
    }
};

const student2 = new StudentClass('martha', 2012, 'math and reading');
console.log(student2)
student2.greet(); // due to the prototype chain, this method is found first so thats why it is overwridden from the parent class
student2.introduce();