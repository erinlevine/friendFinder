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


  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    friendsData.push(req.body);
    //This is where we will match and return the best match for user:
    var surveyArray = req.body.surveyResults;

    scoresArray = []; 

    for(var i = 0; i < friendsData.length-1; i++){

      var currentArray = friendsData[i].surveyResults;

      console.log("Results: " + friendsData[i].surveyResults)
      console.log("Survery Results: " + surveyArray);

      differenceArray = [];

      for(var n = 0; n < currentArray.length; n++){
        var difference = surveyArray[n] - currentArray[n];
        console.log("Difference: " + difference);
        differenceArray.push(Math.abs(difference));



      }

      console.log("Difference Array: " + differenceArray);

      var scoreTotal = differenceArray.reduce(function(a ,b){
        return a+b;

      });
      scoresArray.push(scoreTotal);
      console.log("Scores Array: " + scoresArray);
      
    }

    var index = 0;
    var value = scoresArray[0];
      for (var m = 1; m < scoresArray.length; m++){
        if (scoresArray[m] < value) {
          value = scoreTotal[m];
          index = m;
        }
      }
     console.log("Value: " + value + " Index: " + index); 
     console.log(friendsData[index]);
     res.json(friendsData[index]);
   
  });

};
