import express from "express";
import {
  register,
  login,
  logout,
  getOtherUsers,
  getMe,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated, logout);
router.route("/me").get(isAuthenticated, getMe);
router.route("/").get(isAuthenticated, getOtherUsers);

export default router;
