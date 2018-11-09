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
        // console.log(Rmovies[1].id);
        // Rmovies.forEach(element => {
        // element.thoughts = "Nothing for now";
        // element.save();
        // Movie.find({ _id: element.id }, (err, resp) => {
        //     console.log(resp);
        // });
        // Movie.update({name : "Matrix"},{Thoughts : "Nothing for now "}, (err, resp)=> {
        //     console.log(resp);
        // })
        // Movie.updateOne(
        //     { _id: element.id },
        //     { Thoughts: "Nothing for now" },
        //     (err, resp) => {
        //         // resp.save();
        //         console.log(resp);
        //     }
        // );
        // });
        movies = Rmovies;
        // console.log(movies);
    }
});
// TurboManSchema.add(ToySchema).add({ year: Number });
// Movie.find({ name: "Matrix" }, (err, obj) => {
//     if (err) {
//         console.log(err);
//     } else {
//         obj.update({ $set: { Thoughts: "Nothing for now" } });
//         console.log(obj);
//     }
// });

app.get("/movies", (req, res) => {
    if (movies == null) {
        res.redirect("/movies/new");
    }
    res.render("movies", { movies });
});

app.post("/movies", (req, res) => {
    Movie.create({
        name: req.body.name,
        url: req.body.url,
        Thoughts: req.body.Thoughts
    });
    Movie.find({}, (err, Rmovies) => {
        if (err) {
            console.log("FİNDİNG THE COLLECTİON ERROR: " + err);
        } else {
            movies = Rmovies;
            console.log(movies);
        }
    });
    res.render("movies", { movies });
});
app.get("/movies/new", (req, res) => {
    res.render("moviesnew");
});
app.get("/", (req, res) => {
    res.render("home");
});
app.listen(3000, () => {
    console.log("Server has started");
});
