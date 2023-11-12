import gsap from 'gsap'

export default function homePannel(){
    
    let mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {


         // Col toggle animation
        let offerColLeft = document.querySelector('.offer__col--left')
        let offerColCenter = document.querySelector('.offer__col--center')
        let offerColRight = document.querySelector('.offer__col--right')

        let offerColLeftTl = gsap.timeline({ paused: true, reversed: true })
        .to(offerColLeft, {
            width: '100%',
            duration: 1.4,
            ease: 'Quart.easeInOut'
        })
        .to(offerColLeft.querySelector('.offer__toggle'), {
            width: '100%',
            duration: 1.4,
            ease: 'Quart.easeInOut'
        }, 0)
        .to(offerColLeft.querySelector('.offer__close-text'), {
            opacity: 0,
            duration: 1.4,
            ease: 'Quart.easeInOut'
        }, 0)
        .from(offerColLeft.querySelector('.offer__toggle'), {
            opacity: 0,
            duration: 0.3,
            ease: 'Quart.easeInOut'
        }, 1.2)

        let offerColCenterTl = gsap.timeline({ paused: true, reversed: true })
        .to(offerColCenter, {
            width: '100%',
            duration: 1.4,
            ease: 'Quart.easeInOut'
        }, 0)
        .to(offerColCenter.querySelector('.offer__toggle'), {
            width: '100%',
            duration: 1.4,
            ease: 'Quart.easeInOut'
        }, 0)
        .to(offerColCenter.querySelector('.offer__close-text'), {
            opacity: 0,
            duration: 1.4,
            ease: 'Quart.easeInOut'
        }, 0)
        .from(offerColCenter.querySelector('.offer__toggle'), {
            opacity: 0,
            duration: 0.3,
            ease: 'Quart.easeInOut'
        }, 1.2)

        let offerColRightTl = gsap.timeline({ paused: true, reversed: true })
        .to(offerColRight, {
            width: '100%',
            duration: 1.4,
            ease: 'Quart.easeInOut'
        }, 0)
        .to(offerColRight.querySelector('.offer__toggle'), {
            width: '100%',
            duration: 1.4,
            ease: 'Quart.easeInOut'
        }, 0)
        .to(offerColRight.querySelector('.offer__close-text'), {
            opacity: 0,
            duration: 1.4,
            ease: 'Quart.easeInOut'
        }, 0)
        .from(offerColRight.querySelector('.offer__toggle'), {
            opacity: 0,
            duration: 0.3,
            ease: 'Quart.easeInOut'
        }, 1.2)

        offerColCenter.addEventListener('click', () => {
                offerColLeftTl.reverse()
                offerColRightTl.reverse()
                setTimeout(() => {
                    offerColCenterTl.play()
                }, 1000)
        })

        offerColRight.addEventListener('click', () => {
            offerColLeftTl.reverse()
            offerColCenterTl.reverse()
            setTimeout(() => {
                offerColRightTl.play()
            }, 1000)
        })

        offerColLeft.addEventListener('click', () => {
            offerColCenterTl.reverse()
            offerColRightTl.reverse()
            setTimeout(() => {
                offerColLeftTl.play()
            }, 1000)
        })

        offerColLeft.click()

      
    })

    mm.add('(max-width: 768px)', () => {

        // Col toggle animation
       let offerColLeft = document.querySelector('.offer__col--left')
       let offerColCenter = document.querySelector('.offer__col--center')
       let offerColRight = document.querySelector('.offer__col--right')

       let offerColLeftTl = gsap.timeline({ paused: true, reversed: true })
       .to(offerColLeft.querySelector('.offer__toggle'), {
           height: 'auto',
           duration: 1,
           ease: 'Quart.easeInOut'
       }, 0)
       .to(offerColLeft.querySelector('.offer__close-text--text'), {
           opacity: 0,
           duration: 1,
           ease: 'Quart.easeInOut'
       }, 0)


       let offerColCenterTl = gsap.timeline({ paused: true, reversed: true })
       .to(offerColCenter.querySelector('.offer__toggle'), {
        height: 'auto',
        duration: 1,
        ease: 'Quart.easeInOut'
    }, 0)
    .to(offerColCenter.querySelector('.offer__close-text--text'), {
        opacity: 0,
        duration: 1,
        ease: 'Quart.easeInOut'
    }, 0)

       let offerColRightTl = gsap.timeline({ paused: true, reversed: true })
       .to(offerColRight.querySelector('.offer__toggle'), {
        height: 'auto',
        duration: 1,
        ease: 'Quart.easeInOut'
    }, 0)
    .to(offerColRight.querySelector('.offer__close-text--text'), {
        opacity: 0,
        duration: 1,
        ease: 'Quart.easeInOut'
    }, 0)

       offerColCenter.addEventListener('click', () => {
               offerColLeftTl.reverse()
               offerColCenterTl.play()
               offerColRightTl.reverse()
       })

       offerColRight.addEventListener('click', () => {
           offerColLeftTl.reverse()
           offerColCenterTl.reverse()
           offerColRightTl.play()
       })

       offerColLeft.addEventListener('click', () => {
           offerColLeftTl.play()
           offerColCenterTl.reverse()
           offerColRightTl.reverse()
       })

       offerColLeft.click()

     
   })
}