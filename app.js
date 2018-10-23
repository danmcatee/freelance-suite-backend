const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const projectProps = require("./config/project-properties.json");
const indexRoute = require("./routes/index");
const userRoute = require("./routes/user");
const customerRoute = require("./routes/customer");
const projectRoute = require("./routes/project");
const taskRoute = require("./routes/task");
const timestampRoute = require("./routes/timestamp");
const statisticsRoute = require("./routes/statistics")
const middleware = require("./controllers/middleware")
const cors = require("cors");

let dbCon = projectProps.databaseConnection;
mongoose.connect(
  `mongodb://${dbCon.username}:${dbCon.password}@${dbCon.uri}`,
  { useNewUrlParser: true }
);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const port = 8000;
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false
  })
);

app.use("/*", middleware.logRequest);
app.use("/", indexRoute);
app.use("/api/user", userRoute);
app.use("/api/customer", customerRoute);
app.use("/api/project", projectRoute);
app.use("/api/task", taskRoute);
app.use("/api/timestamp", timestampRoute);
app.use("/api/stats", statisticsRoute);

// listen for requests
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
