THREE.Molecule = function () {
};

THREE.Molecule.prototype = new THREE.Object3D();

THREE.Molecule.prototype.loadAsync = function (jsonUrl, loadedCallback) {
	// TODO: Reset the object first
	var me = this;

	$.getJSON(jsonUrl, function (data) {
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
			me.add(sphere);
		}

		var bonds = data.Bonds;
		for (var j = 0; j < bonds.length; j++) {
			var bond = bonds[j];
			var tube = new THREE.Mesh(
				new THREE.TubeGeometry(new THREE.SplineCurve3([new THREE.Vector3(bond.FromX, bond.FromY, bond.FromZ), new THREE.Vector3(bond.ToX, bond.ToY, bond.ToZ)]), 64, 0.03),
				new THREE.MeshPhongMaterial({ color: 0xF9F9F9, ambient: 0xF9F9F9 })
			);
			me.add(tube);
		}

		loadedCallback();
	});
};