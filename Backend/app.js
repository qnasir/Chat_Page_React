const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const xssClean = require("xss-clean");
const cors = require("cors");
const routes = require("./routes/index");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(mongosanitize());

app.use(xssClean());

// app.use(cors());

app.use(cors({
  origin: ['https://chatappfrontend-xi.vercel.app/auth/login','http://localhost:5173'],
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type',
  credentials: true,
}));

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // In one hour
  message: "Too many requests from this IP, Please try again in an hour",
});

app.use("/tawk", limiter);

app.use(routes);

module.exports = app;

