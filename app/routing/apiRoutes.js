// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

var differenceArray = [];

var scoresArray = [];

//POST request:
  app.post("/api/friends", function(req, res) {
    
    //Taking our friends data and pushing it:
    friendsData.push(req.body);
    
    //Creating a new variable that will hold the users answers.
    var surveyArray = req.body.surveyResults;

    //Creating an empty array for the scores
    scoresArray = []; 

    //Creating a loop that goes through the the friendsData. 
    for(var i = 0; i < friendsData.length-1; i++){


      var currentArray = friendsData[i].surveyResults;

      //Just for testing purposes:
      console.log("Results: " + friendsData[i].surveyResults)
      console.log("Survey Results: " + surveyArray);

      //An array that shows the difference using the Math.abs(difference):
      differenceArray = [];

      for(var n = 0; n < currentArray.length; n++){
        var difference = surveyArray[n] - currentArray[n];
        console.log("Difference: " + difference);
        differenceArray.push(Math.abs(difference));



      }

      console.log("Difference Array: " + differenceArray);

      //Below is how we find the total of all the scores:
      var scoreTotal = differenceArray.reduce(function(a ,b){
        return a+b;

      });
      //Pushing the scoreTotal that we just figured out into the scoresArray:
      scoresArray.push(scoreTotal);
      console.log("Scores Array: " + scoresArray);
      
    }

    //Block of code is what we use to find the lowest score AKA the matched friend:
    var index = 0; //Keeps track of what index the best friend is
    var value = scoresArray[0]; //Keeps track of the score
      //Creating a loop that starts at 1 because we use 0 in our condition. This loop goes through the scoresArray. 
      for (var m = 1; m < scoresArray.length; m++){
        if (scoresArray[m] < value) {
          value = scoreTotal[m];
          index = m;
        }
      }
     console.log("Value: " + value + " Index: " + index); 
     console.log(friendsData[index]);
     //Adding it to JSON.
     res.json(friendsData[index]);
   
  });

};
