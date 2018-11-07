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
    keys.mongoURI,
    { useNewUrlParser: true }
);

//Schema
var searchTermsSchema = new mongoose.Schema({
    name: String,
    url: String
});

var movies;
var Movie = mongoose.model("Movie", searchTermsSchema);
Movie.find({}, (err, Rmovies) => {
    if (err) {
        console.log("FİNDİNG THE COLLECTİON ERROR: " + err);
    } else {
        movies = Rmovies;
    }
});
// Movie.findById("5be2b22259778410a4e7b64d", (err, obj) => {
//     if (err) {
//         console.log(err);
//     } else {
//         obj.url =
//             "https://www.companyfolders.com/blog/media/2017/07/the-silence-of-the-lambs.jpg";
//         // console.log(obj);
//         obj.save(err => {
//             if (err) {
//                 console.log("updating error: ", err);
//             }
//         });
//     }
// });
app.get("/campsites", (req, res) => {
    if (movies == null) {
        res.redirect("/campsites/new");
    }
    res.render("campsites", { movies });
});

// Movie.findById
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
    //res.render("campsites", { movies });
    // console.log(req.body.name);
    // request(
    //     "http://www.omdbapi.com/?s=" + req.body.name + keys.API_KEY_OMDB,
    //     (error, response, body1) => {
    //         // console.log(response.statusCode);
    //         if (!error && response.statusCode == 200) {
    //             movies = JSON.parse(body1);
    //             // console.log(movies);
    //             res.redirect("/campsites");
    //         }
    //         // console.log("this is error: ", req.body.name);
    //     }
    // );
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
