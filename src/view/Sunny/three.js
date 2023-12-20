import * as THREE from 'three'
import * as Ammo from 'ammo.js'

import { Vector3, Euler } from 'three'

// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// 1.创建场景
const scene = new THREE.Scene()
// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置x、y、z轴坐标，即设置相机位置
camera.position.set(-10, 20, -40)
// 将相机添加到场景之中
scene.add(camera)

// 创建 Ammo.js 物理世界
const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration()
const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration)
const overlappingPairCache = new Ammo.btDbvtBroadphase()
const solver = new Ammo.btSequentialImpulseConstraintSolver()
const physicsWorld = new Ammo.btDiscreteDynamicsWorld(
  dispatcher,
  overlappingPairCache,
  solver,
  collisionConfiguration
)
// 设置重力
physicsWorld.setGravity(new Ammo.btVector3(0, -9.8, 0)) // 根据需要调整重力值

// 创建一个地板
const groundShape = new Ammo.btBoxShape(new Ammo.btVector3(50, 1, 50))
const groundTransform = new Ammo.btTransform()
groundTransform.setIdentity()
groundTransform.setOrigin(new Ammo.btVector3(0, -1, 0))
const groundMass = 0 // 地板通常是静态物体，质量设为0
const localInertia = new Ammo.btVector3(0, 0, 0)
groundShape.calculateLocalInertia(groundMass, localInertia)
const groundMotionState = new Ammo.btDefaultMotionState(groundTransform)
const groundInfo = new Ammo.btRigidBodyConstructionInfo(
  groundMass,
  groundMotionState,
  groundShape,
  localInertia
)
const groundBody = new Ammo.btRigidBody(groundInfo)
physicsWorld.addRigidBody(groundBody)

// 创建一个盒子刚体
const boxShape = new Ammo.btBoxShape(new Ammo.btVector3(1, 1, 1))
const boxTransform = new Ammo.btTransform()
boxTransform.setIdentity()
boxTransform.setOrigin(new Ammo.btVector3(0, 30, 0)) // 初始位置
const boxMass = 1 // 刚体的质量
const boxLocalInertia = new Ammo.btVector3(0, 0, 0)
boxShape.calculateLocalInertia(boxMass, boxLocalInertia)
const boxMotionState = new Ammo.btDefaultMotionState(boxTransform)
const boxInfo = new Ammo.btRigidBodyConstructionInfo(
  boxMass,
  boxMotionState,
  boxShape,
  boxLocalInertia
)
const boxBody = new Ammo.btRigidBody(boxInfo)
boxBody.setFriction(5) // 设置摩擦力
boxBody.setRestitution(3) // 设置弹性
// boxBody.setCollisionFlags(1) // 设置刚体的碰撞标志
physicsWorld.addRigidBody(boxBody)

// 创建 Three.js 盒子对象
const boxGeometry = new THREE.BoxGeometry(3, 3, 3)
const boxMaterial = new THREE.MeshBasicMaterial({ color: 'pink' })
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
// 阴影
boxMesh.castShadow = true
scene.add(boxMesh)

// 在更新循环中执行物理模拟和碰撞检测
function updatePhysics() {
  const deltaTime = 1 / 60 // 时间步长
  const maxSubSteps = 10 // 最大子步数
  physicsWorld.stepSimulation(deltaTime, maxSubSteps)

  // 更新 Three.js 中的盒子位置
  const boxTransform = new Ammo.btTransform()
  boxBody.getMotionState().getWorldTransform(boxTransform)
  const position = boxTransform.getOrigin()
  boxMesh.position.set(position.x(), position.y(), position.z())
}

