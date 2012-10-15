app.collections.Stream = Backbone.Collection.extend({

	calling: false,
	parameters: {
		cid: 0,
		limit: 10,
		sinceIdText: 0,
		sinceIdPhoto: 0
	},
	
	initialize: function () {
		this.update();
	},

	url: function () {
		return app.event.urlRoot + app.event.get('id');
	},
		
	comparator: function (model) {
		return model.get('created_on');
	},
	
	parse: function (response) {
		var self = this;
		// set event data
		app.event.set(response.event);
		// any nodes?
		if (response.text.length === 0 && response.photos.length === 0) {
			return;
		}
		// reset cache id
		this.parameters.cid = 0;
		// build models
		var models = [];
		var views = [];
		// Text
		_.each(response.text, function (item) {
			var model = new app.models.Text(item);
			var view = new app.views.Text({
				model: model
			});
			models.push(model);
			views.push(view);
			if (model.id > self.parameters.sinceIdText) {
				self.parameters.sinceIdText = model.id;
			}
		});
		// Photos
		_.each(response.photos, function (item) {
			var model = new app.models.Photo(item);
			var view = new app.views.Photo({
				model: model
			});
			models.push(model);
			views.push(view);
			if (model.id > self.parameters.sinceIdPhoto) {
				self.parameters.sinceIdPhoto = model.id;
			}
		});
		// sort views
		var views_sorted = _.sortBy(views, function (item) {
			return self.comparator(item.model);
		});
		_.each(views_sorted, function (view) {
			app.view.$el.prepend(view.el);
		});
		app.view.$el.masonry('reload');
		// feed collection
		return models;
	},

	update: function () {
		var self = this;
		if (this.calling) {
			return;
		}
		this.calling = true;
		this.fetch({
			add: true,
			cache: true,
			timeout: 10000,
			data: {
				limit: this.parameters.limit,
				sinceIdPhoto: this.parameters.sinceIdPhoto,
				sinceIdText: this.parameters.sinceIdText,
				cid: this.parameters.cid++
			},
			success: function () {
				self.calling = false;
			},
			error: function () {
				self.calling = false;
			}
		});
	},

	setInterval: function () {
		this.intervalID = window.setInterval(this.update, 4000);
	}
	
});
