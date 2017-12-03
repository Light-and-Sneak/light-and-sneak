function createMap(game){

    walls = game.add.group();
 
    for (var i = 0; i < 4; i++){
        wall = new staticObject(game, 'wall', (i * 50), (game.world.height / 3));
        walls.add(wall);
    }

    for (var i = 0; i < 4; i++){
        wall = new staticObject(game, 'wall', 250, (250 + (50 * i)));
        wall.body.angle = 90;
        walls.add(wall);
    }

    for (var i = 0; i < 4; i++){
        wall = new staticObject(game, 'wall', game.world.centerX - 50, (0 + (50 * i)));
        wall.body.angle = 90;
        walls.add(wall);
    }


    for (var i = 0; i < 4; i++){
        wall = new staticObject(game, 'wall', (575 - (i * 50)), 225);
        walls.add(wall);
    }

    for (var i = 0; i < 4; i++){
        wall = new staticObject(game, 'wall', 600, (250 + (50 * i)));
        wall.body.angle = 90;
        console.log(wall);
        walls.add(wall);
    }
    
    console.log(walls);
};