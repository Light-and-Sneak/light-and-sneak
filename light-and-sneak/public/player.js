function Player(game, width, height, sprite){
    player = game.add.sprite(width, height, sprite);
    player.scale.setTo(0.6, 0.6);
    game.physics.p2.enable(player);


    player.SPEED = 140;
    player.ROTATION_SPEED = 100;
    player.ANIM_SPEED = 10;
    walk = player.animations.add('walk');

    cursors = game.input.keyboard.createCursorKeys();

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


	    player.animate = function(){
	    if (cursors.left.isDown ||
	        cursors.right.isDown ||
	        cursors.up.isDown ||
	        cursors.down.isDown)
	    {
	        player.animations.play('walk', 10, true);
	    }
	    else {
        player.animations.stop();
      }
    };
	
	   player.checkKeys = function(){
        if (cursors.left.isDown) {
            player.body.moveLeft(SPEED);
        } else if (cursors.right.isDown) {
            player.body.moveRight(SPEED);
        }

	};
    return player;
}


 
// concrete player classes 
function Seeker(game, width, height, animSpeed, sprite){
  seeker = new Player(game, width, height, animSpeed, sprite); 
  seeker.SPEED = 90;
  seeker.ANIM_SPEED = 5;
  this.name = "seeker";


  return seeker;
}




function Hider(game, width, height, animSpeed, sprite){
  hider = new Player(game, width, height, animSpeed, sprite); 
  hider.SPEED = 90;
  hider.ANIM_SPEED = 5;
  hider.coinCount = 0;
  hider.name = "hider";
  hider.body.onBeginContact.add(hider.blockHit, this);

  hider.collectCoin = function(coin){
    hider.coinCount += 1;
    coin.kill();
  };

  hider.blockHit (body, bodyB, shapeA, shapeB, equation) {
    if (body) {
      if (body.sprite.key == 'coin'){
        hider.collectCoin();
      }
    }
  };
    
	
  return hider;
}
	
