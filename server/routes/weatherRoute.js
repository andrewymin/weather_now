import express from "express";
const router = express.Router();
import getWeather from "../controllers/getWeather.js";
import getSearchWeather from "../controllers/getSearchWeather.js";

router.get("/", getWeather);
router.get("/search-weather-location", getSearchWeather);
// router.post("/current-pos", getPosition);

export default router;
