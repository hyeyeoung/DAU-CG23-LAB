// GUI를 만드는 방법
// 옆에 뜨는 창 -> 구글에서 만든 것.
// runtime의 값을 수정하는 방법
// 기존엔 console이나 등등의 번거로운 방법
// gui 슬라이드 바로 만들어서 편하게 값을 바꾼다.
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var torus;
//Lights

// ambientLigtht => 최소한의 빛
// ~Helper 빛을 보는데 도움을 줌
// const spotLight = new THREE.SpotLight(0xffffff, 0.5, 30, Math.PI * 0.1, 0.1, 1);
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);

// R
const spotLight_Red = new THREE.SpotLight(0xff0000, 0.5, 30, Math.PI * 0.1, 0.1, 1);
const spotLight_RedHelper = new THREE.SpotLightHelper(spotLight_Red);
// G
const spotLight_Green = new THREE.SpotLight(0x00ff00, 0.5, 30, Math.PI * 0.1, 0.1, 1);
const spotLight_GreenHelper = new THREE.SpotLightHelper(spotLight_Green);
// B
const spotLight_Blue = new THREE.SpotLight(0x0000ff, 0.5, 30, Math.PI * 0.1, 0.1, 1);
const spotLight_BlueHelper = new THREE.SpotLightHelper(spotLight_Blue);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
// const pointLight = new THREE.PointLight(0xff9000, 0.9, 15, 3);
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);

// gui 추가 하는 방법
// html에서 스크립트 include
var gui = new dat.GUI();

controls.enableDamping = true; // 부드러운 감속 효과 활성화
// pointLight.visible=false;

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

function initLight() {
  // spotLight.position.set(0, 0, 10);
  // spotLight.castShadow = true;
  // scene.add(spotLight);
  // scene.add(spotLightHelper);


  // R
  spotLight_Red.position.set(-1,0,10);
  var RedTarget = new THREE.Object3D();
  RedTarget.position.set(-1,-1,0);
  spotLight_Red.target = RedTarget;
  scene.add(spotLight_Red);
  scene.add(spotLight_RedHelper);
  // B
  spotLight_Blue.position.set(0,1,10);
  var BlueTarget = new THREE.Object3D();
  BlueTarget.position.set(0,1,0);
  spotLight_Blue.target = BlueTarget;
  scene.add(spotLight_Blue);
  scene.add(spotLight_BlueHelper);
  // G
  spotLight_Green.position.set(1,0,10);
  var GreenTarget = new THREE.Object3D();
  GreenTarget.position.set(1,-1,0);
  spotLight_Green.target = GreenTarget;
  scene.add(spotLight_Green);
  scene.add(spotLight_GreenHelper)
  
  scene.add(ambientLight);
  // pointLight.position.set(-2, -2, 2);
  // scene.add(pointLight);
  // scene.add(pointLightHelper);
}

