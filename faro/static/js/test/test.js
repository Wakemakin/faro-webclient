/**
 * User model tests.
 */
test( "Test_Empty_User()", function() {
	var user = new User();
	equal(user.id(), undefined, "id [user.id()] is undefined");
	equal(user.date(), undefined, "date [user.date()] is undefined");
	equal(user.userName(), undefined, "user name [user.userName()] is undefined");
	equal(user.firstName(), undefined, "last name [user.userLast()] is undefined");
	equal(user.lastName(), undefined, "first name [user.firstName()] is undefined");
	equal(user.events().length, 0, "no user events [user.events()] exist");
	
	for (var item in user) {
		if (user.hasOwnProperty(item)) {
			console.log(item + " [type: " + typeof item + "]");
		}
	}
	
});

/*
QUnit.jUnitReport = function(report) {
	console.log(report.xml);
} */