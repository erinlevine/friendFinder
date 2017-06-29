// Dependencies:

var express = require("express");
var bodyParser = require("body-parser");

//Setting up express:
var app = express();

// Initial port:
var PORT = process.env.PORT || 8080;

// BodyParser:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Routing:
require("./app/routing/apiRoutes")(app);

require('./app/routing/htmlRoutes')(app);


// Listener:
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
