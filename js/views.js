app.views.Event = Backbone.View.extend({

	el: '#gignal',
	
	initialize: function () {
		// Masonry options
		this.$el.masonry({
			itemSelector: '.gig-outerbox',
			isFitWidth: false,
			isAnimated: true,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});
	}

	// imagesLoaded: function () {
	// 	// hack to make photo box fit
	// 	this.$el.masonry({
	// 		itemSelector: '.gig-outerbox'
	// 	});
	// }

});


app.views.Text = Backbone.View.extend({

	events: {},
	
	className: 'gig-outerbox',

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(app.templates['text'](this.model.toJSON()));
		return this;
	}

});


app.views.Photo = Backbone.View.extend({

	events: {},

	className: 'gig-outerbox',

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(app.templates['image'](this.model.toJSON()));
		return this;
	}

});
