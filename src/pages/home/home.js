import gsap from 'gsap'

export default function home(){

    let mm = gsap.matchMedia(),
    breakPoint = 768

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {

        let { isDesktop, isMobile, reduceMotion } = context.conditions
        
        // Cards hover animation
        let cards = document.querySelectorAll('.cards__card')
        cards.forEach(card => {
            let cardTl = gsap.timeline({ paused: true, reversed: true })
            .to(card.querySelector('.card__toggle'), {
                height: 'auto',
                duration: 1,
                ease: 'Quart.easeInOut'
            }, 0)
            .to(card.querySelector('.card__icon-wrapper'), {
                backgroundColor: '#121f37',
                rotation: 225,
                duration: 1,
                ease: 'Quart.easeInOut'
            }, 0)
            .to(card.querySelector('.card__icon-stroke'), {
                stroke: '#FFFFFF',
                duration: 1,
                ease: 'Quart.easeInOut'
            }, 0)

            card.addEventListener('click', () => { cardTl.reversed() ? cardTl.play() : cardTl.reverse() })
        })


        // Dots toggle animation
        let dots = document.querySelectorAll('.dots__dots-wrapper')
        
        dots.forEach(item => {

            let dotHoverTl = gsap.timeline({ paused: true, repeat: -1 })
            .to(item.querySelector('.dots__dots-outer'), {
                scale: 1,
                duration: 1,
                ease: 'easeIn'
            })

            item.addEventListener('mouseenter', () => { dotHoverTl.restart() })
            item.addEventListener('mouseleave', () => {
                dotHoverTl.pause()
                gsap.set(item.querySelector('.dots__dots-outer'), { scale: 0.6, duration: 0 })
            })

            let dotClickTl = gsap.timeline({ paused: true, reversed: true })
            .to(item.querySelectorAll('.dots__dots-outer, .dots__dots-icon'), {
                display: 'none',
                duration: 0,
            }, 0)
            .to(item.querySelector('.dots__dots-inner'), {
                backgroundColor: '#121F37',
                duration: 0.3,
                ease: 'Quart.easeInOut'
            }, 0)
            .to(item.querySelector('.dots__dots-embed'), {
                display: 'flex',
                duration: 0,
            }, 0)
            .from(item.querySelector('.dots__dots-embed'), {
                opacity: 0,
                duration: 0.3,
                ease: 'Quart.easeInOut'
            }, 0.1)
            .to(item.querySelector('.dots__dots-toggle'), {
                scale: 1,
                duration: 0.6,
                ease: 'Quart.easeInOut'
            }, 0.1)
            // .from(item.querySelector('.dots__dots-content'), {
            //     opacity: 0,
            //     duration: 0.4,
            //     ease: 'Quart.easeInOu'
            // })

            item.querySelector('.dots__dots-inner').addEventListener('click', () => {
                if(dotClickTl.reversed()){
                    dotClickTl.play()
                } else {
                    dotClickTl.reverse()
                }
            })
            

        })

    }
  )
}