module('User');

test( "Initialization Empty", function() {
	user = new User();
	equal(user.isNew, true, "New flag [user.isNew] is true");
	equal(user.isDirty, true, "Dirty flag [user.isDirty] is true");
	equal(user.isLoad, false, "Load flag [user.isLoad] is false");
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
	equal(user.isLoad, false, "Load flag [user.isLoad] is false");
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
	jsonObj = {
		username:"testy",
		first_name:"Tester",
		last_name:"Testa", 
		display_name:"TeStY",
		events:[],
		date_created:"2013-07-31 23:48:32", 
		id:"b5428ebe-fa3b-11e2-ad1a-bc764e04579c"
	};
	jsonStr = JSON.stringify(jsonObj);
	server = sinon.fakeServer.create();
	server.respondWith(
		"POST", "http://api.jibely.com/users",
		[201, { "Content-Type":"application/json" }, jsonStr]
	);
	user = new User({username:"TeStY", first_name:"Tester", last_name:"Testa"});
	user.save();
	server.respond();
	server.restore();
	equal(user.isNew, false, "New flag [user.isNew] is false");
	equal(user.isDirty, false, "Dirty flag [user.isDirty] is false");
	equal(user.isLoad, false, "Load flag [user.isLoad] is false");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id().length, 36, "Id [user.id()] is 36 characters");
	equal(user.date().length, 19, "Date [user.date()] is 19 characters");
	equal(user.userName(), "TeStY", "User name [user.userName()] is TeStY");
	equal(user.firstName(), "Tester", "Last name [user.userLast()] is Tester");
	equal(user.lastName(), "Testa", "First name [user.firstName()] is Testa");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Update", function() {
	ok(true, "Create");
});

test( "Load By Id", function() {
	jsonObj = {
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
	jsonStr = JSON.stringify(jsonObj);
	server = sinon.fakeServer.create();
	server.respondWith(
		"GET", "http://api.jibely.com/users/b5428ebe-fa3b-11e2-ad1a-bc764e04579c",
		[200, { "Content-Type":"application/json" }, jsonStr]
	);
	user = new User();
	user.load("b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	server.respond();
	server.restore();
	equal(user.isNew, false, "New flag [user.isNew] is false");
	equal(user.isDirty, false, "Dirty flag [user.isDirty] is false");
	equal(user.isLoad, true, "Load flag [user.isLoad] is true");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id().length, 36, "Id [user.id()] is 36 characters");
	equal(user.date().length, 19, "Date [user.date()] is 19 characters");
	equal(user.userName(), "TeStY", "User name [user.userName()] is TeStY");
	equal(user.firstName(), "Tester", "Last name [user.userLast()] is Tester");
	equal(user.lastName(), "Testa", "First name [user.firstName()] is Testa");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Load By Username", function() {
	jsonObj = {
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
	jsonStr = JSON.stringify(jsonObj);
	server = sinon.fakeServer.create();
	server.respondWith(
		"GET", "http://api.jibely.com/users/testy",
		[200, { "Content-Type":"application/json" }, jsonStr]
	);
	user = new User();
	user.load("testy");
	server.respond();
	server.restore();
	equal(user.isNew, false, "New flag [user.isNew] is false");
	equal(user.isDirty, false, "Dirty flag [user.isDirty] is false");
	equal(user.isLoad, true, "Load flag [user.isLoad] is true");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id().length, 36, "Id [user.id()] is 36 characters");
	equal(user.date().length, 19, "Date [user.date()] is 19 characters");
	equal(user.userName(), "TeStY", "User name [user.userName()] is TeStY");
	equal(user.firstName(), "Tester", "Last name [user.userLast()] is Tester");
	equal(user.lastName(), "Testa", "First name [user.firstName()] is Testa");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Remove", function() {
	jsonObj = {
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
	jsonStr = JSON.stringify(jsonObj);
	server = sinon.fakeServer.create();
	server.respondWith(
		"GET", "http://api.jibely.com/users/b5428ebe-fa3b-11e2-ad1a-bc764e04579c",
		[200, { "Content-Type":"application/json" }, jsonStr]
	);
	server.respondWith(
		"DELETE", "http://api.jibely.com/users/b5428ebe-fa3b-11e2-ad1a-bc764e04579c",
		[204, { "Content-Type":"application/json" }, jsonStr]
	);
	user = new User();
	user.load("b5428ebe-fa3b-11e2-ad1a-bc764e04579c");
	user.remove();
	server.respond();
	server.restore();
	equal(user.isNew, true, "New flag [user.isNew] is true");
	equal(user.isDirty, true, "Dirty flag [user.isDirty] is true");
	equal(user.isLoad, false, "Load flag [user.isLoad] is false");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(), undefined, "Id [user.id()] is undefined");
	equal(user.date(), undefined, "Date [user.date()] is undefined");
	equal(user.userName(), undefined, "User name [user.userName()] is undefined");
	equal(user.firstName(), undefined, "Last name [user.userLast()] is undefined");
	equal(user.lastName(), undefined, "First name [user.firstName()] is undefined");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

module('Event', {
	setup: function() {
		event = new Event();
	},
	teardown: function() {
		event = null;
	}
});

test( "Initialization Empty", function() {
	equal(event.isNew, true, "New flag [event.isNew] is true");
	equal(event.isDirty, true, "Dirty flag [event.isDirty] is true");
	equal(event.url, "/events", "Url [event.url] is /events");
	equal(event.rootUrl, "http://api.jibely.com", "Root url [event.rootUrl] is http://api.jibely.com");
	equal(event.parentId(), undefined, "parent id [event.parentId()] is undefind");
	equal(event.ownerId(), undefined, "owner id [event.ownerId()] is undefind");
	equal(event.isTemplate(), undefined, "is template id [event.isTemplate()] is undefind");
	equal(event.id(), undefined, "id [event.id()] is undefined");
	equal(event.date(), undefined, "date [event.date()] is undefined");
	equal(event.name(), undefined, "name [event.name()] is undefined");
	equal(event.description(), undefined, "description [event.description()] is undefined");
	equal(event.owner, undefined, "owner [event.owner] is undefined");
});

test( "Initialization w/ Values", function() {
	event = new Event({name:"Testy", description:"Testy"});
	equal(event.isNew, true, "New flag [event.isNew] is true");
	equal(event.isDirty, true, "Dirty flag [event.isDirty] is true");
	equal(event.url, "/events", "Url [event.url] is /events");
	equal(event.rootUrl, "http://api.jibely.com", "Root url [event.rootUrl] is http://api.jibely.com");
	equal(event.parentId(), undefined, "parent id [event.parentId()] is undefind");
	equal(event.ownerId(), undefined, "owner id [event.ownerId()] is undefind");
	equal(event.isTemplate(), undefined, "is template id [event.isTemplate()] is undefind");
	equal(event.id(), undefined, "id [event.id()] is undefined");
	equal(event.date(), undefined, "date [event.date()] is undefined");
	equal(event.name(), "Testy", "name [event.name()] is Testy");
	equal(event.description(), "Testy", "description [event.description()] is Testy");
	equal(event.owner, undefined, "owner [event.owner] is undefined");
});

test( "Save", function() {
	var event = new Event();
	ok(true, "Create");
});

test( "Update", function() {
	var event = new Event();
	ok(true, "Create");
});

test( "Load", function() {
	var event = new Event();
	ok(true, "Create");
});

test( "Remove", function() {
	var event = new Event();
	ok(true, "Create");
});

/*
QUnit.jUnitReport = function(report) {
	console.log(report.xml);
} */