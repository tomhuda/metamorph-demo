var app = require('express').createServer(),
    io = require('socket.io').listen(app);

/**
 * Serve files
 */
app.listen(9292);

app.get('/', function(req, res) {
  res.sendfile(__dirname + "/index.html");
});


app.get('/*', function(req, res) {
  res.sendfile(__dirname + '/' + req.params[0]);
});

/**
 * Process standard input
 */
var stdin = process.stdin;

stdin.resume();
stdin.on('data',function(chunk){ // called on each line of input
  io.sockets.emit('input', chunk.toString());
});
