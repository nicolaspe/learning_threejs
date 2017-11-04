// CANVAS VARIABLES
var container = document.querySelector('#sketch');
var wid = document.body.clientWidth;
var hei = 500;

// INITIALIZATION
var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, wid/hei, 0.1, 10000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(wid, hei);
camera.position.z = 400;
container.appendChild(renderer.domElement);

// CONTROLS
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

// RESIZE EVENT!
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
	wid = document.body.clientWidth;
	camera.aspect = wid/hei;
  camera.updateProjectionMatrix();
  renderer.setSize(wid, hei);
}


// LIGHT
var light = new THREE.PointLight( 0xffffff, 1, 6000, 2 );
light.position.set(1000, 0, 0);
scene.add(light);


// SKYDOME
// http://www.bzfusion.net/skymaps/sky_photo6.jpg
// https://www.eso.org/public/usa/images/eso0932a/
var skyGeo = new THREE.SphereGeometry(2000, 25, 25);
var loader = new THREE.TextureLoader();
var texture = loader.load("eso0932a_sphere.jpg");
var skyMat = new THREE.MeshPhongMaterial({
	map: texture,
});
var skyDome = new THREE.Mesh(skyGeo, skyMat);
skyDome.material.side = THREE.BackSide;
scene.add(skyDome);


// PLANE
var plane_geo = new THREE.PlaneGeometry(200, 200, 20, 20);
var plane_mat = new THREE.MeshBasicMaterial( { color: 0xAF99EF, wireframe: true } );
var plane = new THREE.Mesh(plane_geo, plane_mat);
plane.rotation.x = 3.1416/2;
plane.position.y = -100;
scene.add(plane);


// TEXT CONTAINERS
var l_fov = document.querySelector("#label_fov");
var l_px = document.querySelector("#label_px");
var l_py = document.querySelector("#label_py");
var l_pz = document.querySelector("#label_pz");
var l_rx = document.querySelector("#label_rx");
var l_ry = document.querySelector("#label_ry");
var l_rz = document.querySelector("#label_rz");

// function to truncate decimals
function decimalDigits(num, digits){
	return (Math.floor(num * Math.pow(10, digits)))/Math.pow(10, digits);
}


// SLIDER VARIABLES
var fov_slider = document.querySelector("#fov_sl");
fov_slider.addEventListener("change", function() {
	camera.fov = +fov_slider.value;
	camera.updateProjectionMatrix();
});




// ANIMATION
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
