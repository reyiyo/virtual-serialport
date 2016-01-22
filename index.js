var events = require('events');
var util   = require('util');

var VirtualSerialPort = function(path, options, openImmediately, callback) {
    events.EventEmitter.call(this);

    var self = this;

    this.writeToComputer = function(data) {
        self.emit("data", data);
    };

    if(openImmediately || openImmediately === undefined || openImmediately === null) {
        process.nextTick(function() {
            self.open(callback);
        });
    }
};

util.inherits(VirtualSerialPort, events.EventEmitter);

VirtualSerialPort.prototype.open = function open(callback) {
    this.open = true;
    this.emit('open');
    if(callback) {
        callback();
    }
};

VirtualSerialPort.prototype.write = function write(buffer, callback) {
    if(this.open) {
        this.emit("dataToDevice", buffer);
    }
    // This callback should receive both an error and result, however result is
    // undocumented so I do not know what it should contain
    if(callback) {
        callback();
    }
};

VirtualSerialPort.prototype.pause = function pause() {
};

VirtualSerialPort.prototype.resume = function resume() {
};

VirtualSerialPort.prototype.flush = function flush(callback) {
    if(callback) {
        callback();
    }
};

VirtualSerialPort.prototype.drain = function drain(callback) {
    if(callback) {
        callback();
    }
};

VirtualSerialPort.prototype.close = function close(callback) {
    this.removeAllListeners();
    if(callback) {
        callback();
    }
};

module.exports = VirtualSerialPort;
