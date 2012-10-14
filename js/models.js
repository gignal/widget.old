app.models.Text = Backbone.Model.extend({
		
	idAttribute: 'text_stream_id',

	initialize: function () {
		new app.views.Text({
			model: this
		});
	}
	
});
	
app.models.Image = Backbone.Model.extend({
		
	idAttribute: 'photo_stream_id',
	
	initialize: function () {
		new app.views.Image({
			model: this
		});
	}
	
});
