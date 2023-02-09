const path = require("path");
const db = require("./util/mongodb-connect");
const express = require("express");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blog");

const app = express();

db.connectMongoDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(blogRoutes);

app.use(function (error, req, res, next) {
  res.status(500).render("500", { error: error });
});

app.listen(3000);

module.exports = app;
