let canvas = document.getElementById('board');
let ctx = canvas.getContext('2d');


class Draw{
	refreshStreet = (carList) => {	
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.drawStreet();
		this.drawCars(carList);
		this.drawBackground();
	}
	drawStreet = () => {
		//street rect
		ctx.fillStyle='grey';
		ctx.fillRect(streetStartX, streetStartY , streetLength, streetHeight);
		//lines
		for(let i=1;i<=laneNr-1;++i){
			ctx.beginPath();
			ctx.setLineDash([40, 15]);
			ctx.moveTo(streetStartX, streetStartY + i*streetHeight/laneNr);
			ctx.lineTo(streetStartX + streetLength, streetStartY + i*streetHeight/laneNr);
			ctx.stroke();
			ctx.setLineDash([]);
		}
	}
	drawCars = (carList) => {
		carList.map(car =>{
			ctx.fillStyle = car.color;
			ctx.fillRect(car.posX, car.posY, carSize, carSize);
			ctx.fillStyle = car.roofColor;
			ctx.fillRect(car.posX+carSize/4, car.posY, carSize-carSize/2, carSize);
		});
	}
	drawBackground = () =>{
		ctx.fillStyle='#4d4d4d';
		ctx.fillRect(0,0,canvas.width,streetStartY);
		ctx.fillRect(0,streetStartY+streetHeight,canvas.width,canvas.height);
		ctx.fillRect(0,0,streetStartX,canvas.height);
		ctx.fillRect(streetStartX+streetLength,0,canvas.width,canvas.height);
	}
	
}

