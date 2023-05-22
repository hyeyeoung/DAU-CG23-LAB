var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var index = 0;

controls.enableDamping = false; // 부드러운 감속 효과 활성화

function loadOBJ(url) {
  var loader = new THREE.OBJLoader();
  // instantiate a loader
  // load a resource
  loader.load(
    // resource URL
    url,
    // called when resource is loaded
    function (object) {
      scene.add(object);
    },
    // called when loading is in progresses
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
      console.log('An error happened');
    }
  );
}
// 광원 설정. 
// light 소스를 회전
function initLight() {
  var pointLight0 = new THREE.PointLight(0xffffff);
  pointLight0.position.set(10, 0, 10);
  console.log(scene)
  scene.add(pointLight0);
  let lightHelper=new THREE.PointLightHelper(pointLight0);
  scene.add(lightHelper);
}

function initGeometry() {
  const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
  scene.add(axesHelper);
  // loadOBJ("../models/kitten.obj");
  loadOBJ("../models/gargoyle.obj");

}


function initRenderer() {
  camera.position.z = 1;
  controls.update();
  renderer.setClearColor("#ffffff");
  renderer.setSize(500, 500);
  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);
}

function init() {
  initLight();
  initGeometry();
  initRenderer();
}

// Render Loop
var render = function () {
  requestAnimationFrame(render);
  // y축을 중심으로 모델 회전
  // scene.children[3].rotation.y +=0.01;
  // 카메라 회전
  // controls.autoRotate = true; 
  // 광원 회전
  //  scene.children[0].position.set(
  //   100*Math.cos(Math.PI* index/100.0), 0,
  //   100*Math.sin(Math.PI* index/100.0)
  // )
  index++;
  controls.update();
  renderer.render(scene, camera);
};

init();
render();