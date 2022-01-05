const router = require("express").Router();
const Users = require("../models/user");
const passport = require("passport");

router.get("/me", (req, res) => {
  req.user ? res.send(req.user) : res.sendStatus(401);
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  Users.create({ name, email, password })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

module.exports = router;
