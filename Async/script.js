'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const getCountryData = function(country) {

const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v3.1/name/${country}`); 
request.send(); // sends off the request to the url provided above 

// waiting for the data to load, then the CB function will run
request.addEventListener('load', function() {
    // the this keyword points to the request, responseText will be set when the data actually arrives
    // const data = JSON.parse(this.responseText);
    // console.log(data); // since it is an array containing an object, we can destructure it
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    let html = `
        <article class="country">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
                <p class="country__row"><span>💰</span>${data.currencies.USD.name}</p>
            </div>
        </article>`;

        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1; 
})};

getCountryData('usa');

//  ------------------------- FETCHING Data with PROMISES 
 

const getData = function(country) {
    //  .then() will return a promise, to get data from the promise use .then method, then it needs a CB function for when the promise is actually fulfilled 
    // the function will take a arg which will contain the data that was fulfilled by that promise 
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(function(response) {
            console.log(response);
            //response.json(); // .json() is a async function which will also return a promise so we need to use a return to then use another .then()
            return response.json();

        }).then(function(data) {
            //console.log(data)
            const [datA] = data
            let html = `
            <article class="country">
                <img class="country__img" src="${datA.flags.png}" />
                <div class="country__data">
                    <h3 class="country__name">${datA.name.common}</h3>
                    <h4 class="country__region">${datA.region}</h4>
                    <p class="country__row"><span>👫</span>${(+datA.population / 1000000).toFixed(1)}</p>
                    <p class="country__row"><span>🗣️</span>${datA.languages.eng}</p>
                    <p class="country__row"><span>💰</span>${datA.currencies.USD.name}</p>
                </div>
            </article>`;
    
            countriesContainer.insertAdjacentHTML('beforeend', html);
            countriesContainer.style.opacity = 1; 
        })
};

getData('usa')

// simplifed with arrow functions

const getDATA = function(c) {
    fetch(`https://restcountries.com/v3.1/name/${c}`)
        .then(res => res.json())
        .then(data => console.log('arrow function promise', data));
};
getDATA('usa');

// ------------- promise chaining / error handling
const renderErr = function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    //countriesContainer.style.opacity = 1;
};
// for error handing uncaught promise:
    // either pass a second CB function into the then method, the first CB will be always for the fulfilled promise, the second CB is for when the promise is rejected
    // OR second option: add a .catch() at the end of the chain 
const getD = function(c) {
    fetch(`https://restcountries.com/v3.1/name/${c}`)
        .then(res => res.json(), err => alert(err))
        .then(data => {
            //console.log(data);
            const neighbor = data[0].borders[0];

            if(!neighbor) return
            
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`); // returning a promise
        })
        .then(dataResp => dataResp.json()) // .then will run if promise is fulfilled
        .then(results => console.log('promise chaining:', results))
        .catch( err => { // will only run if promise is rejected
            console.error(err);
            renderErr(`something went wrong ${err}`);
        })
        // .finally will always fun no matter if fulfilled or err happens 
        .finally(() => {
            countriesContainer.style.opacity = 1;
        })
};

btn.addEventListener('click', function() {
    getD('usa');
});


// ------------------ building promises

// the promise constructor will take in one arg known as the executer 
// when the constructor runs it will automaticlly execute the exuter function 
const lotteryPromise = new Promise(function(resolve, reject) {
    // the function will contain async behavior we are trying to handle with the promise
    // so this function will hold value for the future promise value 

    console.log('lottery Draw is happening...')

    // capturing async behavior into a promise 
    setTimeout(function() {
        // if a fullfilled promise 
        if(Math.random() >= 0.5) {
            resolve('YOU WIN!'); // calling resolve() will mark this as a fulfilled promise 
            // whatever we pass into the resolve method, its going to be the result of the promise that will be avaiable in the THEN handler
        } else {
            reject(new Error('YOU looooooost')); // you then pass in the error message you want to be able to handle in the CATCH handler
        }
    }, 2000)
});

// lotteryPromise is going to return a promise so you can use the .then()
lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// promisifying 
const wait = function(seconds) {
    // dont need a reject params bc the setTimeout will never fail 
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

// this will call a promise that will wait for 2 secs then resolve 
wait(2).then(() => {
    console.log('waited 2 secs ');
    return wait(1); // basically calling another fetch which again returns a new promise 
}).then(() => {
    console.log('waited for another second')
}); 

// ------------ async and await promises 

// now its a async function that will be running in the background while performing the code thats inside of it and when its done it will return a promise
const whereAmI = async function(country) {
    // inside async functions, we can one or more await statements 
    // await needs a promise, so for example here we will use fetch again 
    // the function will stop at the await and will not proceed until promise is fulfilled 
    // but bc it is inside a ASYNC function, the rest of the code will still be ran within the block,
    // so the await fetch will not stop any other code from executing 
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    // so now res will will hold the result of the promise that was fulfilled 
    //console.log('------------result of async and await', res);
    
    // .json turns res into a json which returns a promise, so we can add another await to it instead of a .then()
     const data = await res.json();
     //console.log('-----------------', data);
     return `This is that data being returned: ${data[0].name.common}`;
};
// if you want to return data from a promise using async and await, you can get the data by the ex below:
whereAmI('usa').then(data => console.log(`${data}`)); // will be the result of the fulfilled promise above

// without the return statement / whereAmI('usa'); // being called first but the console.log will run before the function above
console.log('first, this is an example to show that its working asynchronously');