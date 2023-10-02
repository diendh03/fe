import passport from "passport";
import GooglePlusTokenStrategy from "passport-google-plus-token";
import FacebookTokenStrategy from "passport-facebook-token";
import User from "../models/user";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
configDotenv();
passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("accessToken ", accessToken);
      console.log("refreshToken ", refreshToken);
      console.log("profile ", profile);
      // check whether this current user exists in our database
      const user = await User.findOne({
        authGoogleID: profile.id,
        authType: "google",
      });

      if (user) return done(null, user);

      // If new account
      const newUser = new User({
        authType: "google",
        authGoogleID: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      });

      await newUser.save();

      done(null, newUser);
    }
  )
);
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        // check whether this current user exists in our database
        const user = await User.findOne({
          authFacebookID: profile.id,
          authType: "facebook",
        });
        if (user) return done(null, user);
        // If new account
        const newUser = new User({
          authType: "facebook",
          authFacebookID: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        console.log("error ", error);
        done(error, false);
      }
    }
  )
);
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        // console.log(1);
        const user = await User.findOne({ email });
        if (!user) return done(null, false);
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) return done(null, false);
        // console.log(user);
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

export const authLocal = passport.authenticate("local", {
  session: false,
});
export const googleLocal = passport.authenticate("google-plus-token", {
  session: false,
  scope: ["email"],
});
export const facebookLocal = passport.authenticate("facebook-token", {
  session: false,
});
