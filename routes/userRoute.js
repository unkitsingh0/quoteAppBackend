import express from "express";
import {
  handelAddNewEmail,
  handelGetAllEmail,
} from "../controllers/userController.js";

const router = express();

router.post("/", handelAddNewEmail);
router.get("/", handelGetAllEmail);
export default router;
