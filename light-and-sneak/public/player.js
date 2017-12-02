function Player(game, sprite, isSeeker){
    player = game.add.sprite(200, 50, sprite);
    player.scale.setTo(0.6, 0.6);
    game.physics.p2.enable(player);

    var seeker = isSeeker;
    var moving = false;
    var SPEED = 200;

    var walk = player.animations.add('walk');

    if (seeker) {
        SPEED = 100;
    }


    player.checkKeys = function(){
        if (cursors.left.isDown) {
            player.body.moveLeft(SPEED);
        } else if (cursors.right.isDown) {
            player.body.moveRight(SPEED);
        }

        if (cursors.up.isDown) {
            player.body.moveUp(SPEED);
        } else if (cursors.down.isDown) {
            player.body.moveDown(SPEED);
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
