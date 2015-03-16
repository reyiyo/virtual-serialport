var events = require('events');
var util = require('util');

var VirtualSerialPort = function(path, options, openImmediately, callback) {
	events.EventEmitter.call(this);

	var self = this;
	var open = false;

	this.writeToComputer = function(data) {
		self.emit("data", data);
	};

    if (openImmediately || openImmediately === undefined || openImmediately === null) {
        process.nextTick(function() {
            self.open(callback);
        });
    }
};

util.inherits(VirtualSerialPort, events.EventEmitter);

VirtualSerialPort.prototype.open = function open(callback) {
    this.open = true;
    this.emit('open');
    if (callback) {
        callback();
    }
};

VirtualSerialPort.prototype.write = function write(buffer, callback) {
    if (this.open) this.emit("dataToDevice", buffer);
};

module.exports = VirtualSerialPort;
