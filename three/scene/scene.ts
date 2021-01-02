declare var Stats:any;
declare var dat:any;
declare var rotationSpeed: number;
declare var bouncingSpeed: number;
declare var initTrackballControls:any;
(function() {
  let camera:any, scene:THREE.Scene, renderer:any;
  function init() {
    const { innerWidth, innerHeight } = window;
    // 创建一个场景
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
    // 创建相机
    camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    // 创建一个渲染
    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;


    // create the ground plane
    const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);
    // 接受投影
    plane.receiveShadow = true;

    // add the plane to the scene
    scene.add(plane);

    // position and point the camera to the center of the scene
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    // add subtle ambient lighting
    // const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    // scene.add(ambientLight);
    // 添加光源
    const spotLight = new THREE.SpotLight('#ffffff');
    spotLight.position.set(-40, 60, -10);
    // 设置可以产生阴影
    spotLight.castShadow = true;
    scene.add(spotLight);

    // 将renderer的内容渲染到页面
    document.getElementById("WebGL-output")?.appendChild(renderer.domElement);

    const controls = {
      rotationSpeed: 0.02,
      numberOfObjects: scene.children.length,
      removeCube() {
        const allChildren = scene.children;
        const lastObject = allChildren[allChildren.length -1];
        if(lastObject instanceof THREE.Mesh) {
          scene.remove(lastObject);
          this.numberOfObjects = scene.children.length;
        }
      },
      addCube() {
        const cubeSize = Math.ceil(Math.random() * 3);
        const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.name = 'cube-' + scene.children.length;
        const x =  -30 + Math.round((Math.random() * planeGeometry.parameters.width));
        const y = Math.round((Math.random() * 5));
        const z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
        cube.position.set(x, y, z);
        scene.add(cube);
        this.numberOfObjects = scene.children.length;
      },
      outputObjects() {
        console.log(scene.children);
      }
    }

    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'addCube');
    gui.add(controls, 'removeCube');
    gui.add(controls, 'outputObjects');
    gui.add(controls, 'numberOfObjects').listen();

    const stats = initStats();
    function renderScence () {
      stats.update();
      scene.traverse((e) => {
        if(e instanceof THREE.Mesh && e!= plane) {
          e.rotation.x += controls.rotationSpeed;
          e.rotation.y += controls.rotationSpeed;
          e.rotation.y += controls.rotationSpeed;
        }
      })
      requestAnimationFrame(renderScence);
      renderer.render(scene, camera);
    }
    renderScence();
  }
  
  function onResize() {
    const { innerWidth, innerHeight } = window;
    camera.aspect = innerWidth/ innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  }
  
  function initStats() {
    const stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById("Stats-output")?.appendChild(stats.domElement);
    return stats;
  }
  
  window.addEventListener('resize', onResize, false);
  
  window.onload = init;
})();