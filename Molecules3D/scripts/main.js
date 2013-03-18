require(['jquery'], function ($) {
	$.getJSON('api/search/anything', function (data) {
		console.log(data);
	});
});