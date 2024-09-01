import express from "express"
import { playerController } from "../controllers/playerController.js";
import { checkAccess, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/entryform",playerController);

export {router as playerRoutes}