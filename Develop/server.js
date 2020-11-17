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