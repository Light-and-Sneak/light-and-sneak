function guard (game, width, height, sprite) {
  var guard = game.add.sprite(width, height, sprite);

  guard.scale.setTo(0.6, 0.6);
  game.physics.p2.enable(guard);
  guard.body.fixedRotation = true;
  guard.body.static = true;

  guard.animations.add('walk');
  guard.animations.play('walk', 5, true);

  return guard;
}