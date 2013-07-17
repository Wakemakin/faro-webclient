$(document).ready(function() {
	
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
		          url: 'http://www.jibely.com:5001/api/users/User2',
		  contentType: 'text/plain',
			xhrFields: { withCredentials: false },
			  headers: { },
			  success: function(users) { console.log(users); },
			    error: function() { console.log("An error occured."); }
		})
	});
	
	$(".CORS_POST").click(function(event) {
		$.ajax({
			     type: 'POST',
		          url: 'http://www.jibely.com:5001/api/users',
		         data: '{"username":"User3"}',
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
			 datatype: 'script',
		          url: 'http://www.jibely.com:5001/api/users/User3',
			xhrFields: { withCredentials: false },
			  success: function(users) { console.log(users); },
			    error: function() { console.log("An error occured in delete."); }
		})
	});
	
	
});