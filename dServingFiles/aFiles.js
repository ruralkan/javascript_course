var path = require("path");
var fs = require("fs");
var server = require("./server.js");


var root = __dirname;

var serverStatic = function(response, file){
  var fileToServe = path.join(root, file);
  var stream = fs.createReadStream(fileToServe);
  stream.on('data', function(chunk){
    response.write(chunk);
  });
  stream.on("end",function(){
    response.end();
  });
}

server.forRoute("POST", "/echo", function(request, response){
  var incoming = "";
  request.on('data', function(chunk){
    incoming += chunk.toString();
  });
  request.on('end', function(){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(incoming);
    response.end();
  });
})

server.forRoute("GET", "/echo", function(request, response){
  serverStatic(response, "echo.html");
});
server.start();
