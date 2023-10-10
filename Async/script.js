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