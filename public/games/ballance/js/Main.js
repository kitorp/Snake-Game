
var game= new Phaser.Game(800,600,Phaser.AUTO, 'phaser-example',{preload : preload,create : create,update : update, render: render})
    
function preload(){
    game.load.image("bg1","assets/galaxy.jpg");
    game.load.image("paddle","assets/paddle.png");
    game.load.image("ball1","assets/ball1.jpg");
    game.load.image("ball2","assets/ball2.jpg");
    game.load.image("ball3","assets/ball3.jpg");
    game.load.image("ball4","assets/ball4.jpg");
    game.load.image("ball5","assets/ball5.jpg");
    game.load.image("ball","assets/gball.png");
}

var ballCount = 5;
var paddleLeft;
var paddleRight;
var ball = [];
var ball1;
var ball2;
var ball3;
var cursor;
var bricks
var scoreText;
var score=0;
var music;
var fastButton;
var increase = 1.03;
var velo = 500;
var backGround;
var sec = 0;
var PI = 3.14159265;
var leftWeight = 0;
var rightWeight = 0;
var colideB1 = 0;
var colideB2 = 0;
var colideB3 = 0;
var copyB1;
var copyB2;
var copyB3;
var orighnY = 400;
var upperBound = 300;
var lowerBound = 500;
var weithtLeft = 0;
var weightRight = 0;


function create(){
	
//  Enable P2
    game.physics.startSystem(Phaser.Physics.P2JS);

    //  Turn on impact events for the world, without this we get no collision callbacks
    game.physics.p2.setImpactEvents(true);
    
    
	//Upload backGround wallpaper
    backGround = game.add.sprite(0,0,"bg1");
    backGround.scale.setTo(0.5);
    
    //Upload the ladder 
    paddleLeft=game.add.sprite(250,400,"paddle");
    paddleRight = game.add.sprite(550, 400, "paddle");

    paddleLeft.anchor.setTo(0.5, 0.5);
    paddleRight.anchor.setTo(0.5, 0.5);
    
    paddleLeft.scale.setTo(1.6,0.7);
    paddleRight.scale.setTo(1.6,0.7);
    
  for(var i = 1; i <= ballCount; i++) {
	  	var myBall = "ball" + i;
		ball[i]=game.add.sprite(20 + i * 50,200,myBall);
		game.physics.arcade.enable(ball[i]);
		ball[i].anchor.setTo(0.5,0.5);
		ball[i].body.collideWorldBounds=true;
		ball[i].body.bounce.x = 0.0;
	    ball[i].body.bounce.y = 0.0;
	    ball[i].inputEnabled = true;
	    ball[i].input.enableDrag(true);
  	}
//    ball[1]=game.add.sprite(20,200,"ball");
//    ball[2]=game.add.sprite(50,200,"ball");
//    ball3=game.add.sprite(800,200,"ball3");
//    underBall=game.add.sprite(400,550,"ball1");
//    
//    ball[1].anchor.setTo(0.5,0.5);
//    ball[2].anchor.setTo(0.5,0.5);
//    ball3.anchor.setTo(0.5,0.5);
//    underBall.anchor.setTo(0.5,0.5);
    
//    underBall.scale.setTo(1.5,1.5);
//    
    game.physics.arcade.enable(paddleLeft);
    game.physics.arcade.enable(paddleRight);
//    game.physics.arcade.enable(underBall);
    game.physics.arcade.enable(ball[1]);
    game.physics.arcade.enable(ball[2]);
//    game.physics.arcade.enable(ball3);
//    
    game.physics.arcade.gravity.y = 100;
//    ball1.body.gravity.y = 100;
    paddleLeft.body.immovable = true;
    paddleRight.body.immovable = true;
//    underBall.body.immovable = true;
    
    paddleLeft.body.allowGravity = false;
    paddleLeft.body.collideWorldBounds=true;  
    paddleRight.body.allowGravity = false;
    paddleRight.body.collideWorldBounds=true;  
    
    
//    ball[1].body.collideWorldBounds=true;
//    ball[2].body.collideWorldBounds=true;
//    ball3.body.collideWorldBounds=true;
//    underBall.body.collideWorldBounds = true;
    
    
//    ball[1].body.bounce.x=0.0;
//    ball[1].body.bounce.y=0.0;
//    
//    ball[2].body.bounce.x=0.0;
//    ball[2].body.bounce.y=0.0;
    
//    ball3.body.bounce.x=0.0;
//    ball3.body.bounce.y=0.0;
//    
//    ball[1].inputEnabled = true;
//    ball[1].input.enableDrag(true);
//    
//    ball[2].inputEnabled = true;
//    ball[2].input.enableDrag(true);
//    
//    ball3.inputEnabled = true;
//    ball3.input.enableDrag(true);
    
    cursor=game.input.keyboard.createCursorKeys();
    scoreLeft=game.add.text(0,5,"ScoreLeft : 0",{fontSize: '30px',fill : "#FFFFFF"});
    scoreRight=game.add.text(500,5,"ScoreRight : 0",{fontSize: '30px',fill : "#FFFFFF"});

//    game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
//    game.scale.pageAlignHorizontally=true;
//    game.scale.pageAlighVertically=true;
//    game.scale.setScreenSize(true);
    
    
//    stopButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
} 


