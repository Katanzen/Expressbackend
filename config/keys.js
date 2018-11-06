if (process.env === "production") {
    return module.exports("./prod.js");
} else {
    return module.exports("./dev.js");
}
