function Player(game, sprite){
    player = game.add.sprite(200, 50, sprite);
    player.scale.setTo(0.6, 0.6);
    game.physics.p2.enable(player);



    var ROTATION_SPEED = 100;


    cursors = game.input.keyboard.createCursorKeys();

    var seeker = isSeeker;
    var moving = false;
    var SPEED = 200;


    var walk = player.animations.add('walk');


    player.update = function(){
      if (cursors.left.isDown) {
        player.body.rotateLeft(ROTATION_SPEED);
      }
      else if (cursors.right.isDown) {
        player.body.rotateRight(ROTATION_SPEED);
      }
      else {
	      player.body.setZeroRotation();
	    }

      if (cursors.up.isDown) {
        player.body.moveForward(SPEED);
      } 
      else if (cursors.down.isDown) {
        player.body.moveBackward(SPEED);
      }
       
      if (cursors.left.isDown || 
	        cursors.right.isDown ||
	        cursors.up.isDown ||
	        cursors.down.isDown) {
	      player.animations.play('walk', 10, true);
	    }
      else {
	      player.animations.stop();
        player.body.setZeroVelocity();
      }
    }; //end update()


    return player;
}
