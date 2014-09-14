#virtual-serialport
Do you use [node-serialport](https://github.com/voodootikigod/node-serialport), but don't have your device connected for development or testing?

virtual-serialport provides a virtual drop-in replacement for an actual SerialPort object.

<br><br><br>
##examples
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
/** Same code as before

var SerialPort = require('node-serialport').SerialPort;

if (process.env.NODE_ENV == 'development') {
  SerialPort = require('virtual-serialport');
}

var sp = new SerialPort('/dev/ttyUSB0', { baudrate: 57600 });

**/

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

/**
//then use sp as you would with an actual SerialPort

sp.on('open', function(err) {
  ...
  
**/
```
<br><br><br>

##usage
```javascript
var VirtualSerialPort = require('virtual-serialport');
```

####vsp = new VirtualSerialPort(path, [opts={}]);
instantiates a virtual SerialPort object. Currently does nothing with the parameters.

Work with `vsp` the same way you would with a SerialPort instance:
```javascript
vsp.on('data', function(data) {
  ...
});

vsp.write("Hello World!");
```


  
<br><br><br>
##todo
- move to automated testing (assertions and more)
- better match voodootikigod's node-serialport api
