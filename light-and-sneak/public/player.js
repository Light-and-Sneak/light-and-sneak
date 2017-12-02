function Player(game, sprite, isSeeker){
    player = game.add.sprite(200, 50, sprite);
    player.scale.setTo(0.6, 0.6);
    game.physics.p2.enable(player);
    player.body.rotation = 180;


    cursors = game.input.keyboard.createCursorKeys();

    var seeker = isSeeker;
    var moving = false;
    var SPEED = 200;

    var walk = player.animations.add('walk');

    if (seeker) {
        SPEED = 100;
    }


    player.checkKeys = function(){
        if (cursors.left.isDown) {
            player.body.rotateLeft(100);
        } else if (cursors.right.isDown) {
            player.body.rotateRight(100);
        } else {
	    player.body.setZeroRotation();
	}

        if (cursors.up.isDown) {
            player.body.moveForward(SPEED);
        } else if (cursors.down.isDown) {
            player.body.moveBackward(SPEED);
        }
    };

    player.animate = function(){
	if (cursors.left.isDown || 
	    cursors.right.isDown ||
	    cursors.up.isDown ||
	    cursors.down.isDown) {
	  player.animations.play('walk', 10, true);
	}else{
	  player.animations.stop();
        }
    };


    return player;
}
