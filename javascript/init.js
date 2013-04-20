// https://app.getsentry.com/gignal/gignal-dev/docs/javascript/
Raven.config('https://2cff6e18dab041ea8bd003bfdb4c5d88@app.getsentry.com/7575').install();
// the rest is in collections.js app.collections.Stream update error handler


jQuery(document).ajaxError(function(event, jqxhr, settings, exception) {
	Raven.captureException(exception);
});


var app = {
	collections: {},
	models: {},
	views: {}
};

//app.Backbone = Backbone.noConflict();
