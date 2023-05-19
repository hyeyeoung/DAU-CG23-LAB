var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
// 원근 투영법 카메라 설정
// var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1 ,4.5);
// 평행 투영법 카메라 설정\
var camera = new THREE.OrthographicCamera(-3,3,3,-3,-10,4);

function initRenderer(){
    camera.position.z = 4;
    renderer.setClearColor("#000000");
    renderer.setSize(500,500);
    document.body.appendChild(renderer.domElement);
}

function initGeometry(){
    // 3d 데이터를 다룰 때, 기준 축을 생성
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    var material0 = new THREE.MeshBasicMaterial({ color: "#fed136" });
    var material1 = new THREE.MeshBasicMaterial({ color: "#ff0000"});
    material0.wireframe = true;
    material1.wireframe = true;

    var geometryCube = new THREE.BoxGeometry(1,1,1);
    var cube0 = new THREE.Mesh(geometryCube, material0);
    var cube1 = new THREE.Mesh(geometryCube, material1);

    cube0.translateX(2.0);
    cube0.translateZ(-0.5);
    cube0.translateY(1.0);

    cube1.translateX(2.0);
    cube1.translateZ(-4.0);

    scene.add(cube0);
    scene.add(cube1);
}

function init(){
    initRenderer();
    initGeometry();
}

var render = function (){
    renderer.render(scene,camera);
};

init();
render();