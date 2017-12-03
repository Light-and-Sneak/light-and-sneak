function Player(game, width, height, sprite){
    player = game.add.sprite(width, height, sprite);
    player.scale.setTo(0.6, 0.6);
    game.physics.p2.enable(player);

    player.SPEED = 140;
    player.ROTATION_SPEED = 100;
    player.ANIM_SPEED = 10;
    walk = player.animations.add('walk');


    player.update = function(){
      if (cursors.left.isDown) {
        player.body.rotateLeft(player.ROTATION_SPEED);
      }
      else if (cursors.right.isDown) {
        player.body.rotateRight(player.ROTATION_SPEED);
      }
      else {
	      player.body.setZeroRotation();
	    }

      if (cursors.up.isDown) {
        player.body.moveForward(player.SPEED);
      } 
      else if (cursors.down.isDown) {
        player.body.moveBackward(player.SPEED);
      }
       
      if (cursors.left.isDown || 
	        cursors.right.isDown ||
	        cursors.up.isDown ||
	        cursors.down.isDown) {
	      player.animations.play('walk', player.ANIM_SPEED, true);
	    }
      else {
	      player.animations.stop();
        player.body.setZeroVelocity();
      }
    }; //end update()


    return player;
}
