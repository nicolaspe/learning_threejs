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
camera.rotation.x = -.2;
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
let plX = -50;
let plY =  100;
let plZ =  0;
var p_light = new THREE.PointLight( 0xf0aaff, 0.5, 2000, 2 );
p_light.position.set(plX, plY, plZ);
scene.add(p_light);

let ps_geo = new THREE.SphereGeometry(8, 8, 8);
let ps_mat = new THREE.MeshBasicMaterial( {color: 0xf0aaff} );
var p_sphere = new THREE.Mesh(ps_geo, ps_mat);
p_sphere.position.set(plX, plY, plZ);
scene.add(p_sphere);

var d_light = new THREE.DirectionalLight( 0x10d510, 0.5 );
// scene.add(d_light);

var a_light = new THREE.AmbientLight( 0x000 ); // soft white light
// scene.add( a_light );


// SKYDOME
// http://www.bzfusion.net/skymaps/sky_photo6.jpg
// https://www.eso.org/public/usa/images/eso0932a/
var skyGeo = new THREE.SphereGeometry(500, 25, 25);
var loader = new THREE.TextureLoader();
var texture = loader.load("eso0932a_sphere.jpg");
var skyMat = new THREE.MeshPhongMaterial({
	map: texture,
});
var skyDome = new THREE.Mesh(skyGeo, skyMat);
skyDome.material.side = THREE.BackSide;
// scene.add(skyDome);


// PLANE
var plane_geo = new THREE.PlaneGeometry(200, 200, 20, 20);
var plane_mat = new THREE.MeshBasicMaterial( { color: 0xAF99EF, wireframe: true } );
var plane = new THREE.Mesh(plane_geo, plane_mat);
plane.rotation.x = 3.1416/2;
plane.position.y = -100;
scene.add(plane);


// SURFACE
var surfGeo = new THREE.Geometry();
var rowLen = 8
// create vertices
for (let i = 0; i < 4; i++) {
	for (let j = 0; j < rowLen; j++) {
		let posX = 250 + Math.random()*60 -30;
		let posY = 100*i -200;
		let posZ = (j/rowLen)*200 - 100;

		surfGeo.vertices.push( new THREE.Vector3(posX, posY, posZ) );
	}
}
// create faces
let numCols = surfGeo.vertices.length/rowLen;
for (let i = 0; i < numCols-1; i++) {
	for (let j = 0; j < rowLen-1; j++) {
		let pointA = (i*rowLen) + j;
		let pointB = (i*rowLen) + j+1;
		let pointC = (i*rowLen) + j+rowLen;
		let pointD = (i*rowLen) + j+rowLen+1;

		let newFaceA = new THREE.Face3( pointA, pointB, pointC );
		let newFaceB = new THREE.Face3( pointC, pointD, pointB );

		surfGeo.faces.push( newFaceA );
		surfGeo.faces.push( newFaceB );
	}
}

var surfMat = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	emissive: 0x300011,
	// wireframe: true
});
var surf = new THREE.Mesh(surfGeo, surfMat);
surf.material.side = THREE.DoubleSide;
scene.add(surf);



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

	// surface rotation
	// surf.rotation.x += 0.005;
	// surf.rotation.y += 0.005;
	// surf.rotation.z += 0.005;
	surf.material.needsUpdate = true;

	renderer.render(scene, camera);
}
animate();
