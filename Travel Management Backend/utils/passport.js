const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Register = require('../models/Register'); // Your User model


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await Register.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new Register({
        googleId: profile.id,
        Name: profile.displayName,
        Email: profile.emails[0].value,
      });
      await newUser.save();
      done(null, newUser);
    } catch (error) {
      done(error, null);
    }
  }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Register.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
