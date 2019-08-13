// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

var friends = require("./app/data/friends.js");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000 || process.env.PORT;

app.use(express.static(__dirname + "/app/css"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// API and HTML routes
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
