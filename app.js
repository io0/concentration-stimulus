const express = require('express')
const bodyParser = require('body-parser')
const app_express = express();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const server = app_express.listen(3000);
const io = require('socket.io').listen(server);
const osc = require('node-osc');

var oscServer = new osc.Server(12345, '127.0.0.1');
/*
Express
*/
// Sets static directory as public
app_express.use( bodyParser.json() );       // to support JSON-encoded bodies
app_express.use(express.json());       // to support JSON-encoded bodies

app_express.use(express.static(__dirname + '/public'));

app_express.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

var date = new Date();
var day = date.getFullYear() + '-' + (date.getMonth()+1) + '-' +
                   date.getDate() + '-' + date.getHours() + '-' +
                   date.getMinutes() + '-' + date.getSeconds();

const csvWriter = createCsvWriter({
    path: 'data/' + day + '.csv',
    header: [
        {id: 'time', title: 'TIME'},
        {id: 'state', title: 'STATE'}
    ]
});
var records = [];
var counterSpect1 = 0;
var counterSpect2 = 0;

function getTimeValue() {
  var date = new Date();
  return date.getTime();
}

function writeCSV() { 
	csvWriter.writeRecords(records)       // returns a promise
	    .then(() => {
          records = [];
	        console.log('...Done');
	    });
}

app_express.post('/clicked', (req,res) => {
	const click = {clickTime: new Date()};
	console.log(req.body);
	res.sendStatus(201);

	var interval = req.body.interval;
	var trialLength = req.body.trialLength;

	records.push({time:getTimeValue(), state:req.body.state})
	var i = 0;

	timer = setInterval(function(){
		if (i * interval < trialLength){
			records.push({time: getTimeValue(), state:req.body.state});
		} else {
			records.push({time: getTimeValue(), state:'end'});
      console.log(records);
			writeCSV();
			clearInterval(timer);
		}
		i++;
	}, interval * 1000);


	//console.log(req.body.interval);
});


oscServer.on("message", function (data) {

  var numPacketsSpect = 5;       // we send the fft once for every n packets we get, can tune according to the resolution and time length you want to see

  if (data[0] == 'fft'){
    if (data[1] == 1) {     // channel 1
    counterSpect1 += 1;
      if (counterSpect1 % numPacketsSpect == 0) {
        io.sockets.emit('fft-test', {'data': data.slice(1)});
        //console.log(counterSpect1);
      }
    }
    if (data[1] == 8) {     // channel 2
      counterSpect2 += 1;
      if (counterSpect2 % numPacketsSpect == 0) {
        io.sockets.emit('fft-test2', {'data': data.slice(1)});
      }
    }
  }
});

 
