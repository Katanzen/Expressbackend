var dev = require("./dev.js");
var prod = require("./prod.js");

if (process.env === "production") {
    return (module.exports = prod);
} else {
    return (module.exports = dev);
}
