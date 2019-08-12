var path = require("path");

var friends = require("../data/friends.js");

module.exports = function(app) {
    app.get("/tables", function(req, res) {
        res.sendFile(path.join(__dirname, "tables.html"));
        });
      // Displays all friend list
      app.get("/api/friends", function(req, res) {
       return res.json(friends);
      });

      // Create New Characters - takes in JSON input
    app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newCharacter = req.body;

    for (var  i=0; i<newCharacter.scores.length; i++){
        newCharacter.scores[i]=parseInt(newCharacter.scores[i]);
    }
    var bestFriendIndex = 0;
    var minimumDifference = 40;

    for(var i = 0; i < friends.length; i++) {
        var totalDifference = 0;
        for(var j = 0; j < friends[i].scores.length; j++) {
          var difference = Math.abs(newCharacter.scores[j] - friends[i].scores[j]);
          totalDifference += difference;
        }
  
        // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
        if(totalDifference < minimumDifference) {
          bestFriendIndex = i;
          minimumDifference = totalDifference;
        }
    }

    console.log(newCharacter);

    friends.push(newCharacter);

   // res.json(newCharacter);
    res.json(friends[bestFriendIndex]);
    });

}