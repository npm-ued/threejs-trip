"use strict";
function init() {
    var _a;
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    // 创建一个场景
    var scene = new THREE.Scene();
    // 创建相机
    var camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    // 创建一个渲染
    var renderer = new THREE.WebGLRenderer();
    // renderer.setClearColor();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(innerWidth, innerHeight);
    // 轴(版本的方法是Axis，新版本改完Axes)
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);
    // 地平面
    var planeGeometry = new THREE.PlaneGeometry(60, 30);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
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
    (_a = document.getElementById("WebGL-output")) === null || _a === void 0 ? void 0 : _a.appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
window.onload = init;
