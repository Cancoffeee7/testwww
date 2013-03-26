var connect = require("connect");
var exec = require('child_process').exec,
    child;
var mymodule = require("./node.examExport");

connect.createServer( connect.query(), function( request, response ){
  console.log( JSON.stringify( request.query) );
	var query = request.query;
	response.writeHead(200, {'Content-Type':'text/html'});
	if( query.cmd === "exit" ){
		var time = query.time;
		var shutdownCmd = "shutdown.exe -s -t " + time;
		child = exec(shutdownCmd, function (error, stdout, stderr) {
			if (error) {
				console.log('exec error: ' + error);
				response.end("<h1>error : shutdown</h1>")
			} else {
				response.end("<h1>shutdown " + time + "s" + "</h1>");
			}
		});
	} else if( query.cmd === "pause" ){
		var pauseCmd = "shutdown.exe -a";
		child = exec(pauseCmd, function (error, stdout, stderr) {
			if (error) {
				console.log('exec error: ' + error);
				response.end("<h1>error : shutdown pause</h1>", "utf8")
			} else {
				response.end("<h1>shutdown pause</h1>")
			}
		});
	} else if(query.cmd === "turnOff" ){
		var turnOffCmd = "nircmd.exe monitor off";
		child = exec(turnOffCmd, function (error, stdout, stderr) {
			if( error ){
				console.log('exec error: ' + error);
				response.end("<h1>error : turn off monitor</h1>", "utf8" );
			} else {
				response.end("<h1>turn off monitor</h1>", "utf8" );
			}
		} );
	} else if(query.cmd === "calc" ){
		var calcCmd = "calc.exe";
		child = exec(calcCmd, function (error, stdout, stderr) {
			if( error ){
				console.log('exec error: ' + error);
				response.end("<h1>error : opon calc</h1>", "utf8" );
			} else {
				response.end("<h1>open calc</h1>", "utf8" );
			}
		} );
	} else if(query.cmd === "count" ){
		var count = mymodule.count();
		response.end("<h1>" + count() +"</h1>")
	} else {
		console.log( JSON.stringify(query));
		response.end("<h1>No Command</h1>", "utf8" );
	}
}).listen(8080, function(){
	console.log("create Server!!!!");
});
