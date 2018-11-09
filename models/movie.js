var mongoose = require("mongoose");

var searchTermsSchema = new mongoose.Schema({
    name: String,
    url: String,
    Thoughts: String
});
module.exports = mongoose.model("Movie", searchTermsSchema);
