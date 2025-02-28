const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const xss = require("xss");
const cors = require("cors");
const routes = require("./routes/index");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(mongosanitize());

app.post("/send-message", (req, res) => {
  const sanitizedMessage = xss(req.body.message); // Sanitize input manually
  // Now store sanitizedMessage in DB or process it safely
  res.json({ message: sanitizedMessage });
});

app.use(cors({
  origin: ['https://chatappfrontend-xi.vercel.app','http://localhost:5173'],
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type',
  credentials: true,
}));

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


