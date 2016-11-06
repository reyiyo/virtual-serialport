var events = require('events');
var util = require('util');

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
    process.nextTick(function() {
        this.emit('open');
    }.bind(this));
    if(callback) {
        return callback();
    }
};

VirtualSerialPort.prototype.write = function write(buffer, callback) {
    if(this.open) {
        process.nextTick(function() {
            this.emit("dataToDevice", buffer);
        }.bind(this));
    }
    // This callback should receive both an error and result, however result is
    // undocumented so I do not know what it should contain
    if(callback) {
        return callback();
    }
};

VirtualSerialPort.prototype.pause = function pause() {
};

VirtualSerialPort.prototype.resume = function resume() {
};

VirtualSerialPort.prototype.flush = function flush(callback) {
    if(callback) {
        return callback();
    }
};

VirtualSerialPort.prototype.drain = function drain(callback) {
    if(callback) {
        return callback();
    }
};

VirtualSerialPort.prototype.close = function close(callback) {
    this.removeAllListeners();
    if(callback) {
        return callback();
    }
};

VirtualSerialPort.prototype.isOpen = function isOpen() {
    return this.open ? true : false;
};

try {
    var SerialPort = require('serialport');
    if (SerialPort.SerialPort) {
        // for v2.x serialport API
        VirtualSerialPort = {
            SerialPort: VirtualSerialPort,
            parsers: SerialPort.parsers
        };
    } else {
        VirtualSerialPort.parsers = SerialPort.parsers;
    }
}
catch(error) {
    console.warn('VirtualSerialPort - NO parsers available');
}

module.exports = VirtualSerialPort;
