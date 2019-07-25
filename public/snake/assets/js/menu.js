var dx,dy;
dx=window.innerWidth * window.devicePixelRatio;
dy=window.innerHeight * window.devicePixelRatio;

var Menu = {
	
    preload : function() {
        game.load.image('menu', './assets/images/menu.png');
    },

    create: function () {
        this.add.button((dx/2)-300, (dy/2)-225, 'menu', this.startGame, this);
        

    },
    startGame: function () {
        this.state.start('Game');

    },
};