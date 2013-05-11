$(function () {
    var debugaxis = function (axisLength, object) {

        function createAxis(p1, p2, color, object) {
            var line, lineGeometry = new THREE.Geometry(),
            lineMat = new THREE.LineBasicMaterial({ color: color, lineWidth: 1 });
            lineGeometry.vertices.push(p1, p2);
            line = new THREE.Line(lineGeometry, lineMat);
            object.add(line);
        }

        createAxis(new THREE.Vector3(-axisLength, 0, 0), new THREE.Vector3(axisLength, 0, 0), 0xFF0000, object);
        createAxis(new THREE.Vector3(0, -axisLength, 0), new THREE.Vector3(0, axisLength, 0), 0x00FF00, object);
        createAxis(new THREE.Vector3(0, 0, -axisLength), new THREE.Vector3(0, 0, axisLength), 0x0000FF, object);
    };

    DEBUG = false;
    if (DEBUG) {
        $(".debug").show();
    } else {
        $(".debug").hide();
    }

    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || function (type, success, error) { error(); };

    var width = 320;
    var height = 240;

    // Set up the three.js scene
    var overlayCamera = new THREE.Camera();

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width * 2, height * 2);
    $('#result').append(renderer.domElement);

    var ambientLight = new THREE.AmbientLight(0x555555);
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0.3, 0.5, 2);
    overlayCamera.add(directionalLight);

    var molecule = new THREE.Molecule();
    if (DEBUG) {
        debugaxis(5, molecule);
    }

    var overlayScene = new THREE.Scene();
    overlayScene.add(ambientLight);
    overlayScene.add(molecule);
    overlayScene.add(overlayCamera);

    molecule.loadAsync('/MolFiles/caffeine.json', function () {
        molecule.matrixAutoUpdate = false;

        $('#loading').hide();
    });

    var input;
    var inputStream = $('#inputStream');
    var inputImage = $('#inputImage');
    navigator.getUserMedia({ 'video': true }, function (stream) {
	    input = inputStream[0];
        input.src = window.URL.createObjectURL(stream);
        jsFrames.start();
    }, function() {
    	alert("Couldn't access webcam. Fallback to static image");
    	input = inputImage[0];
    	inputStream.hide();
	    inputImage.show();
    	jsFrames.start();
    });

    var inputCapture = $('#inputCapture')[0];
	
	// Set up the scene for the input image
    var inputCamera = new THREE.Camera();
    var inputScene = new THREE.Scene();
    var inputTexture = new THREE.Texture(inputCapture);
    var inputPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 0), new THREE.MeshBasicMaterial({ map: inputTexture }));
    inputPlane.material.depthTest = false;
    inputPlane.material.depthWrite = false;
    inputScene.add(inputPlane);
    inputScene.add(inputCamera);

    // This JSARToolkit object reads image data from the input canvas
    var imageReader = new NyARRgbRaster_Canvas2D(inputCapture);

    // The parameters are used to set the detector's camera parameters
    // (...will need to copy the threejs camera details into this but
    // for now I'll just start with the width & height!)
    var parameters = new FLARParam(width, height);

    // The marker detector
    // (The 2nd parameter could be marker width? May need to investigate this!)
    var detector = new FLARMultiIdMarkerDetector(parameters, 10);

    // For tracking video, in continue mode the detector will track markers
    // across multiple frames.
    detector.setContinueMode(true);

    overlayCamera.setJsArMatrix(parameters);

    var resultMatrix = new NyARTransMatResult();

    jsFrames.registerAnimation(function () {
        // Capture the current frame from the inputStream
        // (then we need to tell the image reader that the input has changed.)
        inputCapture.getContext('2d').drawImage(input, 0, 0, width, height);
        inputCapture.changed = true;
	    inputTexture.needsUpdate = true;

        // Use the imageReader to detect the markers
        // (The 2nd parameter is a threshold. May need to investigate this also!)
	    if (detector.detectMarkerLite(imageReader, 128) > 0) {
	        detector.getTransformMatrix(0, resultMatrix);
	        molecule.setJsArMatrix(resultMatrix);
	        molecule.matrixWorldNeedsUpdate = true;
	    }
	    
        // Render the three.js scene
        renderer.autoClear = false;
        renderer.clear();
        renderer.render(inputScene, inputCamera);
        renderer.render(overlayScene, overlayCamera);
    });
});