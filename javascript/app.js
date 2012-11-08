//jQuery.noConflict();

jQuery(window).load(function ($) {
	
	alert(1);

	app.view = new app.views.Event();
	new app.Router();
	Backbone.history.start({
		pushState: false,
		root: '/widget/'
	});
	
	alert(2);

});

/*
// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-183817-27']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
*/