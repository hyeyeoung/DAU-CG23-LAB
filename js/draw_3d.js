// Create an empty scene
var scene = new THREE.Scene();
// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;
// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({ antialias: true });
// Configure renderer clear color
renderer.setClearColor("#000000");
// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);
// Append Renderer to DOM
document.body.appendChild(renderer.domElement);
//---------------------------------------------------------
var material = new THREE.MeshBasicMaterial({ color: "#fed136" });
material.wireframe = true;

var geometryCube = new THREE.BoxGeometry(1, 1, 1);
var cube = new THREE.Mesh(geometryCube, material);

var geometryTorus = new THREE.TorusGeometry(1.0, 0.5, 16, 100);
var torus = new THREE.Mesh(geometryTorus, material);

// Add cube to Scene
//  scene.add(cube);
scene.add(torus);
// Render Loop
var render = function () {
  requestAnimationFrame(render);
  // Render the scene
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
};

render();