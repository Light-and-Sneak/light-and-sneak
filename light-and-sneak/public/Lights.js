function Lights(gameObject){
    this.gameObject = gameObject;
	var crate;
	//var timer;
	var size;
	var walls;
	var player;
	var lose;
	var lightColorStart;
	var lightColorStop;
	var lightChanged;
	var guardLight;
	var caughtByGuard;
	var isGuard;
	var info = [];
	
    this.setupBackground = function() {
		this.isGuard = false;
		this.caughtByGuard = false;
		this.guardLight = 'rgb(255,255,255)';
		this.lightColorStart = 'rgba(255,255,255,1.0)';
		this.lightColorStop = 'rgba(255,255,255,0.0)';
        this.bitmap = gameObject.add.bitmapData(gameObject.width, gameObject.height);
        this.bitmap.context.fillStyle = 'rgb(255,255,255)';
        this.bitmap.context.strokeStyle = 'rgb(255,255,255)';
        var lightBitmap = gameObject.add.image(0, 0, this.bitmap);
		this.scaleSize = 1;
		this.lose = false;
		
        lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;
	
		timer = gameObject.time.create(false);
		timer.loop(2000,this.updatesize,this);
		timer.start();
		
    }
	this.updatesize = function(){
		this.scaleSize += .025;
	}
    this.lightUpdate = function(crate,lights,walls,player,bots){
		info = [];
		this.lose = false;
		this.crate = crate;
		this.player = player;
		this.walls = walls;
		this.bitmap.context.fillStyle = 'rgb(75,75,75)';
		this.bitmap.context.fillRect(0,0,gameObject.width,gameObject.height);
		
		for(i = 0; i < lights.length; i++){
			this.lightChanged = false;
			this.isGuard = false;
			this.lightx = lights[i].locationx - 6;
			this.lighty = lights[i].locationy- 5;
			this.size = lights[i].size;
			var gradient;
			if(lights[i].on){
				var pointsOfIntersect = [];
				var attempt = player.rotation - (5*(Math.PI/12));
				for(var a = 0; a < 6.282; a += .15){
					var ray = new Phaser.Line(this.lightx, this.lighty, (this.lightx + Math.cos(a) * this.size * this.scaleSize), (this.lighty + Math.sin(a) * this.size * this.scaleSize));
					
					var intersect = this.getIntersection(ray,this.crate,this.walls);
					
					if(intersect){
						pointsOfIntersect.push(intersect);
					}
					else{
						pointsOfIntersect.push(ray.end);
					}
				
				}
			
				
				gradient = this.bitmap.context.createRadialGradient(
					this.lightx,this.lighty, this.size * 0.75 * this.scaleSize, this.lightx,this.lighty,this.size * this.scaleSize);
			
				gradient.addColorStop(0,this.lightColorStart);
				gradient.addColorStop(1,this.lightColorStop);
			
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
		
			
				for(b = 0; b < bots.length; b++){
					this.isGuard = true;
					this.lightChanged = false;
					this.lightx = bots[b].body.x - 6;
					this.lighty = bots[b].body.y- 5;
					
					
					
						
					
						var pointsOfIntersect = [];
						var attempt = bots[b].angle * (Math.PI/180) - (5*(Math.PI/12));
						for(var a = bots[b].angle * (Math.PI/180) - (5*(Math.PI/12)); a >( attempt - (Math.PI/6)); a -= .15){
							var ray = new Phaser.Line(this.lightx, this.lighty, this.lightx + Math.cos(a) * 150, this.lighty + Math.sin(a) * 150);
							
							var intersect = this.getIntersection(ray,this.crate,this.walls);
							
							if(intersect){
								pointsOfIntersect.push(intersect);
							}
							else{
								pointsOfIntersect.push(ray.end);
							}
						
						}
				
						
						this.bitmap.context.beginPath();
						this.bitmap.context.fillStyle = this.guardLight;
						
						this.bitmap.context.moveTo(this.lightx,this.lighty);
						
						for(var i = 0; i < pointsOfIntersect.length; i++){
							this.bitmap.context.lineTo(pointsOfIntersect[i].x,pointsOfIntersect[i].y);
						}
						this.bitmap.context.lineTo(this.lightx,this.lighty);
						
						this.bitmap.context.closePath();
						this.bitmap.context.fill();
						
						this.bitmap.dirty = true;
				}
		info.push(this.lose);
		info.push(this.caughtByGuard);
		return info;
	}
			
		
	
	
	this.getIntersection = function(ray,crate,walls){
		this.crate = crate;
		this.walls = walls;
		
		var distanceOut = gameObject.math.distance(ray.start.x,ray.start.y,ray.end.x,ray.end.y);
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
			correctionx = this.walls[wallNum].height/2 - 18;
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
		correctionx = this.player.width/2;
		correctiony = this.player.height/2;
		playerBox = [
					
			(new Phaser.Line(this.player.x - correctionx ,this.player.y - correctiony,this.player.x + this.player.width - correctionx, this.player.y - correctiony)),
			(new Phaser.Line(this.player.x - correctionx,this.player.y - correctiony,this.player.x - correctionx, this.player.y + this.player.height - correctiony)),
			(new Phaser.Line(this.player.x + this.player.width - correctionx, this.player.y + this.player.height - correctiony, this.player.x + this.player.width - correctionx, this.player.y - correctiony)),
			(new Phaser.Line(this.player.x + this.player.width - correctionx, this.player.y + this.player.height - correctiony, this.player.x - correctionx, this.player.y + this.player.height - correctiony))
		]
		for(var i = 0; i< playerBox.length; i++){
				var playerIntersect = Phaser.Line.intersects(ray,playerBox[i]);
				if(playerIntersect){
					//this.lose = true;
					distance = gameObject.math.distance(ray.start.x ,ray.start.y,playerIntersect.x,playerIntersect.y) + 15;
					if(distance < distanceOut){
						
					// 	distanceOut = distance;
					// 	closestIntersection = intersect;
						this.lightChanged = true;
						this.lightColorStart = 'rgba(255,0,0,1.0)';
						this.lightColorStop = 'rgba(255,0,0,0.0)';
						this.guardLight = 'rgb(255,0,0)';
					 	this.lose = true;
						if(this.isGuard){
							this.caughtByGuard = true;
						}
					 }
					else{
						if(!this.lightChanged){
							this.lightColorStart = 'rgba(255,255,200,1.0)';
							this.lightColorStop = 'rgba(255,255,200,0.0)';
							this.guardLight = 'rgb(255,255,200)';
						}
					}
				}
				else{
					if(!this.lightChanged){
						this.lightColorStart = 'rgba(255,255,200,1.0)';
						this.lightColorStop = 'rgba(255,255,200,0.0)';
						this.guardLight = 'rgb(255,255,200)';
					}
				}	 
				
		
		}
		return closestIntersection;
		
	}
}