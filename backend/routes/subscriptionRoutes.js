import express from "express";

import { body } from "express-validator";
import {
  vertifyEmail,
  subscribeUser,
} from "../controllers/SubscriptionController.js";
const router = express.Router();

router.post(
  "/",
  [body("email").isEmail().withMessage("Email must be a valid email address!")],
  subscribeUser
);

router.post("/verify", vertifyEmail);

export default router;
