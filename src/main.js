import './styles/style.css'
import Lenis from '@studio-freight/lenis'

import home from './pages/home/home'
import homeScroll from './pages/home/homeScroll'
import homePannel from './pages/home/homePannel'

import header from './components/header'
import webgl from './components/webgl'

function refreshPage() {
  window.location.reload()
}

const mediaQuery768 = window.matchMedia('(max-width: 768px)')
const mediaQuery991 = window.matchMedia('(max-width: 991px)')

function setupBreakpointListeners() {
  mediaQuery768.addEventListener((e) => {
    if (e.matches) {
      console.log('Viewport is now under 768px, refreshing page...')
      refreshPage()
    }
  })

  mediaQuery991.addEventListener((e) => {
    if (e.matches) {
      console.log('Viewport is now under 991px, refreshing page...')
      refreshPage()
    }
  })
}

// Initial setup
setupBreakpointListeners()

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
