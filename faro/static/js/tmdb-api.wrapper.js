$(document).ready(function() {
	
	// removes messages
	$("#term").focus(function() {
		var full = $("#poster").has("img").length ? true : false;
		if (full == false) {
			$('#message').empty();
		}
	});
	
	var loadBackdrops = function(backdrops) {
		
	};
	
	// functions
	var getPoster = function() {
		// grab movie title and store in a variable
		var film = $('#term').val();
		if (film == '') {
			$('#message').html("<h3 class='loading'>Please enter something!</h3>");
		}
		else {
			// display loading message
			$('#message').html("<h3 class='loading'>Loading up poster!</h3>");
			$.getJSON("http://api.themoviedb.org/2.1/Movie.search/en/json/23afca60ebf72f8d88cdcae2c4f31866/" + 
					film + "?callback=?", function(json) { 
				
				console.log(json);
				
				// check if poster was found
				if (json[0] != "Nothing found.") {
					// Display the poster and a mesasage announcing the result
					$('#message').html('<h3 class="loading">Found it!</h3>');
					$('#poster').html('<img id="thePoster" src=' + json[0].posters[2].image.url + ' />');
					loadBackdrops(json[0].backdrops);
				}
				else {
					 $.getJSON("http://api.themoviedb.org/2.1/Movie.search/en/json/23afca60ebf72f8d88cdcae2c4f31866/goonies?callback=?", 
							 function(json) {
						 $('#message').html('<h3 class="loading">Found nothing... Maybe you were looking for The Goonies?</h3>');
						 $('#poster').html('<img id="thePoster" src=' + json[0].posters[2].image.url + ' />');
						 loadBackdrops(json[0].backdrops);
					 });
				}
			});
		}
		return false;
	};
	
	$("#search").click(getPoster);
	$("#term").keyup(function(event) {
		if(event.keyCode == 13) {
			getPoster();
		}
	});
	
});