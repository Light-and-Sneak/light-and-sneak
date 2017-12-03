function staticObject(game, sprite, x, y){
    // create game object
    var staticObject  = game.add.sprite( x, y, sprite);
    game.physics.p2.enable(staticObject);
    staticObject.body.static = true;

    return staticObject;
}