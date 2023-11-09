'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

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

// page navigation 
// this is one way but not good for perforamce, you want to use event delegation instead
// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault(); // keeps page from reloading and scrolling to section
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// });
// event delegation:
// places the event listener on a common parent of all the elements that we are interested in targeting
// so the container holding the links would be a common parent to each link
// therefore, place the eventListener on the Container, and when user clicks on a link, then event is generated and bubbles up as normal

// step one: add event listener to common parent element
// determine what element orignated that event

document.querySelector('.nav__links').addEventListener('click', function(e) {
  console.log(e.target,'------------')
  console.log(e.currentTarget)
  e.preventDefault();
  // matching
  if(e.target.classList.contains('nav__link')) {
    console.log('link');
    const id = e.target.getAttribute('href'); // e.target since it is on the parent element
     console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
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
    //console.log('LINK', e.target, e.currentTarget)

    // stopping event propagation -- stops bubbling -- not proper practice -- just for knowledge
    //e.stopPropagation();
});

// if think class is clicked, it will bubble up to each parent, 
// BUT NOT fire off any event on the sibling elements
document.querySelector('.nav')
  .addEventListener('click', function(e) {
    this.style.backgroundColor = randomColor();
    //console.log('NAVBAR', e.target, e.currentTarget)
    
});

// if think class is clicked, it will bubble up to each parent, 
// BUT NOT fire off any event on the sibling elements
document.querySelector('.nav__links')
  .addEventListener('click', function(e) {
    this.style.backgroundColor = randomColor();
    //console.log('CONTAINER', e.target, e.currentTarget)
});

// DOM TRAVERSING 

// going downwards: selecting child elements
console.log(h1.querySelectorAll('.highlight'));
// if there were other elements with the highlight class on the page then they would not get selected bc they are not direct children of h1
console.log(h1.childNodes); // gives us every single type of node that is a direct child of h1
console.log(h1.children);  // gives children on within h1 tags 
h1.firstElementChild.style.color = 'pink' // sets only direct first child
console.log(h1.firstElementChild); // banking
h1.lastElementChild.style.color = 'orange' // sets only direct last child

// going upwards: selecting parents elements
console.log(h1.parentNode); // the parent is a div with a class header_title 
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)' // will select the parent of h1 with the .header class that is closetest and change the background color 
// takes is a selector, if you put 'h1' instead of .header, it'll targets itself 

// selecting siblings
console.log(h1.previousElementSibling); // null bc is does not have a previous sibling
console.log(h1.nextElementSibling); // h4 bc its the next sibling
// when accessing siblings you can only access them next to eachother 

// if you want access to all children
console.log(h1.parentElement.children); // gives us a iterable, so we can use the spread operator 
[...h1.parentElement.children].forEach(function(el) {
  if(el !== h1) {
    el.style.transform = 'scale(0.5)';
    el.style.color = 'red'
  }
});

// building a tabbed component in the operations sections
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// dont do this, this will slow down the page
//tabs.forEach(t => t.addEventListener('click', () => console.log('tab')))
// instead you want to use event delegation example below:

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked); // if we click on the button as a whole it'll target what we want BUT 
  // if we click on the span element inside the button, it will not give us what we want, it'll just populate the span element when we need the data attribute thats linked on the button
  // thats why we had to add the .closest(), it'll find the closest parent with the className '.operations__tab'

  // if not clicked, this is a guard clause, guards the classList added when clicked
  if(!clicked) return;

  // if not clicked, will remove the active status, clear first then add on the one that is clicked and same for content
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  
  // if clicked add:
  clicked.classList.add('operations__tab--active');
  // dataset
  console.log('dataset tab:', clicked.dataset.tab);
  // content added to clicked tab
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// event handlers
// menu fade animation

const handleHover = function (e, opacity) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    console.log('hovered', link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    console.log('siblings', siblings)

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = opacity;
    })
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function(e) {
  handleHover(e, 0.5)
});

nav.addEventListener('mouseout', function(e) {
  handleHover(e, 1)
});


