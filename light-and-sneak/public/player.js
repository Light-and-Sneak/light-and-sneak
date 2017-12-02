function Player(game, sprite){
    player = game.add.sprite(50, 50, sprite);
    player.scale.setTo(0.25, 0.25);
    game.physics.p2.enable(player);


    player.checkKeys = function(){
        if (cursors.left.isDown) {
            player.body.moveLeft(200);
        } else if (cursors.right.isDown) {
            player.body.moveRight(200);
        }

        if (cursors.up.isDown) {
            player.body.moveUp(200);
        } else if (cursors.down.isDown) {
            player.body.moveDown(200);
        }
    };


    return player;
}