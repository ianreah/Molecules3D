require(['jquery', 'three.min'], function ($) {
	var width = window.innerWidth;
	var height = window.innerHeight;
	
	var camera = new THREE.PerspectiveCamera(70, width / height, 1, 500);
	camera.position.z = 15;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	$('#container').append(renderer.domElement);
	
	var ambientLight = new THREE.AmbientLight(0x555555);
	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(0.3, 0.5, 2);

	var scene = new THREE.Scene();
	scene.add(ambientLight);
	scene.add(directionalLight);

	$.getJSON('api/search/anything', function (data) {
		var atoms = data.Atoms;
		for (var i = 0; i < atoms.length; i++) {
			var atom = atoms[i];
			var sphere = new THREE.Mesh(
				new THREE.SphereGeometry(0.3, 16, 16),
				new THREE.MeshPhongMaterial({ color: atom.Color, ambient: atom.Color, shininess: 60 })
			);
			sphere.position.x = atom.X;
			sphere.position.y = atom.Y;
			sphere.position.z = atom.Z;
			scene.add(sphere);
		}
		renderer.render(scene, camera);
	});
});