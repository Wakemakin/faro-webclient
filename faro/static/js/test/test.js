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
	equal(user.isNew, true, "New flag [user.isNew] is true");
	equal(user.isDirty, true, "Dirty flag [user.isDirty] is true");
	equal(user.key, undefined, "Key [user.key] is undefined");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(), undefined, "Id [user.id()] is undefined");
	equal(user.date(), undefined, "Date [user.date()] is undefined");
	equal(user.userName(), undefined, "User name [user.userName()] is undefined");
	equal(user.firstName(), undefined, "Last name [user.userLast()] is undefined");
	equal(user.lastName(), undefined, "First name [user.firstName()] is undefined");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Initialization w/ Values", function() {
	user = new User({username:"Testy", first_name:"Testy", last_name:"Testy"});
	equal(user.isNew, true, "New flag [user.isNew] is true");
	equal(user.isDirty, true, "Dirty flag [user.isDirty] is true");
	equal(user.key, undefined, "Key [user.key] is undefined");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(), undefined, "Id [user.id()] is undefined");
	equal(user.date(), undefined, "Date [user.date()] is undefined");
	equal(user.userName(), "Testy", "User name [user.userName()] is Testy");
	equal(user.firstName(), "Testy", "Last name [user.userLast()] is Testy");
	equal(user.lastName(), "Testy", "First name [user.firstName()] is Testy");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Save", function() {
	user = new User({username:"TeStY", first_name:"Tester", last_name:"Testa"});
	user.save();
	server.respond();
	equal(user.isNew, false, "New flag [user.isNew] is false");
	equal(user.isDirty, false, "Dirty flag [user.isDirty] is false");
	equal(user.key, "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Key [user.key] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(),  "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Id [user.id()] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.date(), "2013-07-31 23:48:32", "Date [user.date()] is 2013-07-31 23:48:32");
	equal(user.userName(), "TeStY", "User name [user.userName()] is TeStY");
	equal(user.firstName(), "Tester", "Last name [user.userLast()] is Tester");
	equal(user.lastName(), "Testa", "First name [user.firstName()] is Testa");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Update", function() {
	user = new User();
	user.load("b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	server.respond();
	user.firstName("TiTi");
	user.lastName("TaTa");
	equal(user.isNew, false, "Before save, new flag [user.isNew] is false");
	equal(user.isDirty, true, "Before save, dirty flag [user.isDirty] is true");
	user.save();
	server.respond();
	equal(user.isNew, false, "After save, new flag [user.isNew] is false");
	equal(user.isDirty, false, "After save, dirty flag [user.isDirty] is false");
	equal(user.key, "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Key [user.key] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(),  "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Id [user.id()] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.date(), "2013-07-31 23:48:32", "Date [user.date()] is 2013-07-31 23:48:32");
	equal(user.userName(), "TeStY", "User name [user.userName()] is TeStY");
	equal(user.firstName(), "TiTi", "Last name [user.userLast()] is TiTi");
	equal(user.lastName(), "TaTa", "First name [user.firstName()] is TaTa");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Load By Id", function() {
	user = new User();
	user.load("b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	server.respond();
	equal(user.isNew, false, "New flag [user.isNew] is false");
	equal(user.isDirty, false, "Dirty flag [user.isDirty] is false");
	equal(user.key, "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Key [user.key] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(),  "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Id [user.id()] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.date(), "2013-07-31 23:48:32", "Date [user.date()] is 2013-07-31 23:48:32");
	equal(user.userName(), "TeStY", "User name [user.userName()] is TeStY");
	equal(user.firstName(), "Tester", "Last name [user.userLast()] is Tester");
	equal(user.lastName(), "Testa", "First name [user.firstName()] is Testa");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Load By Username", function() {
	user = new User();
	user.load("testy");
	server.respond();
	equal(user.isNew, false, "New flag [user.isNew] is false");
	equal(user.isDirty, false, "Dirty flag [user.isDirty] is false");
	equal(user.key, "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Key [user.key] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(),  "b5428ebe-fa3b-11e2-ad1a-bc764e04579c", "Id [user.id()] is b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	equal(user.date(), "2013-07-31 23:48:32", "Date [user.date()] is 2013-07-31 23:48:32");
	equal(user.userName(), "TeStY", "User name [user.userName()] is TeStY");
	equal(user.firstName(), "Tester", "Last name [user.userLast()] is Tester");
	equal(user.lastName(), "Testa", "First name [user.firstName()] is Testa");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Remove", function() {
	user = new User();
	user.load("b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	server.respond();
	user.remove();
	server.respond();
	equal(user.isNew, true, "New flag [user.isNew] is true");
	equal(user.isDirty, true, "Dirty flag [user.isDirty] is true");
	equal(user.key, undefined, "Key [user.key] is undefined");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(), undefined, "Id [user.id()] is undefined");
	equal(user.date(), undefined, "Date [user.date()] is undefined");
	equal(user.userName(), undefined, "User name [user.userName()] is undefined");
	equal(user.firstName(), undefined, "Last name [user.userLast()] is undefined");
	equal(user.lastName(), undefined, "First name [user.firstName()] is undefined");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});
//
//module('Event', {
//	setup: function() {
//		event = new Event();
//	},
//	teardown: function() {
//		event = null;
//	}
//});
//
//test( "Initialization Empty", function() {
//	equal(event.isNew, true, "New flag [event.isNew] is true");
//	equal(event.isDirty, true, "Dirty flag [event.isDirty] is true");
//	equal(event.url, "/events", "Url [event.url] is /events");
//	equal(event.rootUrl, "http://api.jibely.com", "Root url [event.rootUrl] is http://api.jibely.com");
//	equal(event.parentId(), undefined, "parent id [event.parentId()] is undefind");
//	equal(event.ownerId(), undefined, "owner id [event.ownerId()] is undefind");
//	equal(event.isTemplate(), undefined, "is template id [event.isTemplate()] is undefind");
//	equal(event.id(), undefined, "id [event.id()] is undefined");
//	equal(event.date(), undefined, "date [event.date()] is undefined");
//	equal(event.name(), undefined, "name [event.name()] is undefined");
//	equal(event.description(), undefined, "description [event.description()] is undefined");
//	equal(event.owner, undefined, "owner [event.owner] is undefined");
//});
//
//test( "Initialization w/ Values", function() {
//	event = new Event({name:"Testy", description:"Testy"});
//	equal(event.isNew, true, "New flag [event.isNew] is true");
//	equal(event.isDirty, true, "Dirty flag [event.isDirty] is true");
//	equal(event.url, "/events", "Url [event.url] is /events");
//	equal(event.rootUrl, "http://api.jibely.com", "Root url [event.rootUrl] is http://api.jibely.com");
//	equal(event.parentId(), undefined, "parent id [event.parentId()] is undefind");
//	equal(event.ownerId(), undefined, "owner id [event.ownerId()] is undefind");
//	equal(event.isTemplate(), undefined, "is template id [event.isTemplate()] is undefind");
//	equal(event.id(), undefined, "id [event.id()] is undefined");
//	equal(event.date(), undefined, "date [event.date()] is undefined");
//	equal(event.name(), "Testy", "name [event.name()] is Testy");
//	equal(event.description(), "Testy", "description [event.description()] is Testy");
//	equal(event.owner, undefined, "owner [event.owner] is undefined");
//});
//
//test( "Save", function() {
//	var event = new Event();
//	ok(true, "Create");
//});
//
//test( "Update", function() {
//	var event = new Event();
//	ok(true, "Create");
//});
//
//test( "Load", function() {
//	var event = new Event();
//	ok(true, "Create");
//});
//
//test( "Remove", function() {
//	var event = new Event();
//	ok(true, "Create");
//});

/*
QUnit.jUnitReport = function(report) {
	console.log(report.xml);
} */