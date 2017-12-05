var menuState = function(){};
menuState.prototype = {
  preload: function(){
    game.load.image('menu', 'assets/menu.png' );
    game.load.audio('menuMusic', ['assets/audio/menu.wav', 'assets/audio/menu.ogg']);
  },

  create: function(){
    menu = game.add.sprite(0,0, 'menu');
    menuMusic = game.add.audio('menuMusic');
    menuMusic.loop = true;
    menuMusic.play();

    var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    key.onDown.addOnce(function () {
      menuMusic.stop();
      game.state.start('gameState');
    });

  }
}