const express = require("express")
const app = express()

const server = require("http").createServer(app)
const io = require("socket.io")(server)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

server.listen(3000, () => {
    console.log("Listening at port 3000")
})

io.on("connection", (socket) => {
    console.log("user connected")
    socket.on("message", (msg, name, hash) => {
        io.to(hash).emit("message", msg, name)
    })
    socket.on("join", (name, hash) => {
        socket.join(hash)
        io.to(hash).emit("join", name, hash)
    })
})