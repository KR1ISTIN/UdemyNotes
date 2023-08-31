'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smooth scroll functionality 
btnScrollTo.addEventListener('click', function(e) {
  // method below gives coordidates to the element the method is called on 
  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords); 
  // e is going to be the element clicked on which is btnScrollTo
  console.log(e.target.getBoundingClientRect());
  
  // getting x and y current scroll
  // y will show the current viewport between the top of the page, so everytime you scroll the y coord will change
  console.log('x/y', window.pageXOffset, window.pageYOffset);

  // scrolling
  //window.scrollTo(s1cords.left + window.pageXOffset, s1cords.top + window.pageYOffset)

  // smooth scrolling
  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  // simpler way to smooth scroll, works only with modern browsers
  section1.scrollIntoView({behavior: 'smooth'});
});

const h1 = document.querySelector('h1');

const alertH1 = function(e) {
  console.log(e.target)
  alert('addEventLister: mouseenter');

  // after the event fires, its then going to remove the eventListner and stop it from listening again 
  // this removeEventListener does not have to be in the function, it can be called anywhere
 // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter',  alertH1);

// remove the eventlister after 3secs have passed another example 
setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000)

// another way to add events directly on elements
// h1.onmouseenter = function(e) {
//   console.log(e.target)
//   alert('addEventLister: onmouseenter')
// }

// event bubbling in action examples:
const randomInt = (min, max) => Math.floor(Math.random() * (max - min +1) + min);
const randomColor = () => `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;

document.querySelector('.nav__link')
  .addEventListener('click', function(e) {
   
    // this points to the element on which that event handler is attached to 
    this.style.backgroundColor = randomColor(); // targets only that link
    // it will then bubble up to the root of the document as if that event happened on each on the parent elements all the way up
    
    // e.target will be the same for the parent, but its not attached to the element
    // the event originates at this link and then bubbles up
    // e.currentTarget is the element onwhich the eventHandler is attached
    console.log('LINK', e.target, e.currentTarget)

    // stopping event propagation -- stops bubbling -- not proper practice -- just for knowledge
    //e.stopPropagation();
});

// if think class is clicked, it will bubble up to each parent, 
// BUT NOT fire off any event on the sibling elements
document.querySelector('.nav')
  .addEventListener('click', function(e) {
    this.style.backgroundColor = randomColor();
    console.log('NAVBAR', e.target, e.currentTarget)
    
});

// if think class is clicked, it will bubble up to each parent, 
// BUT NOT fire off any event on the sibling elements
document.querySelector('.nav__links')
  .addEventListener('click', function(e) {
   
    this.style.backgroundColor = randomColor();
    console.log('CONTAINER', e.target, e.currentTarget)
});