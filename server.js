const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const materials = require("./routes/api/materials");
const posts = require("./routes/api/posts");
const users = require("./routes/api/users");

const app = express();

// BODYPARSER CONFIG
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DATABASE CONFIG
const db = require("./config/keys").mongoURI;
mongoose
	.connect(db)
	.then(() => console.log("[MONGODB CONNECTED]"))
	.catch(err => console.log("[ERROR WITH DATABASE]", err));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
// PASSPORT CONFIG
require("./config/passport");

// USE ROUTES
app.use("/api/materials", materials);
app.use("/api/posts", posts);
app.use("/api/users", users);

// SERVER STATIC ASSETS IF IN PRODUCTION
if (process.env.NODE_ENV === "production") {
	// SET STATIC SERVER
	app.use(express.static("client/build"));
	// SET ROUTES TO USE INDEX.HTML FILE
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// SERVER LISTEN
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("[Server listening on port " + port + "]"));
