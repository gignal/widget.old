app.collections.Stream = Backbone.Collection.extend({

	calling: false,
	parameters: {
		cid: 0,
		limit: 20,
		sinceTime: 0,
	},
	
	initialize: function () {
		this.update();
		this.setIntervalUpdate();
	},

	url: function () {
		return app.event.urlRoot + app.event.get('uuid') + '?callback=?';
	},
		
//	comparator: function (model) {
//		return model.get('created_on');
//	},
	
	parse: function (response) {
		console.log(response);
		var self = this;
		// set event data
		app.event.set(response.event);
		// build models
		var models = [];
		
		// Stream
		_.each(response.stream, function (item) {
			var model = self.get(item.stream_id);
			// already handled?
			if (typeof model !== 'undefined') {
				return;
			}
			// create
			model = new app.models.Stream(item);
			models.push(model);
			
			if(item.type=='text')
			{
				var view = new app.views.TextBox({
					model: model
				});
			}
			
			else if(item.type=='photo')
			{
				var view = new app.views.PhotoBox({
					model: model
				});
			}
			
			// insert in app view
			app.view.$el.prepend(view.render().el).isotope('reloadItems').isotope({
				sortBy: 'original-order'
			});
			
			// is this the latest?
			if (model.get('created_on') > self.parameters.sinceTime) {
				self.parameters.sinceTime = model.get('created_on');
			}
			
		});
		
		// proceed?
		if (models.length === 0) {
			return [];
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
			remove: false,
			cache: true,
			timeout: 15000,
			jsonpCallback: 'callme',
			data: {
				limit: this.parameters.limit,
				sinceTime: this.parameters.sinceTime,
				cid: this.parameters.cid += 1
			},
			success: function () {
				self.calling = false;
			},
			error: function (c, response) {
				var data = {
					tags: self.parameters
				};
	
				data.tags.uuid = app.event.get('uuid');
				Raven.captureMessage(response.statusText, data);
				if (response.statusText === 'timeout') {
					self.calling = false;
				} else {
					location.reload(true);
				}
			}
		});
	},

	setIntervalUpdate: function () {
		this.intervalID = window.setInterval(function(){
			app.stream.update();
		}, 4500);
	}
	
});
