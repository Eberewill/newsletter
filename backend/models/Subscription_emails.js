import mongoose from "mongoose";

const subSchema = mongoose.Schema(
  {
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

const Subscription_emails = mongoose.model("Subscription_emails", subSchema);

export default Subscription_emails;
