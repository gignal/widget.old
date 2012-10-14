app.Router = Backbone.Router.extend({

	routes: {
		'event/:id': 'event'
	},

	event: function (id) {
		app.event_id = id;
		app.stream.fetch({
			add: false,
			dataType: 'json',
			cache: true,
			timeout: 10000
		});
	}

});
