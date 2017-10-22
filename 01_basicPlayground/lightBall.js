// scene size
const WIDTH  = window.innerWidth;
const HEIGHT = window.innerHeight;
// camera attributes
const VIEW_ANGLE = 45;
const ASPECT = WIDTH/HEIGHT;
const NEAR = 0.1;
const FAR  = 1000;
// environment
var timeKeep = 0;

// initialize
var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
camera.position.z = 50;
document.body.appendChild(renderer.domElement);

// == SPHERE ==
var sphere_geo = new THREE.SphereGeometry(50, 16, 16);
var sphere_mat = new THREE.MeshLambertMaterial( { color:0x7015ad } );
// var sphere_mat = new THREE.MeshBasicMaterial( { color:0x7015ad } );
var sphere = new THREE.Mesh(sphere_geo, sphere_mat);
// locate and add to the scene
sphere.position.z = -200;
sphere.position.x = -40;
scene.add(sphere);

// == LIGHTS! ==
var lighty = new THREE.PointLight(0xE0D5DD);
// var lighty = new THREE.PointLight(0xFF0000);
// var lighty = new THREE.PointLight(0xFFFFFF);
lighty.position.y = 150;
scene.add(lighty);

function animate() {
	requestAnimationFrame(animate);

	lighty.position.z = 250 *Math.sin(timeKeep);
	lighty.position.x = 250 *Math.cos(timeKeep) -40;
	timeKeep += 0.02;

	renderer.render(scene, camera);
}
animate();
