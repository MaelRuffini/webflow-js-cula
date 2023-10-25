import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
          tick()
          blenderCamera.aspect = sizes.width / sizes.height
          blenderCamera.updateProjectionMatrix()

          lenis.on('scroll', (e) => {
            if (lenis.progress <= 0.8) {
              mixer.setTime(lenis.progress * 20)
            } else {
              mixer.setTime(0)
            }
          })
        },

        // Progress
        (itemUrl, itemsLoaded, itemsTotal) => {}
      )

      // Draco loader
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

      // GLTF loader
      const gltfLoader = new GLTFLoader(loadingManager)
      gltfLoader.setDRACOLoader(dracoLoader)
      const cubeTextureLoader = new THREE.CubeTextureLoader()

      /**
       * Environment map & lights
       */
      const environmentMap = cubeTextureLoader.load([
        'https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/651fc9c9cfa1bf1882a9fb61_px.png',
        'https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/651fc9c983b146d0fe168850_nx.png',
        'https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/651fc9c924850039bdb7106b_py.png',
        'https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/651fc9c9c4d8e2dd4e48a56e_ny.png',
        'https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/651fc9c9262ba8e696beb63e_pz.png',
        'https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/651fc9c940c8227ee8a2ac1a_nz.png',
      ])

      environmentMap.colorSpace = THREE.SRGBColorSpace

      scene.environment = environmentMap

      const ambientLight = new THREE.AmbientLight('white', 0)
      scene.add(ambientLight)

      const mainLight = new THREE.DirectionalLight('white', 1)
      mainLight.castShadow = true
      mainLight.shadow.mapSize.width = 2048
      mainLight.shadow.mapSize.height = 2048
      mainLight.position.set(-1.4, 0.8, -0.75)

      const secondLight = new THREE.PointLight('white', 0.9)
      secondLight.castShadow = true
      secondLight.shadow.mapSize.width = 2048
      secondLight.shadow.mapSize.height = 2048
      secondLight.position.set(7.8, 1.6, -1.26)

      // const sphereSize = 1;
      // const pointLightHelper = new THREE.PointLightHelper(mainLight, 1)
      // scene.add(pointLightHelper)

      // gui
      //   .add(mainLight.position, 'x')
      //   .name(' Main Light X')
      //   .min(-5)
      //   .max(15)
      //   .step(0.01)
      // gui
      //   .add(mainLight.position, 'y')
      //   .name(' Main Light Y')
      //   .min(-5)
      //   .max(15)
      //   .step(0.01)
      // gui
      //   .add(mainLight.position, 'z')
      //   .name(' Main Light Z')
      //   .min(-5)
      //   .max(15)
      //   .step(0.01)
      // gui
      //   .add(mainLight, 'intensity')
      //   .name(' Main Intensity')
      //   .min(0)
      //   .max(5)
      //   .step(0.01)

      /**
       * Textures
       */
      // const bakedTexture = textureLoader.load('baked.jpg')
      // bakedTexture.flipY = false
      // bakedTexture.SRGBColorSpace = THREE.SRGBColorSpace

      /**
       * Materials
       */
      // Baked material
      const envMapIntensity = 1.8

      const waterMaterial = new THREE.MeshStandardMaterial({
        color: '#C2E9ED',
        envMap: environmentMap,
        envMapIntensity: envMapIntensity,
      })
      const fieldOneMaterial = new THREE.MeshStandardMaterial({
        color: '#D2E2D3',
        envMap: environmentMap,
        envMapIntensity: envMapIntensity,
      })
      const fieldTwoMaterial = new THREE.MeshStandardMaterial({
        color: '#F6F4DD',
        envMap: environmentMap,
        envMapIntensity: envMapIntensity,
      })
      const treeHeadMaterial = new THREE.MeshStandardMaterial({
        color: '#CBECCD',
        envMap: environmentMap,
        envMapIntensity: envMapIntensity,
      })
      const treeStemMaterial = new THREE.MeshStandardMaterial({
        color: '#E1BDAE',
        envMap: environmentMap,
        envMapIntensity: envMapIntensity,
      })
      const whiteMaterial = new THREE.MeshStandardMaterial({
        color: '#F9F9F9',
        envMap: environmentMap,
        envMapIntensity: envMapIntensity,
      })
      const woodRestMaterial = new THREE.MeshStandardMaterial({
        color: '#E1BDAE',
        envMap: environmentMap,
        envMapIntensity: envMapIntensity,
      })
      const blackMaterial = new THREE.MeshStandardMaterial({
        color: '#5C5C5C',
        envMap: environmentMap,
        envMapIntensity: envMapIntensity,
      })

      /**
       * Model
       */
      let modelGroup
      let blenderCamera
      let mixer
      let clouds

      gltfLoader.load(
        'https://uploads-ssl.webflow.com/651309ab2c6e146a99437841/653879787c29f62c81af67fc_export.glb.txt',
        (gltf) => {
          mixer = new THREE.AnimationMixer(gltf.scene)
          const action = mixer.clipAction(gltf.animations[0])

          action.play()

          // Get each object
          const water = gltf.scene.children.find(
            (child) => child.name === 'water'
          )
          const fieldOne = gltf.scene.children.find(
            (child) => child.name === 'field-one'
          )
          const fieldTwo = gltf.scene.children.find(
            (child) => child.name === 'field-two'
          )
          const treeHead = gltf.scene.children.find(
            (child) => child.name === 'tree-head'
          )
          const treeStem = gltf.scene.children.find(
            (child) => child.name === 'tree-stem'
          )
          const white = gltf.scene.children.find(
            (child) => child.name === 'white'
          )
          const woodRest = gltf.scene.children.find(
            (child) => child.name === 'wood-rest'
          )
          const black = gltf.scene.children.find(
            (child) => child.name === 'black'
          )
          clouds = gltf.scene.children.find((child) => child.name === 'clouds')

          blenderCamera = gltf.cameras['0']
          blenderCamera.aspect = sizes.width / sizes.height

          // Apply materials
          water.material = waterMaterial
          water.castShadow = true
          water.receiveShadow = true

          fieldOne.material = fieldOneMaterial
          fieldOne.castShadow = true
          fieldOne.receiveShadow = true

          fieldTwo.material = fieldTwoMaterial
          fieldTwo.castShadow = true
          fieldTwo.receiveShadow = true

          treeHead.material = treeHeadMaterial
          treeHead.castShadow = true
          treeHead.receiveShadow = true

          treeStem.material = treeStemMaterial
          treeStem.castShadow = true
          treeStem.receiveShadow = true

          white.material = whiteMaterial
          white.castShadow = true
          white.receiveShadow = true

          woodRest.material = woodRestMaterial
          woodRest.castShadow = true
          woodRest.receiveShadow = true

          clouds.material = whiteMaterial
          clouds.castShadow = true
          clouds.receiveShadow = true

          black.material = blackMaterial
          black.castShadow = true
          black.receiveShadow = true

          modelGroup = new THREE.Group()
          modelGroup.add(
            water,
            fieldOne,
            fieldTwo,
            treeHead,
            treeStem,
            white,
            clouds,
            woodRest,
            black,
            mainLight,
            secondLight
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
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.3

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
        // These multipliers control the speed and intensity of the movement
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
