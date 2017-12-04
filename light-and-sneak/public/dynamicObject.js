function dynamicObject(game, sprite, x, y){
     // create game object
     var dynamicObject  = game.add.sprite( x, y, sprite);
     // cenable physics
     dynamicObject.scale.setTo(0.75, 0.75);
     game.physics.p2.enable(dynamicObject);
     dynamicObject.body.mass = 200;
     dynamicObject.body.fixedRotation = true;
     dynamicObject.body.damping = 0.95;

     return dynamicObject;
}