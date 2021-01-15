(function () {
  // 这一节主要讲的是摄像机，透视摄像机和正交摄像机
  let camera: THREE.Camera, scene: THREE.Scene, renderer: any;
  function init() {
    const { innerWidth, innerHeight } = window;
    const stats = initStats();
    scene = new THREE.Scene();
    // 透视摄像机
    camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    camera.position.set(120, 60, 180);

    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0xeeeeee));
    renderer.setSize(innerWidth, innerHeight);
    // create the ground plane
    const planeGeometry = new THREE.PlaneGeometry(180, 180);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);

    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

    for (var j = 0; j < (planeGeometry.parameters.height / 5); j++) {
      for (var i = 0; i < planeGeometry.parameters.width / 5; i++) {
          var rnd = Math.random() * 0.75 + 0.25;
          var cubeMaterial = new THREE.MeshLambertMaterial();
          cubeMaterial.color = new THREE.Color(rnd, 0, 0);
          var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          cube.position.z = -((planeGeometry.parameters.height) / 2) + 2 + (j * 5);
          cube.position.x = -((planeGeometry.parameters.width) / 2) + 2 + (i * 5);
          cube.position.y = 2;
          scene.add(cube);
      }
    }
    const lookAtGeom = new THREE.SphereGeometry(2);
    const lookAtMesh = new THREE.Mesh(lookAtGeom, new THREE.MeshLambertMaterial({color: 0xff0000}));
    scene.add(lookAtMesh);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(-20, 40, 60);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x292929);
    scene.add(ambientLight);

    document.getElementById("WebGL-output")?.appendChild(renderer.domElement);
    
    const controls = {
      perspective: 'Perspective',
      switchCamera() {
        // 如果是透视相机转化为正交相机
        if (camera instanceof THREE.PerspectiveCamera) {
          camera = new THREE.OrthographicCamera(innerWidth / -16, innerWidth / 16, innerHeight / 16, innerHeight / -16, -200, 500);
          camera.position.x = 120;
          camera.position.y = 60;
          camera.position.z = 180;
          camera.lookAt(scene.position);
          this.perspective = "Orthographic";
        } else {
          camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
          camera.position.x = 120;
          camera.position.y = 60;
          camera.position.z = 180;
          camera.lookAt(scene.position);
          this.perspective = "Perspective";
        }
      }
    }
    const gui = new dat.GUI();
    gui.add(controls, 'switchCamera');
    gui.add(controls, 'perspective').listen();
    camera.lookAt(scene.position);
    render();
    let step = 0;
    function render() {
      stats.update();
      step +=0.2;
      // if (camera instanceof THREE.Camera) {
        var x = 10 + ( 100 * (Math.sin(step)));
        // camera.lookAt(new THREE.Vector3(x, 10, 0));
        lookAtMesh.position.copy(new THREE.Vector3(x, 10, 0));
      // }
      // render using requestAnimationFrame
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

  }
  function initStats() {
    const stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    // Align top-left
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.getElementById("Stats-output")?.appendChild(stats.domElement);
    return stats;
  }

  function onResize() {
    const { innerWidth, innerHeight } = window;
    // camera.aspect = innerWidth / innerHeight;
    // camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  }
  window.addEventListener("resize", onResize, false);
  window.onload = init;
})();
