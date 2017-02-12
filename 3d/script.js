var w = window.innerWidth,
    h = window.innerHeight,
    halfWidth = w / 2,
    halfHeight = h / 2,
    aspect = w / h,
    radiantX = 0,
    radiantY = 0,
    radius = 5,
    orientX = 0,
    orientY = 0,
    orientZ = 0;

var scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, aspect, 1, 50),
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    }),
    lights = [],
    ambientLight = new THREE.AmbientLight(0x000000);
lights[0] = new THREE.PointLight(0xF5866D, 1, 0);
lights[1] = new THREE.PointLight(0xF5866D, 1, 0);
lights[2] = new THREE.PointLight(0xF5866D, 1, 0);

var mesh,
    meshPosition = new THREE.Vector3(0, 0, 0),
    material = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        emissive: 0x0,
        shininess: 100,
        shading: THREE.SmoothShading
    });

renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
document.addEventListener('mousemove', mousePosition, false);
window.addEventListener('resize', onWindowResize, false);

//initCube();
initMesh();
initLights();
render();

function initCube() {
    var geometry = new THREE.BoxGeometry(3, 5, 3);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

function initMesh() {
    var loader = new THREE.JSONLoader();
    loader.load('marmelab.json', function(geometry) {
        mesh = new THREE.Mesh(geometry, material);
        mesh.translation = geometry.center();
        scene.add(mesh);
        geometry.computeVertexNormals();
    });
}

function initLights() {
    lights[0].position.set(0, 100, -150);
    lights[1].position.set(-100, 100, 100);
    lights[2].position.set(-100, 0, -100);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
    scene.add(ambientLight);
}

function onWindowResize() {
    w = window.innerWidth;
    h = window.innerHeight;
    halfWidth = w / 2;
    halfHeight = h / 2;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

function mousePosition(e) {
    var mouseX = e.pageX - halfWidth;
    var mouseY = -(e.pageY - halfHeight);

    radiantX = mouseX / halfWidth * Math.PI / 2;
    radiantY = mouseY / halfHeight * Math.PI / 2;
}

function render() {
    gyro.getOrientation();
    requestAnimationFrame(render);
    if (gyro.hasFeature('devicemotion')) {
        camera.position.x = Math.sin(orientZ) * radius;
        camera.position.y = Math.sin(orientY) * radius;
        camera.position.z = (Math.cos(orientZ) + Math.cos(orientY)) + radius;
    } else {
        camera.position.x = Math.sin(radiantX) * radius;
        camera.position.y = Math.sin(radiantY) * radius;
        camera.position.z = (Math.cos(radiantX) + Math.cos(radiantY)) + radius;
    }

    camera.lookAt(meshPosition);
    renderer.render(scene, camera);
}

gyro.startTracking(function(o) {
    // o.x, o.y, o.z for accelerometer
    // o.alpha, o.beta, o.gamma for gyro
    orientY = o.beta / 90 * Math.PI;
    orientZ = o.gamma / 90 * Math.PI;
});
