import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function homeScroll() {
  let mm = gsap.matchMedia(),
    breakPoint = 768

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions

      // What is Cula text animation
      let aboutText = new SplitText('.subhero__text', { type: 'lines' })

      let aboutTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: '.subhero__title-wrapper',
            start: 'bottom bottom',
            toggleActions: 'play none none reverse',
          },
        })
        .from('.subhero__title', {
          yPercent: 100,
          duration: 1.2,
          ease: 'Quart.easeInOut',
        })
        .from(
          aboutText.lines,
          {
            yPercent: 50,
            opacity: 0,
            duration: 0.6,
            ease: 'Quart.easeInOut',
            stagger: 0.1,
          },
          0.6
        )

      // gsap.from('.canvas__wrapper', {
      //   y: isDesktop ? '15rem' : 0,
      //   ease: 'none',
      //   scrollTrigger: {
      //     trigger: '.hero__wrapper',
      //     start: 'top top',
      //     end: 'bottom top',
      //     scrub: true,
      //   },
      // })

      // gsap.to('.body', {
      //   backgroundColor: '#f8fafc',
      //   duration: 0,
      //   scrollTrigger: {
      //     trigger: '.hero__wrapper',
      //     start: 'bottom top',
      //     toggleActions: 'play none none reverse',
      //   },
      // })

      // Credit text animation
      let creditText = new SplitText('.credit__text', { type: 'lines' })

      let creditTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: '.credit__sticky-wrapper',
            start: '80% bottom',
            toggleActions: 'play none none reverse',
          },
        })
        .from('.credit__title', {
          yPercent: 100,
          duration: 1.2,
          ease: 'Quart.easeInOut',
        })
        .from(
          creditText.lines,
          {
            yPercent: 50,
            opacity: 0,
            duration: 0.6,
            ease: 'Quart.easeInOut',
            stagger: 0.1,
          },
          0.6
        )

      // What we offer text animation
      let offerTitle = new SplitText('.offer__title', { type: 'lines' })

      let offerTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: '.offer__title',
            start: 'bottom bottom',
            toggleActions: 'play none none reverse',
          },
        })
        .from(
          offerTitle.lines,
          {
            yPercent: 50,
            opacity: 0,
            duration: 0.6,
            ease: 'Quart.easeInOut',
            stagger: 0.1,
          },
          0.6
        )

      // Planet text animation
      let planetTitle = new SplitText('.planet__title', { type: 'lines' })

      let planetTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: '.planet__title',
            start: 'bottom bottom',
            toggleActions: 'play none none reverse',
          },
        })
        .from(
          planetTitle.lines,
          {
            yPercent: 50,
            opacity: 0,
            duration: 0.6,
            ease: 'Quart.easeInOut',
            stagger: 0.1,
          },
          0.6
        )

      gsap.to('.header__nav', {
        yPercent: -200,
        duration: 0.4,
        ease: 'Quart.easeInOut',
        scrollTrigger: {
          trigger: '.technology__sticky-wrapper',
          start: 'top 30%',
          toggleActions: 'play reverse play reverse',
        },
      })

      // Technology scroll animation
      let sections = document.querySelectorAll('.section--technology')
      let toggleWrappers = document.querySelectorAll('.technology__card-toggle')

      function technologyToggle(item, index) {
        let toggleTl = gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top top',
              toggleActions: 'play reverse play reverse',
            },
          })
          .to(
            toggleWrappers[index],
            {
              height: 'auto',
              duration: 0.8,
              ease: 'Quart.easeInOut',
            },
            0
          )

        let dataTl = gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top top',
              ease: 'Quart.easeInOut',
            },
          })
          .from(
            toggleWrappers[index].querySelectorAll('.technology__data-item'),
            {
              scaleX: 0,
              duration: 0.4,
              delay: 0.8,
              ease: 'Quart.easeInOut',
              stagger: 0.3,
            },
            0
          )
          .from(
            toggleWrappers[index].querySelectorAll('.technology__data-item'),
            {
              backgroundColor: '#ccffce',
              duration: 0.4,
              delay: 1.2,
              ease: 'Quart.easeInOut',
              stagger: 0.3,
            },
            0
          )
          .from(
            toggleWrappers[index].querySelectorAll('.technology__data'),
            {
              opacity: 0,
              duration: 0.4,
              delay: 1,
              ease: 'Quart.easeInOut',
              stagger: 0.3,
            },
            0
          )
      }

      sections.forEach(technologyToggle)

      let dots = document.querySelectorAll('.technology__dot')

      dots.forEach((item) => {
        let pulseTl = gsap
          .timeline({ repeat: -1 })
          .from(item.querySelector('.technology__dot-outer'), {
            scale: 0,
            duration: 1.5,
            ease: 'easeIn',
          })
      })

      // Card center animation

      // Initialize ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      // Get the necessary elements
      const card = document.querySelector('.technology__card')
      const cardWrapper = document.querySelector('.technology__sticky')
      const triggerSection = document.querySelector('.credit-scroll__wrapper')

      // Function to calculate and set the centering animation
      function setCenteringAnimation() {
        ScrollTrigger.getById('mainAnimation')?.kill()
        ScrollTrigger.getById('onLeaveBackAnimation')?.kill()
        // Calculate the positions to center the card on the screen
        const centerY = window.innerHeight / 2 - card.offsetHeight / 2
        const rect = card.getBoundingClientRect()
        const centerX = (window.innerWidth - rect.width) / 2 - rect.left

        // Create the animation
        gsap.to(card, {
          y: centerY,
          x: centerX,
          onStart: function () {
            cardWrapper.style.overflow = 'visible'
            cardWrapper.style.overscrollBehavior = 'none'
            cardWrapper.removeAttribute('data-lenis-prevent')
          },
          scrollTrigger: {
            id: 'mainAnimation',
            trigger: triggerSection,
            start: 'top top', // When the top of the trigger hits the top of the viewport
            end: 'center center', // When the bottom of the trigger hits the top of the viewport
            scrub: true, // Smooth scrubbing
          },
        })

        gsap.to('.technology__card-footer', {
          height: 'auto',
          duration: 0.4,
          ease: 'Quart.easeInOut',
          scrollTrigger: {
            trigger: '.credit-scroll__wrapper',
            start: 'top top',
            toggleActions: 'play reverse play reverse',
          },
        })

        // Separate ScrollTrigger for onLeaveBack with offset
        ScrollTrigger.create({
          id: 'onLeaveBackAnimation',
          trigger: triggerSection,
          start: 'top top', // Offset by 100 pixels
          onLeaveBack: function () {
            cardWrapper.style.overflow = 'scroll'
            cardWrapper.style.overscrollBehavior = 'contain'
            cardWrapper.setAttribute('data-lenis-prevent', '')
          },
        })
      }

      // Call the function initially
      setCenteringAnimation()

      // Add resize event listener
      window.addEventListener('resize', () => {
        // Kill the previous ScrollTrigger instance to avoid stacking
        ScrollTrigger.getById('centerCardTrigger')?.kill()
        // Call the function again to reset the animation with new values
        setCenteringAnimation()
      })

      let webglTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: triggerSection,
            start: 'center center',
            end: 'bottom bottom',
            scrub: true,
            onEnterBack: function () {
              // Reset the state when scrolling back up
              gsap.set('.canvas__wrapper', {
                scale: 0,
                borderRadius: 0, // Assuming initial state has borderRadius of 0
                backgroundColor: 'initial', // Assuming this is the initial state
                position: 'fixed', // Assuming this is the initial state
                bottom: '0',
                backgroundColor: '#e3e8ef',
              })
              gsap.set('.webgl', { scale: 1 })
            },
          },
          onComplete: function () {
            // Change to absolute position and reverse scale to 1
            gsap.set('.canvas__wrapper', {
              position: 'absolute',
              backgroundColor: 'transparent',
              bottom: '-10rem',
              left: 0,
              scale: 1,
            })
            gsap.set('.webgl', { scale: 1 })
          },
        })
        .to(
          '.canvas__wrapper',
          {
            scale: 0,
            borderRadius: 64,
            ease: 'none',
          },
          0
        )
        .to(
          '.webgl',
          {
            scale: 2,
            ease: 'none',
          },
          0
        )
        .to('.canvas__wrapper', {
          backgroundColor: 'transparent',
          duration: 0,
        })

      let rotationTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: '.credit__sticky-wrapper',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        })
        .to(
          '.card__recto',
          {
            rotationY: '155deg',
            ease: 'none',
          },
          0
        )
        .to(
          '.card__verso',
          {
            rotationY: '35deg',
            ease: 'none',
          },
          0
        )
        .to(
          '.credit__text-animation',
          {
            x: '-200vw',
            ease: 'none',
          },
          0
        )
    }
  )
}
