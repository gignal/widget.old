app.Router = Backbone.Router.extend({

	routes: {
		'event/:uuid': 'event',
		':uuid': 'event'
	},

	event: function (uuid) {
		app.event = new app.models.Event({
			uuid: uuid
		});
		app.stream = new app.collections.Stream();
	}

});
