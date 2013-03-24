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
        jsFrames.registerAnimation(function () {
            // Capture the current frame from the inputStream
            inputCapture.getContext('2d').drawImage(inputStream, 0, 0, 320, 240);
        });
    } else {
        alert("Couldn't access webcam.");
    }
});