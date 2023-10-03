'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// implementing geolocation
// will take in two arguments, the first: "onsuccess", when the browser gets the coords of the user
// the second arg is for the error: 
if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        // object destructuring, needs to match the object protery name 
    const {latitude} = position.coords;
    const {longitude} = position.coords;
    console.log(latitude, longitude);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`)

    }, function(){
        alert('could not get position')
    })