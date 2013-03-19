require(['jquery', 'three.min'], function ($) {
	var camera = new THREE.PerspectiveCamera(70, 400 / 300, 1, 5000);
	camera.position.z = 8;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(400, 300);
	$('#container').append(renderer.domElement);
	
	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	var scene = new THREE.Scene();
	scene.add(pointLight);

	$.getJSON('api/search/anything', function (data) {
		for (var i = 0; i < data.length; i++) {
			var atom = data[i];
			var sphere = new THREE.Mesh(
				new THREE.SphereGeometry(0.3, 16, 16),
				new THREE.MeshLambertMaterial({ color: atom.Color })
			);
			sphere.position.x = atom.X;
			sphere.position.y = atom.Y;
			sphere.position.z = atom.Z;
			scene.add(sphere);
		}
		renderer.render(scene, camera);
	});
});