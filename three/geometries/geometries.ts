(function(){
  let camera:THREE.PerspectiveCamera, scene:THREE.Scene, renderer:any;
  function init() {
    const { innerWidth, innerHeight } = window;
    // 创建一个场景
    scene = new THREE.Scene();
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
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);
    scene.add(plane);
    camera.position.set(-50, 30, 20);
    camera.lookAt(new THREE.Vector3(-10, 0, 0));

    // add subtle ambient lighting
    // const ambientLight = new THREE.AmbientLight(0x090909);
    // scene.add(ambientLight);

    // add spotlight for the shadows
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 40, 50);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // add geometries
    addGeometries(scene);

    function addGeometries(scene:THREE.Scene) {
      const geoms = [];
      // 圆柱缓冲几何体
      geoms.push(new THREE.CylinderBufferGeometry(1, 4, 4));
      // 立方体
      geoms.push(new THREE.BoxGeometry(3, 3, 4));
      // 球体
      geoms.push(new THREE.SphereGeometry(2));
      // 十二面几何体
      geoms.push(new THREE.IcosahedronBufferGeometry(4));
      // 顶点
      const ponits = [
        new THREE.Vector3(2, 2, 2),
        new THREE.Vector3(2, 2, -2),
        new THREE.Vector3(-2, 2, -2),
        new THREE.Vector3(-2, 2, 2),
        new THREE.Vector3(2, -2, 2),
        new THREE.Vector3(2, -2, -2),
        new THREE.Vector3(-2, -2, -2),
        new THREE.Vector3(-2, -2, 2)
      ];

      // geoms.push(new THREE.Geometry());
      const pts = [];
      const detail = 0.1;
      const radius = 3;
      for (let angle = 0.0; angle < Math.PI; angle += detail) {
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
      }
      // geoms.push(new THREE.LatheGeometry((pts as THREE.Vector3:[]), 12));

      // create a OctahedronGeometry（八面体）
      geoms.push(new THREE.OctahedronGeometry(3));

      // create a geometry based on a function
      // geoms.push(new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius3d, 20, 10));

      // 四面体
      geoms.push(new THREE.TetrahedronGeometry(3));
      // 圆环几何体
      geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));
      // 圆环扭结几何体
      geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));

      let j = 0;
      for (var i = 0; i < geoms.length; i++) {
        const cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
        const materials = [
          new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff}),
          new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
        ];

        const mesh = new THREE.Mesh(geoms[i], materials[i]);
        mesh.castShadow=true;
        mesh.position.x = -24 + ((i % 4) * 12);
        mesh.position.y = 4;
        mesh.position.z = -8 + (j * 12);
        if ((i + 1) % 4 == 0) {j++;}
        scene.add(mesh);
      }
    }


    // add the output of the renderer to the html element
    document.getElementById("WebGL-output")?.appendChild(renderer.domElement);
    
    

    const stats = initStats();
    function renderScence () {
      stats.update();
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
}());