app.collections.Stream = Backbone.Collection.extend({

	calling: false,
	parameters: {
		cid: 0,
		limit: 20,
		sinceTimeText: 0,
		sinceTimePhoto: 0
	},
	
	initialize: function () {
		alert(3);
		this.update();
		this.setIntervalUpdate();
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
		// build models
		var models = [];
		// Text
		_.each(response.text, function (item) {
			var model = self.get(item.text_stream_id);
			// already handled?
			if (typeof model !== 'undefined') {
				return;
			}
			// create
			model = new app.models.Text(item);
			models.push(model);
			var view = new app.views.TextBox({
				model: model
			});
			// insert in app view
			app.view.$el.prepend(view.render().el).isotope('reloadItems').isotope({
				sortBy: 'original-order'
			});
			// is this the latest?
			if (model.get('saved_on') > self.parameters.sinceTimeText) {
				self.parameters.sinceTimeText = model.get('saved_on');
			}
		});
		// Photos
		_.each(response.photos, function (item) {
			var model = self.get(item.photo_stream_id);
			// already handled?
			if (typeof model !== 'undefined') {
				return;
			}
			// create
			model = new app.models.Photo(item);
			models.push(model);
			var view = new app.views.PhotoBox({
				model: model
			});
			// insert in app view
			app.view.$el.prepend(view.render().el).isotope('reloadItems').isotope({
				sortBy: 'original-order'
			});
			// is this the latest?
			if (model.get('saved_on') > self.parameters.sinceTimePhoto) {
				self.parameters.sinceTimePhoto = model.get('saved_on');
			}
		});
		// proceed?
		if (models.length === 0) {
			return []
		}
		// refresh when photos have been loaded
		app.view.refresh();
		// reset cache id
		this.parameters.cid = 0;
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

	setIntervalUpdate: function () {
		this.intervalID = window.setInterval(function(){
			app.stream.update();
		}, 4500);
	}
	
});
