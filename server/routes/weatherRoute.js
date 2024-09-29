import express from "express";
const router = express.Router();
import getWeather from "../controllers/getWeather.js";
// import getPosition from "../controllers/positionLocator.js";

router.get("/", getWeather);
// router.post("/current-pos", getPosition);

export default router;
