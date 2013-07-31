// TESTING Faro API

$(document).ready(function() {
	
	rootURL = 'http://api.jibely.com';
	
	
	var userM = new UserM();
	userM.username("testy");
	userM.firstname("testi");
	userM.lastname("testa");
	console.log(ko.toJSON(userM.data));
	//console.log(userM.json);
	console.log(userM.id());
	console.log(userM.key);
	//console.log(ko.toJSON(userM.json));
	userM.save();

	function User(data) {
		var self = this;
		
		self.username = ko.observable(data.username);
		self.firstname = ko.observable(data.first_name);
		self.lastname = ko.observable(data.last_name);
		self.uuid = ko.observable(data.id);
		self.datecreated = ko.observable(data.date_created);
	}

	function UsersViewModel() {
		var self = this;
		
		self.users = ko.observableArray([]);
		self.newusername = ko.observable();
		self.newfirstname = ko.observable();
		self.newlastname = ko.observable();
		
		self.addUser = function() {
			user = new User({ username: this.newusername(), first_name: this.newfirstname(), last_name: this.newlastname() });
			self.newusername("");
			self.newfirstname("");
			self.newlastname("");
			
			// change later to model
			user_string = '"username":"' + user.username() + '"';
			first_string = '"first_name":"' + user.firstname() + '"';
			last_string = '"last_name":"' + user.lastname() + '"';
			json = '{' + user_string + ', ' + first_string + ', ' + last_string + '}';
			$.ajax({
				type: 'POST',
				url: rootURL + '/users',
				data: json,
				contentType: 'text/plain', 
				success: function(data, textStatus, request) { 
					console.log("Saved, Status: " + request.status); 
					$.ajax({
						type: 'GET',
						url: rootURL + '/users/' + user.username(),
						contentType: 'text/plain',
						dataType: 'json',
						success: function(data, textStatus, request) { 
							self.users.push(user);
							item = data.object;
							user.uuid(item.id);
							user.datecreated(item.date_created);
						},
						error: function(request, textStatus) { console.log("Load error occured, Status: " + request.status); }
					});
				},
			    error: function(request, textStatus) { console.log("Save error occured, Status: " + request.status); }
			});
		};
		self.removeUser = function(user) {
			self.users.remove(user);
			Delete(user.uuid());
		}	
		self.editUser = function(user) {
			user.modify = true;
		}
		
		// populate users array on load
		$.getJSON(rootURL + "/users", function(data) {
			var mappedUsers = $.map(data.objects, function(item) {
				user = new User(item);
				return user;
			});
			self.users(mappedUsers);
		});
	}

	ko.applyBindings(new UsersViewModel(), document.getElementById('#admin'));

	
	
	// TESTING Faro API (possible wrappers)
	function Save(json) {
		$.ajax({
			type:        'POST',
			url:         rootURL + '/users',
			data:        json,
			contentType: 'text/plain', 
			success:     function(data, textStatus, request) { 
				console.log("Saved, Status: " + request.status); 
				
			},
		    error:       function(request, textStatus) { console.log("Save error occured, Status: " + request.status); }
		});
	}
	
	function Delete(id) {
		$.ajax({
			type:    'DELETE',
			url:     rootURL + '/users/' + id,
			success: function(data, textStatus, request) { console.log("Delete successful, Status: " + request.status); },
			error:   function(request, textStatus) { console.log("Delete error occured, Status: " + request.status); }
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