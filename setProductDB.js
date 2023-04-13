require("dotenv").config();

const connectDB = require("./db/connectDB");
const Products = require("./models/productModels");

const data = require("./data.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Products.deleteMany();
    await Products.create(data);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
