$(function () {
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
	camera.add(directionalLight);

	var molecule = new THREE.Object3D();

	var scene = new THREE.Scene();
	scene.add(ambientLight);
	scene.add(molecule);
	scene.add(camera);

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
			molecule.add(sphere);
		}

		var bonds = data.Bonds;
		for (var j = 0; j < bonds.length; j++) {
			var bond = bonds[j];
			var tube = new THREE.Mesh(
				new THREE.TubeGeometry(new THREE.SplineCurve3([new THREE.Vector3(bond.FromX, bond.FromY, bond.FromZ), new THREE.Vector3(bond.ToX, bond.ToY, bond.ToZ)]), 64, 0.03),
				new THREE.MeshPhongMaterial({ color: 0xF9F9F9, ambient: 0xF9F9F9 })
			);
			molecule.add(tube);
		}
	});

	var controls = new THREE.TrackballControls(camera, renderer.domElement);
	
	jsFrames.registerAnimation(function () {
		controls.update();

		var time = Date.now() * 0.0004;

		molecule.rotation.x = time;
		molecule.rotation.y = time * 0.7;

		renderer.render(scene, camera);
	});
	jsFrames.start();
});