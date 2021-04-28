const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const keys = require("../config/keys");
const User = require("../models/user");
const env = require("dotenv");

env.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.ClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: profile.id,
        name: profile._json.name,
        email: profile._json.email,
        avatar: profile._json.picture,
      }).save();
      done(null, user);
    }
  )
);