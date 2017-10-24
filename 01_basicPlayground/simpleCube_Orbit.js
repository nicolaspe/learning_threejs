var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

var controls = new THREE.OrbitControls( camera, renderer.domElement );
// controls.target.set( 0, 2, 0 );
controls.update();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial( {color: 0x7015ad, wireframe: true} );
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 50;

function animate() {
	requestAnimationFrame(animate);

	// cube.rotation.x += 0.1;
	// cube.rotation.y += 0.1;

	renderer.render(scene, camera);
}
animate();
