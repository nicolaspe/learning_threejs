// CANVAS VARIABLES
var wid = document.body.clientWidth;
var hei = 500;

var container = document.querySelector('#sketch');
var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, wid/hei, 0.1, 10000);
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

var timeKeep = 0;
var loader = new THREE.TextureLoader();


// LIGHTS
var lighty = new THREE.PointLight(0xE0D5DD);
lighty.position.y = 100;
scene.add(lighty);

var lighta = new THREE.AmbientLight(0x505050);


// SPHERE
let s_geo = new THREE.SphereGeometry(50, 16, 16);
let s_mat = new THREE.MeshPhongMaterial( { color:0x7015ad } );
var sphere = new THREE.Mesh(s_geo, s_mat);
sphere.position.set(-250, 0, 0);
scene.add(sphere);


// SURFACE
var surfGeo = new THREE.Geometry();
var rowLen = 8
// create vertices
for (let i = 0; i < 4; i++) {
	for (let j = 0; j < rowLen; j++) {
		let posX = Math.random()*60 -30;
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
		let newFaceB = new THREE.Face3( pointB, pointD, pointC );

		surfGeo.faces.push( newFaceA );
		surfGeo.faces.push( newFaceB );
	}
}
surfGeo.computeVertexNormals();
surfGeo.computeFaceNormals();

var surfMat = new THREE.MeshPhongMaterial({
	color: 0xff50e0,
	// map: loader.load("stoneTexture.jpg"),
	emissive: 0x300011,
	// wireframe: true
});
var surf = new THREE.Mesh(surfGeo, surfMat);
surf.position.x = 250;
surf.material.side = THREE.DoubleSide;
scene.add(surf);



// ANIMATION
function animate() {
	requestAnimationFrame(animate);
	surf.rotation.y = Math.sin(timeKeep);

	lighty.position.z = 250 *Math.sin(timeKeep);
	lighty.position.y = 250 *Math.cos(timeKeep) -40;
	timeKeep += 0.02;

	renderer.render(scene, camera);
}
animate();
