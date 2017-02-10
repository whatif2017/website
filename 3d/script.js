var w = window.innerWidth,
    h = window.innerHeight,
    halfWidth = w / 2,
    halfHeight = h / 2;
var scene = new THREE.Scene();
var aspect = w / h;
var camera = new THREE.PerspectiveCamera(75, aspect, 1, 100);
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
var radiantX = 0,
    radiantY = 0,
    radius = 5;
var geometry = new THREE.BoxGeometry(3, 5, 3);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.set(0, 0, 5);

var render = function() {
    requestAnimationFrame(render);
    camera.position.x = Math.sin(radiantX) * radius;
    camera.position.y = Math.sin(radiantY) * radius;
    camera.position.z = (Math.cos(radiantX) + Math.cos(radiantY)) + radius;

    camera.lookAt(cube.position);
    renderer.render(scene, camera);
}

render();




document.onmousemove = mousePosition;
//document.onresize = windowResize;

function windowResize(e) {
    w = window.innerWidth;
    h = window.innerHeight;
    halfWidth = w / 2;
    halfHeight = h / 2;
}

function mousePosition(e) {
    var mouseX = e.pageX - halfWidth;
    var mouseY = - (e.pageY - halfHeight);

    radiantX = mouseX / halfWidth * Math.PI / 2;
    radiantY = mouseY / halfHeight * Math.PI / 2;

}
