import './styles/style.css'
import Lenis from '@studio-freight/lenis'

import home from './pages/home/home'
import homeScroll from './pages/home/homeScroll'
import homePannel from './pages/home/homePannel'

import header from './components/header'
import webgl from './components/webgl'

let previousState768 = window.matchMedia('(max-width: 768px)').matches
let previousState991 = window.matchMedia('(max-width: 991px)').matches

function checkBreakpointChange() {
  const currentState768 = window.matchMedia('(max-width: 768px)').matches
  const currentState991 = window.matchMedia('(max-width: 991px)').matches

  if (currentState768 !== previousState768 || currentState991 !== previousState991) {
    console.log('Crossed a breakpoint, refreshing page...')
    window.location.reload()
  }

  previousState768 = currentState768
  previousState991 = currentState991
}

window.addEventListener('resize', checkBreakpointChange)

if (window.matchMedia('(max-width: 991px)').matches) {
  const lenis = new Lenis({
    smoothTouch: true,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}

const isHome = document.querySelector('body').classList.contains('body--home')
if (isHome) {
  header()
  home()
  homeScroll()
  homePannel()
  webgl()
}

const isUtils = document.querySelector('body').classList.contains('body--utils')
if (isUtils) {
  header()
}

let buyerBtn = document.querySelector('.footer__link--buyer')
let supplierBtn = document.querySelector('.footer__link--supplier')
let buyerPopUp = document.querySelector('.button-buyer')
let supplierPopUp = document.querySelector('.button-supplier')

buyerBtn.addEventListener('click', () => {
  buyerPopUp.click()
})
supplierBtn.addEventListener('click', () => {
  supplierPopUp.click()
})

document.querySelector('.scroll-button--down').addEventListener('click', () => {
  window.scrollBy({
    top: window.innerHeight, // This scrolls down by one viewport height. Adjust as necessary.
    left: 0,
    behavior: 'smooth',
  })
})

document.querySelector('.scroll-button--up').addEventListener('click', () => {
  window.scrollBy({
    top: -window.innerHeight, // This scrolls down by one viewport height. Adjust as necessary.
    left: 0,
    behavior: 'smooth',
  })
})
