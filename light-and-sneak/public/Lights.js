function Lights(gameObject){
    this.gameObject = gameObject;

    this.setupBackground = function() {
        this.bitmap = gameObject.add.bitmapData(gameObject.width, gameObject.height);
        this.bitmap.context.fillStyle = 'rgb(255,255,255)';
        this.bitmap.context.strokeStyle = 'rgb(255,255,255)';
        var lightBitmap = gameObject.add.image(0, 0, this.bitmap);

        lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;
		//this.light = gameObject.add.sprite(gameObject.width/2,gameObject.height/2)
		//this.light.anchor.setTo(0.5,0.5);
		
		//gameObject.input.activePointer.x = gameObject.width/2;
		//gameObject.input.activePointer.y = gameObject.height/2;
    }
    this.lightUpdate = function(crate,player){
		this.light.x = player.x;
		this.light.y = player.y;
		this.crate = crate;
		
        this.bitmap.context.fillStyle = 'rgb(100,100,100)';
        this.bitmap.context.fillRect(0,0,gameObject.width,gameObject.height);
		
		var pointsOfIntersect = [];
		for(var a = 0; a < Math.PI * 2; a += Math.PI/360){
			var ray = new Phaser.Line(this.light.x, this.light.y, this.light.x + Math.cos(a) * 1000, this.light.y + Math.sin(a) * 1000);
			
			var intersect = this.getIntersection(ray);
			
			if(intersect){
				pointsOfIntersect.push(intersection);
			}
			else{
				pointsOfIntersect.push(ray.end);
			}
		
		}
		
		this.bitmap.context.beginPath();
		this.bitmap.context.fillStype = 'rgb(255,255,255)';
		this.bitmap.context.moveTo(pointsOfIntersect[0].x, pointsOfIntersect[0].y);
		for(var i = 0; i < pointsOfIntersect.length; i++){
			this.bitmap.context.lineTo(pointsOfIntersect[i].x,pointsOfIntersect[i].y);
		}
		this.bitmap.context.closePath();
		this.bitmap.context.fill();
		
		this.bitmap.dirty = true;
	}
	
	this.getIntersection = function(ray){
		var distanceOut = 25;
		var closestIntersection = null;
		
		var lines = [
				new Phaser.Line(this.crate.x,this.crate.y,this.crate.x + this.crate.width, this.crate.y),
				new Phaser.Line(this.crate.x,this.crate.y,this.crate.x, this.crate.y + this.crate.height),
				new Phaser.Line(this.crate.x + this.crate.width, this.crate.y + this.crate.height, this.crate.x + this.crate.width, this.crate.y),
				new Phaser.Line(this.crate.x + this.crate.width, this.crate.y + this.crate.height, this.crate.x, this.crate.y + this.crate.height)
			
			];
		
		for(var i = 0; i< lines.length; i++){
				var intersect = Phaser.Line.intersects(ray,lines[i]);
				if(intersect){
					distance = gameObject.math.distance(ray.startx,ray.starty,intersect.x,intersect.y);
					if(distance < distanceOut){
						distanceOut = distance;
						closestIntersection = intersect;
					}
				}
		
		}
		return closestIntersection;
	}
}