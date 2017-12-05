var winState = function(){};
winState.prototype = {
  create: function(){
    var text = game.add.text(0, 0, "You won!!", {
      font: "20px Arial",
      fill: "#0a00ff",
      align: "left",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    });
    text.setTextBounds(0, 100, 800, 100);

    var reset = game.add.text(0, 0, "Press enter to go to menu", {
      font: "20px Arial",
      fill: "#0a00ff",
      align: "left",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    });
    reset.setTextBounds(0, 100, 800, 300);

    var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    key.onDown.addOnce(function () {
      location.reload();
    });
  }
}