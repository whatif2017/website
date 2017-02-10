var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 1, 100);
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement); 
var parallaxX = 0,
    parallaxY = 0,
    rotationX = 0,
    rotationY = 0;
var geometry = new THREE.BoxGeometry(1, 10, 1);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.set(0, 0, 10);

var render = function() {
    requestAnimationFrame(render);
    camera.position.x = parallaxX;
    camera.position.y = parallaxY;
    cube.rotation.x = rotationX;
    cube.rotation.y = rotationY;
    camera.lookAt(cube.position);

    renderer.render(scene, camera);
}

render();




document.onmousemove = mousePosition;

function mousePosition(e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    var sceneX = - (window.innerWidth / 2 - mouseX);
    var sceneY = window.innerHeight / 2 - mouseY;

    parallaxX = sceneX / 100;
    parallaxY = sceneY / 75;

    rotationX = sceneX / 1000;
    rotationY = - (sceneY / 1000);
}
