const express = require('express')
const app_express = express();

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