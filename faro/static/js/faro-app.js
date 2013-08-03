/**********************************************************************
 *                        USERS VIEW MODEL
 **********************************************************************
 *
 * View displays all users in database.
 * 
 **********************************************************************/
function UsersViewModel() {
	var self = this;

	self.newUserName = ko.observable();  // move out into another model later
	self.newFirstName = ko.observable(); // move out into another model later
	self.newLastName = ko.observable();  // move out into another model later
	self.users = ko.observableArray([]); 
	
	self.addUser = function() {
		var user = new User({ 
			username : self.newUserName(), 
			first_name : self.newFirstName(),
			last_name: self.newLastName()
		});
		self.users.push(user);
		self.newUserName("");
		self.newFirstName("");
		self.newLastName("");
		user.save();
	};
	
	self.removeUser = function(user) {
		self.users.remove(user);
		user.remove();
	}	
	
	self.editUser = function(user) {
		user.modify = true;
	}
	
	// Load initial state of users
	$.getJSON('http://api.jibely.com/users', function(data) {
		var mappedUsers = $.map(data.objects, function(item) {
			user = new User(item);
			return user;
		});
		self.users(mappedUsers);
	});
}

/**********************************************************************
 *                        EVENTS VIEW MODEL
 **********************************************************************
 *
 * View displays all events in database.
 * 
 **********************************************************************/
function EventsViewModel() {
	var self = this;

	self.newName = ko.observable();  		// move out into another model later
	self.newDescription = ko.observable(); 	// move out into another model later
	self.newIsTemplate = ko.observable();  	// move out into another model later
	self.newOwnerId = ko.observable();  	// move out into another model later
	self.events = ko.observableArray([]);  
	
	self.addEvent = function() {
		var event = new Event({ 
			name : self.newName(), 
			description : self.newDescription(),
			is_template : self.newIsTemplate(),
			owner_id : self.newOwnerId()
		});
		self.events.push(event);
		self.newName("");
		self.newDescription("");
		self.newIsTemplate("");
		self.newOwnerId("");
		event.save();
	};
	
	self.removeEvent = function(event) {
		self.events.remove(event);
		event.remove();
	}	
	
	self.editEvent = function(event) {
		event.modify = true;
	}
	
	// Load initial state of users
	$.getJSON('http://api.jibely.com/events', function(data) {
		var mappedEvents = $.map(data.objects, function(item) {
			event = new Event(item);
			return event;
		});
		self.events(mappedEvents);
	});
}

$(document).ready(function() {
	if ($('#adminUsers').length > 0)
		ko.applyBindings(new UsersViewModel(), $('#adminUsers')[0]);
	if ($('#adminEvents').length > 0)
		ko.applyBindings(new EventsViewModel(), $('#adminEvents')[0]);
}); 