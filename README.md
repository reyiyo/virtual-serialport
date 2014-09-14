#virtual-serialport
Do you use [node-serialport](https://github.com/voodootikigod/node-serialport), but don't have your device connected for development or testing?

virtual-serialport provides a virtual drop-in replacement for an actual SerialPort object.

###examples
```javascript
var SerialPort = require('node-serialport').SerialPort;

if (process.env.NODE_ENV == 'development') {
  SerialPort = require('virtual-serialport');
}

var sp = new SerialPort('/dev/ttyUSB0', { baudrate: 57600 }); // still works if testing!

//then use sp as you would with an actual SerialPort
sp.on('open', function (err) {
  ...
```

####want your virtual serial port to do something?
```javascript
var SerialPort = require('node-serialport').SerialPort;

if (process.env.NODE_ENV == 'development') {
  SerialPort = require('virtual-serialport');
}

var sp = new SerialPort('/dev/ttyUSB0', { baudrate: 57600 });


//Here we specify the functionality of the virtual device behind the serialport:
//Lets pretend it's an Arduino...
if (process.env.NODE_ENV == 'development') {
  //prints data it receives from the computer
  sp.on('dataFromSerial', function(data) {
    console.log("data sent to virtual arduino: ", data);
  }
  //sends random ints to computer every second
  setInterval(function(){
    sp.emit('data', Math.floor(Math.random() * 256));
  }, 1000);
}
//then use sp as you would with an actual SerialPort

sp.on('open', function(err) {
  ...
```

###usage


  

###todo
- move to automated testing (assertions and more)
- better match voodootikigod's node-serialport api
