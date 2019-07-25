


var bar1,bar2,equal1,equal2,denominatorpic, numerotorpic, horpic, lobpic,denominatortext, numerotortext, hortext, lobtext,
textStyle_Key,textStyle_Value,textStyle_box,numberbox, numbertext,numberara,a,b,g,c,value_flag, real_numerator,real_denominator, given_numerator,given_denominator,
hor_contains, lob_contains,next,next_flag,next_text,text,scoreValueText,score, tries,triesValueText,bugflag;


var Game = {

    preload : function() {
        game.load.image('box','./assets/images/box.png');
        game.load.image('boxfixed','./assets/images/boxfixed.png');
        game.load.image('sidebox','./assets/images/sidebox.png');
        game.load.image('bar','./assets/images/bar.png');
        game.load.image('button','./assets/images/button.png');
       
    },

    create : function() {
    	
    	numberbox=[];
    	numbertext=[];
    	numberara=[];
    	value_flag=true;
    	real_numerator=-1;
    	real_denominator=-2;
    	given_numerator=-3;
    	given_denominator=-4;
    	score=0;
    	tries=3;
    	next_flag=false;
        game.stage.backgroundColor = '#061f27';
        textStyle_Key = { font: "bold 14px sans-serif", fill: "#fff", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };
        textStyle_box = { font: "bold 48px sans-serif", fill: "#061f27", align: "center" };
        textStyle_next = { font: "bold 28px sans-serif", fill: "#fff", align: "center" };
        game.add.text(30, 20, "SCORE", textStyle_Key);
        scoreValueText = game.add.text(90, 18, score.toString(), textStyle_Value);
        game.add.text(dx-140, 20, "TRIES LEFT", textStyle_Key);
        triesValueText = game.add.text(dx-52, 18, tries.toString(), textStyle_Value);
        game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
        game.input.mouse.capture = true;
        
        
        
        bar1 = game.add.sprite((dx)/5, dy/2, 'bar');
        bar2 = game.add.sprite((dx)/5+300, dy/2, 'bar');
        equal1 = game.add.sprite((dx)/5+150, dy/2-20, 'bar');
        equal2 = game.add.sprite((dx)/5+150, dy/2 +20, 'bar');
        
        numeratorpic=game.add.sprite((dx)/5, dy/2-125, 'boxfixed');
        denominatorpic=game.add.sprite((dx)/5, dy/2+25, 'boxfixed');
        numerotortext=game.add.text((dx)/5+25, dy/2-100, "5", textStyle_box);
        denominatortext=game.add.text((dx)/5+25, dy/2+50, "6", textStyle_box);
        
        horpic=game.add.sprite((dx)/5+300, dy/2-125, 'box');
        lobpic=game.add.sprite((dx)/5+300, dy/2+25, 'box');
        
        
        for(var i = 0; i < 5; i++){
            
        	numberbox[i] = game.add.sprite(dx-100, 100+ (100)*(i), 'sidebox');
        	numberbox[i].anchor.setTo(.5);
            numberbox[i].inputEnabled=true;
            numberbox[i].input.enableDrag();
            numbertext[i]=game.add.text( numberbox[i].x-15 ,numberbox[i].y-20, '1', textStyle_box);
            
        }
        

    },
    
    update: function() {
    	if(value_flag){
    		value_flag=false;
    		this.setValues();
    	}
    	
        for(var i=0;i<5;i++){
        	numbertext[i].x=numberbox[i].x-25;
        	numbertext[i].y=numberbox[i].y-20;
        }
        //console.log(lob_contains+ ' afs   ' + hor_contains);
    	for(var i = 0; i < 5; i++){
            if(game.input.activePointer.isDown==false )  {
            	if(numberbox[i].x>=(dx)/5+300 && numberbox[i].x<=(dx)/5+400 ){
            		
            		if(numberbox[i].y>= (dy/2-125) && numberbox[i].y<= (dy/2-25) && (lob_contains==-1 || lob_contains==i) ){
            			numberbox[i].x=(dx)/5+300+50;
                    	numberbox[i].y=dy/2-125+50;
                    	given_numerator=numberara[i];
                    	lob_contains=i;
                    	if(hor_contains==i) hor_contains=-1;
            		}
            		else if(numberbox[i].y>=dy/2+25 && numberbox[i].y<=dy/2+125 && (hor_contains==-1|| hor_contains==i)){
            			numberbox[i].x=(dx)/5+300+50;
                    	numberbox[i].y=dy/2+25+50;
                    	given_denominator=numberara[i];
                    	hor_contains=i;
                    	if(lob_contains==i) lob_contains=-1;
            		}
            		else{
            			//console.log('else 2');
            			numberbox[i].x=dx-100;
                    	numberbox[i].y=50+ (100)*(i);
                    	if(lob_contains==i) lob_contains=-1;
                    	if(hor_contains==i) hor_contains=-1;
            		}
            	}
            	else{
            		//console.log('else 2');
            		numberbox[i].x=dx-100;
                	numberbox[i].y=100+ (100)*(i);
                	if(lob_contains==i) lob_contains=-1;
                	if(hor_contains==i) hor_contains=-1;
            	}
            }
            
        }
    	//if(game.input.activePointer.isDown) console.log(given_denominator + ' ' + given_numerator );
    	if(lob_contains>=0 && hor_contains>=0 && next_flag==false){
    		next_flag=true;
    		next=this.add.button((dx)/5+150, 2*dy/3 +50, 'button', this.buttonfunction, this);
    		next_text=game.add.text((dx)/5+160, 2*dy/3 +60, "NEXT", textStyle_next);
    		//next.addChild(next_text);
    		
    	}
    	if(next_flag && (lob_contains==-1 || hor_contains==-1) ){
    		next_flag=false;
    		next.destroy();
    		next_text.destroy();
    	}
    	
        

    },
    wait: function(count){
    	var start=new Date().getTime()+count;
    	var ps=new Date().getTime();
    	while(ps<start){
    		ps=new Date().getTime();
    	}
    	
    },
    buttonfunction: function(){
    	if(bugflag) return;
    	console.log('button function');
    	console.log(given_numerator + '   ' + given_denominator);
    	console.log(real_numerator + '   ' + real_denominator);
    	g=this.Gcd(given_numerator,given_denominator);
    	bugflag=true;
    	if(real_numerator== given_numerator/g &&   real_denominator== given_denominator/g){
    		
    		text= game.add.text((dx)/5+150, dy/2 -200, "CORRECT", textStyle_next);
    		game.time.events.add(Phaser.Timer.SECOND * 2, this.correct, this);
    	}
    	else{
    		text= game.add.text((dx)/5+150, dy/2 -200, "WRONG", textStyle_next);
    		
    		game.time.events.add(Phaser.Timer.SECOND * 1, this.wrong, this);
    		// this.wait(3000);
    		//text.destroy();
    	}

    },
    correct: function(){
    	text.destroy();
    	score=score+(tries*3);
    	scoreValueText.text=score.toString();
    	value_flag=true;
    	bugflag=false;
    },
    wrong: function(){
    	text.destroy();
    	tries=tries-1;
    	if(tries==0)  game.state.start('Game_Over');
    	triesValueText.text=tries.toString();
        for(var i=0;i<5;i++){
            numberbox[i].x=dx-100;
            numberbox[i].y=100+ (100)*(i);
            numbertext[i].x=numberbox[i].x-15;
            numbertext[i].y=numberbox[i].y-20;
        }
        bugflag=false;
    },
    setValues: function(){
    	a=Math.floor(Math.random() * 11 )+1;
    	b=Math.floor(Math.random() * 14 )+1;
    	c=(Math.floor(Math.random() * 7)+1);
    	numerotortext.text=a.toString();
    	bugflag=false;
    	denominatortext.text=b.toString();
    	g=this.Gcd(a,b);
    	real_numerator=a/g;
    	real_denominator=b/g;
    	
    	numberara[0]=a* c;
    	numberara[1]=b* c;
    	for(var i=2;i<5;i++){
        	numberara[i]=Math.floor(Math.random() * 13*c);
        	
        	if(numberara[i]==a) numberara[i] = numberara[i] +Math.floor(11*Math.random() );
        	if(numberara[i]==b) numberara[i] = numberara[i] +Math.floor(17*Math.random() );
        	numberara[i]=numberara[i]%100;
        }
    	numberara=this.shuffle(numberara);
    	for(var i=0;i<5;i++){
    		numbertext[i].text=numberara[i].toString();
        }
    	given_numerator=-3;
    	given_denominator=-4;
    	hor_contains=-1;
    	lob_contains=-1;
    	tries=3;
    	triesValueText.text=tries.toString();
    	if(next_flag){
    		next.destroy();
    		next_text.destroy();
    		next_flag=false;
    	}
    	for(var i=0;i<5;i++){
    		numberbox[i].x=dx-100;
        	numberbox[i].y=100+ (100)*(i);
    		numbertext[i].x=numberbox[i].x-15;
        	numbertext[i].y=numberbox[i].y-20;
        }
    	
    },
    Gcd : function(aa, bb) {
        //return aa+bb;
    	if ( ! bb) {
            return aa;
        }

        return this.Gcd(bb, aa % bb);
    },
    shuffle: function (array) {
  	  var currentIndex = array.length, temporaryValue, randomIndex;

  	  // While there remain elements to shuffle...
  	  while (0 !== currentIndex) {

  	    // Pick a remaining element...
  	    randomIndex = Math.floor(Math.random() * currentIndex);
  	    currentIndex -= 1;

  	    // And swap it with the current element.
  	    temporaryValue = array[currentIndex];
  	    array[currentIndex] = array[randomIndex];
  	    array[randomIndex] = temporaryValue;
  	  }

  	  return array;
  	}
    
};