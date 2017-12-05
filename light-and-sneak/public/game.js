var gameState = function(){};
gameState.prototype = {

  // this initilizes the game objects
  preload: function() {
    //game.load.image('hider', 'assets/hider.png');
    game.load.image('background', 'assets/background.png');
    game.load.image('metalCrate_01', 'assets/crateMetal_01.png' );
    game.load.image('metalCrate_02', 'assets/crateMetal_02.png' );
    game.load.image('metalCrate_03', 'assets/crateMetal_03.png' );
    game.load.image('metalCrate_04', 'assets/crateMetal_04.png' );
    game.load.image('metalCrate_05', 'assets/crateMetal_05.png' );
    game.load.image('metalCrate_06', 'assets/crateMetal_06.png' );
    game.load.image('woodenCrate', 'assets/crateWood.png');
    game.load.image('spaceCrate', 'assets/spaceCrate.png');
    game.load.image('wall', 'assets/wallTile.png');
    game.load.spritesheet('coin', 'assets/coin-spriteSheet.png',44,40);
    game.load.spritesheet('hiderSheet', 'assets/hider-spriteSheet.png',50,50);
    game.load.spritesheet('seekerSheet', 'assets/seeker-spriteSheet.png',50,50);
    game.load.audio('backgroundMusic', ['assets/audio/background.mp3', 'assets/audio/background.ogg']);
    game.load.audio('coinPickup', ['assets/audio/coin.wav', 'assets/audio/coin.ogg']);
    game.load.audio('alarm', ['assets/audio/Alarm.wav', 'assets/audio/Alarm.ogg']);

  },
  create: function(){
    clock = 0;
		inLight = false;
        backgroundMusic = game.add.audio('backgroundMusic');
        alarmSound = game.add.audio('alarm');
        backgroundMusic.loop = true;
        backgroundMusic.play();

        // set the physics to be P2
        game.physics.startSystem(Phaser.Physics.P2JS);
        // set the friction of the game world
        game.physics.p2.world.defaultContactMaterial.friction = 1;
        //game.physics.p2.restitution = 0.9;
        game.physics.p2.world.setGlobalStiffness(1e5);
        
        background = game.add.sprite(0,0, 'background');
        
        player = new Hider(game, 100, 100, 'hiderSheet');

        for(var i = 0; i < 2; i++){
          guards.push(new guard(game, 100, 100, 'seekerSheet'));
        }

        guards[0].body.x = 615;
        guards[0].body.y = 65;
        guards[0].angle = 180;
        guards[1].body.x = 90;
        guards[1].body.y = 300;
        guards[1].angle = 0;
      
        walls = createWalls(game);
        gameObjects = createObjects(game);
		
    		
	     lightPacket.setupBackground();
        cursors = game.input.keyboard.createCursorKeys();

        lightarray = createLights(game);

       

        var coin = new Coin(game, Math.floor(Math.random() * 737), Math.floor(Math.random() * 415), 'coin');
        
        player.body.onBeginContact.add(player.blockHit, this);
        
  },

  update: function() {

    	
		inLight = lightPacket.lightUpdate(gameObjects,lightarray,walls, player,guards);
    
      if(inLight[0]){
          if(inLight[1]){
            game.state.start("lose");
          }
          clock++;
      } else{
        clock = 0;
      }

      if(clock >= 25){
        game.state.start("lose");
      }

    if(guards[0].body.y <= 65){
      guards[0].body.moveBackward(50);
      game.add.tween(guards[0]).to( {angle: -180}, 500, Phaser.Easing.Linear.None, true);
    }
    if(guards[0].body.y >= 245){
      guards[0].body.moveForward(50);
      game.add.tween(guards[0]).to( { angle: 0}, 500, Phaser.Easing.Linear.None, true);
    }
    if(guards[1].body.y <= 125){
      guards[1].body.moveBackward(50);
      game.add.tween(guards[1]).to( { angle: 180}, 500, Phaser.Easing.Linear.None, true);
    }
    if(guards[1].body.y >= 300){
      guards[1].body.moveForward(50);
      game.add.tween(guards[1]).to( {angle: 0}, 500, Phaser.Easing.Linear.None, true);
    }
  }
};


