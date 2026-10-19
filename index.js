const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("chat message", (message) => {
        io.emit("chat message", message);
    });
});

server.listen(9000, "127.0.0.1", () => {
    console.log("Server started at http://localhost:9000");
});
