app.collections.Stream = Backbone.Collection.extend({

	url: function () {
		return app.urlRoot + app.event_id;
	},
		
	comparator: function (model) {
		return model.get('created_on');
	},

	parse: function (response) {
		// build models
		var models = [];
		_.each(response.text, function (item) {
			models.push(new app.models.Text(item));
		});
		// _.each(response.photos, function (item) {
		// 	models.push(new app.models.Image(item));
		// });
		return models;
	}

});
