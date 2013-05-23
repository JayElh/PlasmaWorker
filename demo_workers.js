var i=0;

function init() {
	self.addEventListener('message', function(e) {
	  	var data = e.data;
		//window.console.log("worker");

  		switch (data.cmd) {
    		case 'start':
    		//console.log("data: " +  data.msg);
    	  	self.postMessage('WORKER STARTED: ' + data.msg);
    	  	break;
    	case 'stop':
    	  	self.postMessage('WORKER STOPPED: ' + data.msg +
    	                   '. (buttons will no longer work)');
      		self.close(); // Terminates the worker.
      		break;
		case 'render' :
			renderFrame(data.data);
			//self.postMessage('test: ' + data.msg);
			break;
    	default:
      		self.postMessage('Unknown command: ' + data.msg);
  		};
	}, false);


}

function timedCount() {
    i=i+1;
    postMessage(i); // Posts a message back to the html page
    setTimeout("timedCount()", 500);
}

function renderFrame(px) {
	var time = new Date().getTime() * 0.00018;
	var w = 100;	//TODO: init size
	var h = 100;
	
	var kx = w / h;
	for (var y = 0; y < h; y++) {
		var yy = y / h - .5;
		for (var x = 0; x < w; x++) {
			var xx = kx * x / w - kx / 1;
			var v = plasmaFinal(xx, yy, time);
			colorMap4(px, (y * w + x) * 4, v);
		}
	}

	postMessage({'cmd' : 'result', 'data' : px});
}


function plasmaFinal(x, y, time) {
	var v = 0;
	v += Math.sin((x * 10 + time));
	v += Math.sin((y * 10 + time) / 2.0);
	v += Math.sin((x * 10 + y * 10 + time) / 2.0);
	var cx = x + .5 * Math.sin(time / 5.0);
	var cy = y + .5 * Math.cos(time / 3.0);
	v += Math.sin(Math.sqrt(100 * (cx * cx + cy * cy) + 1) + time);
	v = v / 2.0;
	return v;
}

function colorMap1(px, offset, v) {
	px[offset] = 255 * (.5 + .5 * Math.sin(Math.PI * v));
	px[offset + 1] = 255 * (.5 + .5 * Math.cos(Math.PI * v));
	px[offset + 2] = 0;
	px[offset + 3] = 255;
}

function colorMap2(px, offset, v) {
	px[offset] = 255;
	px[offset + 1] = 255 * (.5 + .5 * Math.cos(Math.PI * v));
	px[offset + 2] = 255 * (.5 + .5 * Math.sin(Math.PI * v));
	px[offset + 3] = 255;
}
function colorMap3(px, offset, v) {
	px[offset] = 255 * (.5 + .5 * Math.sin(Math.PI * v));
	px[offset + 1] = 255 * (.5 + .5 * Math.sin(Math.PI * v + 2 * Math.PI / 3));
	px[offset + 2] = 255 * (.5 + .5 * Math.sin(Math.PI * v + 4 * Math.PI / 3));
	px[offset + 3] = 255;
}

  function colorMap4(px, offset, v) {
  	var c = .5 + .5 * Math.sin(Math.PI * v * 5);
  	px[offset] = 255 * c;
  	px[offset + 1] = 255 * c;
  	px[offset + 2] = 255 * c;
  	px[offset + 3] = 255;
  }

  function colorMapGrey(px, offset, v) {
  	var c = 255 * (.5 + .5 * v * .8);
  	px[offset] = c;
  	px[offset + 1] = c;
  	px[offset + 2] = c;
  	px[offset + 3] = 255;
  }

  init();
  //timedCount();
