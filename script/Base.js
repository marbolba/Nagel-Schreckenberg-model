var chart;
class Base{
    constructor(){
        this.carList = [];
        this.carOnLaneSpeed = [[],[],[],[],[],[]];
        this.stepId = 1;
    }
    addCars = (carsNumber,carLane,dir) => {
        for(let i=carsNumber;i>0;--i){
            let posY = streetStartY + (carLane-1)*streetHeight/laneNr + 0.1*streetHeight/laneNr;
            if(dir==1){      
                this.carList.push(new Car(streetStartX + i*carSize + i, posY,dir))
            }else if(dir==-1){
                this.carList.push(new Car(streetStartX+streetLength-carSize - i*carSize - i, posY,dir))
            }
        }
    }
    step = () => {
        this.carList.forEach(car =>{
            car.checkStreetBorders();
            car.randomSlow();
            car.calcNextSpeed();
            car.checkColision(this.carList);
            car.move();
        });
        this.calcCarOnLaneSpeed();
        ++this.stepId;
    }
    calcCarOnLaneSpeed = () => {
        let currLane = 0;
        let laneNr = 0;
        let sum = 0;
        let carsNr = 0;
        this.carList.forEach(car =>{
            //init
            if(currLane===0){
                currLane = car.posY;
            }
            //start
            if(car.posY === currLane){
                sum += car.speed;
                ++carsNr;
            }else{
                this.carOnLaneSpeed[laneNr].push({x:this.stepId,y:sum/carsNr/carSize});
                sum = 0;
                carsNr = 0;
                currLane = car.posY;
                ++laneNr;
            }
        });
        this.carOnLaneSpeed[laneNr].push({x:this.stepId,y:sum/carsNr/carSize});
    }
    renderChart = () => {
            chart = new CanvasJS.Chart("chartContainer", {
                theme: "light2",
                title: {
                    text: "Wykres sredniej predkosci w funkcji czasu"
                },
                axisX: {
                    title: "t"
                },
                axisY: {
                    title: "Srednia predkosc"
                },
                legend: {
                    horizontalAlign: "left", // left, center ,right 
                    verticalAlign: "center",  // top, center, bottom
                },
                data: [{
                    type: "line",
                    showInLegend: true, 
                    legendText: "Pas 1",
                    dataPoints: this.carOnLaneSpeed[0],
                    color: "#00ff00"
                },{
                    type: "line",
                    showInLegend: true, 
                    legendText: "Pas 2",
                    dataPoints: this.carOnLaneSpeed[1],
                    color: "#000066"
                },{
                    type: "line",
                    showInLegend: true, 
                    legendText: "Pas 3",
                    dataPoints: this.carOnLaneSpeed[2],
                    color: "#996633"
                },{
                    type: "line",
                    showInLegend: true, 
                    legendText: "Pas 4",
                    dataPoints: this.carOnLaneSpeed[3],
                    color: "#ff6600"
                },{
                    type: "line",
                    showInLegend: true, 
                    legendText: "Pas 5",
                    dataPoints: this.carOnLaneSpeed[4],
                    color: "#336633"
                },{
                    type: "line",
                    showInLegend: true, 
                    legendText: "Pas 6",
                    dataPoints: this.carOnLaneSpeed[5],
                    color: "#ff66ff"
                }]
            });
        chart.render();
    }
    refreshChart = () => {
        chart.render();
    }
    calcAvg = () => {
        this.carOnLaneSpeed.forEach((lane,index)=>{
            let sum = 0;
            lane.forEach(obj=>{
                sum += obj.y;
            })    
            //console.log("pas "+(index+1)+": "+sum/lane.length);
        })
        
    }
    
}