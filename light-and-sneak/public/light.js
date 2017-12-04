function Light(game,locx, locy, flicker,startState, flickerRate, moving, changex,changey, lowerBoundx, upperBoundx, lowerBoundy, upperBoundy, size){
	this.upperBoundx = upperBoundx;
	this.upperBoundy = upperBoundy;
	this.lowerBoundx = lowerBoundx;
	this.lowerBoundy = lowerBoundy;
	this.locationx = locx;
	this.locationy = locy;
	this.changex = changex;
	this.changey = changey;
	this.size = size;
	this.on = startState;
	var rate = flickerRate;
	var timerMoving;
	var timer;
	console.log("light Made");
	//this.createTimer();
	
	this.offOn = function(){
		if(this.on){
			this.on = false;
		}
		else{
			this.on = true;
		}
		console.log("in offOn");
	};
	
	this.createTimer = function(){
		//this.timerMoving = game.time.create(false);
		//this.timerMoving.loop(10000,this.move,this); 
		if(flicker){
			timer = game.time.create(false);
			timer.loop(rate,this.offOn,this);
			console.log("to start");
			timer.start();
			console.log("past start");
		}
		if(moving){
			
			timerMoving = game.time.create(false);
			timerMoving.loop(100,this.move,this);
			timerMoving.start(); 
		}
	};

	
	this.move = function(){
		if(this.locationx >= this.upperBoundx || this.locationx <= this.lowerBoundx){
			this.changex = this.changex * -1;
		}
		if(this.locationy <= this.lowerBoundy || this.locationy >= this.upperBoundy){
			this.changey = this.changey * -1;
		}
		this.locationx += this.changex;
		this.locationy += this.changey;
	};
	
	this.createTimer();
}