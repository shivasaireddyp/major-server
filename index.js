import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import bcrypt from "bcryptjs";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";

dotenv.config();

dbConnection();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));


app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

const storedHash = "$2a$10$7n85vhO.UpQWcraNXednJuQcLKs9tmzcbktILhH.ZtozRBAq/Zk8C"; // Replace with actual hashed password from DB
const enteredPassword = "123456"; // Replace with a real user input password

bcrypt.compare(enteredPassword, storedHash).then((isMatch) => {
  console.log("Password Match:", isMatch);
});

app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));
