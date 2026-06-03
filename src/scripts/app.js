"use strict";

// MENU 
// Ouverture menu
const menuBtn = document.querySelector('.header__btn');
const navBtn = document.querySelector('.nav__btn');
const menu = document.querySelector('.header__menu');
const caseStudyMenu = document.querySelector('.nav__menu');
const menuLinks = document.querySelectorAll('.header__el a'); 
const navLinks = document.querySelectorAll('.nav__el a'); 

if (menuBtn) {
  menuBtn.addEventListener('click', menuOpen);
}
if (navBtn) {
  navBtn.addEventListener('click', menuOpen);
}

function menuOpen() {
  if (caseStudyMenu) {
    caseStudyMenu.classList.toggle('nav__menu--open');
    navBtn.classList.toggle('nav__btn--open');
  } else if (menu) {
    menu.classList.toggle('header__menu--open');
    menuBtn.classList.toggle('header__btn--open');
  }

  const isOpen = (menu && menu.classList.contains('header__menu--open')) || ( caseStudyMenu && caseStudyMenu.classList.contains('nav__menu--open'));

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

menuLinks.forEach(function(link) {
  link.addEventListener('click', closeMenu);
});
navLinks.forEach(function(link) {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', function(e){
  const isOpen = (menu && menu.classList.contains('header__menu--open')) || ( caseStudyMenu && caseStudyMenu.classList.contains('nav__menu--open'));
  
  if (isOpen){
    if (menu && !menu.contains(e.target) && menuBtn && !menuBtn.contains(e.target)){
      closeMenu();
    }
  }
});

function closeMenu() {
  if (menu) menu.classList.remove('header__menu--open');
  if (caseStudyMenu) caseStudyMenu.classList.remove('nav__menu--open');
  if (menuBtn) menuBtn.classList.remove('header__btn--open');
  if (navBtn) navBtn.classList.remove('nav__btn--open');
  document.body.style.overflow = 'auto';
}

// Header scroll
const header = document.querySelector('.header');

if (header){
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
}

// Anim decompte 
// Compteur animé au scroll
function isOnScreen(element){
  const viewPortHeight = window.innerHeight;
  const scrollTop = window.scrollY;
  const elementPosY = element.offsetTop;
  const elementHeight = element.offsetHeight;

  return (elementPosY + elementHeight > scrollTop && elementPosY < (viewPortHeight + scrollTop)); //Verif si element est bien etre top et bas ecran
}

window.addEventListener("scroll", function(){
  document.querySelectorAll('.dr__number').forEach(function(data){
    const target = parseInt(data.textContent);
    const isVisible = isOnScreen(data);

    if(isVisible && !data.classList.contains('counted')){
      data.classList.add('counted');
      data.nextElementSibling.classList.add('is-visible');

      const target = parseInt(data.getAttribute('data-target'));
      let startValue = 0;
      const pas = target / 60; //60 frame

      const timer = setInterval(function(){
        startValue += pas;
        data.textContent = Math.floor(startValue);

        if(startValue >= target){
          clearInterval(timer);
          data.textContent = target;
        }
      }, 25); //ms 
    }
  });
});
