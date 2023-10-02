import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  authGoogleID: {
    type: String,
    default: null,
  },
  authFacebookID: {
    type: String,
    default: null,
  },
  authType: {
    type: String,
    enum: ["local", "google", "facebook"],
    default: "local",
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.authType !== "local") next();
  } catch (error) {
    console.log(error);
  }
});

export default mongoose.model("User", userSchema);
