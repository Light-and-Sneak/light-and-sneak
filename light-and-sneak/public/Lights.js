function Lights(gameObject){
    this.gameObject = gameObject;
	var crate;
	var timer;
	var size;
    this.setupBackground = function() {
        this.bitmap = gameObject.add.bitmapData(gameObject.width, gameObject.height);
        this.bitmap.context.fillStyle = 'rgb(255,255,255)';
        this.bitmap.context.strokeStyle = 'rgb(255,255,255)';
        var lightBitmap = gameObject.add.image(0, 0, this.bitmap);
		this.size = 100;
		
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
		this.size++;
	}
    this.lightUpdate = function(crate,player){
		this.lightx = (player.x + player.width/2) - 6;
		this.lighty = (player.y + player.height/2)- 5;
		this.crate = crate;
		
        this.bitmap.context.fillStyle = 'rgb(100,100,100)';
        this.bitmap.context.fillRect(0,0,gameObject.width,gameObject.height);
		
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
		
		this.bitmap.dirty = true;
	}
	
	this.getIntersection = function(ray){
		var distanceOut = Number.POSITIVE_INFINITY;
		var closestIntersection = null;
		var correctionx = this.crate.width/2;
		var correctiony = this.crate.height/2;
		var lines = [
				new Phaser.Line(this.crate.x - correctionx ,this.crate.y - correctiony,this.crate.x + this.crate.width - correctionx, this.crate.y - correctiony),
				new Phaser.Line(this.crate.x - correctionx,this.crate.y - correctiony,this.crate.x - correctionx, this.crate.y + this.crate.height - correctiony),
				new Phaser.Line(this.crate.x + this.crate.width - correctionx, this.crate.y + this.crate.height - correctiony, this.crate.x + this.crate.width - correctionx, this.crate.y - correctiony),
				new Phaser.Line(this.crate.x + this.crate.width - correctionx, this.crate.y + this.crate.height - correctiony, this.crate.x - correctionx, this.crate.y + this.crate.height - correctiony)
			
			];
		
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