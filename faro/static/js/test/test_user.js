/**********************************************************************
 *                         USER MODEL TEST
 *********************************************************************/
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