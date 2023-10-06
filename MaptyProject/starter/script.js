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

// parent class
class Workout {
    date = new Date(); // public field
    id = (Date.now() + '').slice(-10);

    constructor(coords, distance, duration) {
    this.coords = coords; // [lat,lng]
    this.distance = distance; // km
    this.duration = duration; // mins
    }
};

// child classes below
class Running extends Workout{
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace(); // will execute right away
    }
    calcPace() {
        // min / km
        this.pace = this.duration / this.distance // assigning a new property pace
        return this.pace // return to use elsewhere in the code
    }
};
class Cycling extends Workout{
    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration);
        this.elevation = elevation;
        this.speed();
    }

    speed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
const cycle1 = new Cycling([39, -12], 27, 95, 523);
console.log(run1,cycle1)

// application acritecture class
class App {
    mapEv;
    #map;
    constructor() {
        // since constructor gets created right when the page loads, a clean way to get the position right away is to call the method below
        this._getPosition(); 
        
        // gets created right away, but not CALLED right away, await for the cb to be called
        // need the bind method bc the this keyword on any event listener bind to what the event listener to linked to
        // instead we need the cb function to be called on THIS class App
        form.addEventListener('submit', this._newWorkout.bind(this));

        inputType.addEventListener('change', this._toggleElevation);

    }
    
    // getting location of user if allowed
    _getPosition() {
        if(navigator.geolocation)
        // will take in two arguments, the first: "onsuccess", when the browser gets the coords of the user
       // the second arg is for the error: 
       // the position arg for _loadMap will then be passed once the location of the user is determined
    
       // we use bind bc _loadMap gets treated as a regular function call not as a method call, so we need to bind it to this class so line 50 will execute
       navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
            alert('could not get position')
        });
    }

    // load map of user
    _loadMap(position) {
        console.log(position);
        // object destructuring, needs to match the object protery name 
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        console.log(latitude, longitude);
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        const coords = [latitude, longitude]; // needs to be in an array bc setView/marker excepts an array value

        // points to the html element id of map, L stands for leadlet map
        this.#map = L.map('map').setView(coords, 13);// the second arg is the zoom 
    
        // tile is what the map is made out of, different layouts
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // when you click on the map, opens form up 
        this.#map.on('click', this._showForm.bind(this));
    }

    _showForm(mapE) {
        this.mapEv = mapE; // reassigning the map event when clicked on map for workout location 
        form.classList.remove('hidden');
        inputDistance.focus();
    }
    _toggleElevation() {
        // will select closest parent element to inpuElevation
        // swaps between the two inputs based on running or cycling selected
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }
    _newWorkout(e) {
        e.preventDefault();
        console.log(this.mapEv);

        // clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputDuration.value = '';

        const {lat, lng} = this.mapEv.latlng

        L.marker([lat, lng]).addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth:100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',

        }))
        .setPopupContent('workout')
        .openPopup();
    }
}

// will execute when the scripts loads 
const app = new App();
// the constructor is automatically created when a new object is created from the class 
// so app is created right when the page loads
// instead of writing app._getPosition(); underneath const app = New App()
// add this._getPosition();  within the constructor for cleaner code 



