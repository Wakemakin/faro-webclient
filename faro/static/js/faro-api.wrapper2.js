$(document).ready(function() {
	
	/**********************************************
	 *                  MODELS
	 **********************************************/
	
/*	Backbone.Model.prototype.parse = function(response) {
		//console.log(response);
	}
	
	UserModel = Backbone.Model.extend({
		
		urlRoot: URL + '/api/users',
		defaults: {
                      id: '',
			    username: '',
			  first_name: '',
			   last_name: '',
			      events: '',
            date_created: ''
		}
	});
	
	EventModel = Backbone.Model.extend({
		
		urlRoot: URL + '/api/events',
		defaults: {
			          id: '',
			        name: '',
			       owner: '',
			    owner_id: '',
			   parent_id: '',
			 is_template: '',
			 description: '',
			date_created: ''
		}
	});
	
	TemplateModel = Backbone.Model.extend({
		
		urlRoot: URL + '/api/templates',
		defaults: {
			          id: '',
			       title: '',
			       owner: '',
             description: '',
           template_type: '',
            date_created: ''
		}
	}); */
	
	// RUN THINGS AND TEST
//	var user = new UserModel();
//	user.save();
/*	user.fetch({ 
		
		error: function() {
			console.log("There was an error in UserModel fetch()");
		},
		
		success: function(user) { 
			console.log(user);
		} 
	}); */
	
	/**
	 * API Wrapper Testing
	 */
	
	rootURL = 'http://www.jibely.com:5001';
	
	function Save(json) {
		$.ajax({
			type:        'POST',
			url:         rootURL + '/api/users',
			data:        json,
			contentType: 'text/plain', 
			success:     function(data, textStatus, request) { console.log("Saved: " + request.status); },
		    error:       function(request, textStatus) { console.log("Save error occured: " + request.status); }
		});
	}
	
	function Load(id) {
		$.ajax({
			type:        'GET',
			url:         rootURL + '/api/users/' + id,
			contentType: 'text/plain',
			success:     function() { parse(data); },
			error:       function(request, textStatus) { console.log("Load error occured: " + request.status); }
		});
	}
	
	function Delete(id) {
		$.ajax({
			type:    'DELETE',
			url:     rootURL + '/api/users/' + id,
			success: function(data, textStatus, request) { console.log("Delete successful: " + request.status); },
			error:   function(request, textStatus) { console.log("Delete error occured: " + request.status); }
		});
	}
	
	function parse(data) {
		console.log(data);
	}
	
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
		console.log(uuid);
	});

	/**
	 * CORS TESTING - REMOVE WHEN DONE
	 */	
	
	$(".GET").click(function(event) {
		var url = "http://www.jibely.com:5001/api/users";
		$.getJSON(url + "?callback=?", function(users){
			console.log(users);
			console.log(users.objects[0]);
		});
	});
	
	$(".CORS_GET").click(function(event) {
		$.ajax({
			     type: 'GET',
		          url: 'http://www.jibely.com:5001/api/users/User4',
		  contentType: 'text/plain',
			  success: function(data) { parse(data); },
			    error: function() { console.log("An error occured."); }
		})
	});
	
	$(".CORS_POST").click(function(event) {
		$.ajax({
			     type: 'POST',
		          url: 'http://www.jibely.com:5001/api/users',
		         data: '{"username":"User7"}',
		  contentType: 'text/plain',
			xhrFields: { withCredentials: false },
			  headers: { },
			  success: function(users) { console.log(users); },
			    error: function() { console.log("An error occured."); }
		})
	});
	
	$(".CORS_DELETE").click(function(event) {
		$.ajax({
			     type: 'DELETE',
		          url: 'http://www.jibely.com:5001/api/users/User4',
			xhrFields: { withCredentials: false },
			contentType: "application/json",
			  success: function(users) { console.log(users); },
			    error: function() { console.log("An error occured in delete."); }
		})
	});
});