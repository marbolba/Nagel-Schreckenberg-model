//cars variables
let laneNr = 6;
var streetStartX = 50;
var streetStartY = 50;
var streetLength = 900;
var streetHeight = 200;
var carSize = parseInt(0.8*streetHeight/laneNr);

//program settings
let slowDownProp = parseFloat(document.getElementById("slowp").value);
let acceleration = 1*carSize; 
let maxSpeed = parseInt(document.getElementById("maxSpeed").value)*carSize;

//other
let interval=null;

initialize = () => {
    myBase = new Base();
    renderer = new Draw(); 
					//carsNumber,carLane,dir	
	myBase.addCars(parseInt(document.getElementById("nr1").value),1,1);
	myBase.addCars(parseInt(document.getElementById("nr2").value),2,1);
	myBase.addCars(parseInt(document.getElementById("nr3").value),3,1);
	myBase.addCars(parseInt(document.getElementById("nr4").value),4,-1);
	myBase.addCars(parseInt(document.getElementById("nr5").value),5,-1);
	myBase.addCars(parseInt(document.getElementById("nr6").value),6,-1);
	
	myBase.renderChart();
	renderer.refreshStreet(myBase.carList);
	
}
start = () => {
	interval = window.setInterval(() => {
		step();
	}, 80);
}
stop = () => {
	clearInterval(interval);
	myBase.calcAvg();
}
step = () => {
	myBase.step();
	renderer.refreshStreet(myBase.carList);
	myBase.renderChart();
}
applyInputs = () => {
	this.stop();
	this.initialize();
	slowDownProp = parseFloat(document.getElementById("slowp").value);
	maxSpeed = parseInt(document.getElementById("maxSpeed").value)*carSize;
}