/**
 * This source code is licensed under the terms found in the LICENSE file in 
 * the root directory of this project.
 */

const path = require("path");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("messages", "Hello from server");
      
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        socket.emit("messages", "Hi back");
    });
});

http.listen(3000, () => console.log("Example express app listening on port 3000!"));
