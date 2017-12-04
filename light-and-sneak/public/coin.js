function Coin(game, x, y, sprite){
    coin = game.add.sprite(x, y, sprite);
    coin.ANIM_SPEED = 10;
    coin.width = 25;
    coin.height = 25;
    game.physics.p2.enable(coin);
    coin.body.static = true;
    
    coin.animations.add('walk');
    coin.animations.play('walk', coin.ANIM_SPEED, true);

    return coin;
}