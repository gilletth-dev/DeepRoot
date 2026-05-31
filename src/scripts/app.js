"use strict";

// MENU
// Ouverture menu
var menuBtn = document.querySelector('.header__btn');
var menu = document.querySelector('.header__menu');
var menuLinks = document.querySelectorAll('.header__el a');
menuBtn.addEventListener('click', menuOpen);

function menuOpen() {
  menu.classList.toggle('header__menu--open');
  menuBtn.classList.toggle('header__btn--open');

  if (menu.classList.contains('header__menu--open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

function closeMenu() {
  menu.classList.remove('header__menu--open');
  menuBtn.classList.remove('header__btn--open');
  document.body.style.overflow = 'auto';
}

menuLinks.forEach(function (link) {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', function(e){
  if (menu.classList.contains('header__menu--open')) {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMenu();
    }
  }
});

// Header scroll
var header = document.querySelector('.header');
let oldScrollY = 0;

window.addEventListener("scroll", scrollListener);
function scrollListener() {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const currentScroll = window.scrollY;

  const isScrollingUp = oldScrollY > currentScroll;
  const isAtTop = currentScroll === 0;
  const isAtBottom = currentScroll === maxScroll;

  if(isScrollingUp || isAtTop || isAtBottom){
    header.classList.remove("header--up");
  } else {
    header.classList.add("header--up");
  }

  oldScrollY = currentScroll
}

// Anim decompte 
// Compteur animé au scroll
