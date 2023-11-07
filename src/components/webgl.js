import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default function webgl() {
  // Lenis scroll
  const lenis = new Lenis()

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  lenis.scrollTo('top', { immediate: true })

  document.querySelector('.dots__dots-next').addEventListener('click', () => {
    lenis.scrollTo('.technology__wrapper')
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
      // Debug
      // const debugObject = {}
      // const gui = new dat.GUI({
      //   width: 400,
      // })

      // Canvas
      const canvas = document.querySelector('canvas.webgl')

      // Scene
      const scene = new THREE.Scene()

      /**
       * Loaders
       */
      // Loader manager
      const loadingManager = new THREE.LoadingManager(
        // Loaded
        () => {

          let loaderTl = gsap.timeline()
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

          lenis.on('scroll', (e) => {
            if (lenis.progress <= 0.8) {
              mixer.setTime(lenis.progress * 500)
            } else {
              mixer.setTime(30)
            }
          })
        },

        // Progress
        (itemUrl, itemsLoaded, itemsTotal) => {
          const progressRatio = itemsLoaded / itemsTotal
          document.querySelector('.loader__percent').innerHTML = `${Math.trunc(progressRatio * 100)}%`
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
      const bakedFactories = textureLoader.load('https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/6549d0585f0353d48d85f301_factories.jpg')
      bakedFactories.flipY = false
      bakedFactories.SRGBColorSpace = THREE.SRGBColorSpace

      const bakedTerrain = textureLoader.load('https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/6549d0588be62eb1c1ba1ae3_terrain.jpg')
      bakedTerrain.flipY = false
      bakedTerrain.SRGBColorSpace = THREE.SRGBColorSpace

      const bakedTrees = textureLoader.load('https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/6549d058d20b2802a8ea87db_trees.jpg')
      bakedTrees.flipY = false
      bakedTrees.SRGBColorSpace = THREE.SRGBColorSpace

      const bakedVehicle = textureLoader.load('https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/6549d0585839b971be613037_vehicle.jpg')
      bakedVehicle.flipY = false
      bakedVehicle.SRGBColorSpace = THREE.SRGBColorSpace

      const bakedWorld = textureLoader.load('https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/6549d058af71880e6a2ba26b_world.jpg')
      bakedWorld.flipY = false
      bakedWorld.SRGBColorSpace = THREE.SRGBColorSpace

      /**
       * Materials
       */
      // Baked material
      // const envMapIntensity = 1.8

      const factoriesMaterial = new THREE.MeshBasicMaterial({ map: bakedFactories })
      const terrainMaterial = new THREE.MeshBasicMaterial({ map: bakedTerrain })
      const treesMaterial = new THREE.MeshBasicMaterial({ map: bakedTrees })
      const vehicleMaterial = new THREE.MeshBasicMaterial({ map: bakedVehicle })
      const worldMaterial = new THREE.MeshBasicMaterial({ map: bakedWorld })

      /**
       * Model
       */
      let modelGroup
      let blenderCamera
      let mixer
      let clouds

      gltfLoader.load(
        'https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/6549d1add20b2802a8eb6899_export.glb.txt',
        (gltf) => {

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
          modelGroup.add(
            factories,
            terrain,
            trees,
            vehicle,
            world
          )
          scene.add(gltf.scene, modelGroup)
        }
      )

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
          modelGroup.rotation.y +=
            0.025 * (targetRotationY - modelGroup.rotation.y)
          modelGroup.rotation.x +=
            0.025 * (targetRotationX - modelGroup.rotation.x)
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
