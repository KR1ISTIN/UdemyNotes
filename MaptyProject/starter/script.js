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


let map, mapEvent;

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
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude]; // needs to be in an array bc setView/marker excepts an array value

    // points to the html element id of map
    map = L.map('map').setView(coords, 13);// the second arg is the zoom 
    
    // tile is what the map is made out of, different layouts
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

   // when you click on the map, opens form up 
    map.on('click', function(mapE) {
        mapEvent = mapE; // reassigning the map event when clicked on map
        form.classList.remove('hidden');
        inputDistance.focus();
    })

    }, function(){
        alert('could not get position')
    });

    // after the form is submitted function 
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log(mapEvent);

        // clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputDuration.value = '';

        const {lat, lng} = mapEvent.latlng

        L.marker([lat, lng]).addTo(map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth:100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',

        }))
        .setPopupContent('workout')
        .openPopup();
    });

    inputType.addEventListener('change', function() {
        // will select closest parent element to inpuElevation
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    });
