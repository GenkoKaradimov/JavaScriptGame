// inital set up
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = MainCamera();

AddCube();

control = new THREE.OrbitControls(camera, renderer.domElement);

ResizeListenerSetUp();

Floor();

var animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //console.log(camera.position.x);
};

animate();

function AddCube() {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

function MainCamera() {
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    //camera.lookAt(new THREE.Vector3(0, -1, 0));
    return camera;
}

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function ResizeListenerSetUp() {
    resize();
    window.addEventListener("resize", resize);
}

function Floor() {
    let tex = new THREE.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/4/4c/Grass_Texture.png")
    tex.anisotropy = 32;
    tex.repeat.set(100, 100);
    tex.wrapT = THREE.RepeatWrapping;
    tex.wrapS = THREE.RepeatWrapping;
    var floor = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 10, 10),
        new THREE.MeshBasicMaterial({ map: tex })
    );
    scene.add(floor);
    floor.rotation.x = Math.PI / 2;
}
