﻿$(function () {
    DEBUG = true;
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    function hasGetUserMedia() {
        return !!(navigator.getUserMedia && window.URL);
    }

    if (hasGetUserMedia()) {
        var width = 320;
        var height = 240;

        // Set up the three.js scene
        var camera = new THREE.PerspectiveCamera(70, width / height, 1, 500);
        camera.position.z = 15;

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        $('#model').append(renderer.domElement);

        var ambientLight = new THREE.AmbientLight(0x555555);
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0.3, 0.5, 2);
        camera.add(directionalLight);

        var molecule = new THREE.Object3D();

        var scene = new THREE.Scene();
        scene.add(ambientLight);
        scene.add(molecule);
        scene.add(camera);

        $.getJSON('api/search', function (data) {
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

        var inputStream = $('#inputStream')[0];
        navigator.getUserMedia({ 'video': true }, function (stream) {
            inputStream.src = window.URL.createObjectURL(stream);
            jsFrames.start();
        });

        var inputCapture = $('#inputCapture')[0];

        // This JSARToolkit object reads image data from the input canvas
        var imageReader = new NyARRgbRaster_Canvas2D(inputCapture);

        // The parameters are used to set the detector's camera parameters
        // (...will need to copy the threejs camera details into this but
        // for now I'll just start with the width & height!)
        var parameters = new FLARParam(width, height);

        // The marker detector
        // (The 2nd parameter could be marker width? May need to investigate this!)
        var detector = new FLARMultiIdMarkerDetector(parameters, 120);

        // For tracking video, in continue mode the detector will track markers
        // across multiple frames.
        detector.setContinueMode(true);

        jsFrames.registerAnimation(function () {
            // Capture the current frame from the inputStream
            // (then we need to tell the image reader that the input has changed.)
            inputCapture.getContext('2d').drawImage(inputStream, 0, 0, width, height);
            inputCapture.changed = true;

            // Use the imageReader to detect the markers
            // (The 2nd parameter is a threshold. May need to investigate this also!)
            var markers = detector.detectMarkerLite(imageReader, 128);

            // Render the three.js scene
            var time = Date.now() * 0.0004;
            molecule.rotation.x = time;
            molecule.rotation.y = time * 0.7;
            renderer.render(scene, camera);
        });
    } else {
        alert("Couldn't access webcam.");
    }
});