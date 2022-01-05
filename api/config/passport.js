//a terminar modularizacion
const passport = require("passport");
const { Users } = require("../models");

const GoogleStrategy = require("passport-google-oauth2").Strategy;
const localStrategy = require("passport-local").Strategy;

// Guarda el usuario para la sesion
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Busca el usuario guardado
passport.deserializeUser(function (id, done) {
  Users.findByPk(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "50002597651-fb2nae1c25i7d3mhphsu7rvjut5usgqs.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3001/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      Users.findOne({
        where: {
          googleId: profile.id,
        }
      })
      .then(user => {
        if (user) {
          return done(null, user);
        }
        else{
          Users.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
          })
          .then(user => done(null, user))
          .catch(err => done(err));
        }
      })
    }
  )
);

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      Users.findOne({ where: { email: email } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false);
            }
            done(null, user);
          });
        })
        .catch(done);
    }
  )
);
