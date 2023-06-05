var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000); //큐브가 100개일 때 이 부분도 수정하면 됨(둘 중 하나)

// 이론
// 3d는 3가지로 나눌 수 있다.
// mesh, voxel, point cloud 
// 1. point cloud.. (점 구름) -> 점들이 3차원 공간에 떠 다닌다. 
// 점 끼리의 상관관계는 없다. 그저 모여있을 뿐
// 3d 스캐너로 공간의 정보를 얻는다 == point cloud(원리는 레이저를 쐈을 때 튕겨나오는 것을 이용)
// 원시 데이터
// 2. voxel
// volumetric
// point cloud를 임의의 최소 voxel로 설정. -> 큐브를 만들 수 있다.
// 의료 영상에서 사용.(CT, MRI)
// mesh-면들로 데이터를 구성
// 삼각 메쉬를 가장 많이 사용(Traingle Mesh)
// 면들의 집합 == 내부는 비어져있다. 면들은 바운더리일 뿐..
// 저장 포맷; stl, obj...
// separate Triangles(Triangle Soup)
// indexed Triangle set;
// ----------------------------------
// 실습
// Scene 그래프
// Three js에서 mesh는 삼각mesh
// Geometry; 기하
// Material; 재질- 시각적인 정보로 추론하고 있음. 
// ㄴ빛이 반사되는 정도? 
// 1. MeshBasicMatrerial; 단색으로 표현
// 2. MeshLambertMatrerial; 빛에 의한 명암만 표현
// 3. MeshPhongMeterial; 빛에 의한 명암/ 반짝임 표현(금속 등)

function initLight() {
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(10,10,10);
    pointLight.castShadow = true;
    scene.add(pointLight);
}

function initRenderer() {
    camera.position.z = 15;
    renderer.setClearColor("#000000");
    renderer.setSize(500, 500);
    // Append Renderer to DOM
    document.body.appendChild(renderer.domElement);
}
function initGeometry() {
    const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
    scene.add(axesHelper);

    // var material0 = new THREE.MeshLambertMaterial({ color: "#FF00FF" });
    // 이렇게 만든 상자의 면의 갯수는 삼각형을 기준으로 생각해야함(기말)
    var geometryCube = new THREE.BoxGeometry(1, 1, 1);
    // var geometryCube = new THREE.SphereGeometry(1);
    // var geometryCube = new THREE.ConeGeometry(1);

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var material0 = new THREE.MeshLambertMaterial({ color: "#FF00FF" });
            material0.color.setHex(Math.random()*0xffffff)
            if(j % 2 == 0){
                material0.wireframe = true
            }
            var cube = new THREE.Mesh(geometryCube, material0);
            // var cube = new THREE.Mesh(geometryCube,);
            //Translation
            cube.translateX(-10.0 + 2.0 * i); // 10*10으로 할거면 시작점을 낮춰야한다.
            cube.translateY(-10.0 + 2.0 * j);
            // Add cube to Scene
            scene.add(cube);
        }
    }
}

function init() {
    initLight();
    initRenderer();
    initGeometry();
}

// Render Loop
var render = function () {
    requestAnimationFrame(render);
    // 큐브 랜덤으로 돌리기
    for (var i = 1; i < scene.children.length; i++) {
            scene.children[i].rotation.x += 0.01 * Math.random();            
    }
    renderer.render(scene, camera);

};

init();     
render();