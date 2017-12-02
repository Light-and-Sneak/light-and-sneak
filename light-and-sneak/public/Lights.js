function Lights(gameObject){
    this.gameObject = gameObject;

    setupBackground = function() {
        this.bitmap = gameObject.add.bitmapData(gameObject.width, gameObject.height);
        this.bitmap.context.fillStyle = 'rgb(255,255,255)';
        this.bitmap.context.strokeStyle = 'rgb(255,255,255)';
        var lightBitmap = gameObject.add.image(0, 0, this.bitmap);

        lightBitmap.blendMode = Phase.blendModes.MULTIPLY;
    }
    lightUpdate = function(){
        this.bitmap.context.fillStyle = 'rgb(100,100,100)';
        this.bitmap.context.fillRect(0,0,gameObject.width,gameObject.height);

    }

}