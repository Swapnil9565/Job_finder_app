const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const signUpRouter=require("./Routes/auth.js");
const logInRouter=require("./Routes/auth.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/user",signUpRouter);
app.use("/user",logInRouter);

dotenv.config();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello world")
});
app.listen(port, () => {
  console.log("Server Running...");
  mongoose
    .connect(process.env.Mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongodb Connected");
    })
    .catch((err) => console.log(err));
});
