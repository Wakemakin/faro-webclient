module('User');
user = new User();

test( "Initialization", function() {
	equal(user.isNew, true, "New flag [user.isNew] is true");
	equal(user.isDirty, true, "Dirty flag [user.isDirty] is true");
	equal(user.url, "/users", "Url [user.url] is /users");
	equal(user.rootUrl, "http://api.jibely.com", "Root url [user.rootUrl] is http://api.jibely.com");
	equal(user.id(), undefined, "Id [user.id()] is undefined");
	equal(user.date(), undefined, "Date [user.date()] is undefined");
	equal(user.userName(), undefined, "User name [user.userName()] is undefined");
	equal(user.firstName(), undefined, "Last name [user.userLast()] is undefined");
	equal(user.lastName(), undefined, "First name [user.firstName()] is undefined");
	equal(user.events().length, 0, "NO user events [user.events()] exist");
});

test( "Save", function() {
	var user = new User();
	ok(true, "Create");
});

test( "Update", function() {
	var user = new User();
	ok(true, "Create");
});

test( "Load", function() {
	var user = new User();
	ok(true, "Create");
});

test( "Remove", function() {
	var user = new User();
	ok(true, "Create");
});

module('Event');
event = new Event();

test( "Initialization", function() {
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