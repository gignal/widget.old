jQuery(function($){

	'use strict';
	
	$.support.cors = true;
	
	app.el = '#gignal';
	app.urlRoot = 'http://api.gignal.com/event/api/eventId/'; // CloudFront
	//app.urlRoot = 'http://gignal.com/event/api/eventId/'; // direct

	// Masonry options
	$(app.el).masonry({
		itemSelector: '.gig-outerbox',
		isFitWidth: false,
		isAnimated: true,
		animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false
		}
	});

	app.stream = new app.collections.Stream();

	new app.Router();
	Backbone.history.start({
		pushState: false
	});
	
	//window.setInterval(fetch, delay, true);

});