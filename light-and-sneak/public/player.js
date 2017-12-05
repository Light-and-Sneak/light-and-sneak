function Player(game, width, height, sprite){
    player = game.add.sprite(width, height, sprite);
    player.scale.setTo(0.6, 0.6);
    player.x = 300;
    player.y = 300;
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

    return player;
}


 
// concrete player classes 
function Seeker(game, width, height, animSpeed, sprite){
  seeker = new Player(game, width, height, animSpeed, sprite); 
  seeker.SPEED = 200;
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
  

  //hider.body.onBeginContact.add(this.blockHit, this);

  hider.collectCoin = function(coin){
    console.log(coin);
    hider.coinCount += 1;
    console.log(hider.coinCount);

     coin.sprite.playSound();
    if (hider.coinCount === 10) {
      coin.sprite.kill();
      //end the game
      game.state.start('win');
    }else {
     
      var newX = Math.floor(Math.random() * 737);
      coin.x = newX;
      var newY = Math.floor(Math.random() * 415);
      coin.y = newY;
    }

  };

  hider.blockHit = function(body, bodyB, shapeA, shapeB, equation) {
    //console.log(body);
    if (body) {
      if (body.sprite.key == 'coin'){
        hider.collectCoin(body);
      }
    }
  };
    
	 //hider.body.onBeginContact.add(this.blockHit, this);
  return hider;
}
	
