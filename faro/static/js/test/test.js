module('User');

test( "Test Empty Set", function() {
	var user = new User();
	equal(user.id(), undefined, "id [user.id()] is undefined");
	equal(user.date(), undefined, "date [user.date()] is undefined");
	equal(user.userName(), undefined, "user name [user.userName()] is undefined");
	equal(user.firstName(), undefined, "last name [user.userLast()] is undefined");
	equal(user.lastName(), undefined, "first name [user.firstName()] is undefined");
	equal(user.events().length, 0, "no user events [user.events()] exist");
});

test( "Test Save", function() {
	var user = new User();
	ok(true, "Create");
});

test( "Test Update", function() {
	var user = new User();
	ok(true, "Create");
});

test( "Test Load", function() {
	var user = new User();
	ok(true, "Create");
});

test( "Test Remove", function() {
	var user = new User();
	ok(true, "Create");
});

module('Event');

test( "Test Empty Set", function() {
	var event = new Event();
	equal(event.parentId(), undefined, "parent id [event.parentId()] is undefind");
	equal(event.ownerId(), undefined, "owner id [event.ownerId()] is undefind");
	equal(event.isTemplate(), undefined, "is template id [event.isTemplate()] is undefind");
	equal(event.id(), undefined, "id [event.id()] is undefined");
	equal(event.date(), undefined, "date [event.date()] is undefined");
	equal(event.name(), undefined, "name [event.name()] is undefined");
	equal(event.description(), undefined, "description [event.description()] is undefined");
	equal(event.owner, undefined, "owner [event.owner] is undefined");
});

test( "Test Save", function() {
	var event = new Event();
	ok(true, "Create");
});

test( "Test Update", function() {
	var event = new Event();
	ok(true, "Create");
});

test( "Test Load", function() {
	var event = new Event();
	ok(true, "Create");
});

test( "Test Remove", function() {
	var event = new Event();
	ok(true, "Create");
});

/*
QUnit.jUnitReport = function(report) {
	console.log(report.xml);
} */