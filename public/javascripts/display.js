/*
const dosomething = async (el) => {
	await sleep(el);
	console.log("hi");
}*/
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function updateText(){
	var str = getRandom(10,30) + " + " + getRandom(10,30);
	$("#text").text(str);
}
let i = 0;
updateText();
let max_times = 5;
timer = setInterval(function(){
	if (i < max_times){
		updateText();
	} else {
		clearInterval(timer);
	}
	i++;
}, 2000);
/*
times.forEach(function(time){
	setTimeout(myFunction, time * 1000);
	$("#text").text("hello" + time);
});*/