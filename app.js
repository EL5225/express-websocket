// Config http
require("dotenv").config();
const express = require("express");
const path = require("path");
const { PORT } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/chat", (req, res) => res.render("index"));

// config websocket
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (client) => {
  console.log("new user connected!");
  client.on("chat message", (msg) => {
    io.emit("live message", msg);
  });
});

server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
