import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Observer } from 'gsap/all'
import { ScrollToPlugin } from 'gsap/all'
import Lenis from '@studio-freight/lenis'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin)

export default function webgl() {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0)
  }

  document.querySelector('.dots__dots-next').addEventListener('click', () => {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth',
    })
  })

  let mm = gsap.matchMedia(),
    breakPoint = 768

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions

      /**
       * Base
       */
      // Canvas
      const canvas = document.querySelector('canvas.webgl')

      const isSmallScreen = window.matchMedia('(max-width: 767px)').matches

      let viewportHeight = window.innerHeight
      let mixerEnd
      let path
      let height
      let scrollTarget

      if (isSmallScreen) {
        path = 'https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/656605897d3f1c1d75e57142_export-mobile.glb.txt'
        mixerEnd = 1.25
        height = document.documentElement.scrollHeight / viewportHeight
        scrollTarget = 0.8
      } else {
        path = 'https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/6566059bad11a94a6291a102_export-desktop.glb.txt'
        mixerEnd = 5
        height = 13
        scrollTarget = 1
      }

      // Scene
      const scene = new THREE.Scene()

      /**
       * Loaders
       */
      // Loader manager
      const loadingBarElement = document.querySelector('.loader__bar')

      const loadingManager = new THREE.LoadingManager(
        // Loaded
        () => {
          document.querySelector('.body--home').style.overflow = 'auto'

          let loaderTl = gsap
            .timeline()
            .to('.loader__wrapper', {
              yPercent: -100,
              duration: 1.2,
              ease: 'Quart.easeInOut',
            })
            .to('.loader__wrapper', {
              display: 'none',
              duration: 0,
            })

          tick()
          blenderCamera.aspect = sizes.width / sizes.height
          blenderCamera.updateProjectionMatrix()

          // Function to check if the device is touch-capable
          function isTouchDevice() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
          }

          const sections = document.querySelectorAll('section')
          const totalSections = sections.length
          let isScrolling = false

          const creditStickyWrapper = document.querySelector('.credit-scroll__trigger')
          let normalScroll = false

          // Function for custom scroll behavior
          function handleCustomScroll(event) {
            if (normalScroll) return

            event.preventDefault() // Prevent the default scroll

            if (isScrolling) return
            isScrolling = true

            const delta = event.wheelDelta || -event.deltaY
            const currentSectionIndex = Math.round(window.scrollY / window.innerHeight)
            let nextSectionIndex = delta > 0 ? currentSectionIndex - 1 : currentSectionIndex + 1

            nextSectionIndex = Math.max(0, Math.min(nextSectionIndex, totalSections - 1))
            const nextSectionTop = nextSectionIndex * window.innerHeight

            smoothScrollTo(0, nextSectionTop, 3000) // Custom smooth scroll

            setTimeout(() => {
              isScrolling = false
            }, 3000) // Reset scroll lock
          }

          // Apply custom scroll behavior only on non-touch devices
          if (!isTouchDevice()) {
            document.addEventListener('wheel', handleCustomScroll, { passive: false })
          }

          document.addEventListener('scroll', () => {
            const creditTop = creditStickyWrapper.getBoundingClientRect().top
            normalScroll = creditTop <= window.innerHeight
          })

          // Add an event listener to the window's scroll event
          window.addEventListener('scroll', calculateScrollProgress)

          // Smooth scroll function
          function smoothScrollTo(endX, endY, duration) {
            const startX = window.scrollX
            const startY = window.scrollY
            const distanceX = endX - startX
            const distanceY = endY - startY
            const startTime = new Date().getTime()

            const easeInOutQuart = (time, from, distance, duration) => {
              if ((time /= duration / 2) < 1) return (distance / 2) * time * time * time * time + from
              return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from
            }

            const timer = setInterval(() => {
              const time = new Date().getTime() - startTime
              const newX = easeInOutQuart(time, startX, distanceX, duration)
              const newY = easeInOutQuart(time, startY, distanceY, duration)
              if (time >= duration) {
                clearInterval(timer)
                window.scrollTo(newX, newY) // Ensure final position is set correctly
              } else {
                window.scrollTo(newX, newY)
              }
            }, 1000 / 60) // 60 fps
          }

          // Function to calculate the scroll progress (ensure to define mixer and dotMaterial)
          function calculateScrollProgress() {
            viewportHeight = window.innerHeight
            var targetHeight = viewportHeight * height // height = 1300vh = 13 times the viewport height
            var scrollTop = window.scrollY || document.documentElement.scrollTop
            var scrollProgress = scrollTop / targetHeight

            // // Ensuring that the scroll progress does not exceed 1
            // if (scrollProgress > 1) {
            //   scrollProgress = 1
            // }

            // Update your mixer object here, if applicable
            let progress = scrollProgress * 10
            console.log(progress.toFixed(2))
            if (scrollProgress <= scrollTarget) {
              mixer.setTime(scrollProgress * 40)
            } else {
              mixer.setTime(mixerEnd)
            }

            if (progress >= 0.5) {
              dotMaterial.opacity = 0
            } else {
              dotMaterial.opacity = 1
            }
          }

          // Add an event listener to the window's scroll event
          window.addEventListener('scroll', calculateScrollProgress)

          // Smooth scroll function
          function smoothScrollTo(endX, endY, duration) {
            const startX = window.scrollX || window.scrollX
            const startY = window.scrollY || window.scrollY
            const distanceX = endX - startX
            const distanceY = endY - startY
            const startTime = new Date().getTime()

            const easeInOutQuart = (time, from, distance, duration) => {
              if ((time /= duration / 2) < 1) return (distance / 2) * time * time * time * time + from
              return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from
            }

            const timer = setInterval(() => {
              const time = new Date().getTime() - startTime
              const newX = easeInOutQuart(time, startX, distanceX, duration)
              const newY = easeInOutQuart(time, startY, distanceY, duration)
              if (time >= duration) {
                clearInterval(timer)
              }
              window.scrollTo(newX, newY)
            }, 1000 / 60) // 60 fps
          }
        },

        // Progress
        (itemUrl, itemsLoaded, itemsTotal) => {
          const progressRatio = itemsLoaded / itemsTotal
          document.querySelector('.loader__percent').innerHTML = `${Math.trunc(progressRatio * 100)}%`
          loadingBarElement.style.transform = `scaleX(${progressRatio})`
        }
      )

      // Draco loader
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

      // GLTF loader
      const gltfLoader = new GLTFLoader(loadingManager)
      gltfLoader.setDRACOLoader(dracoLoader)
      const cameraLoader = new GLTFLoader()
      const textureLoader = new THREE.TextureLoader(loadingManager)

      /**
       * Textures
       */
      const bakedFactories = textureLoader.load('https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/654eeb27a8b37b4b74ff690d_factories.jpg')
      bakedFactories.flipY = false
      bakedFactories.SRGBColorSpace = THREE.SRGBColorSpace

      const bakedTerrain = textureLoader.load('https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/654eeb279d533f960e71d81f_terrain.jpg')
      bakedTerrain.flipY = false
      bakedTerrain.SRGBColorSpace = THREE.SRGBColorSpace

      const bakedTrees = textureLoader.load('https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/654eeb28abbb4e421e9670a2_trees.jpg')
      bakedTrees.flipY = false
      bakedTrees.SRGBColorSpace = THREE.SRGBColorSpace

      const bakedVehicle = textureLoader.load('https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/654eeb274d1a59b8875bd45d_vehicle.jpg')
      bakedVehicle.flipY = false
      bakedVehicle.SRGBColorSpace = THREE.SRGBColorSpace

      const bakedWorld = textureLoader.load('https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/65563440837f48a18638563c_world.jpg')
      bakedWorld.flipY = false
      bakedWorld.SRGBColorSpace = THREE.SRGBColorSpace

      /**
       * Materials
       */
      // Baked material
      // const envMapIntensity = 1.8

      const factoriesMaterial = new THREE.MeshBasicMaterial({
        map: bakedFactories,
      })
      const terrainMaterial = new THREE.MeshBasicMaterial({ map: bakedTerrain })
      const treesMaterial = new THREE.MeshBasicMaterial({ map: bakedTrees })
      const vehicleMaterial = new THREE.MeshBasicMaterial({ map: bakedVehicle })
      const worldMaterial = new THREE.MeshBasicMaterial({ map: bakedWorld })
      const dotMaterial = new THREE.MeshBasicMaterial({
        color: '#57EEA6',
        transparent: true,
        opacity: 1,
      })

      /**
       * Model
       */
      let modelGroup
      let blenderCamera
      let mixer
      let clouds

      gltfLoader.load(path, (gltf) => {
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])

        action.play()

        blenderCamera = gltf.cameras['0']
        blenderCamera.aspect = sizes.width / sizes.height

        scene.add(gltf.scene)

        // Get each object
        const factories = gltf.scene.children.find((child) => child.name === 'factories')
        const terrain = gltf.scene.children.find((child) => child.name === 'terrain')
        const trees = gltf.scene.children.find((child) => child.name === 'trees')
        const vehicle = gltf.scene.children.find((child) => child.name === 'vehicle')
        const world = gltf.scene.children.find((child) => child.name === 'world')

        // Apply materials
        factories.material = factoriesMaterial
        terrain.material = terrainMaterial
        trees.material = treesMaterial
        vehicle.material = vehicleMaterial
        world.material = worldMaterial

        modelGroup = new THREE.Group()
        modelGroup.add(factories, terrain, trees, vehicle, world)
        scene.add(gltf.scene, modelGroup)
      })

      const dotOneGeometry = new THREE.CircleGeometry(0.3, 32)
      const dotOne = new THREE.Mesh(dotOneGeometry, dotMaterial)
      dotOne.rotation.x = Math.PI / 2

      const dotTwoGeometry = new THREE.CircleGeometry(0.3, 32)
      const dotTwo = new THREE.Mesh(dotTwoGeometry, dotMaterial)
      dotTwo.rotation.x = Math.PI / 2

      const dotThreeGeometry = new THREE.CircleGeometry(0.3, 32)
      const dotThree = new THREE.Mesh(dotThreeGeometry, dotMaterial)
      dotThree.rotation.x = Math.PI / 2

      const dotFourGeometry = new THREE.CircleGeometry(0.3, 32)
      const dotFour = new THREE.Mesh(dotFourGeometry, dotMaterial)
      dotFour.rotation.x = Math.PI / 2

      const dotFiveGeometry = new THREE.CircleGeometry(0.3, 32)
      const dotFive = new THREE.Mesh(dotFiveGeometry, dotMaterial)
      dotFive.rotation.x = Math.PI / 2

      const dotSixGeometry = new THREE.CircleGeometry(0.3, 32)
      const dotSix = new THREE.Mesh(dotSixGeometry, dotMaterial)
      dotSix.rotation.x = Math.PI / 2

      const dotSevenGeometry = new THREE.CircleGeometry(0.3, 32)
      const dotSeven = new THREE.Mesh(dotSevenGeometry, dotMaterial)
      dotSeven.rotation.x = Math.PI / 2

      dotOne.position.set(10.5, -22, 8)
      dotTwo.position.set(10.5, -24, 4.3)
      dotThree.position.set(6.6, -30, -3.95)
      dotFour.position.set(12.87, -20, 12.1)
      dotFive.position.set(16.39, -15.68, 10.52)
      dotSix.position.set(-18.42, -20.37, -13.73)
      dotSeven.position.set(-16.85, -30, 8.96)

      scene.add(dotOne, dotTwo, dotThree, dotFour, dotFive, dotSix, dotSeven)

      let arr = [dotOne, dotTwo, dotThree, dotFour, dotFive, dotSix, dotSeven]

      arr.forEach((item) => {
        let delay = Math.random() * 10
        let dotTl = gsap
          .timeline({ repeat: -1 })
          .fromTo(
            item.scale,
            {
              x: 0.5,
              y: 0.5,
              z: 0.5,
            },
            {
              x: 1.5,
              y: 1.5,
              z: 1.5,
              ease: 'Quart.easeInOut',
              duration: 1.6,
              // delay: delay,
            }
          )
          .to(item.scale, {
            x: 0.5,
            y: 0.5,
            z: 0.5,
            ease: 'Quart.easeInOut',
            duration: 0.8,
          })
      })

      /**
       * Sizes
       */
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        if (blenderCamera !== undefined) {
          blenderCamera.aspect = sizes.width / sizes.height
          blenderCamera.updateProjectionMatrix()
        }

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })

      /**
       * Cameras
       */
      // Base camera
      // const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 10000)
      // camera.position.set(1, 1, 1)
      // scene.add(camera)

      // Controls
      // const controls = new OrbitControls(camera, canvas)
      // controls.enableDamping = true

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
      })
      renderer.outputColorSpace = THREE.LinearSRGBColorSpace
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      /**
       * Cursor
       */
      const mouse = {
        x: 0,
        y: 0,
      }

      // Update the mouse position on mouse move
      window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / sizes.width) * 2 - 1
        mouse.y = -(event.clientY / sizes.height) * 2 + 1
      })

      /**
       * Animate
       */
      const clock = new THREE.Clock()

      const tick = () => {
        const elapsedTime = clock.getElapsedTime()

        // Update controls
        // controls.update()

        // Calculate the desired rotation and position based on the mouse position
        const targetRotationX = mouse.y * 0.01
        const targetRotationY = mouse.x * 0.01

        // Apply a smoothing effect to the rotation and movement
        if (modelGroup) {
          modelGroup.rotation.y += 0.015 * (targetRotationY - modelGroup.rotation.y)
          modelGroup.rotation.x += 0.015 * (targetRotationX - modelGroup.rotation.x)
        }

        // Update mixer
        if (clouds) {
          clouds.rotation.z = elapsedTime * 0.05
        }

        // Render
        renderer.render(scene, blenderCamera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
      }
      // tick()
    }
  )
}
