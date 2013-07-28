function UserModel(username, firstname, lastname) {
	var self = this;
	
	self.username = username;
	self.firstname = firstname;
	self.lastname = lastname;
	self.uuid = '';
	self.datecreated = '';
}

function UserViewModel() {
	var self = this;
	
	self.users = ko.observable([]);
	
	self.addUser = function(username, firstname, lastname) {
		self.users.push(new UserModel(username, firstname, lastname));
	};
	self.removeUser = function(id) {
		self.users.remove(id);
	}	
}

ko.applyBindings(new UserViewModel());

// TESTING Faro API

$(document).ready(function() {
	
	/**
	 * API Wrapper Testing
	 */
	
	rootURL = 'http://api.jibely.com';
	
	function Save(json) {
		$.ajax({
			type:        'POST',
			url:         rootURL + '/users',
			data:        json,
			contentType: 'text/plain', 
			success:     function(data, textStatus, request) { console.log("Saved, Status: " + request.status); },
		    error:       function(request, textStatus) { console.log("Save error occured, Status: " + request.status); }
		});
	}
	
	function Load(id) {
				
		$.ajax({
			type:        'GET',
			url:         rootURL + '/users/' + id,
			contentType: 'text/plain',
			dataType:    'json',
			success:     function(data, textStatus, request) { parse(data, textStatus, request) },
			error:       function(request, textStatus) { console.log("Load error occured, Status: " + request.status); }
		});
	
		function parse(data, textStatus, request) {
			console.log("Loaded, Status: " + request.status);
			user = (data.object);
			$('.user_name_label').text(user.username);
			$('.first_name_label').text(user.first_name);
			$('.last_name_label').text(user.last_name);
			$('.id_label').text(user.id);
			$('.date_label').text(user.date_created);
		}
	}
	
	function Delete(id) {
		$.ajax({
			type:    'DELETE',
			url:     rootURL + '/users/' + id,
			success: function(data, textStatus, request) { console.log("Delete successful, Status: " + request.status); },
			error:   function(request, textStatus) { console.log("Delete error occured, Status: " + request.status); }
		});
	}
	
	
	
	// TEST BUTTONS
	
	$("#create_button").click(function() {
		var userName = $("#user_name").val();
		var firstName = $("#first_name").val();
		var lastName = $("#last_name").val();
		var uuid = $("#uuid").val();
		var user_string = '"username":"' + userName + '"';
		var first_string = '"first_name":"' + firstName + '"';
		var last_string = '"last_name":"' + lastName + '"';
		var uuid_string = '"id":"' + uuid + '"';
		var json = '{' + user_string + ', ' + first_string + ', ' + last_string + '}';
		console.log(json);
		Save(json);
	});
	
	$("#update_button").click(function() {
		alert("update");
	});
	
	$("#delete_button").click(function() {
		var uuid = $("#uuid").val();
		var uuid_string = '"id":"' + uuid + '"';
		var json = '{' + uuid_string + '}';
		console.log(uuid);
		Delete(uuid);
	});
	
	$("#load_button").click(function() {
		var uuid = $("#uuid").val();
		var uuid_string = '"id":"' + uuid + '"';
		var json = '{' + uuid_string + '}';
		Load(uuid);
	});
});