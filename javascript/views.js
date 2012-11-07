app.views.Event = Backbone.View.extend({

	el: '#gignal',
	
	initialize: function () {
		// Masonry options
		this.$el.masonry({
			itemSelector: '.gig-outerbox',
			isAnimated: true,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});
	},
	
	refresh: function () {
		var self = this;
		// imagesLoaded plugin (https://github.com/desandro/imagesloaded)
		this.$el.imagesLoaded(function(){
			self.$el.masonry();
		});
	}

});


app.views.Text = Backbone.View.extend({

	className: 'gig-outerbox',

	render: function () {
		this.$el.html(app.templates['text'](this.model.toJSON()));
		return this;
	}

});


app.views.Photo = Backbone.View.extend({

	className: 'gig-outerbox',

	render: function () {
		this.$el.html(app.templates['image'](this.model.toJSON()));
		return this;
	}

});
