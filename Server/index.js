import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import router from "./Routes/router.js";

import { Server } from "socket.io";
import { chatMessage } from "./Controller/auth.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server);

// The body-parser middleware is used to parse the incoming request body in various formats, such as JSON or URL-encoded data. It extracts the data and makes it available in the req.body object for further processing.
app.use(bodyParser.json({ limit: "32mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));

// accepting image files
// app.use(
//   "/Users/admin/Desktop/Vignesh/imageBank",
//   express.static("/Users/admin/Desktop/Vignesh/imageBank")
// );

const staticS =
  "http://172.16.16.31:5000/api/Users/admin/Desktop/Vignesh/imageBank/1709209056472-480040326.jpg";

app.use(
  "/api/Users/admin/Desktop/Vignesh/imageBank",
  express.static("/Users/admin/Desktop/Vignesh/imageBank")
);

//CORS is a security feature implemented by web browsers to prevent cross-origin requests
app.use(cors());

//moran is a logger
app.use(morgan("dev"));

//localhost:5000/api
app.use("/api", router); //routing hits according to the api's

// webSocket
io.on("connection", (socket) => {
  console.log("New user connected :");
  socket.on("chat", (msg) => {
    console.log("msg in socket.on :", msg);

    chatMessage(msg);

    io.emit("chat", msg);
  });
});

//connection url from mongodb/atlas site (mongodb's official site)
// const CONNECTION_URL = `mongodb+srv://vigneshdev8055:VigneshDev8055@cluster0.dasrarw.mongodb.net/?retryWrites=true&w=majority`;
const CONNECTION_URL = process.env.DATABASE;
const PORT = process.env.PORT || 5000;

//connecting mongodb server using mongoose
mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    console.log("Mongodb Connected Successfully");

    server.listen(PORT, () => console.log`Server Running On Port : ${PORT}`);
  })
  .catch((err) => {
    console.log("ERROR OCCURRED WHILE CONNECTING DB :", err.message);
  });
