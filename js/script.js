var chronotimes = []
var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0

var sup = document.querySelector("#Students");

function chrono(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	var msec = diff.getMilliseconds()
	var sec = diff.getSeconds()
	var min = diff.getMinutes()
	var hr = diff.getHours()-1
	if (min < 10){
		min = "0" + min
	}
	if (sec < 10){
		sec = "0" + sec
	}
	if(msec < 10){
		msec = "00" +msec
	}
	else if(msec < 100){
		msec = "0" +msec
	}
	document.getElementById("chronotime").value = hr + ":" + min + ":" + sec + ":" + msec
	timerID = setTimeout("chrono()", 10)
}
function chronoStart(){
	document.chronoForm.startstop.value = "stop!"
	document.chronoForm.startstop.onclick = chronoStop
	document.chronoForm.reset.onclick = chronoReset
	start = new Date()
	chrono()
}
function chronoContinue(){
	document.chronoForm.startstop.value = "stop!"
	document.chronoForm.startstop.onclick = chronoStop
	document.chronoForm.reset.onclick = chronoReset
	start = new Date()-diff
	start = new Date(start)
	chrono()
}
function chronoReset(){
	document.getElementById("chronotime").value = "0:00:00:000"
	start = new Date()
	result.innerHTML= ""    // je vide le tableau a chaque fois 
	chronotimes = [];       // je remais a 0 le tableau 

}
function chronoStopReset(){
	document.getElementById("chronotime").value = "0:00:00:000"
	document.chronoForm.startstop.onclick = chronoStart
	localStorage.removeItem('chronotimes');
	result.innerHTML= ""    // je vide le tableau a chaque fois 
	chronotimes = [];       // je remais a 0 le tableau 

}
function chronoStop(){
	document.chronoForm.startstop.value = "start!"
	document.chronoForm.startstop.onclick = chronoContinue
	document.chronoForm.reset.onclick = chronoStopReset
	clearTimeout(timerID)
}

function chronosave() {
	chronotimes.push(document.getElementById("chronotime").value)
	
	// local storage 
	//serialisation de la variable (transformation en chaine de caractaire  JSON)   JSON.stringify(chronotimes)
	localStorage.setItem('chronotimes', JSON.stringify(chronotimes)); // permait dde stocker dans le local storage 
	var tmp = localStorage.getItem('chronotimes')
	
	//déserialiser la variable 
	chronotimes = JSON.parse(tmp)
	console.log(chronotimes)
	
	//affichage 
	result.innerHTML= ""    // je vide le tableau a chaque fois 

	chronotimes.forEach(function(chronotime) {
		var save = document.createElement(`input`);
		save.value = chronotime
		save.readOnly = true 
		result.appendChild(save); 
	})
}
