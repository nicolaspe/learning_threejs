// INITIALIZATION
var wid = window.innerWidth;
var hei = 400
var container = document.querySelector('#sketch');

var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, wid/hei, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls( camera, renderer.domElement );
renderer.setSize(wid, hei);
controls.update();

container.appendChild(renderer.domElement);

camera.position.z = 500;

// PLANE
var plane_geo = new THREE.PlaneGeometry(200, 200, 20, 20);
var plane_mat = new THREE.MeshBasicMaterial( { color: 0xAF99EF, wireframe: true } );
var plane = new THREE.Mesh(plane_geo, plane_mat);
plane.rotation.x = 0.785;
plane.rotation.y = 0.185;

scene.add(plane);

function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
}
animate();
