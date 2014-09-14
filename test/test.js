var VirtualSerialPort = require('../');

var sp = new VirtualSerialPort('/dev/null');

// Simple echo function for fake Arduino
sp.on('dataToArduino', function(buf) {
	sp.emit('data', buf);
});

sp.on('open', function() {
	console.log("Initialized virtual serial port!");
	//sends a random number every second
	setInterval(function() {
		var data = new Buffer([Math.random() * 256])
		console.log("Sent to virtual arduino:", data);
		sp.write(data);
	}, 1000);

	sp.on("data", function(data) {
		console.log('Received from virtual arduino:', data);
	});
});
