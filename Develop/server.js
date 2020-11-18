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
  
  // writes the new note to the json file
  app.post("/api/notes", function(req, res) {
    try {

      // reads the json file
      notesData = fs.readFileSync("./db/db.json", "utf8");
      console.log(notesData);
  
      // parse the data to get an array of objects
      notesData = JSON.parse(notesData);

      // add the new note to the array of note objects
      notesData.push(req.body); // req.body - user input

      // make it string(stringify)so you can write it to the file
      notesData = JSON.stringify(notesData);

      // writes the new note to file
      fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
        // error handling
        if (err) throw err;
      });

      // change it back to an array of objects & send it back to the browser (client)
      res.json(JSON.parse(notesData));
  
      // error Handling
    } catch (err) {
      throw err;
    }
  });

  app.delete("/api/notes/:id", function(req, res) {
      try {

          // reads the jsonfile
          notesData = fs.readFileSync("./db/db.json", "utf8");

          // parse the data to get an array of the objects
          notesData = JSON.parse(notesData);

          // deletes the old note from the array on note objects
          notesData = notesData.filter(function(note) {
              return note.id != req.params.id;
          });

          // make it a string(stringify) so you can write it to the file
          notesData = JSON.stringify(notesData);

          // write the new notes to the file
          fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
              // error handling
              if (err) throw err;
          });

          // change it back to an array of objects & send it back to the browser (client)
          res.send(JSON.parse(notesData));

          // error handling
      } catch (err) {
          throw err;
          console.log(err);
      }
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