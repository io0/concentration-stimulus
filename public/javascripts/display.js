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
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function updateText(){
	var str = getRandom() + " + " + getRandom();
	$("#text").text(str);
}

$("#start").click(function() {
	console.log("click");
	var interval = $("#input").val();
	var max_times = $("#trialLength").val();
	var i = 0;
	updateText();
	timer = setInterval(function(){
		if (i * interval < max_times){
			updateText();
		} else {
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