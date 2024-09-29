import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import https from "https";

var apiKey = process.env.weatherApiKey;

const getWeather = async (req, res) => {
  let lat = req.query.lat;
  let long = req.query.long;
  //   let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
  let url = "https://api.weatherapi.com/v1/forecast.json";

  //   console.log(lat);
  //   console.log(long);

  try {
    await axios
      .get(url, {
        params: {
          key: apiKey,
          q: `${lat},${long}`,
          days: 3,
          aqi: "no",
          alerts: "no",
        },
      })
      .then((response) => {
        //   console.log(`${lat} ${long}`);
        res.send(response.data);
      });
  } catch (error) {
    res.send(error);
  }
};

// if multiple functions for all our routes implementation code we can export like: {getWeather, getAnotherThing}
// module.exports = {getWeather};
export default getWeather;
