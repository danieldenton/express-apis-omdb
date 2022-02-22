require("dotenv").config();
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const axios = require("axios");
const app = express();

// Sets EJS as the view engine
app.set("view engine", "ejs");
// Specifies the location of the static assets folder
app.use(express.static("static"));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require("morgan")("dev"));

// Routes
app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/omdb", function (req, res) {
  const s = req.query.search;
  axios
    .get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${s}`)
    .then(function (response) {
      console.log(response.data);
      res.render("results.ejs", { results: response.data.Search });
    });
});
app.get("/detail/:title/:year/:id", function (req, res) {
  res.render("detail.ejs", req.params);
});

// The app.listen function returns a server handle
app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log("port 3000 here");
});

// We can export this server to other servers like this
// module.exports = server;
