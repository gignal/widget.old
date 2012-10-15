app.Router = Backbone.Router.extend({

	routes: {
		'event/:id': 'event'
	},

	event: function (id) {
		app.event = new app.models.Event({
			id: id
		});
		app.stream = new app.collections.Stream();
	}

});
