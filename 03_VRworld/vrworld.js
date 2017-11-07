/*
 * === INITIALIZATION ===
 */

var container = document.querySelector('#sketch');
var wid = window.innerWidth;
var hei = window.innerHeight;
var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, wid/hei, 0.1, 4000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(wid, hei);
container.appendChild(renderer.domElement);

// VR + CONTROLS
renderer.vr.enabled = true;
document.body.appendChild( WEBVR.getButton( renderer ) );

var controls = new THREE.VRControls( camera );
controls.update();

// RESIZE EVENT!
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
	wid = document.body.clientWidth;
	camera.aspect = wid/hei;
  camera.updateProjectionMatrix();
  renderer.setSize(wid, hei);
}



/*
 * === WORLD ===
 */
var loader = new THREE.TextureLoader();

var light = new THREE.PointLight( 0xda99fa, 1, 2000, 2 );
light.position.set(200, 0, 200);
scene.add(light);

var domeGeo = new THREE.SphereGeometry(500, 16, 16);
var domeTex = loader.load("eso0932a_sphere.jpg");
var domeMat = new THREE.MeshPhongMaterial({
	map: domeTex
});
var dome = new THREE.Mesh(domeGeo, domeMat);
dome.material.side = THREE.BackSide;
scene.add(dome);

let surfGeo = new THREE.Geometry();
for (var i = 0; i < 3; i++) {
	let posX =  Math.floor(Math.random(100));
	let posZ = -Math.floor(Math.random(100));

	surfGeo.vertices.push( new THREE.Vector3(posX, 0, posZ) );
}
surfGeo.faces.push( new THREE.Face3(0, 1, 2) );
let surfMat = new THREE.MeshBasicMaterial(0xffffff);
var surf = new THREE.Mesh(surfGeo, surfMat);
surf.material.side = THREE.DoubleSide;
scene.add(surf);



/*
 * === ANIMATION ===
 */

function update(){
	renderer.animate(animate);
}
function animate() {
	// requestAnimationFrame(animate);  // <- NOT ANYMORE!!
	controls.update();
	renderer.render(scene, camera);
}
update();