function initGeometry() {
  const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
  scene.add(axesHelper);

  var material0 = new THREE.MeshLambertMaterial({ color: "#ffffff", side: THREE.DoubleSide });
  var geometryPlane = new THREE.PlaneGeometry(10, 10);
  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateY(5.0);
  plane.translateZ(5.0);
  plane.rotateX(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateX(5.0);
  plane.translateZ(5.0);
  plane.rotateY(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateY(-5.0);
  plane.translateZ(5.0);
  plane.rotateX(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateX(-5.0);
  plane.translateZ(5.0);
  plane.rotateY(Math.PI * 0.5);
  scene.add(plane);



  var material1 = new THREE.MeshPhongMaterial({ color: "#ff0000" });
  var geoCube = new THREE.BoxGeometry();
  var cube = new THREE.Mesh(geoCube, material1);
  cube.castShadow = true;
  cube.translateX(-1.0);
  cube.translateY(-1.0);
  cube.translateZ(0.5);
  scene.add(cube);

  var material2 = new THREE.MeshNormalMaterial();
  var geoTorus = new THREE.TorusGeometry(0.5, 0.2);
  torus = new THREE.Mesh(geoTorus, material2);
  torus.castShadow = true;
  torus.translateX(1.0);
  torus.translateY(1.0);
  torus.translateZ(0.5);
  scene.add(torus);

  var material3 = new THREE.MeshStandardMaterial({ color: "#fed136" });
  var geoCone = new THREE.ConeGeometry(0.5, 1);
  var cone = new THREE.Mesh(geoCone, material3);
  cone.translateX(1.0);
  cone.translateY(-1.0);
  cone.translateZ(0.5);
  cone.rotateX(Math.PI * 0.5);
  scene.add(cone);

  var material4 = new THREE.MeshPhysicalMaterial({ color: "#3333cc" });
  var geoCone = new THREE.SphereGeometry(0.5);
  var cone = new THREE.Mesh(geoCone, material4);
  cone.translateX(-1.0);
  cone.translateY(1.0);
  cone.translateZ(0.5);
  cone.rotateX(Math.PI * 0.5);
  scene.add(cone);
}

function initRenderer() {
  camera.position.z = 10;
  controls.update();
  renderer.setClearColor("#000000");
  renderer.setSize(500, 500);
  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);
}

// gui.add를 이용
// gui.add(object, property, [min], [max], [step])
// object = 수정하고자 하는 변수
// property = 수정하고자하는 변수의 값
// 최소 허용치[min] 최대허용치[max], stepsize[step]
// 어떤 자료형인지는 넘겨주지 않는다. 자동으로 인식해서 만들어줌
// bool-> checkbox / integer -> slid / 등이 자동으로 생성해줌

function initGUI() {
  // three js 내부적으로 존재하는 ambientLight와 "visible".name으로 이름 지정
  // visible이 뭐지 -> boolean 값
  // abmientLight -> 최소한의 빛
  gui.add(ambientLight, "visible").name("Ambient Light");
  // gui.add(spotLight, "visible").name("Spot Light");
  gui.add(spotLight_Red,"visible").name("Spot Light RED");
  gui.add(spotLight_Green,"visible").name("Spot Light GREEN");
  gui.add(spotLight_Blue,"visible").name("Spot Light BLUE");

  // gui.add(pointLight, "visible").name("Point Light");
  // gui.add(ambientLight, "intensity", 0, 1.0); // 얘는 실수 intensity는 강도

  // 교수님은 학원 다닐때 자전거를 타고 다녔다...
  // addFolder -> 펼치기 기능 추가됨
  // guiadd는 항상 보인다. spotadd는 spotFoler에 종속됨
  // const spotFolder = gui.addFolder('SpotLight')
  // spotFolder.add(spotLight.position, 'x', -10.0, 10.0,.01);
  // spotFolder.add(spotLight.position, 'y', -10.0, 10.0,0.1);
  // spotFolder.add(spotLight.position, 'z', -10, 10);
  // spotFolder.add(spotLight, 'angle', 0, Math.PI * 0.2);
  const spotFoler_RED = gui.addFolder('SpotLight RED')
  console.log(spotLight_Red)
  spotFoler_RED.add(spotLight_Red.position, 'x', -10.0, 10.0, .01);
  spotFoler_RED.add(spotLight_Red.position, 'y', -10.0, 10.0, 0.1);
  spotFoler_RED.add(spotLight_Red.position, 'z', -10.0, 10.0);
  spotFoler_RED.add(spotLight_Red, 'angle',0, Math.PI*0.5 );

  gui.add(spotLight_Blue,'angle', 0, Math.PI * 0.5).name("Spot Light BLUE");

  // const pointFolder = gui.addFolder('PointLight')
  // pointFolder.add(pointLight.position, 'x', -10, 10);
  // pointFolder.add(pointLight.position, 'y', -10, 10);
  // pointFolder.add(pointLight.position, 'z', -10, 10);
  // pointFolder.add(pointLight, 'distance', 0, 100);
  // pointFolder.add(pointLight, 'decay', 0, 10);

  const torusFolder = gui.addFolder('torus')
  torusFolder.add(torus.position, 'x', -10, 10);
  torusFolder.add(torus.position, 'y', -10, 10);
  torusFolder.add(torus.position, 'z', -10, 10);
}

function init() {
  initLight();
  initGeometry();
  initRenderer();
  initGUI();
}

// Render Loop
var render = function () {
  requestAnimationFrame(render);
  controls.update();

  // spotLightHelper.update();
  spotLight_RedHelper.update();
  spotLight_GreenHelper.update();
  spotLight_BlueHelper.update();
  // pointLightHelper.update();

  // if (spotLight.visible != spotLightHelper.visible)
  //   spotLightHelper.visible = spotLight.visible;
  
  // if (pointLight.visible != pointLightHelper.visible)
  //   pointLightHelper.visible = pointLight.visible;

  renderer.render(scene, camera);

};

init();
render();