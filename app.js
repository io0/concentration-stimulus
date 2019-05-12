const express = require('express')
const bodyParser = require('body-parser')
const app_express = express();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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

app_express.listen(3000, () => {
  console.log('Example app listening on port 3000!')
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
const records = [];

function getTimeValue() {
  var date = new Date();
  return date.getTime();
}

function writeCSV() { 
	csvWriter.writeRecords(records)       // returns a promise
	    .then(() => {
	        console.log('...Done');
	    });
}

app_express.post('/clicked', (req,res) => {
	const click = {clickTime: new Date()};
	console.log(req.body);
	res.sendStatus(201);

	var interval = req.body.interval;
	var trialLength = req.body.trialLength;

	records.push({time:getTimeValue(), state:'math'})
	var i = 0;

	timer = setInterval(function(){
		if (i * interval < trialLength){
			records.push({time: getTimeValue(), state:req.body.state});
		} else {
			records.push({time: getTimeValue(), state:'end'});
			writeCSV();
			clearInterval(timer);
		}
		i++;
	}, interval * 1000);
	console.log(records)


	console.log(req.body.interval);
});
 