// 引入第三方模型
const loader = new GLTFLoader()
let car
let carBody
export function loadModel() {
  loader.load('./isColorCar/scene.gltf', function (gltf) {
    car = gltf.scene
    car.position.set(3, 0, 3)
    car.castShadow = true
    car.receiveShadow = true
    scene.add(car)

    // 通过键盘实现对car的前进后退  左转后车头旋转 点击前进car朝车头方向前进
    let carForward = new Vector3(0, 0, 1)
    let aKeyPressed = false
    let bKeyPressed = false
    document.onkeydown = function (e) {
      let x
      let z
      switch (e.keyCode) {
        // 左转时更新前进方向向量
        case 65:
          car.rotation.y += 0.1
          carForward.x = Math.sin(car.rotation.y)
          carForward.z = Math.cos(car.rotation.y)
          break

        // 右转时更新前进方向向量
        case 68:
          car.rotation.y -= 0.1
          carForward.x = Math.sin(car.rotation.y)
          carForward.z = Math.cos(car.rotation.y)
          break

        // 前进时使用更新后的前进方向向量
        case 87:
          x = carForward.x * 0.3
          z = carForward.z * 0.3
          car.position.x += x
          car.position.z += z
          break

        // 后退使用反方向
        case 83:
          x = -carForward.x * 0.3
          z = -carForward.z * 0.3
          car.position.x += x
          car.position.z += z
          break

        // 按空格 y轴上升
        case 32:
          car.position.y += 0.3
          break

        // 按ctrl y轴下降
        case 17:
          car.position.y -= 0.3
          break
      }
    }

    // 设置car的动画效果 循环执行

    // animateCar()
  })
}
loadModel()

// 创建一个立方体 倾斜的立方体
const cubeGeometry1 = new THREE.BoxGeometry(1, 3, 3) // 设置几何体大小
const cubeMaterial1 = new THREE.MeshLambertMaterial({ color: 'pink' }) // 设置几何体材质
// 根据几何体和材质创建物体
const cube1 = new THREE.Mesh(cubeGeometry1, cubeMaterial1)
// 修改物体的位置
cube1.position.set(-10, 3, 0)
cube1.position.y = 1.5
// 实现物体的缩放
cube1.scale.set(3, 2, 1) // x、y、z轴的缩放倍数
// Math.PI是180度，rotation也是以x、y、z进行设置
// cube1.rotation.set(Math.PI / 4, 0, 0, 'XYZ')
cube1.castShadow = true
// 将几何体添加到场景之中
scene.add(cube1)

// 创建球体 地球
const sphereGeometry = new THREE.SphereGeometry(1, 30, 30) // 设置球体的大小
// 纹理贴图
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./earth.jpg')
const sphereMaterial = new THREE.MeshLambertMaterial({ map: texture }) // 设置球体的材质
// 根据几何体和材质创建物体
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(26, 26, 26)
// 将物体添加到场景之中
scene.add(sphere)

// 创建球体 太阳
const sunGeometry = new THREE.SphereGeometry(3, 30, 30) // 设置球体的大小
const sunMaterial = new THREE.MeshLambertMaterial({ color: 'gold' }) // 设置球体的材质
// 根据几何体和材质创建物体
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
sun.position.set(36, 36, 36)
// 将物体添加到场景之中
scene.add(sun)

// 创建球体 火星
const marsGeometry = new THREE.SphereGeometry(1, 30, 30) // 设置球体的大小
const marsMaterial = new THREE.MeshLambertMaterial({ color: 'gray' }) // 设置球体的材质
// 根据几何体和材质创建物体
const mars = new THREE.Mesh(marsGeometry, marsMaterial)
mars.position.set(26, 35, 26)
// 将物体添加到场景之中
scene.add(mars)

// 创建球体 水星
const mercuryGeometry = new THREE.SphereGeometry(1, 30, 30) // 设置球体的大小
const mercuryMaterial = new THREE.MeshLambertMaterial({ color: 'pink' }) // 设置球体的材质
// 根据几何体和材质创建物体
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial)
mercury.position.set(33, 27, 20)
// 将物体添加到场景之中
scene.add(mercury)

// 创建球体 金星
const venusGeometry = new THREE.SphereGeometry(1, 30, 30) // 设置球体的大小
const venusMaterial = new THREE.MeshLambertMaterial({ color: 'purple' }) // 设置球体的材质
// 根据几何体和材质创建物体
const venus = new THREE.Mesh(venusGeometry, venusMaterial)
venus.position.set(20, 26, 33.5)
// 将物体添加到场景之中
scene.add(venus)

