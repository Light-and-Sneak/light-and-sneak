function Lights(gameObject){
    this.gameObject = gameObject;
	var crate;
	//var timer;
	var size;
	var walls;
    this.setupBackground = function() {
        this.bitmap = gameObject.add.bitmapData(gameObject.width, gameObject.height);
        this.bitmap.context.fillStyle = 'rgb(255,255,255)';
        this.bitmap.context.strokeStyle = 'rgb(255,255,255)';
        var lightBitmap = gameObject.add.image(0, 0, this.bitmap);
		this.size = 100;
		
        lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;
		//this.light = gameObject.add.sprite(gameObject.width/2,gameObject.height/2)
		//this.light.anchor.setTo(0.5,0.5);
		//timer = gameObject.time.create(false);
		//timer.loop(2000,this.updatesize,this);
		//timer.start();
		//gameObject.input.activePointer.x = gameObject.width/2;
		//gameObject.input.activePointer.y = gameObject.height/2;
    }
	this.updatesize = function(){
		this.size++;
	}
    this.lightUpdate = function(crate,lights,walls,player,bots){
		this.bots = false;
		this.crate = crate;
		
		this.walls = walls;
		this.bitmap.context.fillStyle = 'rgb(75,75,75)';
		this.bitmap.context.fillRect(0,0,gameObject.width,gameObject.height);
		
		for(i = 0; i < lights.length; i++){
			this.lightx = lights[i].locationx - 6;
			this.lighty = lights[i].locationy- 5;
			this.size = lights[i].size;
			
			if(lights[i].on){
				var pointsOfIntersect = [];
				var attempt = player.rotation - (5*(Math.PI/12));
				for(var a = 0; a < 2*(Math.PI); a += .1){
					var ray = new Phaser.Line(this.lightx, this.lighty, this.lightx + Math.cos(a) * this.size, this.lighty + Math.sin(a) * this.size);
					
					var intersect = this.getIntersection(ray,this.crate,this.walls);
					
					if(intersect){
						pointsOfIntersect.push(intersect);
					}
					else{
						pointsOfIntersect.push(ray.end);
					}
				
				}
			
				
				var gradient = this.bitmap.context.createRadialGradient(
					this.lightx,this.lighty, this.size * 0.75, this.lightx,this.lighty,this.size);
				gradient.addColorStop(0,'rgba(255,255,255,1.0');
				gradient.addColorStop(1,'rgba(255,255,255,0.0');
			
				this.bitmap.context.beginPath();
				this.bitmap.context.fillStyle = gradient;
				
				this.bitmap.context.moveTo(pointsOfIntersect[0].x, pointsOfIntersect[0].y);

				for(j = 0; j < pointsOfIntersect.length; j++){
					this.bitmap.context.lineTo(pointsOfIntersect[j].x,pointsOfIntersect[j].y);
				}
				
				this.bitmap.context.closePath();
				this.bitmap.context.fill();
				
				
			}
		}
		//this.bitmap.context.fill();
			/*if (this.bots == true){
				for(i = 0; i < lights.length; i++){
					this.lightx = lights[i].locationx - 6;
					this.lighty = lights[i].locationy- 5;
					this.crate = crate;
					console.log(lights[i].on)
					if(lights[i].on == true){
					
						var pointsOfIntersect = [];
						var attempt = player.rotation - (5*(Math.PI/12));
						for(var a = player.rotation - (5*(Math.PI/12)); a >( attempt - (Math.PI/6)); a -= Math.PI/360){
							var ray = new Phaser.Line(this.lightx, this.lighty, this.lightx + Math.cos(a) * this.size, this.lighty + Math.sin(a) * this.size);
							
							var intersect = this.getIntersection(ray);
							
							if(intersect){
								pointsOfIntersect.push(intersect);
							}
							else{
								pointsOfIntersect.push(ray.end);
							}
						
						}
				
						
						var gradient = this.bitmap.context.createRadialGradient(
							this.lightx,this.lighty, this.size * 0.75, this.lightx,this.lighty,this.size);
						gradient.addColorStop(0,'rgba(255,255,255,1.0');
						gradient.addColorStop(1,'rgba(255,255,255,0.0');
						this.bitmap.context.beginPath();
						this.bitmap.context.fillStyle = gradient;
						if(player = "seeker"){
							this.bitmap.context.moveTo(this.lightx,this.lighty);
						}
						else{
							this.bitmap.context.moveTo(pointsOfIntersect[0].x, pointsOfIntersect[0].y);
						}
						for(var i = 0; i < pointsOfIntersect.length; i++){
							this.bitmap.context.lineTo(pointsOfIntersect[i].x,pointsOfIntersect[i].y);
						}
						if(player == "seeker"){
							this.bitmap.context.lineTo(this.lightx,this.lighty);
						}
						this.bitmap.context.closePath();
						this.bitmap.context.fill();
						
						//this.bitmap.dirty = true;
					}
				}
			}*/
		
	}
	
	this.getIntersection = function(ray,crate,walls){
		this.crate = crate;
		this.walls = walls;
		
		var distanceOut = Number.POSITIVE_INFINITY;
		var closestIntersection = null;
		var lines = [];
		var correctionx;
		var correctiony;
		for(boxNum = 0; boxNum < this.crate.length; boxNum++){
			
			correctionx = this.crate[boxNum].width/2;
			correctiony = this.crate[boxNum].height/2;
		
			lines.push(new Phaser.Line(this.crate[boxNum].x - correctionx ,this.crate[boxNum].y - correctiony,this.crate[boxNum].x + this.crate[boxNum].width - correctionx, this.crate[boxNum].y - correctiony))
			lines.push(new Phaser.Line(this.crate[boxNum].x - correctionx,this.crate[boxNum].y - correctiony,this.crate[boxNum].x - correctionx, this.crate[boxNum].y + this.crate[boxNum].height - correctiony))
			lines.push(new Phaser.Line(this.crate[boxNum].x + this.crate[boxNum].width - correctionx, this.crate[boxNum].y + this.crate[boxNum].height - correctiony, this.crate[boxNum].x + this.crate[boxNum].width - correctionx, this.crate[boxNum].y - correctiony))
			lines.push(new Phaser.Line(this.crate[boxNum].x + this.crate[boxNum].width - correctionx, this.crate[boxNum].y + this.crate[boxNum].height - correctiony, this.crate[boxNum].x - correctionx, this.crate[boxNum].y + this.crate[boxNum].height - correctiony))
		}

		for(wallNum = 0; wallNum < walls.length; wallNum++){
			correctionx = this.walls[wallNum].height/2;
			correctiony = this.walls[wallNum].width/2;
			
			lines.push(new Phaser.Line(this.walls[wallNum].x - correctionx ,this.walls[wallNum].y - correctiony,this.walls[wallNum].x + this.walls[wallNum].width - correctionx, this.walls[wallNum].y - correctiony))
			lines.push(new Phaser.Line(this.walls[wallNum].x - correctionx,this.walls[wallNum].y - correctiony,this.walls[wallNum].x - correctionx, this.walls[wallNum].y + this.walls[wallNum].height - correctiony))
			lines.push(new Phaser.Line(this.walls[wallNum].x + this.walls[wallNum].width - correctionx, this.walls[wallNum].y + this.walls[wallNum].height - correctiony, this.walls[wallNum].x + this.walls[wallNum].width - correctionx, this.walls[wallNum].y - correctiony))
			lines.push(new Phaser.Line(this.walls[wallNum].x + this.walls[wallNum].width - correctionx, this.walls[wallNum].y + this.walls[wallNum].height - correctiony, this.walls[wallNum].x - correctionx, this.walls[wallNum].y + this.walls[wallNum].height - correctiony))
			
		}
		for(var i = 0; i< lines.length; i++){
				var intersect = Phaser.Line.intersects(ray,lines[i]);
				if(intersect){
					distance = gameObject.math.distance(ray.start.x,ray.start.y,intersect.x,intersect.y);
					if(distance < distanceOut){
						distanceOut = distance;
						closestIntersection = intersect;
					}
				}
		
		}
		return closestIntersection;
	}
}