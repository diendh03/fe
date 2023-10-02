import express from "express";

import passport from "passport";
import { authLocal, facebookLocal, googleLocal } from "../middleware/passport";
import { authGoole, signIn, signUp } from "../controller/user";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", authLocal, signIn);
router.post("/auth/google", googleLocal, authGoole);
router.post("/auth/facebook", facebookLocal, authGoole);
router.get(
  "/auth/facebook/callback",
  (req, res, next) => {
    passport.authenticate("facebook", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect("");
  }
);

export default router;
