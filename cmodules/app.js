var server = require("./server.js");

server.forRoute("GET", "/finish", function(request,response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello");
  response.end();
});
server.forRoute("GET", "/finish", function(request, response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Goodbye");
  response.end();
});

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
  var body = '<html>' +
             '<head><title>Node.js Echo</title></head>' +
             '<body>' +
             '<form method="POST">' +
             '<input type="text" name="msg"/>' +
             '<input type="submit" value="echo"/>' +
             '</form>' +
             '</body></html>';
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
});

server.start();
