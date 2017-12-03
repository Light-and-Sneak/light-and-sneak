function dynamicObject(game, sprite, x, y){
     // create game object
     var dynamicObject  = game.add.sprite( x, y, sprite);
     // cenable physics
     game.physics.p2.enable(dynamicObject);
     dynamicObject.body.mass = 300;
     dynamicObject.body.fixedRotation = true;
     dynamicObject.body.damping = 0.95;


     return dynamicObject;
}