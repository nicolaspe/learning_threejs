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
// camera.position.x = -622.31;
// camera.position.y =  107.65;
// camera.position.z =  -22.73;
// camera.rotation.x = -0.959;
// camera.rotation.y = -1.385;
// camera.rotation.z = -0.950;
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
