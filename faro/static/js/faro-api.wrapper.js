$(document).ready(function() {
	
	$(".GET").click(function(event) {
		var url = "http://www.jibely.com:5001/api/users";
		$.getJSON(url + "?callback=?", function(users){
			console.log(users);
			console.log(users.objects[0]);
		});
	});
	
	$(".push2").click(function(event) {
		alert("Push 2");
		console.log("Push 2");
	});
	
	$(".push3").click(function(event) {
		alert("Push 3");	
		console.log("Push 3");
	});
			
});