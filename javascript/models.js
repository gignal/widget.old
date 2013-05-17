app.models.Event = Backbone.Model.extend({

	//urlRoot: 'http://api.gignal.com/event/api/eventId/', // CloudFront
	//urlRoot: 'http://gignal.com/event/api/eventId/', // direct on production server
	urlRoot: 'http://dev.gignal.com/event/api/uuid/', // direct on dev server
//	urlRoot: 'http://gignalnew.local/event/api/uuid/',//localhost
	idAttribute: 'uuid'
});

app.models.Stream = Backbone.Model.extend({
	idAttribute: 'stream_id'
});

  
