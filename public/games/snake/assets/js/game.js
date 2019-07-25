var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value, temp, flag, n, m, idk, start, end,
    ms, speed1, space, dflag, timertext,
    spaceflag, sumans, mainans, displayscore, enter, yoscore, bonus, buttonpressflag, skip, skiptext, bonustext,
    bonusSquareSize, ara, line,
    left_button, right_button,xup,xdown, yleff, yright;

var cursors;
var swipe;
var swiping = false;

var firstPointX;
var firstPointY;
var lastPointX;
var lastPointY;

var checkSwipeX;
var checkSwipeY;

var mulx, muly;
mulx = (dx / 15) - 2;
muly = (dy / 15) - 2;

var Game = {

    preload: function () {
        game.load.image('snake', './assets/images/snake.png');
        game.load.image('apple', './assets/images/apple.png');
        game.load.image('bonusbox', './assets/images/bonusbox.png');

        game.load.image('up', './assets/images/up.png');
        game.load.image('down', './assets/images/down.png');
        game.load.image('left', './assets/images/left.png');
        game.load.image('right', './assets/images/right.png');


        //game.load.image('compass', 'assets/images/compass_rose.png');
        //game.load.image('touch_segment', 'assets/images/touch_segment.png');
        //game.load.image('touch', 'assets/images/touch.png');
        //game.load.image('control','./assets/images/control.png');
    },

    create: function () {
        pausetimer = 0;
        temp = 0;
        flag = 1;
        spaceflag = 0;
        snake = [];
        bonus = [];
        bonustext = [];
        ara = [];
        apple = {};
        squareSize = 15;
        bonusSquareSize = 60;
        score = 0;
        speed = 0;
        displayscore = 0;
        updateDelay = 0;
        direction = 'right';
        new_direction = null;
        addNew = 0;
        dflag = '';
        sumans = 0;
        n = '';
        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        cursors = game.input.keyboard.createCursorKeys();
        buttonpressflag = 0;

        game.stage.backgroundColor = '#061f27';
        //line=new Phaser.Line(0, 450, 600, 450);
        //game.add.sprite(0,450,'control');

        for (var i = 0; i < 5; i++) {
            snake[i] = game.add.sprite(150 + i * squareSize, 150, 'snake');
        }

        this.generateApple();


        textStyle_Key = {font: "bold 14px sans-serif", fill: "#fff", align: "center"};
        textStyle_Value = {font: "bold 18px sans-serif", fill: "#fff", align: "center"};

        game.add.text(30, 20, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(90, 18, displayscore.toString(), textStyle_Value);
        game.add.text(dx - 110, 20, "SPEED", textStyle_Key);

        speed = 5;
        speed1 = 5;
        speedTextValue = game.add.text(dx - 52, 18, speed.toString(), textStyle_Value);

        //game.add.text(30,70, "haha", textStyle_Key);
        m = game.add.text((dx / 2) - 30, (dy / 2) - 65, n, textStyle_Key);
        timertext = game.add.text((dx / 2) - 100, dy - 50, '', textStyle_Value);

        game.input.keyboard.addCallbacks(this, null, null, this.keyPress);


        //game.touchControl = game.plugins.add(Phaser.Plugin.TouchControl);
        //game.touchControl.inputEnable();
        swipe = game.input.mousePointer;

        //game.stick = this.pad.addDPad(0, 0, 200, 'dpad');
        //game.stick.alignBottomLeft(0);
        xup=this.add.button((dx)-140, (dy)-150, 'up', this.up, this);
        xup.alpha=0.2;
        xdown=this.add.button((dx)-140, (dy)-75, 'down', this.down, this);
        xdown.alpha=0.2;
        yleft=this.add.button((dx)-205, (dy)-110, 'left', this.left, this);
        yleft.alpha=0.2;
        yright=this.add.button((dx)-75, (dy)-110, 'right', this.right, this);
        yright.alpha=0.2;

    },
    up: function(){
        xup.alpha=1;
        if ( direction != 'down') {
            new_direction = 'up';
        }
        game.time.events.add(Phaser.Timer.SECOND * (.15), this.lightoffUp, this);
    },
    lightoffUp: function(){
        xup.alpha=0.2;
    },
    down: function(){
        xdown.alpha=1;
        if ( direction != 'up') {
            new_direction = 'down';
        }
        game.time.events.add(Phaser.Timer.SECOND * (.15), this.lightoffDown, this);
    },
    lightoffDown: function(){
        xdown.alpha=0.2;
    },
    left: function(){
        yleft.alpha=1;
        if ( direction != 'right') {
            new_direction = 'left';
        }
        game.time.events.add(Phaser.Timer.SECOND * (.15), this.lightoffLeft, this);
    },
    lightoffLeft: function(){
        yleft.alpha=0.2;
    },
    right: function(){
        yright.alpha=1;
        if ( direction != 'left') {
            new_direction = 'right';
        }
        game.time.events.add(Phaser.Timer.SECOND * (.15), this.lightoffRight, this);
    },
    lightoffRight: function(){
        yright.alpha=0.2;
    },

    onSwipe: function () {
        if (Phaser.Point.distance(game.input.activePointer.position, game.input.activePointer.positionDown) >= 70 && game.input.activePointer.duration > 50 && game.input.activePointer.duration < 250) {
            firstPointX = game.input.activePointer.positionDown.x;
            firstPointY = game.input.activePointer.positionDown.y;

            lastPointX = game.input.activePointer.position.x;
            lastPointY = game.input.activePointer.position.y;

            swiping = true;
        }
        if (swiping) {
            swiping = false;
            if (firstPointX > lastPointX) {

                checkSwipeX = firstPointX - lastPointX;

                if (checkSwipeX >= 70 && direction != 'right') {
                    new_direction = 'left';
                    //left
                }

            } else if (firstPointX < lastPointX) {

                checkSwipeX = lastPointX - firstPointX;

                if (checkSwipeX >= 70 && direction != 'left') {
                    new_direction = 'right';
                    //right
                }
            }

            if (firstPointY > lastPointY) {

                checkSwipeY = firstPointY - lastPointY;

                if (checkSwipeY >= 70 && direction != 'down') {
                    new_direction = 'up';
                    //up
                }

            } else if (firstPointY < lastPointY) {

                checkSwipeY = lastPointY - firstPointY;

                if (checkSwipeY >= 70 && direction != 'up') {
                    new_direction = 'down';
                    //down
                }
            }
        }
    },
    touch: function () {
        var touchspeed = this.game.touchControl.speed;

        if (Math.abs(touchspeed.y) < Math.abs(touchspeed.x)) {


            // moving mainly right or left
            if (game.touchControl.cursors.left && direction != 'right') {
                new_direction = 'left';
            }
            else if (game.touchControl.cursors.right && direction != 'left') {
                new_direction = 'right';
            }
        } else if (Math.abs(touchspeed.y) > Math.abs(touchspeed.x)) {

            // moving mainly up or down
            if (game.touchControl.cursors.up && direction != 'down') {
                new_direction = 'up';
            }
            else if (game.touchControl.cursors.down && direction != 'up') {
                new_direction = 'down';
            }
        }

    },

    keyboardinput: function () {
        if (space.isDown) {
            console.log('haahahhaha');
            spaceflag = 1;
        }
        else if (spaceflag == 1 && space.isUp) {
            spaceflag = 0;
        }
        if (enter.isDown || buttonpressflag == 1) end = ms + ms + start;
        if (buttonpressflag > 0) {
            sumans = ara[buttonpressflag - 1];
            end = ms + ms + start;
        }

    },
    keyPress: function (char) {
        if (char >= '0' && char <= '9') {
            dflag = dflag + char;
            sumans = sumans * 10 + (char - '0');
            console.log(char);
        }


    },
    buttonfunction: function () {
        console.log('button pressed');
        buttonpressflag = 5;
    },
    buttonfunction1: function () {
        console.log('button 1 pressed');
        buttonpressflag = 1;
    },
    buttonfunction2: function () {
        console.log('button 2 pressed');
        buttonpressflag = 2;
    },
    buttonfunction3: function () {
        console.log('button 3 pressed');
        buttonpressflag = 3;
    },
    buttonfunction4: function () {
        console.log('button 4 pressed');
        buttonpressflag = 4;
    },
    addbonus: function () {
        //bonus = game.add.sprite(500, 300, 'bonusbox');
        skip = this.add.button(dx / 2 - 25, dy / 2 - 25, 'bonusbox', this.buttonfunction, this);
        skiptext = game.add.text(dx / 2 - 20, dy / 2 - 20, "SKIP", textStyle_Key);

        for (var i = 0; i < 4; i++) {
            if (i == 0) bonus[i] = this.add.button(((dx / 2) - 150) + (i * (bonusSquareSize + 20)), (dy / 2) + 25, 'bonusbox', this.buttonfunction1, this);
            else if (i == 1) bonus[i] = this.add.button(((dx / 2) - 150) + (i * (bonusSquareSize + 20)), (dy / 2) + 25, 'bonusbox', this.buttonfunction2, this);
            else if (i == 2) bonus[i] = this.add.button(((dx / 2) - 150) + (i * (bonusSquareSize + 20)), (dy / 2) + 25, 'bonusbox', this.buttonfunction3, this);
            else if (i == 3) bonus[i] = this.add.button(((dx / 2) - 150) + (i * (bonusSquareSize + 20)), (dy / 2) + 25, 'bonusbox', this.buttonfunction4, this);
            //bonus[i] = game.add.sprite(150+(i*(bonusSquareSize+20)), 250, 'bonusbox');
            bonustext[i] = game.add.text(((dx / 2) - 150) + 15 + (i * (bonusSquareSize + 20)), (dy / 2) + 30, ara[i].toString(), textStyle_Value);
            ;
        }

        console.log('add button');
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
    },
    easeInSpeed: function (x) {
        return x * Math.abs(x) / 2000;
    },
    update: function () {

        if (cursors.right.isDown && direction != 'left') {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction != 'right') {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction != 'down') {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction != 'up') {
            new_direction = 'down';
        }

        //this.touch();
        //this.onSwipe();
        speedTextValue.text = '' + speed;

        temp = score % 10;
        //console.log('temp: '+ temp);
        if ((temp == 3 || temp == 8) && flag == 1) {
            start = new Date().getTime();
            flag = 2;
            sumans = 0;
            end = start;
            ms = 10000;
            speed1 = -999999991110;
            var randoma = Math.floor(Math.random() * 10),
                randomb = Math.floor(Math.random() * 30);
            mainans = randoma + randomb;
            m.text = randoma.toString() + " + " + randomb.toString() + " = ";
            ara[0] = mainans;
            for (var i = 1; i < 4; i++) {
                ara[i] = Math.floor(Math.random() * 10 * mainans * Math.random());
                if (ara[i] == mainans) ara[i] = Math.floor(ara[i] * Math.random() * 40);
            }
            ara = this.shuffle(ara);
            this.addbonus();
        }
        if (flag == 2) {
            end = new Date().getTime();
            //timertext.text='ANS: '+ dflag;
            timertext.text = 'TIME REMAINING: ' + ((start + ms - end) / 1000).toString();
            this.keyboardinput();
            if (end > start + ms) {
                flag = 0;
                speed1 = speed;
                m.text = '';
                timertext.text = '';
                dflag = '';
                console.log(mainans + '   ' + sumans);
                if (mainans == sumans) {
                    yoscore = (start + ms - new Date().getTime());
                    yoscore = (yoscore + 5000) / 1000;
                    yoscore = Math.floor(yoscore);
                    console.log(yoscore + ' yoyo');

                    displayscore = displayscore + yoscore;
                    scoreTextValue.text = displayscore.toString();
                }
                console.log(end + '  time    ' + start);
                skip.destroy();
                skiptext.destroy();
                for (var i = 0; i < 4; i++) {
                    bonus[i].destroy();
                    bonustext[i].destroy();
                }
                buttonpressflag = false;
            }


        }
        if (score % 10 == 4 || score % 10 == 9) flag = 1;

        updateDelay++;
        if (flag == 0) speed1 = speed;
        if (updateDelay % (12 - speed1) == 0) {

            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            if (new_direction) {
                direction = new_direction;
                new_direction = null;
            }


            if (direction == 'right') {

                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if (direction == 'left') {
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if (direction == 'up') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if (direction == 'down') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }

            snake.push(lastCell);
            firstCell = lastCell;

            if (addNew > 0) {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = addNew - 1;
            }

            this.appleCollision();

            this.selfCollision(firstCell);

            this.wallCollision(firstCell);
        }

    },
    generateApple: function () {


        var randomX = Math.floor(Math.random() * mulx) * squareSize,
            randomY = Math.floor(Math.random() * muly) * squareSize;

        apple = game.add.sprite(randomX, randomY, 'apple');
    },

    appleCollision: function () {
        for (var i = 0; i < snake.length; i++) {
            if (snake[i].x == apple.x && snake[i].y == apple.y) {
                addNew = 3;
                apple.destroy();

                this.generateApple();
                score++;
                displayscore++;
                if (score > 0 && score % 5 == 0) {
                    speed++;
                    speed = Math.min(speed, 9);
                }
                scoreTextValue.text = displayscore.toString();

            }
        }

    },

    selfCollision: function (head) {

        for (var i = 0; i < snake.length - 1; i++) {
            if (head.x == snake[i].x && head.y == snake[i].y) {

                game.state.start('Game_Over');
            }
        }

    },

    wallCollision: function (head) {

        if (head.x >= dx || head.x < 0 || head.y >= dy || head.y < 0) {
            game.state.start('Game_Over');
        }

    }

};