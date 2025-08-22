import http from 'node:http';
const server = http.createServer(function (req, res) {
    console.log((new Date()) + " req received from " + req.url);
    res.end("hi there");
});
server.listen(3031, () => console.log("server started"));
