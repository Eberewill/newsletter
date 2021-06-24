import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import Subscription_emails from "../models/Subscription_emails.js";
import createHash from "hash-generator";
import EmailRef from "../models/EmailRef.js";
import sendmail from "../utils/sendMail.js";
/*
@desc    Auth user & get token
@ROUTE   POST /api/newsletter/
@PARAM   {EMAIL}
@access  Public
 */

const subscribeUser = async (req, res) => {
  let errors = validationResult(req);

  //validate email with express validator
  if (!errors.isEmpty()) {
    return res.status(400).json({
      code: 0,
      validation: errors.array(),
      message: "Validation failed!",
    });
  }
  //search database if email exist

  const userExist = await Subscription_emails.findOne({
    email: req.body.email,
  });

  if (userExist) {
    const mailContent = {
      message: "You are already a subscriber on or Mailing List",
      subject: "Email subscription update",
      email: req.body.email,
    };
    sendmail(mailContent);
  }

  //generte hash
  let hash = createHash(100);

  const storeData = await EmailRef.create({
    ref: hash,
    email: req.body.email,
  });

  //send user the url with there hash,

  const verifyUrl = `${req.protocol}://${req.get("host")}/verifyEmail?hash=${
    storeData.ref
  }`;

  //send a message to the mail address

  const messageObj = {
    email: storeData.email,
    message: `Hello plese kindly verify your mail by vissiting ${verifyUrl}`,
    subject: "Email Update",
  };

  sendmail(messageObj);

  console.log(req.body.email);
  res.status(200).json({ success: true });
};

/*
@desc    Auth user & get token
@ROUTE   POST /api/newsletter/
@PARAM   {EMAIL}
@access  Public
 */

const vertifyEmail = async (req, res) => {
  //get the request params
  const hash = req.body.hash;

  if (!hash) {
    return res.status().json({ erro: "invalid" });
  }

  const verifiedEmail = await EmailRef.findOne({ ref: hash });

  if (!verifiedEmail) {
    return res.status().json({ erro: "invalid" });
  }
  //save to the database

  const savedUser = Subscription_emails.create({
    email: verifiedEmail.email,
  });
  // delete the ref from db
  //return success
  return res.status(200).json({ success: "Created" + savedUser });
};

export { subscribeUser, vertifyEmail };
