var events = require('events');
var util = require('util');

var VirtualSerialPort = function(path, options){
	events.EventEmitter.call(this);

	var self = this;
	var open = false;


	this.write = function(buf){
		if (open) self.emit("dataToArduino", buf);
	};

	setTimeout(function(){
		open = true;
		self.emit("open");
	}, 100);
}
util.inherits(VirtualSerialPort, events.EventEmitter);

module.exports = VirtualSerialPort;
