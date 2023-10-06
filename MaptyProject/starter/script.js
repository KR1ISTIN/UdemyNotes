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
    type = 'running';
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
    type = 'cycling';
    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration);
        this.elevation = elevation;
        this.speed();
    }

    speed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
};

const run1 = new Running([39, -12], 5.2, 24, 178);
const cycle1 = new Cycling([39, -12], 27, 95, 523);
console.log(run1,cycle1)



// application acritecture class
class App {
    mapEv;
    #map;
    workouts = [];
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
        //console.log(latitude, longitude);
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
        console.log(this.mapEv);

        // checks to see is the numbers are finite or not 
        // every method loops over the array and RETURN TRUE if every input is finite 
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));

        // checks if all inputs are positive
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);
        
        e.preventDefault();
        // get form from data
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value; // inputs come as string, so adding the + makes it a number
        // getting coords / already did object destructuring 
        const {lat, lng} = this.mapEv.latlng
        let workout; // defining here to give access for both functions for cycle or running, used let since the workout may change

        // check if data is valid 
        // if running, cretae running object
        if(type === 'running') {
            const cadence = +inputCadence.value;
            //console.log(distance,duration,cadence)
            
            // if distance is NOT a number - a guard clause, checks for the opposite 
            if(
                !validInputs(distance,duration,cadence) || !allPositive(distance,duration,cadence)// if not true, show alert window
            ) return alert('Inputs have to be positive numbers')
            
        // when we make a new instance, the coords property needs to be an array, so now taking the deconstructed object from above and apply here
        workout = new Running([lat,lng],distance,duration,cadence);
        }

        // if cycling create cycling object 
        if(type === 'cycling') {
            const elevation = +inputElevation.value;     
            if(
                !validInputs(distance,duration,elevation) || !allPositive(distance,duration)// if not true, show alert window
            ) return alert('Inputs have to be positive numbers')
            
        workout = new Cycling([lat,lng],distance,duration,elevation)
        }

        // add new object to workout array after going through the if statements
        this.workouts.push(workout); // adding to to array
        //console.log(workout);
        this.rednerWorkoutMarker(workout);

        //clear inputs 
        inputDistance.value = inputDuration.value = inputCadence.value = inputDuration.value = '';
    }

    // renders marker on the page
    rednerWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth:100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`,

        }))
        .setPopupContent(`${workout.type}`)
        .openPopup();
    }
}

// will execute when the scripts loads 
const app = new App();
// the constructor is automatically created when a new object is created from the class 
// so app is created right when the page loads
// instead of writing app._getPosition(); underneath const app = New App()
// add this._getPosition();  within the constructor for cleaner code 



