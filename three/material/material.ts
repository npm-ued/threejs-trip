(function() {
  let camera:THREE.PerspectiveCamera, scene:THREE.Scene, renderer:THREE.WebGLRenderer;
  function init() {
    const { innerWidth, innerHeight } = window;
    const stats = initStats();
    // 创建一个场景
    scene = new THREE.Scene();
    // 创建相机
    camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    // 创建一个渲染
    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;

    const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);

    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.set(-4, 3, 0);
    scene.add(cube);

    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20, 0, 2);
    sphere.castShadow = true;
    scene.add(sphere);

    camera.position.set(-25, 30, 25);
    camera.lookAt(new THREE.Vector3(10, 0, 0));
    const ambiColor = '#0c0c0c';
    // 环境光线
    const ambientLight =  new THREE.AmbientLight(ambiColor);
    scene.add(ambientLight);
    // 聚光灯光源（锥形发射光线）
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.decay = 2;
    spotLight.castShadow = true;
    scene.add(spotLight);
    // 点光源
    const pointor = new THREE.PointLight();
    // 平行光
    const direction = new THREE.DirectionalLight();

    // 特殊光源
    // 半球光光源
    const hemisphereLight = new THREE.HemisphereLight();
    // 区域光
    const area = new THREE.RectAreaLight();

    // 光晕
    

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output")?.appendChild(renderer.domElement);
    let step = 0;
    const controls = {
      rotationSpeed: 0.02,
      bouncingSpeed: 0.03,
      ambientColor: ambiColor,
      disableSpotlight: false
    };
    const gui = new dat.GUI();

    gui.addColor(controls, 'ambientColor').onChange(function (e: string) {
      ambientLight.color = new THREE.Color(e);
    });
    gui.add(controls, 'disableSpotlight').onChange(function (e: boolean) {
      spotLight.visible = !e;
    });
    render();

    function render() {
      stats.update();
      cube.rotation.x += controls.rotationSpeed;
      cube.rotation.y += controls.rotationSpeed;
      cube.rotation.z += controls.rotationSpeed;

      step += controls.bouncingSpeed;
      sphere.position.x = 20 + ( 10 * (Math.cos(step)));
      sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

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
}());