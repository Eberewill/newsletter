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
  try {
    let errors = validationResult(req);

    //validate email with express validator
    if (!errors.isEmpty()) {
      return res.status(400).json({
        response: false,
        message: "Validation failed!",
        error: true,
      });
    }

    //search database if email exist on subscription table
    const userExist = await Subscription_emails.findOne({
      email: req.body.email,
    });

    if (userExist) {
      const mailContent = {
        message: "You are already a subscriber on or Mailing List",
        email: req.body.email,
      };
      sendmail(mailContent)
        .then(res.status(200).json({ response: true, message: "success" }))
        .catch((mesage) => {
          res.status(500).json({ message: mesage, error: true });
        });
    }

    //check to see if the User have tried registring befor

    const userHasRef = await EmailRef.findOne({
      email: req.body.email,
    });
    if (userHasRef) {
      res.status(200).json({
        message: "You are one step to go, kindly verify your email",
      });
    }

    //generte hash
    const hash = createHash(100);

    const storeTempData = await EmailRef.create({
      ref: hash,
      email: req.body.email,
    });

    //create a string url for email verification
    const verifyUrl = `${req.protocol}://${req.get("host")}/verify?ref=${
      storeTempData.ref
    }`;

    //send a message to the mail address

    const messageObj = {
      email: storeTempData.email,
      message: `Hello plese kindly verify your mail by visiting ${verifyUrl}`,
    };

    sendmail(messageObj)
      .then(res.status(200).json({ response: true, message: "success" }))
      .catch((mesage) => {
        res.status(500).json({ respone: false, message: mesage, error: true });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ respone: false, message: error, error: true });
  }
};

/*
@desc    Verify ref Hash and add email to the subscriotion_email
@ROUTE   POST /api/:ref
@PARAM   {ref}
@access  Public
 */

const vertifyEmail = async (req, res) => {
  try {
    //get the request params
    const hash = req.params.ref;

    if (!hash) {
      return res.status(404).json({ error: true });
    }

    const verifiedEmail = await EmailRef.findOne({ ref: hash });

    if (!verifiedEmail) {
      return res
        .status(404)
        .json({ error: "invalid reference number", error: true });
    }

    //save to the database

    const savedUser = Subscription_emails.create({
      email: verifiedEmail.email,
    });
    // delete the ref from db

    const deleteRef = await EmailRef.findOneAndDelete({ ref: hash });
    //return success
    return res.status(200).json({ success: "Created" + savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ respone: false, message: error, error: true });
  }
};

export { subscribeUser, vertifyEmail };
