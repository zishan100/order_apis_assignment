// local environment variable
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./utils/logger.utils");
const requestLogs = require("./middlewares/requestLog");

// db connections
require("../config/db");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
  })
);
// Here Using requestLogs to console all api incoming request
app.use(requestLogs);
morgan.token("requestId", (req) => {
  return req.id;
});
// api request logs
if (logger) {
  app.use(
    morgan("info : :requestId :method :url :response-time ms", {
      stream: logger.stream.write,
    })
  );
}

// routes
require("./routes/index")(app);

app.get("/", (req, res) => {
    console.log("I am in");
    return res.status(200).send(`<h4>Welcome to Order App !!!</h4>`);
});

module.exports = app;
