if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
express = require("express");
app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "device-remember-token",
    "Access-Control-Allow-Origin",
    "Origin",
    "Accept",
  ],
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
  console.log("connected to the Datebase");
});
mongoose.connection.on("error", (error) => {
  console.log(error);
});

require("./models/Token_model");
app.use(require("./router/all_router"));






app.get("/", (req, res) => {
  res.json({
    status: 200,
    server: "running",
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`listening to ${process.env.PORT}`);
});
