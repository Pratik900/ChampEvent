import express from "express"
import {registerController,loginController} from "../controllers/authController.js"

const router = express.Router();

// REGISTER POST
router.post("/register", registerController);

// LOGIN POST
router.post("/login", loginController);

// module.exports = router;
export {router as authRoutes}