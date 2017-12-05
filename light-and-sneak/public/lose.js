var loseState = function(){};
loseState.prototype = {
  create: function () {
    alarmSound.play();
    var text = game.add.text(0, 0, "Game Over, You lose!", {
      font: "20px Arial",
      fill: "#0a00ff",
      align: "left",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    });
    text.setTextBounds(0, 100, 800, 100);

    var reset = game.add.text(0, 0, "Press enter to restart", {
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