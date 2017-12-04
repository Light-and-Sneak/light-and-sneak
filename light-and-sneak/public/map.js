function createWalls(game){

    walls = Array();

    // top walls
    for (var i = 0; i < 3; i++){
        wallTop = new staticObject(game, 'wall', 175, (0 + (50 * i)));
        wallTop.scale.setTo(1,1);
        wallTop.body.angle = 90;

        wallBottom = new staticObject(game, 'wall', 175, (game.world.height - (50 * i)));
        wallBottom.scale.setTo(1,1);
        wallBottom.body.angle = 90;
        walls.push(wallTop);
        walls.push(wallBottom);
    }

     // center walls
     for (var i = 0; i < 3; i++){
        wallLeft = new staticObject(game, 'wall', (game.world.width / 3) + 25 , ((game.world.height / 3) + (50 * i)));
        wallLeft.body.angle = 90;
        wallLeft.scale.setTo(1,1);

        wallRight = new staticObject(game, 'wall', ((game.world.width / 3) * 2) - 10 , ((game.world.height / 3) + (50 * i)));
        wallRight.body.angle = 90;
        wallRight.scale.setTo(1,1);
        walls.push(wallLeft);
        walls.push(wallRight);
    }

    // bottom walls
    for (var i = 0; i < 3; i++){
        wallTop = new staticObject(game, 'wall', game.world.width - 175, (0 + (50 * i)));
        wallTop.scale.setTo(1,1);
        wallTop.body.angle = 90;

        wallBottom = new staticObject(game, 'wall', game.world.width - 175, (game.world.height - (50 * i)));
        wallBottom.scale.setTo(1,1);
        wallBottom.body.angle = 90;
        walls.push(wallTop);
        walls.push(wallBottom);
    }

    console.log(walls);

    return walls;
};


function createObjects(){
    var gameObjects = Array();
    
    for(var i = 0; i < 2; i++){
        spaceCrate = new dynamicObject(game, 'spaceCrate', game.world.centerX + (80 * i), game.world.centerY - 50);
        metalCrate = new staticObject(game, 'metalCrate_01', game.world.centerX + (50 * i), game.world.centerY + 50);
        gameObjects.push(spaceCrate);
        gameObjects.push(metalCrate);
    }

        gameObjects.push(new staticObject(game, 'metalCrate_01', 210, 350));
        gameObjects.push(new dynamicObject(game, 'spaceCrate', 260, 350));
        gameObjects.push(new staticObject(game, 'metalCrate_06', 470, 350));
        gameObjects.push(new dynamicObject(game, 'spaceCrate', 520, 350));
        gameObjects.push(new staticObject(game, 'metalCrate_01', 310, 50));
        gameObjects.push(new dynamicObject(game, 'spaceCrate', 360, 50));
        gameObjects.push(new staticObject(game, 'metalCrate_03', 470, 50));
        gameObjects.push(new dynamicObject(game, 'metalCrate_01', 520, 50));
        gameObjects.push(new dynamicObject(game, 'metalCrate_04', 50, 75));
        gameObjects.push(new dynamicObject(game, 'metalCrate_05', 120, 75));
        gameObjects.push(new staticObject(game, 'metalCrate_02', 600, 300));
        gameObjects.push(new dynamicObject(game, 'metalCrate_02', 650, 350));
        gameObjects.push(new dynamicObject(game, 'spaceCrate', 700, 50));


    return gameObjects;
}
  function createLights () {
	  var arrayOfLights = [];
	
	  arrayOfLights.push(new Light(game, 50,50, false, 2000, true, 5,0,0,100,0,10000,50));
	  //arrayOfLights[0].on = false;
	  arrayOfLights.push(new Light(game, 90,90,false,0,true,0,1,0,10000,5,100,10));
	  console.log(arrayOfLights.length);
    
    return arrayOfLights;
  }
};
