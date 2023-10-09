'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/name/portugal');
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
                <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
                <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
            </div>
        </article>`;

        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1; 
});