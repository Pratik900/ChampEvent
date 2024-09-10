import express from "express";
import { playerController } from "../controllers/playerController.js";
import { checkAccess, isAdmin } from "../middleware/authMiddleware.js";
import {
  getSinglesSlottingsController,
  playerSlottingController,
} from "../controllers/playerSlottingController.js";

const router = express.Router();

router.post("/entryform", playerController);

router.get("/playerslotting/:gameType/:from/:to", playerSlottingController);

router.get("/singlesslottings", getSinglesSlottingsController);
export { router as playerRoutes };
