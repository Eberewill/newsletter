import mongoose from "mongoose";

const EmailRefSchema = mongoose.Schema(
  {
    ref: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const EmailRef = mongoose.model("EmailRef", EmailRefSchema);

export default EmailRef;
