module('User', {
	setup: function() {
		server = sinon.fakeServer.create();
		jsonPOST = {
			username:"testy",
			first_name:"Tester",
			last_name:"Testa", 
			display_name:"TeStY",
			events:[],
			date_created:"2013-07-31 23:48:32", 
			id:"b5428ebe-fa3b-11e2-ad1a-bc764e04579c"
		};
		jsonGET = { 
			object : {
				username:"testy",
				first_name:"Tester",
				last_name:"Testa", 
				display_name:"TeStY",
				events:[],
				date_created:"2013-07-31 23:48:32", 
				id:"b5428ebe-fa3b-11e2-ad1a-bc764e04579c"
			}
		};
		jsonPUT = {
			username:"testy",
			first_name:"TiTi",
			last_name:"TaTa", 
			display_name:"TeStY",
			events:[],
			date_created:"2013-07-31 23:48:32", 
			id:"b5428ebe-fa3b-11e2-ad1a-bc764e04579c"
		};
		server.respondWith(
			"POST", "http://api.jibely.com/users",
			[201, { "Content-Type":"application/json" }, JSON.stringify(jsonPOST)]
		);
		server.respondWith(
			"GET", "http://api.jibely.com/users/b5428ebe-fa3b-11e2-ad1a-bc764e04579c",
			[200, { "Content-Type":"application/json" }, JSON.stringify(jsonGET)]
		);
		server.respondWith(
			"GET", "http://api.jibely.com/users/testy",
			[200, { "Content-Type":"application/json" }, JSON.stringify(jsonGET)]
		);
		server.respondWith(
			"DELETE", "http://api.jibely.com/users/b5428ebe-fa3b-11e2-ad1a-bc764e04579c", 
			[204, { "Content-Type":"application/json" }, JSON.stringify(jsonGET)]
		);
		server.respondWith(
			"PUT", "http://api.jibely.com/users/b5428ebe-fa3b-11e2-ad1a-bc764e04579c", 
			[200, { "Content-Type":"application/json" }, JSON.stringify(jsonPUT)]
		);
	},
	teardown: function() {
		server.restore();
	}
});

