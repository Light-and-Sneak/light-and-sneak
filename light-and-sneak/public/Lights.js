function Lights(gameObject){
    this.gameObject = gameObject;
	var crate;
	//var timer;
	var size;
	var walls;
	var player;
	var lose;
    this.setupBackground = function() {
        this.bitmap = gameObject.add.bitmapData(gameObject.width, gameObject.height);
        this.bitmap.context.fillStyle = 'rgb(255,255,255)';
        this.bitmap.context.strokeStyle = 'rgb(255,255,255)';
        var lightBitmap = gameObject.add.image(0, 0, this.bitmap);
		this.scaleSize = 1;
		this.lose = false;
		
        lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;
		//this.light = gameObject.add.sprite(gameObject.width/2,gameObject.height/2)
		//this.light.anchor.setTo(0.5,0.5);
		timer = gameObject.time.create(false);
		timer.loop(2000,this.updatesize,this);
		timer.start();
		//gameObject.input.activePointer.x = gameObject.width/2;
		//gameObject.input.activePointer.y = gameObject.height/2;
    }
	this.updatesize = function(){
		this.scaleSize += .1;
	}
    this.lightUpdate = function(crate,lights,walls,player,bots){
		
		this.crate = crate;
		this.player = player;
		this.walls = walls;
		this.bitmap.context.fillStyle = 'rgb(75,75,75)';
		this.bitmap.context.fillRect(0,0,gameObject.width,gameObject.height);
		
		for(i = 0; i < lights.length; i++){
			this.lightx = lights[i].locationx - 6;
			this.lighty = lights[i].locationy- 5;
			this.size = lights[i].size;
			var gradient;
			if(lights[i].on){
				var pointsOfIntersect = [];
				var attempt = player.rotation - (5*(Math.PI/12));
				for(var a = 0; a < 2*(Math.PI); a += .1){
					var ray = new Phaser.Line(this.lightx, this.lighty, (this.lightx + Math.cos(a) * this.size * this.scaleSize), (this.lighty + Math.sin(a) * 200* this.scaleSize));
					
					var intersect = this.getIntersection(ray,this.crate,this.walls);
					
					if(intersect){
						pointsOfIntersect.push(intersect);
					}
					else{
						pointsOfIntersect.push(ray.end);
					}
				
				}
			
				
				gradient = this.bitmap.context.createRadialGradient(
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
		
			
				for(b = 0; b < bots.length; b++){
					this.lightx = bots[b].body.x - 6;
					this.lighty = bots[b].body.y- 5;
					
					
					
						
					
						var pointsOfIntersect = [];
						var attempt = bots[b].angle * (Math.PI/180) - (5*(Math.PI/12));
						for(var a = bots[b].angle * (Math.PI/180) - (5*(Math.PI/12)); a >( attempt - (Math.PI/6)); a -= Math.PI/360){
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
						
						this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
						
						this.bitmap.context.moveTo(this.lightx,this.lighty);
						
						for(var i = 0; i < pointsOfIntersect.length; i++){
							this.bitmap.context.lineTo(pointsOfIntersect[i].x,pointsOfIntersect[i].y);
						}
						this.bitmap.context.lineTo(this.lightx,this.lighty);
						
						this.bitmap.context.closePath();
						this.bitmap.context.fill();
						
						//this.bitmap.dirty = true;
				}
		return this.lose;
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
					this.lose = true;
					distance = gameObject.math.distance(ray.start.x,ray.start.y,playerIntersect.x,playerIntersect.y);
					if(distance < 100){
						distanceOut = distance;
						closestIntersection = intersect;
						this.lose = true;
					}
				}
		
		}
		return closestIntersection;
		
	}
}