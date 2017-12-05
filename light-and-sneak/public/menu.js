var menuState = function(){};
menuState.prototype = {
  create: function(){
    game.state.start('gameState');
  }
}