/*
const dosomething = async (el) => {
	await sleep(el);
	console.log("hi");
}*/
min = 10;
max = 30;
function getRandom() {
  min = Math.ceil(min);
  max = Math.floor(max);
  rand = Math.floor(Math.random() * (max - min + 1)) + min;
  while (rand % 10 == 0){ // exclude numbers that are multiples of 10
  	rand = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return rand;
   //The maximum is inclusive and the minimum is inclusive 
}

function updateText(){
	var str = getRandom() + " + " + getRandom();
	$("#text").text(str);
}

$("#startMath").click(function() {
	console.log("click");
	var interval = $("#input").val();
	var trialLength = $("#trialLength").val();
	const arr = {"interval": interval, "trialLength": trialLength, "state": "math"};

	fetch('/clicked', 
		{
			method: 'POST', 
			body: JSON.stringify(arr),
			headers: { "Content-Type": "application/json" }
		}
	)
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    });
	var i = 0;
	updateText();
	timer = setInterval(function(){
		if (i * interval < trialLength){
			updateText();
			var date = new Date();
			console.log(date.getTime());
		} else {
			$("#text").text(".");
			clearInterval(timer);
		}
		i++;
	}, interval * 1000);
});

$("#startRest").click(function() {
	console.log("click");
	var interval = $("#input").val();
	var trialLength = $("#trialLength").val();
	const arr = {"interval": interval, "trialLength": trialLength, "state": 'rest'};

	fetch('/clicked', 
		{
			method: 'POST', 
			body: JSON.stringify(arr),
			headers: { "Content-Type": "application/json" }
		}
	)
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    });
	var i = 0;
	$("#text").text("-");
	timer = setInterval(function(){
		if (i * interval < trialLength){
		} else {
			$("#text").text(".");
			clearInterval(timer);
		}
		i++;
	}, interval * 1000);
});

/*
times.forEach(function(time){
	setTimeout(myFunction, time * 1000);
	$("#text").text("hello" + time);
});*/