//1. Create http server
//2. Handle HTTPRequests and send HTTPResponses
//3. Local hosting
//4. Event and Error handling
//5. File System
//6. Streaming video data
//7. Asynchronous programming

const http = require('http');
const fs = require('fs');
const PiCamera = require('pi-camera');

// Called whenever an httprequest is made to this server's ip address and port number
function doOnRequest(request,response){
    console.log("work?");
    //Running code based on contents of request headers or more often body
    if (request.method === 'GET'){
        console.log('okay')
        request.body;
        response.end();
    }
    else{
        console.log("or not?")
        request.body;
        if (request.url.slice(1) == 'realvideo'){
            console.log('did it?');
            const myCamera = new PiCamera({
                mode: 'video',
                output: `${ __dirname }/video.h264`,
                width: 640,
                height: 480,
                timeout: 1000, // Record for 5 seconds
                nopreview: true,
            });
            console.log('it did');
            myCamera.record().then((result) => {
                // Your video was captured
                console.log(result);
                response.writeHead(200,{
                    'Content-Type':'video/H264'})
                fromCamera = fs.createReadStream(`${ __dirname }/video.h264`);
                fromCamera.pipe(response);
                response.end(result);
            }).catch((error) => {
                // Handle your error
                response.writeHead(404);
                console.log(error);
                response.end(error);
            });
        }
        //response.end();
    }
}
console.log("wow");
const server = http.createServer(doOnRequest);// node creates http server in c++ using the libuv library to access computer's internals that javascript alone cannot

server.listen(3000);// Listens for messages on this port num, creates socket with this port number. until server ends nothing after this line is read at runtime