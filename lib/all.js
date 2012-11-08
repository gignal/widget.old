var app = {
	collections: {},
	models: {},
	views: {}
};

//app.Backbone = Backbone.noConflict();
app.models.Event = Backbone.Model.extend({

	urlRoot: 'http://api.gignal.com/event/api/eventId/', // CloudFront
	//urlRoot: 'http://gignal.com/event/api/eventId/', // direct

	idAttribute: 'event_id'
	
});


app.models.Text = Backbone.Model.extend({
	idAttribute: 'text_stream_id'
});

	
app.models.Photo = Backbone.Model.extend({
	idAttribute: 'photo_stream_id'
});
app.collections.Stream = Backbone.Collection.extend({

	calling: false,
	parameters: {
		cid: 0,
		limit: 20,
		sinceTimeText: 0,
		sinceTimePhoto: 0
	},
	
	initialize: function () {
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
			success: function (collection, response, options) {
				console.log(collection, response, options);
				self.calling = false;
			},
			error: function (collection, xhr, options) {
				console.log(collection, xhr, options);
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
app.views.Event = Backbone.View.extend({

	el: '#gignal-stream',
	
	columnWidth: 250,
	isotoptions: {
		itemSelector: '.gignal-outerbox',
		layoutMode: 'masonry',
		sortBy: 'savedOn',
		sortAscending: false,
		getSortData: {
			savedOn: function (el) {
				return el.data('saved_on');
			}
		}
	},
	
	initialize: function () {
		// set Isotope masonry columnWidth
		var mainWidth = this.$el.innerWidth();
		var columnsAsInt = parseInt(mainWidth / this.columnWidth);
		this.columnWidth = this.columnWidth + (parseInt((mainWidth - (columnsAsInt * this.columnWidth)) / columnsAsInt) - 1);
		// init Isotope
		this.$el.isotope(this.isotoptions);
	},
	
	refresh: function () {
		var self = this;
		this.$el.imagesLoaded(function(){
			self.$el.isotope(self.isotoptions);
		});		
	}
	
});


app.views.Text = Backbone.View.extend({

	tagName: 'p',
	className: 'gignal-text',

	re_links: /(\b(https?):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig,

	render: function () {
		var text = this.model.get('text');
		text = text.replace(this.re_links, '<a href="$1" target="_top">link</a>');
		this.$el.html(text);
		return this;
	}

});


app.views.TextBox = Backbone.View.extend({

	tagName: 'blockquote',
	className: 'gignal-outerbox',

	initialize: function () {
		// create elements
		this.text = new app.views.Text({
			model: this.model
		}).render();
		this.footer = new app.views.Footer({
			model: this.model
		}).render();
	},
	
	render: function () {
		this.$el.data('saved_on', this.model.get('saved_on'));
		this.$el.css('width', app.view.columnWidth);
		this.$el.html(this.text.el);
		this.$el.append(this.footer.el);
		return this;
	}
	
});


app.views.PhotoBox = Backbone.View.extend({

	tagName: 'blockquote',
	className: 'gignal-outerbox gignal-imagebox',

	initialize: function () {
		// create elements
		this.footer = new app.views.Footer({
			model: this.model
		}).render();
	},

	render: function () {
		this.$el.data('saved_on', this.model.get('saved_on'));
		this.$el.css('width', app.view.columnWidth);
		this.$el.css('background-image', 'url(' + this.model.get('thumb_photo') + ')');
		this.$el.append(this.footer.el);
		return this;
	}

});


app.views.Footer = Backbone.View.extend({

	tagName: 'div',
	className: 'gignal-box-footer',
	
	initialize: function () {
		this.serviceImg = (new Backbone.View).make('img', {
			src: 'images/' + this.model.get('service') + '.png',
			alt: 'Service'
		});
		this.avatar = (new Backbone.View).make('img', {
			src: this.model.get('user_image'),
			'class': 'gignal-avatar',
			alt: 'Avatar'
		});
		this.serviceProfileLink = (new Backbone.View).make('a', {
			href: 'http://' + this.model.get('service') + '.com/' + this.model.get('username')
		});
	},

	render: function () {
		$(this.serviceProfileLink).append(this.avatar);
		$(this.serviceProfileLink).append(this.model.get('name'));
		this.$el.html(this.serviceImg);
		this.$el.append(this.serviceProfileLink);
		return this;
	}
	
});
app.Router = Backbone.Router.extend({

	routes: {
		'event/:id': 'event',
		':id': 'event'
	},

	event: function (id) {
		app.event = new app.models.Event({
			id: id
		});
		app.stream = new app.collections.Stream();
	}

});
//jQuery.noConflict();

jQuery(window).load(function ($) {
	
	app.view = new app.views.Event();
	new app.Router();
	Backbone.history.start({
		pushState: false,
		root: '/widget/'
	});

});

app.event = new app.models.Event({
	id: 33
});
app.stream = new app.collections.Stream();

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