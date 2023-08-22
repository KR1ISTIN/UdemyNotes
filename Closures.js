// closures
// a closure is not created manually, happens automatically, just recoginze them 
// a closure makes a functiom remember all the variables that exisisted at the functions  birthplace 

// a function has access to the variable enviroment of the execution context in which it was created
// closure: VE attached to the function, at the time the function was created\

// come back and watch the video in udemy dont understand fully

// secureBooking is a high order function
const secureBooking = function() {
    let passengerCount = 0;

    return function() {
        passengerCount++;
        console.log(passengerCount, 'passengers');
    }
}
const booker = secureBooking();
// booker is a function in the global scope,
booker();
booker();
booker();
