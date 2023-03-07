const express = require("express");
const controller = require("./controller");
const { createClient } = require("redis");
require("dotenv").config();

const config = {
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

global.redisClient = createClient(config);

redisClient.on("error", (err) => {
  console.log("Redis error: ", err);
});

redisClient
  .connect()
  .then(() => {
    console.log("Redis connected");
  })
  .catch((err) => {
    console.log("Redis error: ", err);
  });

const app = express();
app.use(express.json());

app.post("/user", controller.createUser);
app.post("/login", controller.loginUser);
app.post("/validate", controller.validateToken);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
