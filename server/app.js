import "dotenv/config.js";
import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoute.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));

// app.use(cookieParser());

// Trust the first proxy, required for secure cookies on Heroku/Vercel
app.set("trust proxy", 1);

///////////// cors option for Production (Vercel)
const corsOptionsProd = {
  origin: "https://weather-now-2-eight.vercel.app", // Explicitly allow your frontend domain
  methods: "GET", // Specify allowed methods as needed
  credentials: true, // If your frontend needs to send cookies or credentials with the request
  allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"], // Specify allowed headers
};

///////////// cors option for Localhost
const corsOptionsLocal = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};
/////////// Setting cors_option based on NODE_ENV value
const CORS_OPTIONS =
  process.env.NODE_ENV === "production" ? corsOptionsProd : corsOptionsLocal;

app.use(cors(CORS_OPTIONS));

app.use(express.json());

///////////// routes
app.use("/weather-now", weatherRoutes);

///////////// connection to mongoose
let port = process.env.port || 3001;

const startServer = () => {
  try {
    // mongoose.set("strictQuery", true);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

startServer(); // placed mongoose connection in function for async/await for deployment server (vercel)

app.get("/", (req, res) => {
  // use when in local
  res.send(`Server up and running`);
});
