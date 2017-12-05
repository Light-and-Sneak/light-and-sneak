var winState = function(){};
winState.prototype = {
  create: function(){
    var text = game.add.text(game.world.centerX, game.world.centerY, "Game Over, you win. sure!", { font: "20px Arial", fill: "#0a00ff", align: "left" });
    var key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    key.onDown.addOnce(function(){
      location.reload();
    })
  }
}