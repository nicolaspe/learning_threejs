// CANVAS VARIABLES
var container = document.querySelector('#sketch');
var wid = document.body.clientWidth;
var hei = 400;

// INITIALIZATION
var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, wid/hei, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(wid, hei);
camera.position.z = 500;
container.appendChild(renderer.domElement);

// CONTROLS
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();


// PLANE
var plane_geo = new THREE.PlaneGeometry(200, 200, 20, 20);
var plane_mat = new THREE.MeshBasicMaterial( { color: 0xAF99EF, wireframe: true } );
var plane = new THREE.Mesh(plane_geo, plane_mat);
plane.rotation.x = 0.785;
plane.rotation.y = 0.185;
scene.add(plane);

// TEXT CONTAINERS
var l_fov = document.querySelector("#label_fov");
var l_px = document.querySelector("#label_px");
var l_py = document.querySelector("#label_py");
var l_pz = document.querySelector("#label_pz");
var l_rx = document.querySelector("#label_rx");
var l_ry = document.querySelector("#label_ry");
var l_rz = document.querySelector("#label_rz");

function animate() {
	requestAnimationFrame(animate);

	// TEXT MANIPULATION
	l_fov.textContent = camera.fov;
	l_px.textContent = decimalDigits(camera.position.x,2);
	l_py.textContent = decimalDigits(camera.position.y,2);
	l_pz.textContent = decimalDigits(camera.position.z,2);
	l_rx.textContent = decimalDigits(camera.rotation.x,2);
	l_ry.textContent = decimalDigits(camera.rotation.y,2);
	l_rz.textContent = decimalDigits(camera.rotation.z,2);

	renderer.render(scene, camera);
}
animate();

// function to truncate decimals
function decimalDigits(num, digits){
	return (Math.floor(num * Math.pow(10, digits)))/Math.pow(10, digits);
}

// RESIZE EVENT!
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
	wid = document.body.clientWidth;
	hei = 400;
	camera.aspect = wid/hei;
  camera.updateProjectionMatrix();
  renderer.setSize(wid, hei);
}
