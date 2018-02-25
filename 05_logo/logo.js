// global threejs variables
let container, renderer, camera, scene;
let controls, loader;

let wid = 3000;
let hei = 1800;

window.addEventListener('load', onLoad);

function onLoad(){
	container = document.querySelector("#sketch");
	// THREE INITIALIZATION
	renderer = new THREE.WebGLRenderer({ });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(wid, hei);
	container.appendChild(renderer.domElement);
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x26073b );
	camera = new THREE.PerspectiveCamera(80, wid/hei, 0.1, 1000);
	camera.position.set(0, 0, 0);

	controls = new THREE.OrbitControls( camera );
	controls.update();
	loader = new THREE.TextureLoader();
	createEnvironment();

	window.addEventListener('resize', onWindowResize, true );

	animate();
}

// EVENTS
function onWindowResize(){
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(wid, hei);
	camera.aspect = wid/hei;
  camera.updateProjectionMatrix();
}



// ANIMATION
function animate() {
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}


// ENVIRONMENT
function createEnvironment(){

}
