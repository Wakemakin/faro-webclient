/**
 * Faro App
 */

$(document).ready(function() {

	function UsersViewModel() {
		var self = this;

		self.newUserName = ko.observable();
		self.newFirstName = ko.observable();
		self.newLastName = ko.observable();
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
	ko.applyBindings(new UsersViewModel(), document.getElementById('#admin'));
}); 