// defualt perameters
'use strict'

const bookingArr = [];

const createBooking = function( flightNum, numPassengers = 1 , price = 199 * numPassengers){
   
    // creating an object with the parameters passed
    const booking = {
        flightNum,
        numPassengers,
        price
    }
    console.log(booking)
    bookingArr.push(booking )
}

createBooking('LH123') // if you try to pass one argument and not the rest, the values will be undefined withing the object created booking
// need default parameters and can contain any expression

// overdriding default values
createBooking('LH123', 4, 200)

// showing it with the price expression
createBooking('LH123', 2)

// you cannot skip arguments but you can set them to undefined and it will automatically use the default value
createBooking('HH123', undefined, 1000)


//------------- how to pass arguments into functions------------\\

const flight = 'LL123'
const kristin = {
    name: 'kristin desalme',
    passport: 123456
}
const checkIn = function(flightNum, passenger) {
    flightNum = 'kk123'
    passenger.name = 'Mrs ' + passenger.name

    if(passenger.passport === 123456) {
        console.log('check in')  
    } else 
        console.log('wrong passprt number')
    
}
checkIn(flight, kristin)
// when we pass the reference type (kristin) to a function, what is copied is the referance to the object in the memory heap so both are the same object so point to the same properties 

console.log(kristin) // will change my name in the kristin object 

// so passing a primitive type of a function, is really just creating a copy outside of the function, so the value is copied 
// passing an object to a function, if we make any changes to that copy in the function, it will reflect the changes in the orginally since the memory heap has a referernce of that copy


// try to avoid this mapilating object's data 
const newPassport = function(person) {
    person.passport = Math.trunc(Math.random() * 100000)
}
newPassport(kristin)
checkIn(flight, kristin) // now it prints wrong passport number this is bc we have two functions
// that are manipulating the same object which creates an issues so we dont want to do this 
console.log(kristin)



