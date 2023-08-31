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
  window.scrollTo({
    left: s1cords.left + window.pageXOffset,
    top: s1cords.top + window.pageYOffset,
    behavior: 'smooth'
  });
});