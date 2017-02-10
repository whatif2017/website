var gn = new GyroNorm();

var w = window.innerWidth,
    h = window.innerHeight,
    halfWidth = w / 2,
    halfHeight = h / 2,
    aspect = w / h,
    radiantX = 0,
    radiantY = 0,
    radius = 5;

var scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, aspect, 1, 50),
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    }),
    lights = [],
    ambientLight = new THREE.AmbientLight(0x000000);
lights[0] = new THREE.PointLight(0xFFFFFF, 1, 0);
lights[1] = new THREE.PointLight(0xFFFFFF, 1, 0);
lights[2] = new THREE.PointLight(0xFFFFFF, 1, 0);

var mesh,
    meshPosition = new THREE.Vector3(0, 0, 0),
    material = new THREE.MeshPhongMaterial({
        color: 0xF5866D,
        emissive: 0x333333,
        specular: 0xAAAAAA,
        shininess: 65,
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
    requestAnimationFrame(render);
    camera.position.x = Math.sin(radiantX) * radius;
    camera.position.y = Math.sin(radiantY) * radius;
    camera.position.z = (Math.cos(radiantX) + Math.cos(radiantY)) + radius;

    camera.lookAt(meshPosition);
    renderer.render(scene, camera);
}

gn.init().then(function() {
    gn.start(function(data) {
        // Process:
        // data.do.alpha    ( deviceorientation event alpha value )
        // data.do.beta     ( deviceorientation event beta value )
        // data.do.gamma    ( deviceorientation event gamma value )
        // data.do.absolute ( deviceorientation event absolute value )

        // data.dm.x        ( devicemotion event acceleration x value )
        // data.dm.y        ( devicemotion event acceleration y value )
        // data.dm.z        ( devicemotion event acceleration z value )

        // data.dm.gx       ( devicemotion event accelerationIncludingGravity x value )
        // data.dm.gy       ( devicemotion event accelerationIncludingGravity y value )
        // data.dm.gz       ( devicemotion event accelerationIncludingGravity z value )

        // data.dm.alpha    ( devicemotion event rotationRate alpha value )
        // data.dm.beta     ( devicemotion event rotationRate beta value )
        // data.dm.gamma    ( devicemotion event rotationRate gamma value )
    });
}).catch(function(e) {
    // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
});
