import http from 'node:http';
import ws, {WebSocketServer, WebSocket} from 'ws'

const server = http.createServer(function(req, res){
    
    console.log((new Date())+" req received from "+ req.url)
    res.end("hi there")
});

const wsConnection1 = new WebSocketServer({server});
let count = 0;
wsConnection1.on("connection", function(socket){

    socket.on('err', (err)=>console.log(err));
    socket.on('message', function(data, isBinary){

        
        wsConnection1.clients.forEach(function each(client){

            if(client.readyState===WebSocket.OPEN){
                client.send(data, {binary: isBinary})
            }
        })
    });

    socket.send(`hi there user no.${++count}`)

})
wsConnection1.on('close',()=>{--count});
server.listen(3031, ()=>console.log("server started"))