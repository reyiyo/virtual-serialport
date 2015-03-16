var events = require('events');
var util = require('util');

var VirtualSerialPort = function(path, options){
	events.EventEmitter.call(this);

	var self = this;
	var open = false;

	this.writeToComputer = function(data) {
		self.emit("data", data);
	};

	setTimeout(function(){
		open = true;
		self.emit("open");
	}, 100);
};

util.inherits(VirtualSerialPort, events.EventEmitter);

VirtualSerialPort.prototype.write = function write(buffer, callback) {
    if (this.open) this.emit("dataToDevice", buffer);
};

module.exports = VirtualSerialPort;
