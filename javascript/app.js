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
			if (text == null) return;
			var showChar = 200;
			var re_links = /(\b(https?):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig;
			text = text.replace(re_links, '<a href="$1" target="_top" class="nodelink">link</a>');
			// if (text.length > showChar) {
			// 	text = text.substr(0, showChar).replace(/\s+$/, '') + '…';
			// }
			return text
		});
			
		app.view = new app.views.Event();
		new app.Router();
		Backbone.history.start();
		
	});
})(jQuery);


// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-183817-27']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
