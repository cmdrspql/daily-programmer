var fs = require('fs');

function Room() {
  this.visitors = {};

  this.enter = function(person, time) {
    this.register_visitor(person);
    this.visitors[person] -= parseInt(time);
  }

  this.exit = function(person, time) {
    this.register_visitor(person);
    this.visitors[person] += parseInt(time);
  }

  this.register_visitor = function(person) {
    if (!this.visitors[person]) {
      this.visitors[person] = 0;
    }
  }

  this.average_visit = function() {
    var keys = Object.keys(this.visitors);
    var avg = 0;
    for (var i = 0; i < keys.length; i++) {
      avg += this.visitors[keys[i]];
    }
    return Math.ceil(avg * 1.0 / keys.length);
  }

  this.visitor_count = function() {
    return Object.keys(this.visitors).length;
  }
}

function Gallery() {
  this.rooms = {};

  this.get_room = function(id) {
    if (!this.rooms[id]) {
      this.rooms[id] = new Room();
    }
    return this.rooms[id];
  }

  this.print = function() {
    var keys = Object.keys(this.rooms);
    for (var i = 0; i < keys.length; i++) {
      var room = this.rooms[keys[i]];
      console.log('Room ' + keys[i] + ', ' + room.average_visit() + ' minute average visit, ' + room.visitor_count() + ' visitor(s) total.');
    }
  }
}

var gallery = new Gallery();
var filename = process.argv[2];

fs.readFile(filename, function(err, data) {
  if (err) {
    throw err;
  }

  data.toString().split('\n').forEach(function(line) {
    var tokens = line.split(' ');
    if (tokens.length != 4) {
      //ignore line
    } else {
      if (tokens[2] === 'I') {
        gallery.get_room(tokens[1]).enter(tokens[0], tokens[3]);
      } else {
        gallery.get_room(tokens[1]).exit(tokens[0], tokens[3]);
      }
    }
  });

  gallery.print();
});
