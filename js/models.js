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
