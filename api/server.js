const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/database");
const port = process.env.PORT || 3001;
const passport = require("passport");
const session = require("express-session");
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const routes = require("./routes/index");
const morgan = require("morgan");

require("./config/passport");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cookieSession({
    name: "test_session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(morgan("combined"));
app.use(
  session({
    secret: "kofe",
    resave: true,
    saveUninitialized: true,
  })
);

//passport-----------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

//-------------------------------------------------------------

app.use("/", routes);

db.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
