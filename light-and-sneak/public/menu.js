var menuState = function(){};
menuState.prototype = {
  preload: function(){
    game.load.image('menu', 'assets/menu.png' );
  },

  create: function(){
    menu = game.add.sprite(0,0, 'menu');

    var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    key.onDown.addOnce(function () {
      game.state.start('gameState');
    });

  }
}