// 创建球体 木星
const jupiterGeometry = new THREE.SphereGeometry(2, 30, 30) // 设置球体的大小
const jupiterMaterial = new THREE.MeshLambertMaterial({ color: 'hotpink' }) // 设置球体的材质
// 根据几何体和材质创建物体
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial)
jupiter.position.set(30, 20, 30)
// 将物体添加到场景之中
scene.add(jupiter)

// 创建一个下雨的效果 通过粒子系统来实现
const rainGeo = new THREE.BufferGeometry() // 创建一个几何体
const rainCount = 15000 // 设置雨滴的数量
// 设置雨滴的位置
const positions = new Float32Array(rainCount * 3)
for (let i = 0; i < rainCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 100
}
rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // 设置几何体的位置
// 设置雨滴的材质
const rainMaterial = new THREE.PointsMaterial({
  color: 0xaaaaaa,
  size: 0.1,
  transparent: true
})
const rain = new THREE.Points(rainGeo, rainMaterial)
// scene.add(rain)
// 雨滴的动画效果
function animateRain() {
  const positions = rainGeo.attributes.position.array
  for (let i = 0; i < positions.length; i++) {
    if (i % 3 === 1) {
      positions[i] -= 0.1
    }
    if (positions[i] < -50) {
      positions[i] = 50
    }
  }
  rainGeo.attributes.position.needsUpdate = true
  rain.rotation.y += 0.002
}
animateRain()

// 添加物体，创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1) // 设置几何体大小
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 }) // 设置几何体材质
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 修改物体的位置
// cube.position.set(5,0,0)
cube.position.y = 1.5
// 实现物体的缩放
cube.scale.set(3, 2, 1) // x、y、z轴的缩放倍数
// Math.PI是180度，rotation也是以x、y、z进行设置
cube.rotation.set(Math.PI / 4, 0, 0, 'XYZ')
cube.castShadow = true
// 将几何体添加到场景之中
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 渲染阴影
renderer.shadowMap.enabled = true
// 将webgl渲染的canvas内容添加到body上
document.body.appendChild(renderer.domElement)
// // 使用渲染器，通过相机将场景渲染出来
export const result = renderer.render(scene, camera)

// 创建地面网格参照
const planeGeometry = new THREE.PlaneGeometry(50, 50) // 平面几何的宽高
const PlaneMateial = new THREE.MeshPhongMaterial({ color: '#1e1e1e' }) // 几何平面的颜色
const plane = new THREE.Mesh(planeGeometry, PlaneMateial)
plane.rotation.x = -0.5 * Math.PI
plane.position.set(0, 0, 0)
plane.receiveShadow = true
scene.add(plane)

// 设置光源投影
const ambienLight = new THREE.AmbientLight('#fff')
scene.add(ambienLight)

// 聚光光源
const spotLight = new THREE.SpotLight('purple', 5)
// 设置聚光光源位置
spotLight.position.set(36, 36, 36)
// 聚光灯光源指向网格模型
spotLight.target = plane
// 设置聚光光源发散角度
spotLight.angle = Math.PI / 6
// 设置聚光光源的阴影
spotLight.castShadow = true
// 设置聚光光源阴影的分辨率
spotLight.shadow.mapSize.width = 2048
spotLight.shadow.mapSize.height = 2048
// 设置聚光光源的阴影范围
// let cam = spotLight.shadow.camera
//光对象添加到scene场景中
scene.add(spotLight)
const spotLightHelp = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelp)

// 创建轨道控制器
new OrbitControls(camera, renderer.domElement)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(50) // 数值代表线的长度
scene.add(axesHelper) // 添加到场景之中

export function render() {
  cube.position.x += 0.01
  cube.rotation.x += 0.01
  if (cube.position.x > 20) {
    cube.position.x = 0
  }

  updatePhysics() // 更新物理模拟

  renderer.render(scene, camera)

  // 接下来渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render)
  requestAnimationFrame(animateRain)
}

// 先开始就渲染一下
render()
