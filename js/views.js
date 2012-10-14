app.views.Text = Backbone.View.extend({

	events: {},
	
	className: 'gig-outerbox',

	initialize: function () {
		// this.model.on('change', this.render, this);
		// this.model.on('destroy', this.remove, this);
		this.render();
	},

	render: function () {
		$(this.el).html(app.templates['text.mustache'](this.model.toJSON()));
		$(app.el).append(this.el).masonry('reload');
		return this;
	}

});


app.views.Image = Backbone.View.extend({

	events: {},

	className: 'gig-outerbox',

	initialize: function () {
		this.render();
	},

	render: function () {
		$(this.el).html(app.templates['image.mustache'](this.model.toJSON()));
		$(app.el).append(this.el).masonry('reload');
		return this;
	}

});
