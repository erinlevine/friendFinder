$("#submit").on("click", function(){
 

var userData = {
	    		friendName: $("#name").val(),
	    		friendPicture: $("#photo").val(),
	    		surveyResults: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val(), ]
	    	}


	    	// Grab the URL of the website
	    	var currentURL = window.location.origin;

	    	// AJAX post the data to the friends API. 
	    	$.post(currentURL + "/api/friends", userData, function(data){
	    		console.log(data);
	    		//Grab the result from the AJAX post so that the best match's name and photo are displayed.
	    		$("#friendName").text(data.friendName);
	    		$('#friendPicture').attr("src", data.friendPicture);

		    	// Show the modal with the best match 
		    	$("#resultsModal").modal('toggle');

	    	});


    });