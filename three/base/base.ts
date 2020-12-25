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

  // 轴(版本的方法是Axis，新版本改完Axes)
  const axes = new THREE.AxesHelper(20);
  scene.add(axes);

  // 地平面
  const planeGeometry = new THREE.PlaneGeometry(60, 30);
  const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // position and point the camera to the center of the scene
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  // 将renderer的内容渲染到页面
  document.getElementById("WebGL-output")?.appendChild(renderer.domElement);

  renderer.render(scene, camera);

}
window.onload = init;