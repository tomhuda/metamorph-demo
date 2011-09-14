var tbody = $("#table tbody")[0];

var Row = function(nick) {
  this.nick = nick;
}

Row.prototype.insert = function(message) {
  var morph = this.morph;
  var row = "<tr><td>" + this.nick + "</td><td>" + message + "</td></tr>";

  if (morph) {
    morph.html(row);
  } else {
    morph = this.morph = Metamorph(row);
    morph.appendTo(tbody);
  }
}

var rows = {};

var socket = io.connect('http://localhost');
socket.on('input', function (data) {
  var info = data.match(/^(?:(\w+):\s+)?(.*)\n$/);
  var name = "anonymous", content;

  if (info[1]) {
    name = info[1];
  }

  content = info[2];

  var row = rows[name] = rows[name] || new Row(name);
  row.insert(content);
});

