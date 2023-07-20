const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const authMiddleware = require("./middleware/authentication");
const RouterProduct = require("./routes/ProductRoute");
const RouterAuth = require("./routes/Auth");
const RouteUser = require("./routes/User");
const RouteCart = require("./routes/CartRoute");
const RouterOrder = require("./routes/Order");
const RouterUploadIamge = require("./routes/UploadImage");
const RouterNotification = require("./routes/NotificationRoute");
const RouterComments = require("./routes/CommentRouter");
const RouterResetPassword = require("./routes/ResetPassword");
const connectDB = require("./db/connectDB");
const errorHandlerMiddleware = require("./middleware/error-handler");
const fileUpload = require("express-fileupload");

require("express-async-errors");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/v1/products", RouterProduct);
app.use("/api/v1/auth", RouterAuth);
app.use("/api/v1/user", RouteUser);
// app.use("/api/v1/cart", authMiddleware, RouteCart);
app.use("/api/v1/upload", authMiddleware, RouterUploadIamge);
app.use("/api/v1/orders", authMiddleware, RouterOrder);
app.use("/api/v1/notification", authMiddleware, RouterNotification);
app.use("/api/v1/comments", RouterComments);
// app.use("/api/v1/resetPassword", authMiddleware, RouterResetPassword);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// app.get("/", (req, res) => {
//   res.status(201).json({ msg: "Connected to backend" });
// });

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log(
      "process.env.MONGO_URL",
      process.env.PORT,
      process.env.MONGO_URL
    );
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
