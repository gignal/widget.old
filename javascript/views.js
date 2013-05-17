app.views.Event = Backbone.View.extend({

	el: '#gignal-stream',
	
	columnWidth: 250,
	isotoptions: {
		itemSelector: '.gignal-outerbox',
		layoutMode: 'masonry',
		sortAscending: true,
	},
	
	initialize: function () {
		// set Isotope masonry columnWidth
		var radix = 10;
		var mainWidth = this.$el.innerWidth();
		var columnsAsInt = parseInt(mainWidth / this.columnWidth, radix);
		this.columnWidth = this.columnWidth + (parseInt((mainWidth - (columnsAsInt * this.columnWidth)) / columnsAsInt, radix) - 1);
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
		this.$el.html(this.text.$el);
		this.$el.append(this.footer.$el);
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
		this.$el.append(this.footer.$el);
		return this;
	}

});


app.views.Footer = Backbone.View.extend({

	tagName: 'div',
	className: 'gignal-box-footer',
	
	initialize: function () {
		this.serviceImg = new Backbone.View({
			tagName: 'img',
			attributes: {
				src: 'images/' + this.model.get('service') + '.png',
				alt: 'Service'
			}
		});
		this.avatar = new Backbone.View({
			tagName: 'img',
			className: 'gignal-avatar',
			attributes: {
				src: this.model.get('user_image'),
				alt: 'Avatar'
			}
		});
		this.serviceProfileLink = new Backbone.View({
			tagName: 'a',
			attributes: {
				href: 'http://' + this.model.get('service') + '.com/' + this.model.get('username')
			}
		});
	},

	render: function () {
		$(this.serviceProfileLink.$el).append(this.avatar.$el);
		$(this.serviceProfileLink.$el).append(this.model.get('name'));
		this.$el.html(this.serviceImg.$el);
		this.$el.append(this.serviceProfileLink.$el);
		return this;
	}
	
});
