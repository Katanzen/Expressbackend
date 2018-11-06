/*
* New studying project
*/
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    request = require("request");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var keys = require("./config/keys"),
    mongoose = require("mongoose");
mongoose.connect(
    "mongodb://{keys.DUSER}:{keys.DPASS}@ds024548.mlab.com:24548/stuseful"
);

//Schema
var searchTermsSchema = new mongoose.Schema({
    name: String
});
var Searchterm = mongoose.model("Searchterm", searchTermsSchema);
var movies;

app.get("/campsites", (req, res) => {
    if (movies == null) {
        res.redirect("/campsites/new");
    }
    res.render("campsites", { movies });
});
app.post("/campsites", (req, res) => {
    // console.log(req.body.name);
    request(
        "http://www.omdbapi.com/?s=" + req.body.name + keys.API_KEY_OMDB,
        (error, response, body1) => {
            // console.log(response.statusCode);
            if (!error && response.statusCode == 200) {
                movies = JSON.parse(body1);
                // console.log(movies);
                res.redirect("/campsites");
            }
            // console.log("this is error: ", req.body.name);
        }
    );
});
app.get("/campsites/new", (req, res) => {
    res.render("campsitesnew");
});
app.get("/", (req, res) => {
    res.render("home", { movies });
});
app.listen(3000, () => {
    console.log("Server has started");
});
