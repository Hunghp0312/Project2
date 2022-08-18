//require
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
//import route
const authRoutes = require("./routers/auth");
const userRoutes = require("./routers/user");
const categoryRoutes = require("./routers/category");
const productRoutes = require("./routers/product");
const orderRoutes = require("./routers/order");
const commentRoutes = require("./routers/comment");
//app
const app = express();

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    });
//middlewares
app.use(cors());
app.use(expressValidator());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//route

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", commentRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