test( "Initialization Empty", function() {
	user = new User();
	equal(user.isDirty, true, "Dirty flag [user.isDirty] is true");
	equal(user.key, undefined, "Key [user.key] is undefined");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(), undefined, "Id [user.id()] is undefined");
	equal(user.date(), undefined, "Date [user.date()] is undefined");
	equal(user.userName(), undefined, "User name [user.userName()] is undefined");
	equal(user.firstName(), undefined, "First name [user.firstName()] is undefined");
	equal(user.lastName(), undefined, "Last name [user.lastName()] is undefined");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Initialization w/ Values", function() {
	user = new User({username:"Testy", first_name:"Testy", last_name:"Testy"});
	equal(user.isDirty, true, "Dirty flag [user.isDirty] is true");
	equal(user.key, undefined, "Key [user.key] is undefined");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(), undefined, "Id [user.id()] is undefined");
	equal(user.date(), undefined, "Date [user.date()] is undefined");
	equal(user.userName(), "Testy", "User name [user.userName()] is Testy");
	equal(user.firstName(), "Testy", "First name [user.firstName()] is Testy");
	equal(user.lastName(), "Testy", "Last name [user.lastName()] is Testy");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Save", function() {
	user = new User({username:"TeStY", first_name:"Tester", last_name:"Testa"});
	user.save();
	server.respond();
	equal(user.isDirty, false, "Dirty flag [user.isDirty] is false");
	equal(user.key, "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Key [user.key] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(),  "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Id [user.id()] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.date(), "2013-07-31 23:48:32", "Date [user.date()] is 2013-07-31 23:48:32");
	equal(user.userName(), "TeStY", "User name [user.userName()] is TeStY");
	equal(user.firstName(), "Tester", "First name [user.firstName()] is Tester");
	equal(user.lastName(), "Testa", "Last name [user.lastName()] is Testa");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Update", function() {
	user = new User();
	user.load("b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	server.respond();
	user.firstName("TiTi");
	user.lastName("TaTa");
	equal(user.isDirty, true, "Before update, dirty flag [user.isDirty] is true");
	user.save();
	server.respond();
	equal(user.isDirty, false, "After update, dirty flag [user.isDirty] is false");
	equal(user.key, "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Key [user.key] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(),  "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Id [user.id()] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.date(), "2013-07-31 23:48:32", "Date [user.date()] is 2013-07-31 23:48:32");
	equal(user.userName(), "TeStY", "User name [user.userName()] is TeStY");
	equal(user.firstName(), "TiTi", "First name [user.firstName()] is TiTi");
	equal(user.lastName(), "TaTa", "Last name [user.lastName()] is TaTa");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Load By Id", function() {
	user = new User();
	user.load("b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	server.respond();
	equal(user.isDirty, false, "Dirty flag [user.isDirty] is false");
	equal(user.key, "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Key [user.key] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(),  "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Id [user.id()] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.date(), "2013-07-31 23:48:32", "Date [user.date()] is 2013-07-31 23:48:32");
	equal(user.userName(), "TeStY", "User name [user.userName()] is TeStY");
	equal(user.firstName(), "Tester", "First name [user.firstName()] is Tester");
	equal(user.lastName(), "Testa", "Last name [user.lastName()] is Testa");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Load By Username", function() {
	user = new User();
	user.load("testy");
	server.respond();
	equal(user.isDirty, false, "Dirty flag [user.isDirty] is false");
	equal(user.key, "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Key [user.key] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(),  "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Id [user.id()] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.date(), "2013-07-31 23:48:32", "Date [user.date()] is 2013-07-31 23:48:32");
	equal(user.userName(), "TeStY", "User name [user.userName()] is TeStY");
	equal(user.firstName(), "Tester", "First name [user.firstName()] is Tester");
	equal(user.lastName(), "Testa", "Last name [user.lastName()] is Testa");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Remove", function() {
	user = new User();
	user.load("b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	server.respond();
	user.remove();
	server.respond();
	equal(user.isDirty, true, "Dirty flag [user.isDirty] is true");
	equal(user.key, undefined, "Key [user.key] is undefined");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(), undefined, "Id [user.id()] is undefined");
	equal(user.date(), undefined, "Date [user.date()] is undefined");
	equal(user.userName(), undefined, "User name [user.userName()] is undefined");
	equal(user.firstName(), undefined, "First name [user.firstName()] is undefined");
	equal(user.lastName(), undefined, "Last name [user.lastName()] is undefined");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

module('Event', {
	setup: function() {
		server = sinon.fakeServer.create();
		jsonPOST = { 
			parent_id:null,  
			is_template:false,  
			name:"Testy Event",  
			owner: { 
				username:"testy",
				first_name:"Tester",
				last_name:"Testa", 
				display_name:"TeStY",
				date_created:"2013-07-31 23:48:32", 
				id:"b5428ebe-fa3b-11e2-ad1a-bc764e04579c"
			},  
			date_created:"2013-08-09 11:51:01",  
			description:"Testy's event!!!",  
			id:"f6956832-00e9-11e3-ad68-bc764e04579c",  
			owner_id:"b5428ebe-fa3b-11e2-ad1a-bc764e04579c"
		};		
		jsonGET = { 
			object: { 
				parent_id:null,  
				is_template:false,  
				name:"Testy Event",  
				owner: { 
					username:"testy",
					first_name:"Tester",
					last_name:"Testa", 
					display_name:"TeStY",
					date_created:"2013-07-31 23:48:32", 
					id:"b5428ebe-fa3b-11e2-ad1a-bc764e04579c"
				},  
				date_created:"2013-08-09 11:51:01",  
				description:"Testy's event!!!",  
				id:"f6956832-00e9-11e3-ad68-bc764e04579c",  
				owner_id:"b5428ebe-fa3b-11e2-ad1a-bc764e04579c"
			}
		};
		jsonPUT =  { 
			parent_id:null,  
			is_template:false,  
			name:"Not Testy Event",  
			owner: { 
				username:"not testy",
				first_name:"Not Tester",
				last_name:"Not Testa", 
				display_name:"NoT TeStY",
				date_created:"2013-07-31 23:48:32", 
				id:"b5428ebe-fa3b-11e2-ad1a-bc764e04579a"
			},  
			date_created:"2013-08-09 11:51:01",  
			description:"Not Testy's event!!!",  
			id:"f6956832-00e9-11e3-ad68-bc764e04579c",  
			owner_id:"b5428ebe-fa3b-11e2-ad1a-bc764e04579a"
		};	
		server.respondWith(
			"POST", "http://api.jibely.com/events",
			[201, { "Content-Type":"application/json" }, JSON.stringify(jsonPOST)]
		);
		server.respondWith(
			"GET", "http://api.jibely.com/events/f6956832-00e9-11e3-ad68-bc764e04579c",
			[200, { "Content-Type":"application/json" }, JSON.stringify(jsonGET)]
		);
		server.respondWith(
			"DELETE", "http://api.jibely.com/events/f6956832-00e9-11e3-ad68-bc764e04579c",
			[204, { "Content-Type":"application/json" }, JSON.stringify(jsonGET)]
		);
		server.respondWith(
			"PUT", "http://api.jibely.com/events/f6956832-00e9-11e3-ad68-bc764e04579c", 
			[200, { "Content-Type":"application/json" }, JSON.stringify(jsonPUT)]
		);
	},
	teardown: function() {
		server.restore();
	}
});

test( "Initialization Empty", function() {
	event = new Event();
	equal(event.isDirty, true, "Dirty flag [event.isDirty] is true");
	equal(event.url, "/events", "Url [event.url] is /events");
	equal(event.rootUrl, "http://api.jibely.com", "Root url [event.rootUrl] is http://api.jibely.com");
	equal(event.parentId(), undefined, "parent id [event.parentId()] is undefind");
	equal(event.ownerId(), undefined, "owner id [event.ownerId()] is undefind");
	equal(event.isTemplate(), undefined, "is template id [event.isTemplate()] is undefined");
	equal(event.id(), undefined, "id [event.id()] is undefined");
	equal(event.date(), undefined, "date [event.date()] is undefined");
	equal(event.name(), undefined, "name [event.name()] is undefined");
	equal(event.description(), undefined, "description [event.description()] is undefined");
});

test( "Initialization w/ Values", function() {
	event = new Event({name:"Testy Event", description:"Testy's event!!!", owner_id:"b5428ebe-fa3b-11e2-ad1a-bc764e04579c"});
	equal(event.isDirty, true, "Dirty flag [event.isDirty] is true");
	equal(event.url, "/events", "Url [event.url] is /events");
	equal(event.rootUrl, "http://api.jibely.com", "Root url [event.rootUrl] is http://api.jibely.com");
	equal(event.parentId(), undefined, "parent id [event.parentId()] is undefind");
	equal(event.ownerId(), "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "owner id [event.ownerId()] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(event.isTemplate(), undefined, "is template id [event.isTemplate()] is undefined");
	equal(event.id(), undefined, "id [event.id()] is undefined");
	equal(event.date(), undefined, "date [event.date()] is undefined");
	equal(event.name(), "Testy Event", "name [event.name()] is Testy Event");
	equal(event.description(), "Testy's event!!!", "description [event.description()] is Testy's event!!!");
});

test( "Save", function() {
	event = new Event({name:"Testy Event", description:"Testy's event!!!", owner_id:"b5428ebe-fa3b-11e2-ad1a-bc764e04579c"});
	event.save();
	server.respond();
	equal(event.isDirty, false, "Dirty flag [event.isDirty] is false");
	equal(event.url, "/events", "Url [event.url] is /events");
	equal(event.rootUrl, "http://api.jibely.com", "Root url [event.rootUrl] is http://api.jibely.com");
	equal(event.parentId(), undefined, "parent id [event.parentId()] is undefined");
	equal(event.ownerId(), "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "owner id [event.ownerId()] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(event.isTemplate(), false, "is template id [event.isTemplate()] is false");
	equal(event.id(), "f6956832-00e9-11e3-ad68-bc764e04579c", "id [event.id()] is f6956832-00e9-11e3-ad68-bc764e04579c");
	equal(event.date(), "2013-08-09 11:51:01", "date [event.date()] is 2013-08-09 11:51:01");
	equal(event.name(), "Testy Event", "name [event.name()] is Testy Event");
	equal(event.description(), "Testy's event!!!", "description [event.description()] is Testy's event!!!");
});

test( "Load", function() {
	event = new Event();
	event.load("f6956832-00e9-11e3-ad68-bc764e04579c");
	server.respond();
	equal(event.isDirty, false, "Dirty flag [event.isDirty] is false");
	equal(event.url, "/events", "Url [event.url] is /events");
	equal(event.rootUrl, "http://api.jibely.com", "Root url [event.rootUrl] is http://api.jibely.com");
	equal(event.parentId(), undefined, "parent id [event.parentId()] is undefined");
	equal(event.ownerId(), "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "owner id [event.ownerId()] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(event.isTemplate(), false, "is template id [event.isTemplate()] is false");
	equal(event.id(), "f6956832-00e9-11e3-ad68-bc764e04579c", "id [event.id()] is f6956832-00e9-11e3-ad68-bc764e04579c");
	equal(event.date(), "2013-08-09 11:51:01", "date [event.date()] is 2013-08-09 11:51:01");
	equal(event.name(), "Testy Event", "name [event.name()] is Testy Event");
	equal(event.description(), "Testy's event!!!", "description [event.description()] is Testy's event!!!");
});

test( "Update", function() {
	event = new Event();
	event.load("f6956832-00e9-11e3-ad68-bc764e04579c");
	server.respond();
	event.name("Not Testy Event");
	event.description("Not Testy's event!!!");
	event.ownerId("b5428ebe-fa3b-11e2-ad1a-bc764e04579a");
	equal(event.isDirty, true, "Before update dirty flag [event.isDirty] is true");
	event.save();
	server.respond();
	equal(event.isDirty, false, "After update dirty flag [event.isDirty] is false");
	equal(event.url, "/events", "Url [event.url] is /events");
	equal(event.rootUrl, "http://api.jibely.com", "Root url [event.rootUrl] is http://api.jibely.com");
	equal(event.parentId(), undefined, "parent id [event.parentId()] is undefined");
	equal(event.ownerId(), "b5428ebe-fa3b-11e2-ad1a-bc764e04579a", "owner id [event.ownerId()] is b5428ebe-fa3b-11e2-ad1a-bc764e04579a");
	equal(event.isTemplate(), false, "is template id [event.isTemplate()] is false");
	equal(event.id(), "f6956832-00e9-11e3-ad68-bc764e04579c", "id [event.id()] is f6956832-00e9-11e3-ad68-bc764e04579c");
	equal(event.date(), "2013-08-09 11:51:01", "date [event.date()] is 2013-08-09 11:51:01");
	equal(event.name(), "Not Testy Event", "name [event.name()] is Not Testy Event");
	equal(event.description(), "Not Testy's event!!!", "description [event.description()] is Not Testy's event!!!");
});

test( "Remove", function() {
	event = new Event();
	event.load("f6956832-00e9-11e3-ad68-bc764e04579c");
	server.respond();
	event.remove();
	server.respond();
	equal(event.isDirty, true, "Dirty flag [event.isDirty] is true");
	equal(event.url, "/events", "Url [event.url] is /events");
	equal(event.rootUrl, "http://api.jibely.com", "Root url [event.rootUrl] is http://api.jibely.com");
	equal(event.parentId(), undefined, "parent id [event.parentId()] is undefind");
	equal(event.ownerId(), undefined, "owner id [event.ownerId()] is undefind");
	equal(event.isTemplate(), undefined, "is template id [event.isTemplate()] is undefined");
	equal(event.id(), undefined, "id [event.id()] is undefined");
	equal(event.date(), undefined, "date [event.date()] is undefined");
	equal(event.name(), undefined, "name [event.name()] is undefined");
	equal(event.description(), undefined, "description [event.description()] is undefined");
});

/*
QUnit.jUnitReport = function(report) {
	console.log(report.xml);
} */