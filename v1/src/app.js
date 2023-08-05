const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const { userRoutes, messageRoutes,chatRoomRoutes } = require("./api-routes");

config();
loaders();

const app = express();
app.use(express.json());
app.use(helmet());

app.listen(process.env.APP_PORT, () => {
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/message", messageRoutes);
  app.use("/api/v1/chatRoom", chatRoomRoutes);



  // create a url not found error thrower
  app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    return res.status(error.status).json({
      message: error.message,
    });
  });

  console.log(`${process.env.APP_PORT} Portundan Sunucu Ayağa Kalktı.`);
});
