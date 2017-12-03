function guard (game, width, height, sprite) {
  var guard = game.add.sprite(width, height, sprite);
  guard.scale.setTo(0.6, 0.6);
  game.physics.p2.enable(guard);

  guard.animations.add('run');
  guard.animations.play('run', 10, true);

  var timer;
  var total = 140;

  timer = game.time.create(false);
  timer.loop(2000, function(){
    total *= -1;
  },this);
  timer.start();

  guard.update = function(){
    guard.body.moveRight(total);
  }; //end update()


  return guard;
}