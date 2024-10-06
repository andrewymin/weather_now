import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

var apiKey = process.env.weatherApiKey;

const getSearchWeather = async (req, res) => {
  let searchLocation = req.query.searchLocation;
  let url = "https://api.weatherapi.com/v1/forecast.json";
  // console.log("testing");

  try {
    await axios
      .get(url, {
        params: {
          key: apiKey,
          q: `${searchLocation}`,
          days: 3,
          aqi: "no",
          alerts: "no",
        },
      })
      .then((response) => {
        // console.log(response);
        res.send(response.data);
      });
  } catch (error) {
    // console.log("testing error");
    res.status(400).json({ errorMsg: "Location not found" });
  }
};

// if multiple functions for all our routes implementation code we can export like: {getWeather, getAnotherThing}
// module.exports = {getWeather};
export default getSearchWeather;
