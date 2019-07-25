

var Game_Over = {

    preload : function() {
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {

        this.add.button((dx/2)-300, (dy/2)-225, 'gameover', this.startGame, this);
        game.add.text(dx/2-50, dy/2, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(dx/2+60, dy/2-4, score.toString(), { font: "bold 20px sans-serif", fill: "#46c0f9", align: "center" });

    },

    startGame: function () {
        this.state.start('Game');

    }

};