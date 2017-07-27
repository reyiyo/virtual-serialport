'use strict';

var events = require('events');
var util = require('util');

var VirtualSerialPort = function(path, options, callback) {
    events.EventEmitter.call(this);

    var self = this;

    this.options = options;

    this.opened = false;
    this.writeToComputer = function(data) {
        self.emit('data', data);
    };

    if (options.autoOpen !== false) {
        process.nextTick(function() {
            self.open(callback);
        });
    }
};

util.inherits(VirtualSerialPort, events.EventEmitter);

VirtualSerialPort.prototype._error = function(error, callback) {
    if (callback) {
        callback.call(this, error);
    } else {
        this.emit('error', error);
    }
};

VirtualSerialPort.prototype._asyncError = function(error, callback) {
    process.nextTick(function() { this._error(error, callback); }.bind(this));
};

VirtualSerialPort.prototype.open = function open(callback) {
    if (this.opened) {
        return this._asyncError(new Error('Port is already open'));
    }
    
    this.opened = true;

    process.nextTick(
        function() {
            this.emit('open');
        }.bind(this)
    );

    if (callback) {
        return callback();
    }
};

VirtualSerialPort.prototype.write = function write(buffer, callback) {
    if (this.opened) {
        process.nextTick(
            function() {
                this.emit('dataToDevice', buffer);
            }.bind(this)
        );
    }
    // This callback should receive both an error and result, however result is
    // undocumented so I do not know what it should contain
    if (callback) {
        return callback();
    }
};

VirtualSerialPort.prototype.pause = function pause() {};

VirtualSerialPort.prototype.resume = function resume() {};

VirtualSerialPort.prototype.flush = function flush(callback) {
    if (callback) {
        return callback();
    }
};

VirtualSerialPort.prototype.drain = function drain(callback) {
    if (callback) {
        return callback();
    }
};

VirtualSerialPort.prototype.close = function close(callback) {
    this.opened = false;

    process.nextTick(
        function() {
            this.emit('close');
        }.bind(this)
    );

    if (callback) {
        return callback();
    }
};

VirtualSerialPort.prototype.update = function update(options, callback) {
    if (callback) {
        return callback();
    }
};

VirtualSerialPort.prototype.isOpen = function isOpen() {
    return this.opened;
};

function VirtualSerialPortFactory() {
    try {
        var SerialPort = require('serialport');
        VirtualSerialPort.parsers = SerialPort.parsers;
        return VirtualSerialPort;
    } catch (error) {
        console.warn('VirtualSerialPort - NO parsers available');
    }

    return VirtualSerialPort;
}

module.exports = new VirtualSerialPortFactory();
