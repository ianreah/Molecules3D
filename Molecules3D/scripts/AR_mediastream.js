﻿$(function () {
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    function hasGetUserMedia() {
        return !!(navigator.getUserMedia && window.URL);
    }

    if (hasGetUserMedia()) {
        var $inputStream = $('#inputStream');
        navigator.getUserMedia({ 'video': true }, function (stream) {
            $inputStream[0].src = window.URL.createObjectURL(stream);
        });
    } else {
        alert("Couldn't access webcam.");
    }
});