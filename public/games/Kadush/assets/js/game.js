var player;
var enemy;
var playerTween;
var enemyTween;
var score=0;
var scoreText;
var topScore;

var Game = {

    preload : function() {

        game.load.image("player", "./assets/images/player.png");
        game.load.image("enemy", "./assets/images/enemy.png");

       
    },

    create : function() {


        score = 0;
        topScore = localStorage.getItem("highscore")==null?0:localStorage.getItem("highscore");
        scoreText = game.add.text(10,10,"-",{
            font:"bold 16px Arial",
            fill: "#acacac"
        });
        this.updateScore();
        player = game.add.sprite(game.width/2,game.height/5*4,"player");
        player.anchor.setTo(0.5);
        enemy = game.add.sprite(game.width,0,"enemy");
        enemy.anchor.set(0.5);
        this.placePlayer();
        this.placeEnemy();


    },
    
    update: function() {
        if(Phaser.Math.distance(player.x,player.y,enemy.x,enemy.y)<player.width/2+enemy.width/2){
            enemyTween.stop();
            playerTween.stop();
            score ++;
            console.log(Math.abs(player.x-enemy.x))
            if(Math.abs(player.x-enemy.x)<10){
                score += 2;
            }
            this.placeEnemy();
            this.placePlayer();
            this.updateScore();
        }

    },
	die: function(){
    	localStorage.setItem("highscore",Math.max(score,topScore));
    	game.state.start('Game_Over');
	},

	updateScore: function(){
    	scoreText.text = "Score: "+score+" - Best: "+topScore;
	},

	placePlayer: function(){
    	player.x = game.width/2;
    	player.y = game.height/5*4;
    	playerTween = game.add.tween(player).to({
        	y:game.height
    	},10000-score*10,"Linear",true);
    	playerTween.onComplete.add(this.die,this);
    	game.input.onDown.add(this.fire, this);
	},

	placeEnemy: function(){
    	enemy.x = game.width-enemy.width/2;
    	enemy.y = -enemy.width/2;
    	var enemyEnterTween = game.add.tween(enemy).to({
        	y: game.rnd.between(enemy.width*2,game.height/4*3-player.width/2)
    	},200,"Linear",true);
    	enemyEnterTween.onComplete.add(this.moveEnemy,this);
	},

	moveEnemy: function(){
    	enemyTween = game.add.tween(enemy).to({
        	x: enemy.width/2
    	},500+game.rnd.between(0,2500),Phaser.Easing.Cubic.InOut,true);
    	enemyTween.yoyo(true,0);
    	enemyTween.repeat(50, 0);
	},

	fire: function(){
    	game.input.onDown.remove(this.fire, this);
    	playerTween.stop();
    	playerTween = game.add.tween(player).to({
        	y:-player.width
    	},500,"Linear",true);
    	playerTween.onComplete.add(this.die,this);
	},
    wait: function(count){
    	var start=new Date().getTime()+count;
    	var ps=new Date().getTime();
    	while(ps<start){
    		ps=new Date().getTime();
    	}
    	
    }

    
};