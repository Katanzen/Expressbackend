/*
* New studying project
*/
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    request = require("request"),
    Movie = require("./models/movie");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var keys = require("./config/keys"),
    mongoose = require("mongoose");
mongoose.connect(
    keys.mongoURI,
    { useNewUrlParser: true }
);

var movies;
Movie.find({}, (err, Rmovies) => {
    if (err) {
        console.log("FİNDİNG THE COLLECTİON ERROR: " + err);
    } else {
        movies = Rmovies;
    }
});

app.get("/campsites", (req, res) => {
    if (movies == null) {
        res.redirect("/campsites/new");
    }
    res.render("campsites", { movies });
});

app.post("/campsites", (req, res) => {
    Movie.create({
        name: req.body.name,
        url: req.body.url
    });
    Movie.find({}, (err, Rmovies) => {
        if (err) {
            console.log("FİNDİNG THE COLLECTİON ERROR: " + err);
        } else {
            movies = Rmovies;
            console.log(movies);
        }
    });
    res.render("campsites", { movies });
});
app.get("/campsites/new", (req, res) => {
    res.render("campsitesnew");
});
app.get("/", (req, res) => {
    res.render("home");
});
app.listen(3000, () => {
    console.log("Server has started");
});
