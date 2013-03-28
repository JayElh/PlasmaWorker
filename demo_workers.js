var i=0;

function init() {
	self.addEventListener('message', function(e) {
	  	var data = e.data;
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


init();
timedCount();
