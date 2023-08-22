'use strict'

const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase(); // eleminating the spacing between each word and to lowercase
}

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ')
}

// higher order function- takes in another function
const transform = function(str, fn) {
    console.log(`orginaly string: ${str}`)
    console.log(`Transformed string: ${fn(str)}`)

    console.log(`transformed by: ${fn.name} function`)
}
transform('Javascript is awesome', upperFirstWord); // the second argument of both transform function calls is the cb function 
transform('Javascript is awesome', oneWord); 

// function that returns another function (higher order function example 2)
const greet = function(greet) {
    return function(name) {
        console.log(`${greet} ${name}`)
    }
}
const greeterHey = greet('Hey');
// so greeterHey is just equal to "hey" 
// then greeterHey gets passed argument which takes in the second name parameter so output Hey Krisitn 
greeterHey('Kristin') // greeterHey is basically the return function this is bc of closure
greeterHey('Jarred')

// or another way
greet('Helllllo')('Briley');

// arrow function version 
const greet2 = (greeting) => {
    return (name) => {
        console.log(`${greeting} ${name}`)
    }
}
greet2('SUP')('Bri Bri');


// --------------------The call and apply Methods-------------------\\
const delta = {
    airline:'delta',
    code: 'Del',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.code}${flightNum}`)
        this.bookings.push({flight: `${this.code}${flightNum}`, name: `${name}`})
    }
    
}
delta.book(222, 'kristin')
console.log(delta)

// now lets says delta created a new airline
const newAirline = {
    airline: "euroWing",
    code:'EW',
    bookings:[],

}
const deltaBookFunc = delta.book // this is a FUNCTION copy of the book method in delta object, therefore deltaBookFunc os no longer a method, its a reg function call 
// so if you try deltaBookFunc(23, 'kristin') the this keyword will be undefined

// if you want to call the function you need either call, apply, or bind
deltaBookFunc.call(newAirline, 222, 'briley')// the first argument in call will point to what you want the this keyword to point to 
// then add in the rest of the arguments 
console.log(newAirline)

// APPLY Method, not really used
const flightData = [583, 'george cooper']
deltaBookFunc.apply(newAirline, flightData) // the first arg acts like the .call metho, but the second arg takes a array of data
console.log(newAirline)

// or
// deltaBookFunc.call(delta, ...flightData)
// console.log(delta)

//------------------BIND------------------\\

// allows you to manually set the this keyword on any function call, the difference is, BIND does NOT 
// immedietly call the function, instead it returns a new function where the "this" keyword is set to whatever we pass into bind(in here) 

const bookNA = deltaBookFunc.bind(newAirline); // this will not call the book function, 
//it will return a new function where the this keyword will always will set to newAirLine object 
bookNA(23, 'Joe Joe');
console.log(newAirline);

// here we are setting in stone the arguments passed to this function, so flight number 23 is always be passed and now all we need is the name argument
const bookNA23 = deltaBookFunc.bind(newAirline, 23);
// getting name argument 
bookNA23('jonas brother');

// bind when we use objects with event listeners,
// lets add a new property to delta object
delta.planes = 300;
delta.buyPlane = function() {
    //console.log(this) // this refers to the button from query selector, bc the this keyword refers to the element from which is was called
    // so it was called from the button which is attached to the .buy query selector
    // but now since we added.bind(delta on line 109 its now pointing to delta object for the this keyword)
    this.planes++
    //console.log(this.planes)
}
document.querySelector('.buy').addEventListener('click', delta.buyPlane.bind(delta)) // with bind, it now points the this keyword to delta