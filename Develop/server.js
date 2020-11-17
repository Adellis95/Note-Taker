const express = require("express");

const fs = require("fs");

const path = require("path");


const app = express();
const PORT = process.env.PORT || 3000;

let notesData = [];

// Set up body parsing, static, and route middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// routes

// api call response for all the notes, and sends the results to the browser as an array of object

app.get("/api/notes", function(err, res) {
    try {
      // reads the notes from json file
      notesData = fs.readFileSync("db/db.json", "utf8");
      console.log("Success!");
      // parse it so notesData is an array of objects
      notesData = JSON.parse(notesData);
  
      // error handling
    } catch (err) {
      console.log(err);
    }
    //   send objects to the browser
    res.json(notesData);
  });


// Web page when the Get started button is clicked
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  
  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

// Start the server on the port

app.listen(PORT, function() {
  console.log("SERVER IS LISTENING: " + PORT);
});