function update(){
//	ball.body.velocity.y = 100;
//	paddle
//	sec++;
//	if(sec >= 5) {
//		sec = 0;
//		paddle.body.angularVelocity = 0;
//	}
//	copyB1 = ball1;
//	copyB2 = ball2;
//	copyB3 = ball3;
//	if(colideB1 != 0) {
//		if(ball1.body.center.y + 20 < paddle.body.center.y) colideB1 = 0;
//	}
//	
//	console.log(paddleLeft.body.velocity.y);
//	console.log(paddleRight.body.velocity.y);
//	ball1.body.velocity.y = 100;
	
	if(paddleLeft.body.center.y >= lowerBound) {
		paddleLeft.body.velocity.y = 0;
	}
//	
	if(paddleLeft.body.center.y <= upperBound) {
		paddleLeft.body.velocity.y = 0;
	}
//	
	if(paddleRight.body.center.y >= lowerBound) {
		paddleRight.body.velocity.y = 0;
	}
	if(paddleRight.body.velocity.y <= upperBound) {
		paddleRight.body.velocity.y = 0;
	}
	
	rotate_paddle();
	shift_paddle();
	showScore();
	
	for(var i = 1; i <= ballCount; i++) {
		game.physics.arcade.collide(paddleLeft, ball[i]);
		game.physics.arcade.collide(paddleRight, ball[i]);
	}
	
//	game.physics.arcade.collide(paddleLeft,ball[1]); 
//	game.physics.arcade.collide(paddleRight,ball[1]); 
//	game.physics.arcade.collide(paddleLeft,ball[2]);
//	game.physics.arcade.collide(paddleRight,ball[2]);
	
	
	
	
	
//	game.physics.arcade.collide(paddle,underBall); 
//	paddle.body.rotation(90);

	//	if(stopButton.isDown) {
//		return ;
//	}
	
//    if(cursor.left.isDown && paddle.game.world.x>=0){
//        paddle.body.velocity.x= -velo;
//    }
//    else if(cursor.right.isDown){
//        paddle.body.velocity.x = velo;
//    }
//    else{
//      paddle.body.velocity.x=0;
//    }
//    if(cursor.up.isDown) {
//		ball.body.velocity.x = ball.body.velocity.x * increase;
//		ball.body.velocity.y = ball.body.velocity.y * increase;
//    }
//    else if(cursor.down.isDown) {
//    	
//    	ball.body.velocity.x = ball.body.velocity.x / increase;
//		ball.body.velocity.y = ball.body.velocity.y / increase;
//    }
    
    
}

function shift_paddle() {
	console.log("left :  " + paddleLeft.body.center.y);
	console.log("right : " + paddleRight.body.center.y);
	
	var dif = paddleLeft.body.center.y - paddleRight.body.center.y;
	if(dif < 0) dif = -dif;
	if(weightLeft == weightRight) {
		if(paddleLeft.body.center.y < paddleRight.body.center.y) {
			paddleLeft.body.velocity.y = 100;
			paddleRight.body.velocity.y = -100;
		}
		else {
			paddleLeft.body.velocity.y = -100;
			paddleRight.body.velocity.y = 100;
		}
		if(dif < 5) {
			paddleLeft.body.velocity.y = 0;
			paddleRight.body.velocity.y = 0;
		}
	}
	else if(weightLeft < weightRight && paddleRight.body.center.y < 500) {
		paddleLeft.body.velocity.y = -100;
		paddleRight.body.velocity.y = 100;
	}
	else if(weightLeft > weightRight && paddleLeft.body.center.y < 500){
		paddleLeft.body.velocity.y = 100;
		paddleRight.body.velocity.y = -100;
	}
	
	
}

function rotate_paddle() {
	weightLeft = 0;
	weightRight = 0;
	for(var i = 1; i <= ballCount; i++) {		
		if(ball[i].body.center.x <= 400 && ball[i].body.center.x) {
			if(paddleLeft.body.center.y - ball[i].body.center.y <= 35 && paddleLeft.body.center.y - ball[i].body.center.y >= -1) weightLeft += i;
		}
		else {
			if(paddleRight.body.center.y - ball[i].body.center.y <= 35 && paddleRight.body.center.y - ball[i].body.center.y >= -1) weightRight += i;
		}
	}
}	

function showScore(){
    scoreLeft.text="ScoreLeft : " + weightLeft;
    scoreRight.text= "ScoreRight : " + weightRight;
}



function render() {
//	game.debug.text("Ball position " + ball1.body.center.x + " , " + ball1.body.center.y, 432, 32);
//	game.debug.text("You just entered SPACE", 400, 400);
//	game.debug.text("Ball x, y : ", 32, 32);
//    game.debug.text("Drag the ball", 32, 32);
//    game.debug.spriteInfo(target, 32, 100);

}








