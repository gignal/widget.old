//jQuery.noConflict();

(function($){ 
	$(function(){

		'use strict';

		// Handlebars helpers
		Handlebars.registerHelper('profilelink', function (service, username, user_id) {
			var profilelink = 'http://' + service + '.com/';
			profilelink += (username) ? username : user_id;
			return profilelink;
		});
		Handlebars.registerHelper('linkify', function (text) {
			var re_links = /(\b(https?):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig;
			return text.replace(re_links, '<a href="$1" target="_top" class="nodelink">link</a>');
		});
			
		app.view = new app.views.Event();
		new app.Router();
		Backbone.history.start();
		
	});
})(jQuery);