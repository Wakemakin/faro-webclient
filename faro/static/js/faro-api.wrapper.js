$(document).ready(function() {
	
	/**********************************************
	 *                  MODELS
	 **********************************************/
	
	URL = 'http://www.jibely.com:5001';
	
	/**
	 * Backbone Model Overrides
	 **/
	Backbone.Model.prototype.parse = function(response) {
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
		},
		initialize: function () {
			var that = this;

			$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
			//options.crossDomain ={ crossDomain: true };
			options.xhrFields = { withCredentials: true };
			});
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
	});
	
	
	/**********************************************
	 *                  VIEWS
	 **********************************************/
	
	/**********************************************
	 *                COLLECTIONS
	 **********************************************/
	
	/**********************************************
	 *                 ROUTERS
	 **********************************************/
	
	// RUN THINGS AND TEST
	var user = new UserModel({id: "e9ae6da0-e9bd-11e2-91bd-bc764e10da35"});
	user.save();
/*	user.fetch({ 
		
		error: function() {
			console.log("There was an error in UserModel fetch()");
		},
		
		success: function(user) { 
			console.log(user);
		} 
	}); */
	

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
			  success: function(users) { console.log(users); },
			    error: function() { console.log("An error occured."); }
		})
	});
	
	$(".CORS_POST").click(function(event) {
		$.ajax({
			     type: 'POST',
		          url: 'http://www.jibely.com:5001/api/users',
		         data: '{"username":"User6"}',
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