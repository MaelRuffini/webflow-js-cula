import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function header(){

    let mm = gsap.matchMedia(),
    breakPoint = 768

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {

        let { isDesktop, isMobile, reduceMotion } = context.conditions

        let links = document.querySelectorAll('.link__wrapper')

        links.forEach(item => {

          let linkHoverTl = gsap.timeline({ paused: true })
          .to(item.querySelector('.link__arrow--relative'), {
            xPercent: 100,
            opacity: 0,
            duration: 0.3,
            ease: 'Quart.easeInOut'
          }, 0)
          .to(item.querySelector('.link__arrow--hover'), {
            xPercent: 100,
            opacity: 1,
            duration: 0.3,
            ease: 'Quart.easeInOut'
          }, 0)

          item.addEventListener('mouseenter', () => { linkHoverTl.play() })
          item.addEventListener('mouseleave', () => { linkHoverTl.reverse() })

        })


        let burgerButton = document.querySelector('.header__button-wrapper')
        let burgerTl = gsap.timeline({ paused: true, reversed: true })
        .to('.header__nav', {
          display: 'flex'
        }, 0)
        .from('.header__nav', {
          yPercent: isDesktop ? 0 : -100,
          duration: 0.4,
          ease: 'Quart.easeInOut'
        }, 0)
        .to('.header__mask', {
          display: 'block',
        }, 0)
        .from('.header__mask', {
          opacity: 0,
          duration: 0.4,
          ease: 'Quart.easeInOut'
        }, 0)
        .to('.header__button-line--center', {
          opacity: 0,
          duration: 0.4,
          ease: 'Quart.easeInOut'
        }, 0)
        .to('.header__button-line--right', {
          rotation: -45,
          x: '-0.35rem',
          duration: 0.4,
          ease: 'Quart.easeInOut'
        }, 0)
        .to('.header__button-line--left', {
          rotation: 45,
          x: '0.35rem',
          duration: 0.4,
          ease: 'Quart.easeInOut'
        }, 0)

        burgerButton.addEventListener('click', () => { burgerTl.reversed() ? burgerTl.play() : burgerTl.reverse() })

    }
  )
}