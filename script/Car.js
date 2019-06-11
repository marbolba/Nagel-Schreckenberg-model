let defaultSpeed = 0;
let nextId = 1;

class Car{ 
    //vars:
    // pos - current position
    // dir - direction of driving
        // - 1 = right
        // - -1 = left
    // speed - current speed

    constructor(initPosX, initPosY, dir){
        this.id = nextId++;
        this.posX = initPosX;
        this.posY = initPosY;
        this.dir = dir;
        this.speed = defaultSpeed;
        this.color = this.getRandomColor();
        this.roofColor = this.colorLuminance(-0.5);

        dir == 1 ? this.carEnd = initPosX+carSize : this.carEnd = initPosX-carSize;
    }
    randomSlow= () => {
        if(this.speed > carSize){
            if(Math.random()<=slowDownProp){
                this.speed -= carSize;
            }
        }
    }
    checkColision = (carList) => {
        carList.forEach(car => {
            if(this.posY == car.posY && this.id != car.id){
                if(this.dir == 1){
                    if(this.carEnd+this.nextDistance() >= car.posX && this.carEnd+this.nextDistance() <= car.carEnd){
                        //slow down here
                        this.speed -= Math.abs(this.carEnd+this.nextDistance() - car.posX);
                        if(this.speed < 0){
                            this.speed = 0;
                        }
                    }
                }else{
                    if(this.carEnd+this.nextDistance() <= car.posX && this.carEnd+this.nextDistance() >= car.carEnd){
                        //slow down here
                        this.speed -= Math.abs(this.carEnd+this.nextDistance() - car.posX);
                        if(this.speed < 0){
                            this.speed = 0;
                        }
                    }
                }
                
            }
        });
    }
    calcNextSpeed = () => {
        let tmpSpeed = this.speed + acceleration;
        if(tmpSpeed < maxSpeed){
            //console.log(tmpSpeed,acceleration,tmpSpeed+acceleration)
            this.speed += acceleration;
        }else{
            this.speed = maxSpeed;
        }
    }
    nextDistance = () => {
        return this.dir*this.speed;
    }
    move = () => {
        this.posX += this.nextDistance();
        this.carEnd += this.nextDistance();
    }
    checkStreetBorders = () =>{
        //check for colision with both ends of street
        if(this.posX+this.nextDistance() > streetStartX+streetLength){
            this.resetPos();
            return;
        }
        if(this.posX+this.nextDistance() < streetStartX){
            this.resetPos();
            return;
        }
    }
    resetPos = () => {
        if(this.dir==1){
            this.posX = streetStartX +this.nextDistance();
            this.carEnd = this.posX+carSize;
        }else{
            this.posX = streetStartX+streetLength-carSize +this.nextDistance();
            this.carEnd = this.posX-carSize;
        }

    }
    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    colorLuminance = (lum) => {
        let hex = this.color;
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        lum = lum || 0;
    
        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }
    
        return rgb;
    }
}