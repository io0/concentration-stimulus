const express = require('express')
const app_express = express();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/*
Express
*/
// Sets static directory as public
app_express.use(express.static(__dirname + '/public'));

app_express.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app_express.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

const csvWriter = createCsvWriter({
    path: 'data/file.csv',
    header: [
        {id: 'time', title: 'TIME'},
        {id: 'state', title: 'STATE'}
    ]
});
 
const records = [
    {time: 123,  state: 'active'},
    {time: 'Mary', state: 'English'}
];
 
csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
