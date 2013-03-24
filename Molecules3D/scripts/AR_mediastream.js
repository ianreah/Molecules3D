$(function () {
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    function hasGetUserMedia() {
        return !!(navigator.getUserMedia && window.URL);
    }

    if (hasGetUserMedia()) {
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
        var parameters = new FLARParam(320, 240);

        // The marker detector
        // (The 2nd parameter could be marker width? May need to investigate this!)
        var detector = new FLARMultiIdMarkerDetector(parameters, 120);

        // For tracking video, in continue mode the detector will track markers
        // across multiple frames.
        detector.setContinueMode(true);

        jsFrames.registerAnimation(function () {
            // Capture the current frame from the inputStream
            // (then we need to tell the image reader that the input has changed.)
            inputCapture.getContext('2d').drawImage(inputStream, 0, 0, 320, 240);
            inputCapture.changed = true;

            // Use the imageReader to detect the markers
            // (The 2nd parameter is a threshold. May need to investigate this also!)
            var markers = detector.detectMarkerLite(imageReader, 128);
            if (markers > 0) {
                console.log("Detected!");
            }
        });
    } else {
        alert("Couldn't access webcam.");
    }
});