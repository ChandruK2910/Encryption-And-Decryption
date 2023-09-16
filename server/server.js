const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
const morgan = require("morgan")
const dotenv = require("dotenv")
dotenv.config();
const colors = require("colors")
const authRouter = require("./routes/authRoutes")

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    colors.bold.bgGreen.blue(
      `Node Server Running In ${process.env.DEV_MODE} mode on port ${PORT}`
    )
  );
});
