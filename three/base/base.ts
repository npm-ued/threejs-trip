declare var Stats:any
function init() {
  const { innerWidth, innerHeight } = window;
  // 创建一个场景
  const scene = new THREE.Scene();
  // 创建相机
  const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
  // 创建一个渲染
  const renderer = new THREE.WebGLRenderer();
  // renderer.setClearColor();
  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;

  // 轴(版本的方法是Axis，新版本改完Axes)
  // const axes = new THREE.AxesHelper(20);
  // scene.add(axes);

  // 地平面
  const planeGeometry = new THREE.PlaneGeometry(60, 20);
  // 基本材质
  // const planeMaterial = new THREE.MeshBasicMaterial({ color: '#ccc' });
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);
  // 设置接收阴影
  plane.receiveShadow = true;

  // add the plane to the scene
  scene.add(plane);
  // 创建立方体
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  // 基本材质不反射光源
  // const cubeMaterial = new THREE.MeshBasicMaterial({
  //   color: '#ff0000',
  //   wireframe: true
  // });
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(-4, 3, 0);
  // 设置可以产生阴影
  cube.castShadow = true;
  scene.add(cube);

  // 创建球体
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  // 基本材质
  // const sphereMaterial = new THREE.MeshBasicMaterial({
  //   color: '#7777ff',
  //   wireframe: true
  // });
  const sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(20, 4, 2);
  // 设置可以产生阴影
  sphere.castShadow = true;
  scene.add(sphere);
  
  // 添加光源
  const spotLight = new THREE.SpotLight('#ffffff');
  spotLight.position.set(-40, 40, -15);
  // 设置可以产生阴影
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;
  scene.add(spotLight);

  // position and point the camera to the center of the scene
  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);

  // 将renderer的内容渲染到页面
  document.getElementById("WebGL-output")?.appendChild(renderer.domElement);
  let count = 1;
  const stats = initStats();
  function renderScence () {
    stats.update();
    requestAnimationFrame(renderScence);
    console.log(`执行了${count}次`, +new Date());
    count++;
    renderer.render(scene, camera);
  }
  renderScence();
}
function initStats() {
  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms
  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.getElementById("Stats-output")?.appendChild(stats.domElement);
  return stats;
}
window.onload = init;