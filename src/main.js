import './styles/style.css'
import Lenis from '@studio-freight/lenis'

import home from './pages/home/home'
import homeScroll from './pages/home/homeScroll'
import homePannel from './pages/home/homePannel'

import header from './components/header'
import webgl from './components/webgl'


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
  
  const lenis = new Lenis()

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}
